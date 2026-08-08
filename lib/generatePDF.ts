export function generateMoodFlipPDFBlob(title: string, userName: string = 'Valued Member'): Blob {
  const cleanTitle = (title || 'MoodFlip 7-Day Mindset Guide').replace(/[^\x20-\x7E]/g, '');
  const cleanUser = (userName || 'Valued Member').replace(/[^\x20-\x7E]/g, '');

  const pdfContent = `%PDF-1.4
1 0 obj
<<
  /Type /Catalog
  /Pages 2 0 R
>>
endobj

2 0 obj
<<
  /Type /Pages
  /Kids [3 0 R]
  /Count 1
>>
endobj

3 0 obj
<<
  /Type /Page
  /Parent 2 0 R
  /MediaBox [0 0 612 792]
  /Resources <<
    /Font <<
      /F1 4 0 R
      /F2 5 0 R
    >>
  >>
  /Contents 6 0 R
>>
endobj

4 0 obj
<<
  /Type /Font
  /Subtype /Type1
  /BaseFont /Helvetica-Bold
>>
endobj

5 0 obj
<<
  /Type /Font
  /Subtype /Type1
  /BaseFont /Helvetica
>>
endobj

6 0 obj
<<
  /Length 1600
>>
stream
q
0.443 0.278 0.910 rg
0 712 612 80 re f
1 1 1 rg
BT
/F1 20 Tf
40 745 Td
(MOODFLIP OFFICIAL WORKBOOK & GUIDE) Tj
ET

0.965 0.953 0.992 rg
0 630 612 82 re f
0.443 0.278 0.910 RG
2 w
0 630 612 0 re S
BT
0.102 0.075 0.220 rg
/F1 18 Tf
40 672 Td
(${cleanTitle.toUpperCase()}) Tj
/F2 11 Tf
40 648 Td
(Prepared Exclusively for: ${cleanUser}) Tj
ET

0.102 0.075 0.220 rg
BT
/F1 14 Tf
40 590 Td
(Welcome to Your Mindset Transformation) Tj
/F2 10 Tf
40 570 Td
(This guide provides science-backed micro-actions to flip emotional states in 60 seconds.) Tj
40 555 Td
(Practice these exercises daily to build emotional resilience and neuroplasticity.) Tj
ET

0.941 0.922 0.980 rg
40 370 532 160 re f
0.443 0.278 0.910 RG
1 w
40 370 532 160 re S

BT
/F1 12 Tf
0.443 0.278 0.910 rg
55 505 Td
(CORE 60-SECOND MICRO-ACTION WORKBOOK) Tj
/F2 10 Tf
0.102 0.075 0.220 rg
55 480 Td
(1. GROUNDING: Place both feet flat on the floor. Name 5 objects around you.) Tj
55 460 Td
(2. BOX BREATHING: Breathe in for 4s, hold 4s, exhale 4s, hold 4s. Repeat 4 times.) Tj
55 440 Td
(3. REFRAMING: Say out loud: 'This is temporary, and I am safe right now.') Tj
55 420 Td
(4. ACTION FOCUS: Ask 'What is the single smallest step I can take in 10 minutes?') Tj
55 400 Td
(5. POSITIVE ANCHOR: Put your hand over your heart and take one deep breath.) Tj
ET

0.980 0.970 1.000 rg
40 220 532 130 re f
0.800 0.700 0.950 RG
40 220 532 130 re S

BT
/F1 12 Tf
0.443 0.278 0.910 rg
55 325 Td
(DAILY REFLECTION & CHECK-IN TRACKER) Tj
/F2 10 Tf
0.102 0.075 0.220 rg
55 300 Td
(Morning Intention: What is your primary focus for emotional balance today?) Tj
55 275 Td
(Evening Check-in: Which 60-second action helped shift your mindset most?) Tj
55 250 Td
(Gratitude Note: Name 3 small things that brought you calm or joy today.) Tj
ET

0.443 0.278 0.910 rg
0 0 612 40 re f
1 1 1 rg
BT
/F2 9 Tf
40 16 Td
(MoodFlip Mindset Utility - Official Printable Workbook - www.moodflip.com) Tj
480 16 Td
(Page 1 of 1) Tj
ET
Q
endstream
endobj

xref
0 7
0000000000 65535 f
0000000009 00000 n
0000000058 00000 n
0000000115 00000 n
0000000249 00000 n
0000000329 00000 n
0000000404 00000 n
trailer
<<
  /Size 7
  /Root 1 0 R
>>
startxref
2050
%%EOF`;

  return new Blob([pdfContent], { type: 'application/pdf' });
}

export function triggerPDFDownload(title: string, userName: string = 'Valued Member') {
  if (typeof window === 'undefined') return;
  const blob = generateMoodFlipPDFBlob(title, userName);
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  const safeFilename = title.replace(/[^a-zA-Z0-9_-]/g, '_');
  link.download = `${safeFilename}.pdf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}
