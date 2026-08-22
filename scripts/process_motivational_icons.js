const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function processMotivationalIcons() {
  const file1 = 'C:\\Users\\mohda\\.gemini\\antigravity-ide\\brain\\3febbe53-fb99-43a4-baff-978323311f76\\.user_uploaded\\media_1787409737469.png';
  const file2 = 'C:\\Users\\mohda\\.gemini\\antigravity-ide\\brain\\3febbe53-fb99-43a4-baff-978323311f76\\.user_uploaded\\media_1787409740157.png';

  const out1 = path.join(__dirname, '..', 'public', 'motivational-hands-heart.png');
  const out2 = path.join(__dirname, '..', 'public', 'motivational-leaves-orb.png');

  // Let's inspect
  const m1 = await sharp(file1).metadata();
  const m2 = await sharp(file2).metadata();
  console.log('File 1:', m1.width, 'x', m1.height);
  console.log('File 2:', m2.width, 'x', m2.height);

  // Save to public with transparent background trim if needed
  await sharp(file1).png().toFile(out1);
  await sharp(file2).png().toFile(out2);

  console.log('Saved motivational icons to public successfully!');
}

processMotivationalIcons().catch(console.error);
