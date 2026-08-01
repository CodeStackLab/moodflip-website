'use client';

import React, { useState, useEffect } from 'react';
import { MOOD_DATA, getActionForFeeling } from '@/lib/moodData';
import AuthModal from '@/components/AuthModal';
import PaidPlansSection from '@/components/PaidPlansSection';
import {
  LonelyIcon, RejectedIcon, HurtIcon, AshamedIcon,
  GuiltyIcon, EmptyIcon, OverwhelmedIcon, AbandonedIcon,
  TrashIcon, MeditateIcon, BotanicalSprig
} from '@/components/FeelingIcons';

/* ── icon map ── */
const ICON_MAP: Record<string, React.FC<{ size?: number; color?: string }>> = {
  lonely: LonelyIcon, isolated: LonelyIcon, abandoned: AbandonedIcon,
  rejected: RejectedIcon, hurt: HurtIcon, disappointed: HurtIcon,
  grief: HurtIcon, grieving: HurtIcon, ashamed: AshamedIcon, guilty: GuiltyIcon,
  empty: EmptyIcon, depressed: EmptyIcon, overwhelmed: OverwhelmedIcon,
  anxious: OverwhelmedIcon, terrified: AbandonedIcon, scared: AbandonedIcon,
  panicked: OverwhelmedIcon, insecure: AshamedIcon, nervous: OverwhelmedIcon,
  fearful: AbandonedIcon, worried: OverwhelmedIcon, helpless: AbandonedIcon,
  frozen: EmptyIcon, enraged: HurtIcon, annoyed: RejectedIcon,
  frustrated: OverwhelmedIcon, resentful: HurtIcon, irritated: RejectedIcon,
  betrayed: HurtIcon, furious: HurtIcon, hostile: HurtIcon, repulsed: EmptyIcon,
  revolted: EmptyIcon, repelled: EmptyIcon, disapproved: RejectedIcon,
  awful: AshamedIcon, detestable: AshamedIcon, hesitant: GuiltyIcon,
  embarrassed: AshamedIcon, avoidant: EmptyIcon, exhausted: EmptyIcon,
  'burned-out': EmptyIcon, burntout: EmptyIcon, frazzled: OverwhelmedIcon,
  swamped: OverwhelmedIcon, pressured: OverwhelmedIcon, rushed: OverwhelmedIcon,
  restless: OverwhelmedIcon, overburdened: OverwhelmedIcon
};

/* ── fixed 8 feelings per family in exact mockup order ── */
const FEELINGS: Record<string, { id: string; name: string }[]> = {
  sad:       [{ id:'lonely',name:'Lonely' },{ id:'rejected',name:'Rejected' },{ id:'hurt',name:'Hurt' },{ id:'ashamed',name:'Ashamed' },{ id:'guilty',name:'Guilty' },{ id:'empty',name:'Empty' },{ id:'overwhelmed',name:'Overwhelmed' },{ id:'abandoned',name:'Abandoned' }],
  fearful:   [{ id:'anxious',name:'Anxious' },{ id:'terrified',name:'Terrified' },{ id:'scared',name:'Scared' },{ id:'panicked',name:'Panicked' },{ id:'insecure',name:'Insecure' },{ id:'nervous',name:'Nervous' },{ id:'worried',name:'Worried' },{ id:'helpless',name:'Helpless' }],
  angry:     [{ id:'enraged',name:'Enraged' },{ id:'furious',name:'Furious' },{ id:'frustrated',name:'Frustrated' },{ id:'resentful',name:'Resentful' },{ id:'irritated',name:'Irritated' },{ id:'hostile',name:'Hostile' },{ id:'annoyed',name:'Annoyed' },{ id:'betrayed',name:'Betrayed' }],
  disgusted: [{ id:'repulsed',name:'Repulsed' },{ id:'revolted',name:'Revolted' },{ id:'repelled',name:'Repelled' },{ id:'detestable',name:'Detestable' },{ id:'awful',name:'Awful' },{ id:'embarrassed',name:'Embarrassed' },{ id:'hesitant',name:'Hesitant' },{ id:'avoidant',name:'Avoidant' }],
  stressed:  [{ id:'overwhelmed',name:'Overwhelmed' },{ id:'exhausted',name:'Exhausted' },{ id:'frazzled',name:'Frazzled' },{ id:'pressured',name:'Pressured' },{ id:'restless',name:'Restless' },{ id:'rushed',name:'Rushed' },{ id:'overburdened',name:'Overburdened' },{ id:'burntout',name:'Burnt-Out' }],
};

