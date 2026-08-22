const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function computeAccurateCloudBoxes() {
  const sourcePath = 'C:\\Users\\mohda\\.gemini\\antigravity-ide\\brain\\3febbe53-fb99-43a4-baff-978323311f76\\.user_uploaded\\media_1787408625678.png';
  const { data, info } = await sharp(sourcePath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height } = info;

  const cols = [
    { name: 'sad', minX: 5, maxX: 230 },
    { name: 'fearful', minX: 220, maxX: 415 },
    { name: 'angry', minX: 410, maxX: 595 },
    { name: 'disgusted', minX: 590, maxX: 780 },
    { name: 'stressed', minX: 775, maxX: 1015 }
  ];

  const results = [];

  for (const col of cols) {
    let topY = 9999, btmY = 0, leftX = 9999, rightX = 0;

    // Scan top half where clouds are located (y: 0 to 240)
    for (let y = 0; y < 240; y++) {
      for (let x = col.minX; x < col.maxX; x++) {
        const idx = (y * width + x) * 4;
        const a = data[idx + 3];

        if (a > 10) {
          if (y < topY) topY = y;
          if (y > btmY) btmY = y;
          if (x < leftX) leftX = x;
          if (x > rightX) rightX = x;
        }
      }
    }

    console.log(`Cloud [${col.name}]: topY=${topY}, btmY=${btmY}, leftX=${leftX}, rightX=${rightX}, w=${rightX - leftX + 1}, h=${btmY - topY + 1}`);
    results.push({ name: col.name, x: leftX, y: topY, w: rightX - leftX + 1, h: btmY - topY + 1 });
  }

  return results;
}

computeAccurateCloudBoxes().catch(console.error);
