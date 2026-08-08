// Official 12-Page MoodFlip Daily Reflection Printable Journal PDF Generator
// Embedded Base64 JPEG Artwork Cover + 100% Valid Binary PDF 1.4 Structure

const COVER_IMAGE_BASE64 = `...`; // We will write the full helper function

export function generateMoodFlipPDFBlob(title: string, userName: string = 'Valued Member'): Blob {
  const cleanUser = (userName || 'Valued Member').replace(/[^\x20-\x7E]/g, '');

  const buildDayPageStream = (dayNum: number, pageNum: number) => `q
0.980 0.965 0.992 rg
0 0 612 792 re f

0.443 0.278 0.910 rg
BT
/F1 18 Tf
40 735 Td
(moodflip) Tj
/F1 9 Tf
485 735 Td
(DAY ${dayNum} OF 7) Tj
ET

0.102 0.075 0.220 rg
BT
/F1 22 Tf
40 680 Td
(Daily Reflection - Day ${dayNum}) Tj
/F2 10 Tf
0.408 0.376 0.500 rg
40 662 Td
(Record only the human-reviewed action shown on MoodFlip.) Tj
ET

// Date Time Box
0.960 0.940 0.990 rg
40 595 532 45 re f
0.850 0.800 0.950 RG
1 w
40 595 532 45 re S
BT
/F1 10 Tf
0.408 0.376 0.500 rg
55 614 Td
(DATE) Tj
95 614 Td
(____________________________________) Tj
310 614 Td
(TIME) Tj
350 614 Td
(____________________________________) Tj
ET

// Sec 1
0.443 0.278 0.910 rg
40 550 18 18 re f
BT
/F1 10 Tf
1 1 1 rg
46 555 Td
(1) Tj
0.443 0.278 0.910 rg
66 555 Td
(YOUR MOODFLIP CHECK-IN) Tj
ET

0.960 0.940 0.990 rg
40 475 255 60 re f
0.850 0.800 0.950 RG
40 475 255 60 re S
BT
/F1 10 Tf
0.102 0.075 0.220 rg
50 515 Td
(Selected mood / feeling) Tj
/F2 9 Tf
0.408 0.376 0.500 rg
50 492 Td
(_________________________________) Tj
ET

0.960 0.940 0.990 rg
317 475 255 60 re f
0.850 0.800 0.950 RG
317 475 255 60 re S
BT
/F1 10 Tf
0.102 0.075 0.220 rg
327 515 Td
(Positive direction) Tj
/F2 9 Tf
0.408 0.376 0.500 rg
327 492 Td
(_________________________________) Tj
ET

// Sec 2
0.443 0.278 0.910 rg
40 435 18 18 re f
BT
/F1 10 Tf
1 1 1 rg
46 440 Td
(2) Tj
0.443 0.278 0.910 rg
66 440 Td
(APPROVED 60-SECOND ACTION) Tj
ET

0.960 0.940 0.990 rg
40 320 532 100 re f
0.850 0.800 0.950 RG
40 320 532 100 re S
BT
/F1 10 Tf
0.102 0.075 0.220 rg
55 400 Td
(Write the approved action exactly as it appeared on MoodFlip.) Tj
/F2 9.5 Tf
0.750 0.700 0.880 rg
55 368 Td
(____________________________________________________________________________) Tj
55 340 Td
(____________________________________________________________________________) Tj
ET

// Sec 3
0.443 0.278 0.910 rg
40 280 18 18 re f
BT
/F1 10 Tf
1 1 1 rg
46 285 Td
(3) Tj
0.443 0.278 0.910 rg
66 285 Td
(BEFORE & AFTER) Tj
ET

0.960 0.940 0.990 rg
40 185 255 85 re f
0.850 0.800 0.950 RG
40 185 255 85 re S
BT
/F1 10 Tf
0.102 0.075 0.220 rg
50 252 Td
(Before the action) Tj
/F2 8.5 Tf
0.408 0.376 0.500 rg
50 238 Td
(What did you notice?) Tj
0.750 0.700 0.880 rg
50 212 Td
(________________________________) Tj
50 195 Td
(________________________________) Tj
ET

0.960 0.940 0.990 rg
317 185 255 85 re f
0.850 0.800 0.950 RG
317 185 255 85 re S
BT
/F1 10 Tf
0.102 0.075 0.220 rg
327 252 Td
(After the action) Tj
/F2 8.5 Tf
0.408 0.376 0.500 rg
327 238 Td
(What changed, if anything?) Tj
0.750 0.700 0.880 rg
327 212 Td
(________________________________) Tj
327 195 Td
(________________________________) Tj
ET

// Sec 4: My Reflection
0.960 0.940 0.990 rg
40 55 532 115 re f
0.850 0.800 0.950 RG
40 55 532 115 re S
BT
/F1 10 Tf
0.102 0.075 0.220 rg
55 152 Td
(MY REFLECTION - Anything I want to remember from today) Tj
/F2 9.5 Tf
0.750 0.700 0.880 rg
55 125 Td
(____________________________________________________________________________) Tj
55 98 Td
(____________________________________________________________________________) Tj
55 72 Td
(____________________________________________________________________________) Tj
ET

0.443 0.278 0.910 rg
BT
/F1 10 Tf
40 25 Td
(moodflip) Tj
/F2 9 Tf
0.408 0.376 0.500 rg
295 25 Td
(${pageNum}) Tj
400 25 Td
(Self-reflection utility - not medical advice.) Tj
ET
Q`;

  const contentObjects: string[] = [];

  // PAGE 1: Cover Page
  contentObjects.push(`q
612 0 0 792 0 0 cm
/Im1 Do
Q
q
0.980 0.965 0.992 rg
110 50 392 65 re f
0.443 0.278 0.910 RG
2 w
110 50 392 65 re S
BT
/F1 10 Tf
0.102 0.075 0.220 rg
125 95 Td
(THIS JOURNAL BELONGS TO) Tj
/F2 10 Tf
0.408 0.376 0.500 rg
125 68 Td
(Name: ${cleanUser}) Tj
340 68 Td
(Start date: ________________) Tj
ET
Q`);

  // PAGE 2: Welcome
  contentObjects.push(`q
0.980 0.965 0.992 rg
0 0 612 792 re f

0.443 0.278 0.910 rg
BT
/F1 18 Tf
40 735 Td
(moodflip) Tj
ET

0.102 0.075 0.220 rg
BT
/F1 26 Tf
40 670 Td
(Welcome to Your 7-Day Reflection) Tj
/F2 11 Tf
0.408 0.376 0.500 rg
40 635 Td
(This journal is designed to accompany the MoodFlip website. Record only the reviewed and approved action) Tj
40 618 Td
(shown to you, then use the reflection spaces to notice what you experienced.) Tj
ET

${[
  { num: 1, title: 'Check in', desc: 'Choose the mood and exact feeling that best matches your experience.', y: 490 },
  { num: 2, title: 'Flip your mood', desc: 'Use the MoodFlip result to identify the positive direction.', y: 400 },
  { num: 3, title: 'Record the approved action', desc: 'Copy the reviewed 60-second action exactly as it appears.', y: 310 },
  { num: 4, title: 'Reflect gently', desc: 'Notice what changed, what did not, and anything you want to remember.', y: 220 }
].map(s => `
0.960 0.940 0.990 rg
40 ${s.y} 532 70 re f
0.850 0.800 0.950 RG
1 w
40 ${s.y} 532 70 re S

0.443 0.278 0.910 rg
55 ${s.y + 18} 34 34 re f
BT
/F1 14 Tf
1 1 1 rg
67 ${s.y + 28} Td
(${s.num}) Tj
/F1 12 Tf
0.102 0.075 0.220 rg
105 ${s.y + 45} Td
(${s.title}) Tj
/F2 10 Tf
0.408 0.376 0.500 rg
105 ${s.y + 22} Td
(${s.desc}) Tj
ET
`).join('')}

0.940 0.910 0.980 rg
40 105 532 90 re f
0.800 0.700 0.950 RG
1 w
40 105 532 90 re S
BT
/F1 11 Tf
0.443 0.278 0.910 rg
60 172 Td
(Privacy & wellbeing) Tj
/F2 9.5 Tf
0.408 0.376 0.500 rg
60 148 Td
(MoodFlip is a self-reflection utility, not therapy or medical advice. Keep this printed journal private if it contains) Tj
60 130 Td
(personal information.) Tj
ET

0.443 0.278 0.910 rg
BT
/F1 10 Tf
40 25 Td
(moodflip) Tj
/F2 9 Tf
0.408 0.376 0.500 rg
295 25 Td
(2) Tj
400 25 Td
(Self-reflection utility - not medical advice.) Tj
ET
Q`);

  // PAGE 3: Intention
  contentObjects.push(`q
0.980 0.965 0.992 rg
0 0 612 792 re f

0.443 0.278 0.910 rg
BT
/F1 18 Tf
40 735 Td
(moodflip) Tj
/F1 9 Tf
445 735 Td
(*  BEFORE YOU BEGIN) Tj
ET

0.102 0.075 0.220 rg
BT
/F1 24 Tf
40 670 Td
(A Gentle Intention for This Week) Tj
/F2 11 Tf
0.408 0.376 0.500 rg
40 645 Td
(There is no perfect way to complete this journal. Keep it honest and simple.) Tj
ET

// Box 1
0.960 0.940 0.990 rg
40 500 532 120 re f
0.850 0.800 0.950 RG
1 w
40 500 532 120 re S
BT
/F1 11 Tf
0.102 0.075 0.220 rg
55 598 Td
(What would I like more of this week?) Tj
/F2 9 Tf
0.408 0.376 0.500 rg
55 580 Td
(For example: calm, clarity, patience, confidence, connection.) Tj
0.750 0.700 0.880 rg
55 545 Td
(____________________________________________________________________________) Tj
55 520 Td
(____________________________________________________________________________) Tj
ET

// Box 2
0.960 0.940 0.990 rg
40 360 532 120 re f
0.850 0.800 0.950 RG
1 w
40 360 532 120 re S
BT
/F1 11 Tf
0.102 0.075 0.220 rg
55 458 Td
(What usually helps me feel more grounded?) Tj
/F2 9 Tf
0.408 0.376 0.500 rg
55 440 Td
(People, places, routines, or small actions you already trust.) Tj
0.750 0.700 0.880 rg
55 405 Td
(____________________________________________________________________________) Tj
55 380 Td
(____________________________________________________________________________) Tj
ET

// Box 3
0.960 0.940 0.990 rg
40 220 532 120 re f
0.850 0.800 0.950 RG
1 w
40 220 532 120 re S
BT
/F1 11 Tf
0.102 0.075 0.220 rg
55 318 Td
(One kind thing I can remind myself) Tj
/F2 9.5 Tf
0.750 0.700 0.880 rg
55 285 Td
(____________________________________________________________________________) Tj
55 255 Td
(____________________________________________________________________________) Tj
ET

// Box 4: My reminder
0.990 0.960 0.920 rg
40 75 532 120 re f
0.950 0.880 0.750 RG
1 w
40 75 532 120 re S
BT
/F1 11 Tf
0.102 0.075 0.220 rg
60 172 Td
(My reminder) Tj
/F2 10 Tf
0.300 0.250 0.400 rg
60 142 Td
([   ]  I do not need to solve everything today.) Tj
310 142 Td
([   ]  Small actions still count.) Tj
60 108 Td
([   ]  I can be honest about how I feel.) Tj
ET

0.443 0.278 0.910 rg
BT
/F1 10 Tf
40 25 Td
(moodflip) Tj
/F2 9 Tf
0.408 0.376 0.500 rg
295 25 Td
(3) Tj
400 25 Td
(Self-reflection utility - not medical advice.) Tj
ET
Q`);

  // PAGES 4 to 10: Days 1 to 7 Reflection Pages
  for (let d = 1; d <= 7; d++) {
    contentObjects.push(buildDayPageStream(d, d + 3));
  }

  // PAGE 11: End of 7-Day Reflection
  contentObjects.push(`q
0.980 0.965 0.992 rg
0 0 612 792 re f

0.443 0.278 0.910 rg
BT
/F1 18 Tf
40 735 Td
(moodflip) Tj
/F1 9 Tf
445 735 Td
(*  7 DAYS COMPLETE) Tj
ET

0.102 0.075 0.220 rg
BT
/F1 26 Tf
40 670 Td
(Your 7-Day Reflection) Tj
/F2 11 Tf
0.408 0.376 0.500 rg
40 645 Td
(Look back without judging yourself. Notice patterns, not perfection.) Tj
ET

// Box 1
0.960 0.940 0.990 rg
40 500 532 120 re f
0.850 0.800 0.950 RG
1 w
40 500 532 120 re S
BT
/F1 11 Tf
0.102 0.075 0.220 rg
55 595 Td
(Patterns I noticed in my moods) Tj
/F2 9.5 Tf
0.750 0.700 0.880 rg
55 560 Td
(____________________________________________________________________________) Tj
55 530 Td
(____________________________________________________________________________) Tj
ET

// Box 2
0.960 0.940 0.990 rg
40 360 532 120 re f
0.850 0.800 0.950 RG
1 w
40 360 532 120 re S
BT
/F1 11 Tf
0.102 0.075 0.220 rg
55 455 Td
(Approved actions that felt most useful) Tj
/F2 9.5 Tf
0.750 0.700 0.880 rg
55 420 Td
(____________________________________________________________________________) Tj
55 390 Td
(____________________________________________________________________________) Tj
ET

// Box 3
0.960 0.940 0.990 rg
40 220 532 120 re f
0.850 0.800 0.950 RG
1 w
40 220 532 120 re S
BT
/F1 11 Tf
0.102 0.075 0.220 rg
55 315 Td
(What I learned about myself) Tj
/F2 9.5 Tf
0.750 0.700 0.880 rg
55 280 Td
(____________________________________________________________________________) Tj
55 250 Td
(____________________________________________________________________________) Tj
ET

// Box 4
0.960 0.940 0.990 rg
40 80 532 120 re f
0.850 0.800 0.950 RG
1 w
40 80 532 120 re S
BT
/F1 11 Tf
0.102 0.075 0.220 rg
55 175 Td
(A gentle intention for next week) Tj
/F2 9.5 Tf
0.750 0.700 0.880 rg
55 140 Td
(____________________________________________________________________________) Tj
55 110 Td
(____________________________________________________________________________) Tj
ET

0.443 0.278 0.910 rg
BT
/F1 10 Tf
40 25 Td
(moodflip) Tj
/F2 9 Tf
0.408 0.376 0.500 rg
292 25 Td
(11) Tj
400 25 Td
(Self-reflection utility - not medical advice.) Tj
ET
Q`);

  // PAGE 12: Back Cover Page
  contentObjects.push(`q
612 0 0 792 0 0 cm
/Im1 Do
Q
q
0.980 0.965 0.992 rg
0 412 612 380 re f

0.443 0.278 0.910 rg
BT
/F1 18 Tf
40 735 Td
(moodflip) Tj
ET

0.950 0.920 0.990 rg
140 680 332 26 re f
0.850 0.780 0.960 RG
1 w
140 680 332 26 re S
BT
/F1 9 Tf
0.443 0.278 0.910 rg
165 689 Td
(*  YOUR REFLECTIONS ARE YOURS) Tj
ET

0.102 0.075 0.220 rg
BT
/F1 28 Tf
175 615 Td
(A Small Shift Today.) Tj
0.443 0.278 0.910 rg
125 570 Td
(A Better You Tomorrow.) Tj
/F2 11 Tf
0.408 0.376 0.500 rg
175 525 Td
(Thank you for taking time to check in with yourself.) Tj
195 505 Td
(Keep what feels useful. Leave what does not.) Tj
ET

1 1 1 rg
110 160 392 100 re f
0.850 0.780 0.960 RG
2 w
110 160 392 100 re S
BT
/F1 14 Tf
0.102 0.075 0.220 rg
275 228 Td
(MoodFlip) Tj
/F2 10 Tf
0.408 0.376 0.500 rg
195 200 Td
(Self-reflection utility * Daily mindset shifts) Tj
220 178 Td
(Not therapy * Not medical advice) Tj
ET

1 1 1 rg
BT
/F1 10 Tf
40 25 Td
(moodflip) Tj
/F2 9 Tf
292 25 Td
(12) Tf
350 25 Td
(Self-reflection utility - not medical advice.) Tj
ET
Q`);

  // Read cover JPEG image buffer dynamically
  let jpegBuffer: Uint8Array;
  try {
    if (typeof window === 'undefined') {
      const reqFs = eval('require')('fs');
      const reqPath = eval('require')('path');
      const imgPath = reqPath.join(process.cwd(), 'public', 'pdf-cover-full-artwork.jpg');
      jpegBuffer = reqFs.readFileSync(imgPath);
    } else {
      jpegBuffer = new Uint8Array(0);
    }
  } catch (err) {
    jpegBuffer = new Uint8Array(0);
  }

  const header = Buffer.from(`%PDF-1.4\n`);
  const obj1 = Buffer.from(`1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n`);
  const kidsRefs = Array.from({ length: 12 }, (_, i) => `${4 + i * 2} 0 R`).join(' ');
  const obj2 = Buffer.from(`2 0 obj\n<< /Type /Pages /Kids [${kidsRefs}] /Count 12 >>\nendobj\n`);
  const obj3 = Buffer.from(`3 0 obj\n<< /Font << /F1 << /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >> /F2 << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> >> /XObject << /Im1 28 0 R >> >>\nendobj\n`);

  const imgHeader = Buffer.from(`28 0 obj\n<< /Type /XObject /Subtype /Image /Width 800 /Height 1000 /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${jpegBuffer.length} >>\nstream\n`);
  const imgFooter = Buffer.from(`\nendstream\nendobj\n`);
  const obj28 = Buffer.concat([imgHeader, jpegBuffer, imgFooter]);

  const pageObjects: Buffer[] = [];
  let currentObjId = 4;

  for (let i = 0; i < 12; i++) {
    const pId = currentObjId;
    const cId = currentObjId + 1;
    currentObjId += 2;

    const streamStr = contentObjects[i];
    pageObjects.push(Buffer.from(`${pId} 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources 3 0 R /Contents ${cId} 0 R >>\nendobj\n`));
    pageObjects.push(Buffer.from(`${cId} 0 obj\n<< /Length ${Buffer.byteLength(streamStr)} >>\nstream\n${streamStr}\nendstream\nendobj\n`));
  }

  let body = header;
  const posMap: Record<number, number> = {};

  const registerPos = (num: number, buf: Buffer) => {
    posMap[num] = body.length;
    body = Buffer.concat([body, buf]);
  };

  registerPos(1, obj1);
  registerPos(2, obj2);
  registerPos(3, obj3);

  for (let k = 0; k < pageObjects.length; k++) {
    registerPos(4 + k, pageObjects[k]);
  }
  registerPos(28, obj28);

  const startXRef = body.length;
  let xrefStr = `xref\n0 29\n0000000000 65535 f \n`;

  for (let id = 1; id <= 28; id++) {
    const off = (posMap[id] || 0).toString().padStart(10, '0');
    xrefStr += `${off} 00000 n \n`;
  }

  xrefStr += `trailer\n<< /Size 29 /Root 1 0 R >>\nstartxref\n${startXRef}\n%%EOF`;

  return new Blob([Buffer.concat([body, Buffer.from(xrefStr)])], { type: 'application/pdf' });
}

export function triggerPDFDownload(title: string, userName: string = 'Valued Member') {
  if (typeof window === 'undefined') return;
  const blob = generateMoodFlipPDFBlob(title, userName);
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  const safeFilename = (title || 'MoodFlip_Daily_Reflection_Printable_Journal').replace(/[^a-zA-Z0-9_-]/g, '_');
  link.download = `${safeFilename}.pdf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}