/* ── arrow tag banner ── */
function Banner({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div style={{ filter: 'drop-shadow(0 4px 8px rgba(130,100,190,0.12))' }}>
      <div style={{
        display:'inline-flex', alignItems:'center', gap:'0.42rem',
        background:'#f0ebf8',
        color:'#362854', padding:'0.5rem 1.35rem 0.5rem 0.58rem',
        clipPath:'polygon(0% 0%, 92% 0%, 100% 50%, 92% 100%, 0% 100%)',
        fontSize:'0.75rem', fontWeight:600, width:'152px', flexShrink:0,
        letterSpacing:'0.01em', lineHeight:1.2
      }}>
        <div style={{ width:24,height:24,borderRadius:'50%',background:'#fff',
          border:'1.5px solid #d5c8eb',display:'flex',alignItems:'center',
          justifyContent:'center',flexShrink:0,color:'#7859c2' }}>
          {icon}
        </div>
        <span style={{ paddingRight:'0.6rem' }}>{text}</span>
      </div>
    </div>
  );
}

/* ── cloud button — larger to match mockup ── */
function Cloud({ name, selected, onClick }: { name:string; selected:boolean; onClick:()=>void }) {
  return (
    <button onClick={onClick} style={{
      position:'relative', background:'transparent', border:'none',
      padding:'0', cursor:'pointer', display:'inline-flex',
      alignItems:'center', justifyContent:'center', minWidth:'82px', height:'52px',
      flexShrink:0, transition:'transform 0.2s cubic-bezier(0.16,1,0.3,1)',
      transform: selected ? 'scale(1.05)' : 'scale(1)',
      filter: selected ? 'drop-shadow(0 6px 12px rgba(120,89,194,0.25))' : 'drop-shadow(0 2px 6px rgba(0,0,0,0.04))'
    }}>
      <svg style={{ position:'absolute',top:0,left:0,width:'100%',height:'100%',zIndex:1 }} viewBox="0 0 120 54">
        <path d="M 24 48 C 12 48, 4 38, 10 26 C 4 15, 18 5, 36 11 C 46 2, 72 3, 82 13 C 96 8, 108 20, 104 33 C 114 40, 108 48, 94 48 Z"
          fill={selected ? '#e7dcf4' : '#ffffff'}
          stroke={selected ? '#8f73d3' : '#e0d8ef'} strokeWidth={selected ? '2.5' : '1.5'} />
      </svg>
      <span style={{ position:'relative',zIndex:2,fontFamily:"'Outfit','Inter',sans-serif",
        fontSize:'0.9rem', fontWeight: selected ? 700 : 500,
        color: selected ? '#362854' : '#6b5a8e' }}>
        {name}
      </span>
    </button>
  );
}

