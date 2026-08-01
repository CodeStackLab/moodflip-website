'use client';

import React, { useState, useEffect } from 'react';
import { MOOD_DATA, getActionForFeeling } from '@/lib/moodData';
import { getAccessToken } from '@/lib/supabaseBrowser';
import { trackEvent } from '@/lib/analytics';
import AuthModal from '@/components/AuthModal';
import PaidPlansSection from '@/components/PaidPlansSection';
import {
  LonelyIcon, RejectedIcon, HurtIcon, AshamedIcon,
  GuiltyIcon, EmptyIcon, OverwhelmedIcon, AbandonedIcon,
  MeditateIcon, BotanicalSprig
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

/* ── Custom Toast Component ── */
function Toast({ msg, onClose }: { msg: string, onClose: () => void }) {
  if (!msg) return null;
  return (
    <div style={{
      position: 'fixed', bottom: '2rem', left: '50%', transform: 'translateX(-50%)',
      background: '#fff', border: '1px solid #e0d7f0', borderRadius: '16px',
      padding: '1.2rem', boxShadow: '0 10px 30px rgba(120,89,194,0.15)', zIndex: 9999,
      maxWidth: '400px', width: '90%', fontFamily: "'Outfit','Inter',sans-serif",
      textAlign: 'center', animation: 'moodIn 0.3s ease-out'
    }}>
      <p style={{ margin: '0 0 0.8rem', fontSize: '0.9rem', color: '#362854', fontWeight: 600, lineHeight: 1.4 }}>
        {msg.split('\n').map((line, i) => <React.Fragment key={i}>{line}<br/></React.Fragment>)}
      </p>
      <button onClick={onClose} style={{
        background: 'linear-gradient(135deg, #7c54d1, #ec4899)', color: '#fff', border: 'none',
        borderRadius: '8px', padding: '0.5rem 1rem', fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer'
      }}>
        Got it
      </button>
    </div>
  );
}

/* ══════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════ */
export default function MoodTool() {
  const [familyId, setFamilyId] = useState('sad');
  const [subCategoryId, setSubCategoryId] = useState('lonely');
  const [feelingId, setFeelingId] = useState('lonely');
  const [flip, setFlip] = useState({ targetMood:'Peaceful', actionText:'Breathe in for 4, breathe out for 6. Repeat 6 times while relaxing your jaw and shoulders.', isAi:false });
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [show2nd, setShow2nd] = useState(false);
  const [show7th, setShow7th] = useState(false);
  const [profile, setProfile] = useState<any>(null);
  const [toastMsg, setToastMsg] = useState<string>('');

  const family = MOOD_DATA.find(f=>f.id===familyId)||MOOD_DATA[0];
  const subCategory = family.subCategories.find(item => item.id === subCategoryId) || family.subCategories[0];
  const feelings = subCategory.feelings.slice(0, 8);
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
    const nextFamily = MOOD_DATA.find((item) => item.id === id) || MOOD_DATA[0];
    const firstCategory = nextFamily.subCategories[0];
    setSubCategoryId(firstCategory.id);
    const firstFeeling = firstCategory?.feelings[0];
    if(firstFeeling) setFeelingId(firstFeeling.id);
  };

  const pickSubCategory = (id: string) => {
    setSubCategoryId(id);
    const nextCategory = family.subCategories.find(item => item.id === id) || family.subCategories[0];
    const firstFeeling = nextCategory.feelings[0];
    if (firstFeeling) setFeelingId(firstFeeling.id);
  };

  const doFlip = async () => {
    setLoading(true);
    const n = count + 1; 
    setCount(n);
    if(typeof window !== 'undefined') localStorage.setItem('moodflip_checkin_count', String(n));
    const actionKey = `moodflip_action_index_${feelingId}`;
    const feelingVisitCount = typeof window === 'undefined'
      ? n
      : Number(localStorage.getItem(actionKey) || '0');
    const nf = getActionForFeeling(feelingId, feelingVisitCount);
    const isAi = false;
    if (typeof window !== 'undefined') {
      localStorage.setItem(actionKey, String(feelingVisitCount + 1));
      trackEvent('mood_tool_use', { mood_family: familyId, feeling: feelingId });
    }
    
    const ff = {...nf, isAi};
    setTimeout(() => {
      setFlip({targetMood:ff.targetMood, actionText:ff.actionText, isAi:ff.isAi});
      setLoading(false);
    }, 350);

    if (typeof window !== 'undefined') {
      const todayDate = new Date().toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'});
      const h = JSON.parse(localStorage.getItem('moodflip_checkins') || '[]');
      
      const todayCount = h.filter((c:any) => c.date === todayDate).length;
      
      if (profile?.email && todayCount >= 3) {
        setToastMsg("You've saved your 3 MoodFlip check-ins for today.\nYou can still use the free tool, and you can save more check-ins tomorrow.");
        // We still show them the action, but don't save to DB or history
        return;
      }

      const newHistory = [{
        primaryMood: family.name, subFeeling: subCategory.name, specificFeeling: feelingId,
        targetMood: nf.targetMood, actionShown: nf.actionText, date: todayDate, isAiGenerated: isAi
      }, ...h];
      
      localStorage.setItem('moodflip_checkins', JSON.stringify(newHistory));

      if (profile?.email) {
        // The API is the source of truth for calendar-day progress and the daily limit.
        let savedProgress: { checkinCount: number; todayCount: number; calendarDays: number } | null = null;
        try {
          const token = await getAccessToken();
          if (!token) throw new Error('Please sign in again to save check-ins.');
          const response = await fetch('/api/checkins', {
            method:'POST',
            headers:{
              'Content-Type':'application/json',
              Authorization: `Bearer ${token}`,
            },
            body:JSON.stringify({primaryMood:family.name, subFeeling:subCategory.name, specificFeeling:feelingId, targetMood:nf.targetMood, actionShown:nf.actionText})
          });
          const saved = await response.json();
          if (!response.ok) {
            if (response.status === 409) setToastMsg(saved.error);
            else setToastMsg('Your action is ready, but the check-in could not be saved. Please sign in again and retry.');
            return;
          }
          savedProgress = saved;
        } catch(_) {
          setToastMsg('Your action is ready, but the check-in could not be saved. Please sign in again and retry.');
          return;
        }

        const savedCount = savedProgress?.checkinCount || 1;
        const savedToday = savedProgress?.todayCount || 1;
        const savedDays = savedProgress?.calendarDays || 1;

        if (savedCount === 1) {
          setToastMsg("Your first MoodFlip check-in is saved.\nYou can save up to 3 check-ins per day. After 7 days, you'll be able to download your personalised 7-Day MoodFlip Report.");
        } else if (savedDays >= 7) {
          setToastMsg("Your 7-Day MoodFlip Report is ready.\nDownload your personalised report with your saved moods, positive moods, 60-second actions, and mood pattern summary.\n\nDownload for US$7");
          if (!localStorage.getItem('moodflip_7th_offer_shown')) {
            setShow7th(true);
            localStorage.setItem('moodflip_7th_offer_shown','true');
          }
        } else {
          // Progress message
          if (savedDays >= 2 && savedToday === 1) {
            setToastMsg(`You're building your 7-Day MoodFlip Report.\nSave up to 3 check-ins per day. Your personalised report will be available after 7 days for US$7.`);
          } else {
            setToastMsg(`Saved.\nToday's check-ins: [${savedToday}/3]\n7-Day Report progress: Day ${savedDays} of 7`);
          }
        }
      } else {
         // Anonymous visitors may use the free tool without sales gating.
      }
    }
  };

  const Tile=({f}:{f:{id:string;name:string}})=>{
    const sel=f.id===feelingId;
    const Ic=ICON_MAP[f.id]||LonelyIcon;
    const fontSize = f.name.length > 10 ? '0.72rem' : '0.8rem';
    return (
      <button
        onClick={()=>setFeelingId(f.id)}
        className="feeling-card-item"
        aria-pressed={sel}
        aria-label={`I feel ${f.name}`}
        style={{
        background: sel ? 'var(--tile-selected-bg, #f0e9f8)' : 'var(--tile-bg, #ffffff)',
        border: sel ? '2px solid var(--tile-selected-border, #7859c2)' : '1px solid var(--card-border, #e4dcee)',
        borderRadius:'12px', padding:'0.75rem 0.3rem',
        display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
        gap:'0.4rem', cursor:'pointer',
        boxShadow: sel ? '0 6px 16px rgba(120,89,194,0.15)' : '0 2px 6px rgba(0,0,0,0.02)',
        transform: sel ? 'scale(1.03)' : 'scale(1)',
        transition:'all 0.18s ease', flex:1, minWidth:0, height:'90px',
        overflow:'hidden'
      }}>
        <Ic size={30} color={sel ? '#a855f7' : '#a093b5'} />
        <span style={{ fontSize: fontSize, fontWeight: sel ? 700:500, color: 'var(--text-main, #362854)',
          textTransform:'capitalize', lineHeight:1.1, textAlign:'center',
          whiteSpace:'nowrap', textOverflow:'ellipsis', maxWidth:'100%', padding:'0 2px' }}>
          {f.name}
        </span>
        {sel && <span className="feeling-selected-check" aria-hidden="true">✓</span>}
      </button>
    );
  };

  return (
    <>
      <style>{`
        /* ── HERO BADGE ── */
        .mt-hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.44rem;
          background: var(--banner-bg, #ede5fa);
          border: 1px solid var(--card-border, #d6c8f5);
          padding: 0.3rem 0.95rem;
          border-radius: 9999px;
          font-size: 0.72rem;
          font-weight: 700;
          color: var(--text-main, #7c54d1);
          margin-bottom: 0.55rem;
          box-shadow: 0 4px 14px rgba(124,84,209,0.08);
        }
        /* ── HERO WRAPPER ── */
        .mt-wrapper { max-width: 1280px; margin: 0 auto; padding: 0.25rem 0.75rem 0; font-family: 'Outfit','Inter',sans-serif; }
        .mt-hero { text-align: center; margin-bottom: 1.25rem; margin-top: 0.2rem; }
        .mt-hero h1 {
          font-family: 'Fraunces','Playfair Display',Georgia,serif;
          font-size: clamp(1.65rem,4.2vw,2.9rem);
          font-weight: 700; margin: 0 auto 0.4rem;
          letter-spacing: -0.02em; line-height: 1.1; max-width: 700px;
        }
        .mt-hero p {
          font-size: clamp(0.78rem, 1.8vw, 0.88rem);
          color: var(--text-subtle, #665c7d);
          max-width: 560px; margin: 0 auto 0.75rem;
          line-height: 1.55; font-weight: 400;
        }
        .mt-hero-pills { display: flex; justify-content: center; align-items: center; gap: 0.5rem; flex-wrap: wrap; font-size: 0.74rem; color: var(--text-main, #362854); font-weight: 600; }
        .mt-hero-pill { display: inline-flex; align-items: center; gap: 0.28rem; background: var(--tile-bg, #fff); padding: 0.28rem 0.7rem; border-radius: 9999px; border: 1px solid var(--card-border, #efe6dc); box-shadow: 0 2px 8px rgba(0,0,0,0.02); white-space: nowrap; }
        .mt-card { background: var(--card-bg, #f8f4fe); border-radius: 28px; border: 1.5px solid var(--card-border, #e2d9f3); box-shadow: 0 18px 58px rgba(76,60,110,0.1); overflow: visible; position: relative; color: var(--text-main, #362854); }
        .mt-split { display: flex; gap: 1.5rem; padding: 1.5rem; min-height: 610px; overflow: visible; position: relative; }
        .mt-left {
          flex: 0 0 calc(50% - 0.75rem); padding: 1.4rem 1.65rem 1.85rem 1.65rem;
          display: flex; flex-direction: column; gap: 1.4rem;
          border: 1px solid rgba(255,255,255,.12); border-radius: 24px;
          box-shadow: 0 18px 42px rgba(38,22,62,.22);
          background:
            radial-gradient(circle at 12% 0%, rgba(151,112,225,.28), transparent 34%),
            radial-gradient(ellipse at 98% 100%, rgba(232,138,84,.13), transparent 38%),
            linear-gradient(155deg, #2c203c 0%, #20172f 58%, #181222 100%);
          color: #f9f5fc; position: relative; overflow: visible;
        }
        .mt-right {
          flex: 0 0 calc(50% - 0.75rem);
          border: 1.5px solid var(--card-border, #e2d9f3); border-radius: 24px;
          box-shadow: 0 12px 35px rgba(124,84,209,0.06);
          background: var(--right-bg, linear-gradient(155deg,#fffcf8 0%,#fff8e6 30%,#faf2f8 100%));
          color: var(--text-main, #362854); padding: 2.1rem 1.85rem 2.1rem 2.5rem;
          display: flex; flex-direction: column; justify-content: center;
          position: relative; overflow: hidden;
        }
        .mt-flipcell {
          display: flex; align-items: center;
          position: absolute; left: 50%; top: 75%; transform: translate(-50%, -50%);
          z-index: 40; overflow: visible;
        }
        .mt-row-a { display: flex; align-items: center; gap: 0.55rem; }
        .mt-row-b { display: flex; align-items: flex-start; gap: 0.55rem; overflow: visible; }
        .mt-subcategory-row { display: flex; align-items: center; gap: .55rem; }
        .mt-subcategory-list { display: flex; gap: .4rem; overflow-x: auto; padding: .1rem .1rem .25rem; }
        .mt-subcategory-pill { min-height: 38px; padding: .45rem .75rem; border: 1px solid rgba(255,255,255,.18); border-radius: 12px; color: #ded3ea; background: rgba(255,255,255,.07); font: 700 .74rem inherit; cursor: pointer; white-space: nowrap; transition: .2s ease; }
        .mt-subcategory-pill:hover { background: rgba(255,255,255,.12); }
        .mt-subcategory-pill[aria-pressed="true"] { color: #2d2140; background: #f5edfb; border-color: #d6c4e8; box-shadow: 0 6px 16px rgba(0,0,0,.16); }
        .mt-row2  { display: flex; gap: 0.6rem; align-items: stretch; overflow: visible; }
        .mt-target-title {
          font-family: 'Fraunces','Playfair Display',Georgia,serif;
          font-weight: 700; color: var(--text-main, #5a7a4a);
          margin: 0.18rem 0 1.4rem; line-height: 1.05;
        }
        .mt-bottom-banner {
          background: var(--banner-bg, rgba(234,226,252,0.42));
          border-top: 1px solid var(--card-border, #e0d7f0);
          padding: 0.9rem 2rem;
          display: flex; justify-content: space-between;
          align-items: center; flex-wrap: wrap; gap: 0.8rem;
          font-size: 0.83rem; color: var(--text-main, #362854);
          border-radius: 0 0 28px 28px;
        }

        /* ── TABLET: 641–850px ── */
        @media (max-width: 850px) {
          .mt-split { flex-direction: column !important; gap: 1rem !important; padding: 1rem 1rem 5.5rem 1rem !important; min-height: unset !important; }
          .mt-left  { flex: none !important; width: 100% !important; padding: 1.2rem 1.2rem 1.4rem !important; }
          .mt-right { flex: none !important; width: 100% !important; padding: 1.6rem 1.2rem !important; }
          .mt-flipcell { position: relative !important; left: auto !important; top: auto !important; transform: none !important; justify-content: center !important; margin: 0 0 0.75rem 0 !important; width: 100% !important; }
          .mt-target-title { font-size: clamp(2rem, 8vw, 3.2rem) !important; white-space: normal !important; word-break: break-word !important; }
          .mt-row-a { flex-wrap: wrap !important; }
          .mt-row-b { flex-direction: column !important; align-items: stretch !important; }
          .mt-subcategory-row { align-items: flex-start; }
          .mt-bottom-banner { padding: 0.8rem 1.1rem !important; }
        }

        /* ── MOBILE: up to 640px ── */
        @media (max-width: 640px) {
          .mt-wrapper { padding: 0.1rem 0.5rem 0 !important; }
          .mt-split { padding: 0.65rem 0.65rem 5rem 0.65rem !important; gap: 0.75rem !important; }
          .mt-left, .mt-right { padding: 1rem 0.85rem !important; border-radius: 18px !important; }
          .mt-card { border-radius: 22px !important; }
          .mt-hero h1 { font-size: clamp(1.4rem, 7vw, 1.9rem) !important; }
          .mt-hero-pills { gap: 0.35rem !important; }
          .mt-hero-pill { font-size: 0.68rem !important; padding: 0.22rem 0.55rem !important; }
          .mt-hero-badge { font-size: 0.67rem !important; }
          .mt-row2 { flex-wrap: wrap !important; }
          .mt-row2 > button { flex: 0 0 calc(50% - 0.3rem) !important; height: 80px !important; }
          .mt-row-a > div { overflow-x: auto !important; }
          .hide-scrollbar::-webkit-scrollbar { display: none !important; }
          .hide-scrollbar { -ms-overflow-style: none !important; scrollbar-width: none !important; }
          .mt-bottom-banner { flex-direction: column !important; align-items: flex-start !important; gap: 0.6rem !important; padding: 0.75rem 1rem !important; font-size: 0.78rem !important; }
        }

        /* ── HERO ANIMATIONS ── */
        @keyframes heroFadeUp   { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
        @keyframes heroFadeDown { from{opacity:0;transform:translateY(-12px)} to{opacity:1;transform:translateY(0)} }
        @keyframes heroScale    { from{opacity:0;transform:scale(0.88)} to{opacity:1;transform:scale(1)} }
        @keyframes heroPulseGlow { 0%,100%{opacity:0.7;transform:scale(1)} 50%{opacity:1;transform:scale(1.03)} }
        @keyframes wordSlide {
          from{opacity:0;transform:translateY(22px) rotateX(-25deg);filter:blur(4px)}
          to  {opacity:1;transform:translateY(0) rotateX(0deg);filter:blur(0)}
        }
        @keyframes shimmerSlide {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .hero-badge-anim  { animation: heroScale    0.55s cubic-bezier(0.22,1,0.36,1) 0.08s both; }
        .hero-word1-anim  { display:inline-block; animation: wordSlide 0.6s cubic-bezier(0.22,1,0.36,1) 0.2s both; }
        .hero-word2-anim  { display:inline-block; animation: wordSlide 0.6s cubic-bezier(0.22,1,0.36,1) 0.38s both; }
        .hero-sub-anim    { animation: heroFadeUp  0.65s cubic-bezier(0.22,1,0.36,1) 0.52s both; }
        .hero-pills-anim  { animation: heroFadeUp  0.65s cubic-bezier(0.22,1,0.36,1) 0.68s both; }
        .hero-card-anim   { animation: heroFadeUp  0.75s cubic-bezier(0.22,1,0.36,1) 0.4s both; }
        .hero-grad-text {
          background: linear-gradient(135deg, #7c54d1 0%, #a855f7 40%, #ec4899 70%, #f97316 100%);
          background-size: 200% auto;
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          animation: shimmerSlide 4s linear 1s infinite;
        }

        @keyframes moodIn { 0%{opacity:0;transform:scale(0.82) translateY(12px)} 65%{opacity:1;transform:scale(1.05) translateY(-2px)} 100%{opacity:1;transform:scale(1) translateY(0)} }
        @keyframes btnPulse { 0%,100%{filter:drop-shadow(0 7px 16px rgba(80,52,147,.34))} 50%{filter:drop-shadow(0 12px 24px rgba(112,80,188,.48));transform:scale(1.022)} }
        .mood-animate { animation: moodIn 0.52s cubic-bezier(0.16,1,0.3,1) both; }
        .flip-btn { animation: btnPulse 2.6s ease-in-out infinite; }
        .flip-btn:hover  { filter:drop-shadow(0 14px 26px rgba(80,52,147,.52)) !important; transform:translateX(4px) scale(1.04) !important; }
        .flip-btn:active { transform:scale(0.97) !important; }
        .feeling-card-item:hover  { transform:scale(1.06) !important; box-shadow:0 8px 24px rgba(124,84,209,0.22) !important; }
        .feeling-card-item:active { transform:scale(0.97) !important; }
        .feeling-card-item { position: relative; }
        .feeling-selected-check {
          position: absolute; top: 0.34rem; right: 0.38rem;
          display: grid; place-items: center; width: 18px; height: 18px;
          border-radius: 50%; background: #8b5fd1; color: #fff;
          font-size: 0.62rem; font-weight: 900;
          box-shadow: 0 3px 8px rgba(80,52,147,.25);
        }
      `}</style>

      {/* ─── HERO SECTION — compact + animated ─── */}
      <div className="mt-wrapper">
        <div className="mt-hero">

          {/* Badge — scales in */}
          <div className="mt-hero-badge hero-badge-anim">
            <span>✨ 100% Free</span>
            <span style={{opacity:0.35}}>•</span><span>Tap-Only</span>
            <span style={{opacity:0.35}}>•</span><span>No Sign-Up</span>
          </div>

          {/* Headline — word-by-word slide-up */}
          <h1 style={{ perspective: '600px' }}>
            <span className="hero-word1-anim" style={{color:'var(--text-main, #362854)'}}>
              Shift Your Mindset in&nbsp;
            </span>
            <span className="hero-word2-anim hero-grad-text">60 Seconds</span>
          </h1>

          {/* Subtitle — fades up after headline */}
          <p className="hero-sub-anim">
            Select your current negative mood, discover your positive counterpart, and get
            a <strong>practical 60-second action</strong> to regain emotional clarity.
          </p>

          {/* Pills — fade up last */}
          <div className="mt-hero-pills hero-pills-anim">
            <span className="mt-hero-pill">🔒 100% Private (90-Day Auto-Purge)</span>
            <a href="/pricing" className="mt-hero-pill"
              style={{ background:'var(--banner-bg, #ede5fa)',border:'1px solid var(--card-border, #d6c8f5)',color:'var(--text-main, #7c54d1)',fontWeight:700,textDecoration:'none' }}>
              📘 $7 Mindset Plan →
            </a>
          </div>
        </div>

        {/* MAIN CARD — animates in after hero */}
        <div className="mt-card hero-card-anim">

          {/* ── Split: Left | Right ── */}
          <div className="mt-split">

            {/* ━━━━━ LEFT CARD ━━━━━ */}
            <div className="mt-left">

              {/* Row A: choose mood banner + clouds */}
              <div className="mt-row-a" style={{ display:'flex',alignItems:'center',gap:'0.55rem' }}>
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

              {/* Layer 2: choose a Feelings Wheel category */}
              <div className="mt-subcategory-row">
                <Banner icon="2" text="Choose the closest category" />
                <div className="mt-subcategory-list hide-scrollbar" role="group" aria-label="Feeling category">
                  {family.subCategories.map(category => (
                    <button key={category.id} className="mt-subcategory-pill" aria-pressed={category.id === subCategoryId} onClick={() => pickSubCategory(category.id)}>
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Layer 3: choose the exact feeling */}
              <div className="mt-row-b" style={{ display:'flex',alignItems:'flex-start',gap:'0.55rem',overflow:'visible' }}>
                <Banner icon="3" text="Choose your exact feeling" />

                <div style={{ flex:1,display:'flex',flexDirection:'column',gap:'0.65rem',minWidth:0,overflow:'visible' }}>

                  {/* Grid row 1 */}
                  <div style={{ display:'flex',gap:'0.6rem' }}>
                    {row1.map(f=><Tile key={f.id} f={f}/>)}
                  </div>

                  {/* Grid row 2 */}
                  <div className="mt-row2" style={{ display:'flex',gap:'0.6rem',alignItems:'stretch',overflow:'visible' }}>
                    {row2.map(f=><Tile key={f.id} f={f}/>)}
                  </div>

                </div>
              </div>
            </div>{/* end left card */}

            {/* ━━━━━ RIGHT CARD ━━━━━ */}
            <div className="mt-right">
              <Landscape/>

              <div style={{ position:'relative',zIndex:2,textAlign:'center' }}>
                {/* heart */}
                <div style={{ fontSize:'1.25rem',color:'#c8828a',marginBottom:'0.28rem' }}>♡</div>
                <div style={{ fontSize:'0.96rem',color:'var(--text-subtle, #8a7aaa)',fontWeight:500 }}>
                  Your mood has changed to:
                </div>
                <h2 className="mood-animate mt-target-title" key={flip.targetMood} style={{
                  fontSize: flip.targetMood.length>11 ? '2.5rem' : '3.8rem',
                }}>
                  {flip.targetMood}
                </h2>

                {/* action card */}
                <div style={{
                  background: 'var(--action-card-bg, rgba(255,255,255,0.92))', border:'1.5px solid var(--card-border, #e8dff5)',
                  borderRadius:'22px', padding:'1.3rem 1.45rem',
                  boxShadow:'0 10px 35px rgba(76,60,110,0.09)',
                  display:'flex', alignItems:'flex-start', gap:'1rem', textAlign:'left'
                }}>
                  <div style={{ width:56,height:56,borderRadius:'50%',background:'var(--banner-bg, #f0e9f8)',
                    display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0 }}>
                    <MeditateIcon size={32} color="#7c54d1"/>
                  </div>
                  <div style={{ flex:1 }}>
                    <div style={{ display:'flex',alignItems:'flex-start',justifyContent:'space-between',gap:'0.4rem' }}>
                      <h3 style={{ fontSize:'1rem',fontWeight:700,color:'var(--text-main, #362854)',margin:0,
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
                    <div style={{ borderTop:'1px solid var(--card-border, #e8dff5)',margin:'0.52rem 0',position:'relative',textAlign:'center' }}>
                      <span style={{ position:'absolute',top:'-9px',left:'50%',transform:'translateX(-50%)',
                        background:'var(--action-card-bg, rgba(255,255,255,0.92))',padding:'0 0.32rem',fontSize:'0.66rem',color:'#c8828a' }}>♡</span>
                    </div>
                    <p style={{ fontSize:'0.9rem',color:'var(--text-subtle, #665c7d)',lineHeight:1.6,margin:0,fontWeight:400 }}>
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
            </div>{/* end right card */}

            {/* ── "Change My Mood" button ── */}
            <div className="mt-flipcell">
              <div style={{ filter: 'drop-shadow(0 12px 18px rgba(80, 52, 147, 0.32))' }}>
                <div style={{
                  background: '#d5caeb',
                  padding: '2px',
                  clipPath: 'polygon(0% 8%, 73% 8%, 78% 1%, 100% 50%, 78% 99%, 73% 92%, 0% 92%)',
                  display: 'inline-flex'
                }}>
                  <button id="flip-mood-btn" onClick={doFlip} disabled={loading}
                    className="flip-btn"
                    style={{
                      background: loading
                        ? 'linear-gradient(145deg, #8e75c3 0%, #62469e 100%)'
                        : 'linear-gradient(145deg, #9877dc 0%, #7656bd 52%, #503493 100%)',
                      color:'#ffffff', border:'none',
                      clipPath:'polygon(0% 8%, 72% 8%, 77% 1%, 100% 50%, 77% 99%, 72% 92%, 0% 92%)',
                      width:'178px', minHeight:'92px',
                      padding:'1rem 2.7rem 1rem 1.35rem',
                      fontWeight:700, fontSize:'1.22rem',
                      cursor: loading ? 'wait' : 'pointer',
                      display:'flex', alignItems:'center', gap:'0.45rem',
                      textAlign:'left', lineHeight:1.2,
                      fontFamily:"'Fraunces','Playfair Display',Georgia,serif",
                      position:'relative',
                      textShadow:'0 1px 1px rgba(42,25,78,.35)',
                      boxShadow:'inset 0 1px 0 rgba(255,255,255,.38)'
                    }}>
                    <span style={{ display:'flex',flexDirection:'column' }}>
                      <span>{loading ? 'Flipping...' : 'Flip'}</span>
                      {!loading && <span>My Mood</span>}
                    </span>
                    {!loading && <span style={{ position:'absolute',right:'1.15rem',top:'50%',transform:'translateY(-50%)',fontFamily:'Arial,sans-serif',fontSize:'1.7rem',fontWeight:300,lineHeight:1 }}>→</span>}
                  </button>
                </div>
              </div>
            </div>

          </div>{/* end split */}

          {/* ── bottom banner ── */}
          <div className="mt-bottom-banner">
            <div style={{ display:'flex',alignItems:'center',gap:'0.65rem' }}>
              <HeartIcon/>
              <div>
                <strong>Small shifts can change how you feel.</strong>
                <div style={{ fontSize:'0.75rem',color:'var(--text-subtle, #665c7d)' }}>You&apos;ve got this.</div>
              </div>
            </div>
            <div style={{ display:'flex',alignItems:'center',gap:'0.65rem' }}>
              <LeafIcon/>
              <div>
                <strong>Be kind to yourself.</strong>
                <div style={{ fontSize:'0.75rem',color:'var(--text-subtle, #665c7d)' }}>One choice at a time.</div>
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
              <h3 style={{ fontSize:'1.4rem',fontWeight:800,color:'#362854',marginTop:'0.5rem' }}>Save your MoodFlip check-ins?</h3>
              <p style={{ fontSize:'0.87rem',color:'#665c7d',marginTop:'0.35rem',lineHeight:1.5 }}>
                Create a free profile to save your moods, actions, and progress toward your 7-Day MoodFlip Report.
              </p>
            </div>
            <div style={{ background:'#ede5fa',border:'1px solid #d6c8f5',padding:'1rem',borderRadius:'16px',marginBottom:'1.25rem' }}>
              <p style={{ fontSize:'0.77rem',color:'#7c54d1',lineHeight:1.5,margin:0,fontWeight:600 }}>
                &ldquo;By creating a profile, you agree that MoodFlip may store your email address, selected moods and dates, actions shown, and purchase history so we can create and offer personalised downloads.&rdquo;
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

      {show7th && (
        <div className="modal-overlay">
          <div className="modal-card" style={{ maxWidth: '820px', width: '92%', background: '#ffffff', border: '1.5px solid #e2d9f3', borderRadius: '28px', padding: '2rem 1.8rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#059669', background: '#dcfce7', padding: '0.3rem 0.85rem', borderRadius: '9999px', letterSpacing: '0.02em' }}>
                🎉 Milestone Unlocked: 7 Calendar Days Complete!
              </span>
              <button onClick={() => setShow7th(false)} style={{ background: '#f1f5f9', border: 'none', width: '32px', height: '32px', borderRadius: '50%', fontSize: '1.1rem', cursor: 'pointer', color: '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                ✕
              </button>
            </div>
            <h3 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: '1.65rem', fontWeight: 800, color: '#1e1b4b', margin: '0.3rem 0 0.4rem 0' }}>
              Get Your Personalized 7-Day Mindset PDF Plan
            </h3>
            <p style={{ fontSize: '0.9rem', color: '#64748b', lineHeight: 1.5, marginBottom: '1rem' }}>
              You&apos;ve saved check-ins across 7 calendar days. Your personalised report can include up to 21 saved check-ins.
            </p>
            <PaidPlansSection hideHeader={true} />
          </div>
        </div>
      )}

      {toastMsg && <Toast msg={toastMsg} onClose={() => setToastMsg('')} />}

      <AuthModal isOpen={showAuth} onClose={() => setShowAuth(false)} />
    </>
  );
}
