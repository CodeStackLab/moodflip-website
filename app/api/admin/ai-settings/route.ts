import { NextResponse } from 'next/server';
import { hasValidAdminSession } from '@/lib/adminAuth';
import { prisma } from '@/lib/prisma';

const providers = ['openrouter','openai','anthropic','gemini'] as const;
const defaults = { id:'global', enabled:true, primaryProvider:'openrouter', primaryModel:'openai/gpt-4o-mini', fallbackProvider:'gemini', fallbackModel:'gemini-2.0-flash', autoFallback:true, openrouterModels:[] };
const availability = () => ({ openrouter:!!process.env.OPENROUTER_API_KEY, openai:!!process.env.OPENAI_API_KEY, anthropic:!!process.env.ANTHROPIC_API_KEY, gemini:!!process.env.GEMINI_API_KEY });

export async function GET(request: Request){
  if(!hasValidAdminSession(request)) return NextResponse.json({error:'Unauthorized'},{status:401});
  const settings = await prisma.aiSettings.findUnique({where:{id:'global'}}).catch(()=>null);
  return NextResponse.json({settings:settings||defaults, availability:availability()});
}
export async function POST(request:Request){
  if(!hasValidAdminSession(request)) return NextResponse.json({error:'Unauthorized'},{status:401});
  const body=await request.json();
  if(body.action==='sync'){
    const key=process.env.OPENROUTER_API_KEY;
    if(!key) return NextResponse.json({error:'OPENROUTER_API_KEY is not configured on the server.'},{status:400});
    const response=await fetch('https://openrouter.ai/api/v1/models',{headers:{Authorization:`Bearer ${key}`},cache:'no-store'});
    if(!response.ok) return NextResponse.json({error:'OpenRouter model sync failed.'},{status:502});
    const json=await response.json();
    const models=(json.data||[]).map((m:any)=>({id:m.id,name:m.name||m.id,context:m.context_length||0})).sort((a:any,b:any)=>a.name.localeCompare(b.name));
    await prisma.aiSettings.upsert({where:{id:'global'},create:{...defaults,openrouterModels:models},update:{openrouterModels:models}});
    return NextResponse.json({models});
  }
  if(!providers.includes(body.primaryProvider)||!providers.includes(body.fallbackProvider)) return NextResponse.json({error:'Unsupported provider.'},{status:400});
  const data={enabled:Boolean(body.enabled),primaryProvider:body.primaryProvider,primaryModel:String(body.primaryModel||'').slice(0,160),fallbackProvider:body.fallbackProvider,fallbackModel:String(body.fallbackModel||'').slice(0,160),autoFallback:Boolean(body.autoFallback)};
  const settings=await prisma.aiSettings.upsert({where:{id:'global'},create:{id:'global',...data},update:data});
  return NextResponse.json({settings,availability:availability()});
}