/* ── rich sunburst landscape for right panel ── */
function Landscape() {
  // rays only above horizon (upper half = -180 to 0 degrees offset)
  const rays = Array.from({length:20},(_,i)=> i * 9 - 90); // -90 to +90 in 9deg steps (upper semicircle)
  return (
    <svg style={{ position:'absolute',top:0,left:0,width:'100%',height:'100%',pointerEvents:'none' }}
      viewBox="0 0 640 560" preserveAspectRatio="xMidYMid slice">
      <defs>
        <radialGradient id="rg1" cx="50%" cy="75%" r="80%">
          <stop offset="0%"   stopColor="#fff4d0" stopOpacity="1"/>
          <stop offset="50%"  stopColor="#ffe9a0" stopOpacity="0.55"/>
          <stop offset="100%" stopColor="#fde8c8" stopOpacity="0"/>
        </radialGradient>
        <radialGradient id="sunRg" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#fff8d8" stopOpacity="1"/>
          <stop offset="65%"  stopColor="#fcd97a" stopOpacity="0.9"/>
          <stop offset="100%" stopColor="#f5c848" stopOpacity="0.5"/>
        </radialGradient>
        {/* clip so sun only shows above horizon */}
        <clipPath id="sunHalf">
          <rect x="0" y="0" width="640" height="390"/>
        </clipPath>
      </defs>

      {/* warm sky glow behind sun */}
      <ellipse cx="320" cy="390" rx="300" ry="260" fill="url(#rg1)"/>

      {/* sun rays — fan upward from horizon center */}
      {rays.map((deg,i)=>(
        <line key={i}
          x1="320" y1="390"
          x2={320 + 270 * Math.cos(deg * Math.PI / 180)}
          y2={390 + 270 * Math.sin(deg * Math.PI / 180)}
          stroke="#f5d060" strokeWidth="1.8" opacity="0.18"/>
      ))}

      {/* sun body — large circle clipped to show only upper half (semicircle rising from horizon) */}
      <circle cx="320" cy="390" r="140" fill="url(#sunRg)" opacity="0.92" clipPath="url(#sunHalf)"/>
      <circle cx="320" cy="390" r="100" fill="#fff9e0" opacity="0.72" clipPath="url(#sunHalf)"/>
      <circle cx="320" cy="390" r="66"  fill="#fffcf2" opacity="0.58" clipPath="url(#sunHalf)"/>

      {/* far hill — lavender */}
      <path d="M -30 430 Q 80 330 200 365 Q 310 395 420 325 Q 500 272 600 335 L 660 370 L 660 460 L -30 460 Z"
        fill="#ddd5ef" opacity="0.55"/>
      {/* mid hill — soft mauve/pink */}
      <path d="M -30 480 Q 100 390 215 418 Q 318 448 412 388 Q 492 340 590 405 L 660 440 L 660 560 L -30 560 Z"
        fill="#e2cce6" opacity="0.6"/>
      {/* near hill — warm blush */}
      <path d="M -30 530 Q 140 445 268 472 Q 370 495 475 448 Q 548 418 660 468 L 660 560 L -30 560 Z"
        fill="#efd8e8" opacity="0.65"/>
      {/* foreground — cream */}
      <path d="M -30 555 Q 210 528 390 542 Q 530 554 660 530 L 660 560 L -30 560 Z"
        fill="#f5ece5" opacity="0.72"/>

      {/* sparkle stars */}
      <text x="468" y="95"  fontSize="13" fill="#c8a0e0" opacity="0.58" textAnchor="middle">✦</text>
      <text x="525" y="140" fontSize="8"  fill="#e8c870" opacity="0.45" textAnchor="middle">✦</text>
      <text x="142" y="125" fontSize="9"  fill="#c8a0e0" opacity="0.42" textAnchor="middle">✦</text>
      <text x="552" y="76"  fontSize="7"  fill="#e8a8c0" opacity="0.36" textAnchor="middle">✦</text>
      <text x="172" y="82"  fontSize="7"  fill="#d4b8f0" opacity="0.33" textAnchor="middle">✦</text>

      {/* bird silhouette — upper right */}
      <path d="M 538 100 Q 549 89 560 100 Q 571 89 582 100"
        stroke="#b090d8" strokeWidth="1.6" fill="none" opacity="0.42"/>
    </svg>
  );
}

/* ── leaf SVG icon (matches mockup bottom bar) ── */
function LeafIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7c54d1" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/>
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
    </svg>
  );
}

/* ── heart SVG icon ── */
function HeartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7c54d1" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  );
}

