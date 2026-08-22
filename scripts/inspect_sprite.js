const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function main() {
  const sourcePath = 'C:\\Users\\mohda\\.gemini\\antigravity-ide\\brain\\3febbe53-fb99-43a4-baff-978323311f76\\.user_uploaded\\media_1787408625678.png';
  const img = sharp(sourcePath);
  const metadata = await img.metadata();
  console.log('Image dimensions:', metadata.width, 'x', metadata.height);
}

main().catch(console.error);
