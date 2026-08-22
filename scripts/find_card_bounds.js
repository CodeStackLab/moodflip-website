const sharp = require('sharp');
const fs = require('fs');

async function computeFeelingBounds() {
  const sourcePath = 'C:\\Users\\mohda\\.gemini\\antigravity-ide\\brain\\3febbe53-fb99-43a4-baff-978323311f76\\.user_uploaded\\media_1787408625678.png';
  const { data, info } = await sharp(sourcePath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height } = info;

  // Let's find bounds for 8 cards in 2 rows x 4 cols
  const cardGrid = [
    // Row 1
    { name: 'lonely', minX: 50, maxX: 300, minY: 230, maxY: 440 },
    { name: 'rejected', minX: 280, maxX: 510, minY: 230, maxY: 440 },
    { name: 'hurt', minX: 490, maxX: 720, minY: 230, maxY: 440 },
    { name: 'ashamed', minX: 710, maxX: 950, minY: 230, maxY: 440 },

    // Row 2
    { name: 'guilty', minX: 50, maxX: 300, minY: 440, maxY: 660 },
    { name: 'empty', minX: 280, maxX: 510, minY: 440, maxY: 660 },
    { name: 'overwhelmed', minX: 490, maxX: 720, minY: 440, maxY: 660 },
    { name: 'abandoned', minX: 710, maxX: 950, minY: 440, maxY: 660 },
  ];

  for (const card of cardGrid) {
    let topY = 9999, btmY = 0, leftX = 9999, rightX = 0;

    for (let y = card.minY; y < card.maxY; y++) {
      for (let x = card.minX; x < card.maxX; x++) {
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

    console.log(`Card [${card.name}]: topY=${topY}, btmY=${btmY}, leftX=${leftX}, rightX=${rightX}, w=${rightX - leftX + 1}, h=${btmY - topY + 1}`);
  }
}

computeFeelingBounds().catch(console.error);