/* ══════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════ */
export default function MoodTool() {
  const [familyId, setFamilyId] = useState('sad');
  const [feelingId, setFeelingId] = useState('lonely');
  const [flip, setFlip] = useState({ targetMood:'Peaceful', actionText:'Breathe in for 4, breathe out for 6. Repeat 6 times while relaxing your jaw and shoulders.', isAi:false });
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [show2nd, setShow2nd] = useState(false);
  const [show7th, setShow7th] = useState(false);
  const [profile, setProfile] = useState<any>(null);

  const family = MOOD_DATA.find(f=>f.id===familyId)||MOOD_DATA[0];
  const feelings = FEELINGS[familyId]||FEELINGS.sad;
  const row1 = feelings.slice(0,4);
  const row2 = feelings.slice(4,8);

  useEffect(()=>{
    if(typeof window==='undefined') return;
    const p=localStorage.getItem('moodflip_profile'); if(p) setProfile(JSON.parse(p));
    const v=parseInt(localStorage.getItem('moodflip_visit_count')||'0')+1;
    localStorage.setItem('moodflip_visit_count',String(v));
    if(v===2&&!p&&!localStorage.getItem('moodflip_2nd_visit_dismissed')) setShow2nd(true);
    setCount(parseInt(localStorage.getItem('moodflip_checkin_count')||'0'));
  },[]);

  const pickFamily=(id:string)=>{
    setFamilyId(id);
    const f=FEELINGS[id]||FEELINGS.sad;
    if(f[0]) setFeelingId(f[0].id);
  };

  const clear=()=>{
    setFamilyId('sad'); setFeelingId('lonely');
    setFlip({targetMood:'Peaceful',actionText:'Breathe in for 4, breathe out for 6. Repeat 6 times while relaxing your jaw and shoulders.',isAi:false});
  };

  const doFlip=async()=>{
    setLoading(true);
    const n=count+1; setCount(n);
    if(typeof window!=='undefined') localStorage.setItem('moodflip_checkin_count',String(n));
    let nf=getActionForFeeling(feelingId,n); let isAi=false;
    try {
      const r=await fetch('/api/ai/flip',{method:'POST',headers:{'Content-Type':'application/json'},
        body:JSON.stringify({primaryMood:family.name,subFeeling:feelingId,specificFeeling:feelingId,visitCount:n})});
      if(r.ok){const d=await r.json(); if(d.targetMood&&d.actionText){nf={targetMood:d.targetMood,actionText:d.actionText}; isAi=!!d.isAiGenerated;}}
    } catch(_){}
    const ff={...nf,isAi};
    setTimeout(()=>{
      setFlip({targetMood:ff.targetMood,actionText:ff.actionText,isAi:ff.isAi});
      setLoading(false);
      if(n>=7&&typeof window!=='undefined'&&!localStorage.getItem('moodflip_7th_offer_shown')){
        setShow7th(true); localStorage.setItem('moodflip_7th_offer_shown','true');
      }
    },350);
    if(typeof window!=='undefined'){
      const h=JSON.parse(localStorage.getItem('moodflip_checkins')||'[]');
      localStorage.setItem('moodflip_checkins',JSON.stringify([{primaryMood:family.name,subFeeling:feelingId,specificFeeling:feelingId,targetMood:nf.targetMood,actionShown:nf.actionText,date:new Date().toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'}),isAiGenerated:isAi},...h]));
    }
    if(profile?.email){try{await fetch('/api/checkins',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email:profile.email,primaryMood:family.name,subFeeling:feelingId,specificFeeling:feelingId,targetMood:nf.targetMood,actionShown:nf.actionText})});}catch(_){}}
  };

  const Tile=({f}:{f:{id:string;name:string}})=>{
    const sel=f.id===feelingId;
    const Ic=ICON_MAP[f.id]||LonelyIcon;
    return (
      <button onClick={()=>setFeelingId(f.id)} className="feeling-card-item" style={{
        background: sel ? '#f0e9f8' : '#ffffff',
        border: sel ? '2px solid #7859c2' : '1px solid #e4dcee',
        borderRadius:'12px', padding:'1rem 0.5rem',
        display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
        gap:'0.5rem', cursor:'pointer',
        boxShadow: sel ? '0 6px 16px rgba(120,89,194,0.15)' : '0 2px 6px rgba(0,0,0,0.02)',
        transform: sel ? 'scale(1.03)' : 'scale(1)',
        transition:'all 0.18s ease', flex:1, minWidth:0, height:'90px'
      }}>
        <Ic size={32} color={sel ? '#7859c2' : '#a093b5'} />
        <span style={{ fontSize:'0.82rem', fontWeight: sel ? 700:500, color: '#362854',
          textTransform:'capitalize', lineHeight:1.1, textAlign:'center' }}>
          {f.name}
        </span>
      </button>
    );
  };

  return (
    <>
      <style>{`
        @keyframes moodIn { 0%{opacity:0;transform:scale(0.82) translateY(12px)} 65%{opacity:1;transform:scale(1.05) translateY(-2px)} 100%{opacity:1;transform:scale(1) translateY(0)} }
        @keyframes btnPulse { 0%,100%{filter:drop-shadow(0 6px 22px rgba(82,55,147,0.5))} 50%{filter:drop-shadow(0 12px 30px rgba(82,55,147,0.72));transform:scale(1.028)} }
        .mood-animate { animation: moodIn 0.52s cubic-bezier(0.16,1,0.3,1) both; }
        .flip-btn { animation: btnPulse 2.6s ease-in-out infinite; }
        .flip-btn:hover  { filter:drop-shadow(0 14px 32px rgba(82,55,147,0.75)) !important; transform:scale(1.05) !important; }
        .flip-btn:active { transform:scale(0.97) !important; }
        .feeling-card-item:hover  { transform:scale(1.06) !important; box-shadow:0 8px 24px rgba(124,84,209,0.22) !important; }
        .feeling-card-item:active { transform:scale(0.97) !important; }
        .hide-scrollbar::-webkit-scrollbar{display:none;}
        .hide-scrollbar{-ms-overflow-style:none;scrollbar-width:none;}
        @media(max-width:800px){
          .mt-split{flex-direction:column !important;}
          .mt-left{border-right:none !important;border-bottom:1px solid #e0d7f0 !important;}
          .mt-row2{flex-wrap:wrap !important;}
          .mt-flipcell{margin-right:0 !important;width:100% !important;justify-content:center !important;margin-top:0.6rem !important;}
        }
      `}</style>

      {/* ─── HERO SECTION ─── */}
      <div style={{ maxWidth:'1280px',margin:'0 auto',padding:'0.5rem 0.75rem 0',fontFamily:"'Outfit','Inter',sans-serif" }}>
        <div style={{ textAlign:'center',marginBottom:'1.65rem',marginTop:'0.35rem' }}>
          <div style={{ display:'inline-flex',alignItems:'center',gap:'0.48rem',
            background:'#ede5fa',border:'1px solid #d6c8f5',padding:'0.38rem 1.1rem',
            borderRadius:'9999px',fontSize:'0.77rem',fontWeight:700,color:'#7c54d1',
            marginBottom:'0.7rem',boxShadow:'0 4px 14px rgba(124,84,209,0.1)' }}>
            <span>✨ 100% Free Self-Help Utility</span>
            <span style={{opacity:0.4}}>•</span><span>Tap-Only</span>
            <span style={{opacity:0.4}}>•</span><span>No Sign-Up Required</span>
          </div>
          <h1 style={{ fontFamily:"'Fraunces','Playfair Display',Georgia,serif",
            fontSize:'clamp(2rem,5vw,3.5rem)',fontWeight:700,margin:'0 auto 0.5rem',
            letterSpacing:'-0.02em',lineHeight:1.08,maxWidth:'800px' }}>
            <span style={{color:'#362854'}}>Shift Your Mindset in </span>
            <span style={{background:'linear-gradient(135deg,#7c54d1 0%,#ec4899 100%)',
              WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>60 Seconds</span>
          </h1>
          <p style={{ fontSize:'0.97rem',color:'#665c7d',maxWidth:'630px',margin:'0 auto 1rem',lineHeight:1.6,fontWeight:400 }}>
            Select your current negative mood, discover your positive counterpart, and get 1 practical 60-second action to regain emotional clarity.
          </p>
          <div style={{ display:'flex',justifyContent:'center',alignItems:'center',gap:'0.8rem',flexWrap:'wrap',fontSize:'0.8rem',color:'#362854',fontWeight:600 }}>
            <span style={{ display:'inline-flex',alignItems:'center',gap:'0.3rem',background:'#fff',padding:'0.33rem 0.8rem',borderRadius:'9999px',border:'1px solid #efe6dc',boxShadow:'0 2px 8px rgba(0,0,0,0.02)' }}>🤖 AI-Powered Fresh Actions</span>
            <span style={{ display:'inline-flex',alignItems:'center',gap:'0.3rem',background:'#fff',padding:'0.33rem 0.8rem',borderRadius:'9999px',border:'1px solid #efe6dc',boxShadow:'0 2px 8px rgba(0,0,0,0.02)' }}>🔒 100% Private (90-Day Auto-Purge)</span>
            <button onClick={()=>setShow7th(true)} style={{ background:'#ede5fa',border:'1px solid #d6c8f5',color:'#7c54d1',padding:'0.33rem 0.8rem',borderRadius:'9999px',fontWeight:700,fontSize:'0.8rem',cursor:'pointer',display:'inline-flex',alignItems:'center',gap:'0.3rem' }}>
              📘 Optional $7 Mindset Plan PDF →
            </button>
          </div>
        </div>

        {/* ═══════════════════════════════════════════
            MAIN CARD — matches mockup exactly
        ═══════════════════════════════════════════ */}
        <div style={{
          background:'#f8f4fe',
          borderRadius:'28px',
          border:'1.5px solid #e2d9f3',
          boxShadow:'0 18px 58px rgba(76,60,110,0.1)',
          overflow:'visible',
          position:'relative'
        }}>

          {/* ── MoodFlip title ── */}
          <div style={{ textAlign:'center',paddingTop:'1.6rem',paddingBottom:'0.55rem' }}>
            <h2 style={{ fontFamily:"'Fraunces','Playfair Display',Georgia,serif",
              fontSize:'clamp(2.5rem,4.5vw,3.5rem)',fontWeight:700,
              letterSpacing:'-0.02em',margin:0,lineHeight:1 }}>
              {/* "Mood" = multi-color purple→blue gradient like mockup */}
              <span style={{ background:'linear-gradient(110deg,#7958d8 0%,#9b70e0 40%,#5b8fd4 80%,#7c54d1 100%)',
                WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent' }}>Mood</span>
              {/* "Flip" = warm coral→peach like mockup */}
              <span style={{ background:'linear-gradient(135deg,#e8855a 0%,#dba048 100%)',
                WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent' }}>Flip</span>
            </h2>
          </div>

          {/* ── Split: left 50% | right 50% ── */}
          <div className="mt-split" style={{ display:'flex',minHeight:'510px',overflow:'visible' }}>

            {/* ━━━━━ LEFT PANEL ━━━━━ */}
            <div className="mt-left" style={{
              flex:'0 0 50%', padding:'1.4rem 1.65rem 1.85rem 1.65rem',
              display:'flex', flexDirection:'column', gap:'1.4rem',
              borderRight:'1px solid #e2d9f3',
              background:'linear-gradient(168deg,#fdfaff 0%,#f4effb 100%)',
              position:'relative', overflow:'visible'
            }}>

              {/* Row A: choose mood banner + clouds */}
              <div style={{ display:'flex',alignItems:'center',gap:'0.55rem' }}>
                <Banner icon="☁️" text="Choose your current mood" />
                <div className="hide-scrollbar" style={{ display:'flex',gap:'0.2rem',alignItems:'center',flexWrap:'nowrap',overflowX:'auto',flex:1 }}>
                  {MOOD_DATA.map(fam=>(
                    <Cloud key={fam.id}
                      name={fam.name.charAt(0)+fam.name.slice(1).toLowerCase()}
                      selected={fam.id===familyId}
                      onClick={()=>pickFamily(fam.id)}/>
                  ))}
                </div>
              </div>

              {/* Row B+C: pick feeling banner + grid */}
              <div style={{ display:'flex',alignItems:'flex-start',gap:'0.55rem',overflow:'visible' }}>
                <Banner icon="♡" text="Pick the feeling closest to how you feel" />

                <div style={{ flex:1,display:'flex',flexDirection:'column',gap:'0.65rem',minWidth:0,overflow:'visible' }}>

                  {/* Grid row 1 */}
                  <div style={{ display:'flex',gap:'0.6rem' }}>
                    {row1.map(f=><Tile key={f.id} f={f}/>)}
                  </div>

                  {/* Grid row 2 + Change My Mood button bleeding right */}
                  <div className="mt-row2" style={{ display:'flex',gap:'0.6rem',alignItems:'stretch',overflow:'visible' }}>
                    {row2.map(f=><Tile key={f.id} f={f}/>)}

                    {/* ── "Change My Mood →" button — overflows border ── */}
                    <div className="mt-flipcell" style={{
                      display:'flex', alignItems:'center',
                      marginRight:'-2.4rem',   /* bleeds past panel border */
                      marginLeft:'0.4rem',     /* gap from 'Abandoned' */
                      flexShrink:0, zIndex:20, overflow:'visible'
                    }}>
                      <div style={{ filter: 'drop-shadow(0 10px 20px rgba(90,60,160,0.35))' }}>
                        <div style={{
                          background: 'white',
                          padding: '3px',
                          clipPath: 'polygon(0% 0%, 85% 0%, 100% 50%, 85% 100%, 0% 100%)',
                          display: 'inline-flex'
                        }}>
                          <button id="flip-mood-btn" onClick={doFlip} disabled={loading}
                            className="flip-btn"
                            style={{
                              background: loading
                                ? 'linear-gradient(135deg,#9e82e0,#7059b0)'
                                : 'linear-gradient(135deg,#7859c2 0%,#5a40a0 100%)',
                              color:'#fff', border:'none',
                              clipPath:'polygon(0% 0%, 84% 0%, 100% 50%, 84% 100%, 0% 100%)',
                              padding:'1rem 2.2rem 1rem 1.6rem',
                              fontWeight:700, fontSize:'1.1rem',
                              cursor: loading ? 'wait' : 'pointer',
                              display:'flex', alignItems:'center', gap:'0.4rem',
                              textAlign:'left', lineHeight:1.2,
                              fontFamily:"'Outfit','Inter',sans-serif",
                              position:'relative'
                            }}>
                            <span style={{ display:'flex',flexDirection:'column' }}>
                              <span>{loading ? 'Flipping...' : 'Change'}</span>
                              {!loading && <span>My Mood</span>}
                            </span>
                            {!loading && <span style={{ fontSize:'1.4rem',fontWeight:400,lineHeight:1,marginTop:'0.8rem' }}>→</span>}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Grid row 3 (Clear selection) */}
                  <div style={{ display:'flex',gap:'0.6rem' }}>
                    <button onClick={clear} style={{
                      flex:'0 0 calc(25% - 0.45rem)', height:'85px',
                      background:'#f8f4fe', border:'1px solid #e4dcee',
                      borderRadius:'12px', padding:'0.8rem 0.4rem',
                      display:'flex', flexDirection:'column', alignItems:'center',
                      justifyContent:'center', gap:'0.3rem', cursor:'pointer'
                    }}>
                      <TrashIcon size={22} color="#7859c2"/>
                      <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'0' }}>
                        <span style={{ fontSize:'0.75rem',fontWeight:700,color:'#362854',lineHeight:1.1 }}>Clear selection</span>
                        <span style={{ fontSize:'0.65rem',color:'#7859c2' }}>Start over</span>
                      </div>
                    </button>
                  </div>

                </div>
              </div>
            </div>{/* end left */}

            {/* ━━━━━ RIGHT PANEL ━━━━━ */}
            <div style={{
              flex:1,
              background:'linear-gradient(155deg,#fffcf8 0%,#fff8e6 30%,#faf2f8 100%)',
              padding:'2.1rem 1.85rem 2.1rem 2.6rem',
              display:'flex', flexDirection:'column', justifyContent:'center',
              position:'relative', overflow:'hidden'
            }}>
              <Landscape/>

              <div style={{ position:'relative',zIndex:2,textAlign:'center' }}>
                {/* heart */}
                <div style={{ fontSize:'1.25rem',color:'#c8828a',marginBottom:'0.28rem' }}>♡</div>
                <div style={{ fontSize:'0.96rem',color:'#8a7aaa',fontWeight:500 }}>
                  Your mood has changed to:
                </div>
                <h2 className="mood-animate" key={flip.targetMood} style={{
                  fontFamily:"'Fraunces','Playfair Display',Georgia,serif",
                  fontSize: flip.targetMood.length>11 ? '2.5rem' : '3.8rem',
                  fontWeight:700, color:'#5a7a4a',
                  margin:'0.18rem 0 1.4rem', lineHeight:1.05, whiteSpace:'nowrap'
                }}>
                  {flip.targetMood}
                </h2>

                {/* action card */}
                <div style={{
                  background:'rgba(255,255,255,0.92)', border:'1.5px solid #e8dff5',
                  borderRadius:'22px', padding:'1.3rem 1.45rem',
                  boxShadow:'0 10px 35px rgba(76,60,110,0.09)',
                  display:'flex', alignItems:'flex-start', gap:'1rem', textAlign:'left'
                }}>
                  <div style={{ width:56,height:56,borderRadius:'50%',background:'#f0e9f8',
                    display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0 }}>
                    <MeditateIcon size={32} color="#7c54d1"/>
                  </div>
                  <div style={{ flex:1 }}>
                    <div style={{ display:'flex',alignItems:'flex-start',justifyContent:'space-between',gap:'0.4rem' }}>
                      <h3 style={{ fontSize:'1rem',fontWeight:700,color:'#362854',margin:0,
                        fontFamily:"'Fraunces',Georgia,serif",lineHeight:1.32 }}>
                        60-sec action to get to a {flip.targetMood.toLowerCase()} mood
                      </h3>
                      {flip.isAi&&(
                        <span style={{ fontSize:'0.64rem',fontWeight:800,color:'#7c54d1',
                          background:'linear-gradient(135deg,rgba(124,84,209,0.12),rgba(236,72,153,0.12))',
                          border:'1px solid rgba(124,84,209,0.28)',padding:'0.12rem 0.46rem',
                          borderRadius:'9999px',flexShrink:0 }}>✨ AI</span>
                      )}
                    </div>
                    <div style={{ borderTop:'1px solid #e8dff5',margin:'0.52rem 0',position:'relative',textAlign:'center' }}>
                      <span style={{ position:'absolute',top:'-9px',left:'50%',transform:'translateX(-50%)',
                        background:'rgba(255,255,255,0.92)',padding:'0 0.32rem',fontSize:'0.66rem',color:'#c8828a' }}>♡</span>
                    </div>
                    <p style={{ fontSize:'0.9rem',color:'#665c7d',lineHeight:1.6,margin:0,fontWeight:400 }}>
                      {flip.actionText}
                    </p>
                  </div>
                  <div style={{ flexShrink:0,opacity:0.8,alignSelf:'center' }}>
                    <BotanicalSprig size={36} color="#7c8a68"/>
                  </div>
                </div>

                {/* save profile */}
                <div style={{ textAlign:'center',marginTop:'1.1rem' }}>
                  <button onClick={()=>{ if(profile?.email){window.location.href='/profile';}else{setShowAuth(true);} }}
                    style={{ padding:'0.7rem 1.5rem',background:'linear-gradient(135deg,#7c54d1,#ec4899)',
                      color:'white',fontWeight:800,fontSize:'0.82rem',borderRadius:'9999px',
                      border:'none',cursor:'pointer',boxShadow:'0 6px 18px rgba(124,84,209,0.3)',
                      letterSpacing:'0.04em',textTransform:'uppercase' }}>
                    ✨ SAVE MY PROFILE
                  </button>
                </div>
              </div>
            </div>{/* end right */}

          </div>{/* end split */}

          {/* ── bottom banner ── */}
          <div style={{
            background:'rgba(234,226,252,0.42)', borderTop:'1px solid #e0d7f0',
            padding:'0.9rem 2rem', display:'flex', justifyContent:'space-between',
            alignItems:'center', flexWrap:'wrap', gap:'0.8rem',
            fontSize:'0.83rem', color:'#362854', borderRadius:'0 0 28px 28px'
          }}>
            <div style={{ display:'flex',alignItems:'center',gap:'0.65rem' }}>
              <HeartIcon/>
              <div>
                <strong>Small shifts can change how you feel.</strong>
                <div style={{ fontSize:'0.75rem',color:'#665c7d' }}>You&apos;ve got this.</div>
              </div>
            </div>
            <div style={{ display:'flex',alignItems:'center',gap:'0.65rem' }}>
              <LeafIcon/>
              <div>
                <strong>Be kind to yourself.</strong>
                <div style={{ fontSize:'0.75rem',color:'#665c7d' }}>One choice at a time.</div>
              </div>
            </div>
          </div>

        </div>{/* end card */}
      </div>

      {/* ── modals ── */}
      {show2nd&&(
        <div className="modal-overlay">
          <div className="modal-card" style={{ maxWidth:'480px',background:'#fff',border:'1px solid #e2d9f3' }}>
            <div style={{ textAlign:'center',marginBottom:'1rem' }}>
              <span style={{ fontSize:'2.4rem' }}>💫</span>
              <h3 style={{ fontSize:'1.4rem',fontWeight:800,color:'#362854',marginTop:'0.5rem' }}>Welcome Back to MoodFlip!</h3>
              <p style={{ fontSize:'0.87rem',color:'#665c7d',marginTop:'0.35rem',lineHeight:1.5 }}>
                You&apos;ve used MoodFlip multiple times! Create a free profile to save your check-ins and track your progress.
              </p>
            </div>
            <div style={{ background:'#ede5fa',border:'1px solid #d6c8f5',padding:'1rem',borderRadius:'16px',marginBottom:'1.25rem' }}>
              <p style={{ fontSize:'0.77rem',color:'#7c54d1',lineHeight:1.5,margin:0,fontWeight:600 }}>
                &ldquo;By creating a profile, you agree that MoodFlip may store your email address, selected moods and dates, actions shown, and purchase history.&rdquo;
              </p>
            </div>
            <p style={{ fontSize:'0.75rem',color:'#665c7d',textAlign:'center',marginBottom:'1.25rem' }}>
              * The free tool always works with <strong>no profile required</strong>.
            </p>
            <div style={{ display:'flex',gap:'0.75rem' }}>
              <button onClick={()=>{setShow2nd(false);localStorage.setItem('moodflip_2nd_visit_dismissed','true');}}
                style={{ flex:1,padding:'0.75rem',borderRadius:'12px',border:'none',background:'#f5f0fc',color:'#665c7d',fontWeight:700,fontSize:'0.85rem',cursor:'pointer' }}>
                Continue Free
              </button>
              <button onClick={()=>{setShow2nd(false);setShowAuth(true);}}
                style={{ flex:1.5,padding:'0.75rem',borderRadius:'12px',border:'none',background:'linear-gradient(135deg,#7c54d1,#ec4899)',color:'white',fontWeight:800,fontSize:'0.85rem',cursor:'pointer',boxShadow:'0 6px 18px rgba(124,84,209,0.3)' }}>
                Create Profile →
              </button>
            </div>
          </div>
        </div>
      )}

      {show7th&&(
        <div className="modal-overlay">
          <div className="modal-card" style={{ maxWidth:'540px',background:'#fff',border:'1px solid #e2d9f3' }}>
            <div style={{ display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'0.5rem' }}>
              <span style={{ fontSize:'0.75rem',fontWeight:800,color:'#059669',background:'#ecfdf5',padding:'0.2rem 0.65rem',borderRadius:'9999px' }}>🎉 Milestone Unlocked: 7 Check-Ins!</span>
              <button onClick={()=>setShow7th(false)} style={{ background:'transparent',border:'none',fontSize:'1.2rem',cursor:'pointer',color:'#665c7d' }}>✕</button>
            </div>
            <h3 style={{ fontSize:'1.5rem',fontWeight:800,color:'#362854',margin:'0.3rem 0' }}>Get Your Personal 7-Day Mindset Plan</h3>
            <p style={{ fontSize:'0.87rem',color:'#665c7d',lineHeight:1.55 }}>
              You&apos;ve completed 7 mood check-ins! Get your custom-generated 7-Day Mindset PDF report based on your exact check-in history.
            </p>
            <PaidPlansSection/>
          </div>
        </div>
      )}

      <AuthModal isOpen={showAuth} onClose={()=>setShowAuth(false)}/>
    </>
  );
}
