import { NextResponse } from 'next/server';
import { getActionForFeeling } from '@/lib/moodData';
import { prisma } from '@/lib/prisma';
export const dynamic='force-dynamic';

type Provider='openrouter'|'openai'|'anthropic'|'gemini';
const prompt=(p:string,s:string,f:string)=>`Return ONLY JSON: {"targetMood":"1-3 positive words","actionText":"one safe, practical 60-second sensory, breathing, or movement action"}. This is a self-reflection utility, not therapy. Mood family: ${p}. Category: ${s}. Feeling: ${f}.`;
const parse=(text:string)=>{const clean=text.replace(/```json|```/gi,'').trim(); const match=clean.match(/\{[\s\S]*\}/); const value=JSON.parse(match?.[0]||clean); if(!value.targetMood||!value.actionText) throw new Error('Invalid AI response'); return {targetMood:String(value.targetMood).slice(0,80),actionText:String(value.actionText).slice(0,500),isAiGenerated:true};};
async function call(provider:Provider,model:string,text:string){
  if(provider==='gemini'){
    const key=process.env.GEMINI_API_KEY;if(!key) throw new Error('Gemini unavailable');
    const r=await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${key}`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({contents:[{parts:[{text}]}],generationConfig:{temperature:.8,responseMimeType:'application/json'}})});
    if(!r.ok) throw new Error(`Gemini ${r.status}`); const j=await r.json(); return parse(j.candidates?.[0]?.content?.parts?.[0]?.text||'');
  }
  if(provider==='anthropic'){
    const key=process.env.ANTHROPIC_API_KEY;if(!key) throw new Error('Anthropic unavailable');
    const r=await fetch('https://api.anthropic.com/v1/messages',{method:'POST',headers:{'Content-Type':'application/json','x-api-key':key,'anthropic-version':'2023-06-01'},body:JSON.stringify({model,max_tokens:240,messages:[{role:'user',content:text}]})});
    if(!r.ok) throw new Error(`Anthropic ${r.status}`); const j=await r.json(); return parse(j.content?.[0]?.text||'');
  }
  const key=provider==='openrouter'?process.env.OPENROUTER_API_KEY:process.env.OPENAI_API_KEY;if(!key) throw new Error(`${provider} unavailable`);
  const url=provider==='openrouter'?'https://openrouter.ai/api/v1/chat/completions':'https://api.openai.com/v1/chat/completions';
  const r=await fetch(url,{method:'POST',headers:{'Content-Type':'application/json',Authorization:`Bearer ${key}`,...(provider==='openrouter'?{'HTTP-Referer':'https://moodflip.coach','X-Title':'MoodFlip'}:{})},body:JSON.stringify({model,temperature:.8,messages:[{role:'user',content:text}],response_format:{type:'json_object'}})});
  if(!r.ok) throw new Error(`${provider} ${r.status}`); const j=await r.json(); return parse(j.choices?.[0]?.message?.content||'');
}
export async function POST(request:Request){
  const body=await request.json().catch(()=>({})); const primaryMood=String(body.primaryMood||'Sad'); const subFeeling=String(body.subFeeling||'Lonely'); const specificFeeling=String(body.specificFeeling||'Lonely');
  const local=getActionForFeeling(specificFeeling,Number(body.visitCount)||Math.floor(Math.random()*10));
  const db=await prisma.actionPrompt.findFirst({where:{specificFeeling:{equals:specificFeeling,mode:'insensitive'}},orderBy:{createdAt:'desc'}}).catch(()=>null);
  const fallback=db?{targetMood:db.targetMood,actionText:db.actionText,isAiGenerated:false,source:'database'}:{...local,isAiGenerated:false,source:'library'};
  const settings=await prisma.aiSettings.findUnique({where:{id:'global'}}).catch(()=>null);
  if(settings?.enabled===false) return NextResponse.json(fallback);
  const primary={provider:(settings?.primaryProvider||'openrouter') as Provider,model:settings?.primaryModel||'openai/gpt-4o-mini'};
  const secondary={provider:(settings?.fallbackProvider||'gemini') as Provider,model:settings?.fallbackModel||'gemini-2.0-flash'};
  const text=prompt(primaryMood,subFeeling,specificFeeling);
  try{return NextResponse.json({...await call(primary.provider,primary.model,text),provider:primary.provider,model:primary.model});}catch(error){console.warn('Primary AI failed',error);}
  if(settings?.autoFallback!==false){try{return NextResponse.json({...await call(secondary.provider,secondary.model,text),provider:secondary.provider,model:secondary.model,fallbackUsed:true});}catch(error){console.warn('Fallback AI failed',error);}}
  return NextResponse.json(fallback);
}