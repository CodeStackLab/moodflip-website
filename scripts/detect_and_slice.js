const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function sliceAssets() {
  const sourcePath = 'C:\\Users\\mohda\\.gemini\\antigravity-ide\\brain\\3febbe53-fb99-43a4-baff-978323311f76\\.user_uploaded\\media_1787408625678.png';
  const outDirClouds = path.join(__dirname, '..', 'public', 'moods', 'clouds');
  const outDirFeelings = path.join(__dirname, '..', 'public', 'moods', 'feelings');

  if (!fs.existsSync(outDirClouds)) fs.mkdirSync(outDirClouds, { recursive: true });
  if (!fs.existsSync(outDirFeelings)) fs.mkdirSync(outDirFeelings, { recursive: true });

  const { data, info } = await sharp(sourcePath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  console.log(`Image: ${info.width}x${info.height}, channels: ${info.channels}`);

  // Helper to make outer white/light background transparent around an object
  // Flood-fill transparency from corners for cropped sub-images
  function makeBackgroundTransparent(rawBuffer, width, height, threshold = 245) {
    const visited = new Uint8Array(width * height);
    const queue = [];

    function isBg(idx) {
      const r = rawBuffer[idx * 4];
      const g = rawBuffer[idx * 4 + 1];
      const b = rawBuffer[idx * 4 + 2];
      return r >= threshold && g >= threshold && b >= threshold;
    }

    // Seed outer border pixels
    for (let x = 0; x < width; x++) {
      const topIdx = 0 * width + x;
      const btmIdx = (height - 1) * width + x;
      if (isBg(topIdx)) { queue.push(topIdx); visited[topIdx] = 1; }
      if (isBg(btmIdx)) { queue.push(btmIdx); visited[btmIdx] = 1; }
    }
    for (let y = 0; y < height; y++) {
      const leftIdx = y * width + 0;
      const rightIdx = y * width + (width - 1);
      if (isBg(leftIdx) && !visited[leftIdx]) { queue.push(leftIdx); visited[leftIdx] = 1; }
      if (isBg(rightIdx) && !visited[rightIdx]) { queue.push(rightIdx); visited[rightIdx] = 1; }
    }

    let head = 0;
    while (head < queue.length) {
      const curr = queue[head++];
      const cx = curr % width;
      const cy = Math.floor(curr / width);

      // Set pixel transparent
      rawBuffer[curr * 4 + 3] = 0;

      const neighbors = [
        [cx + 1, cy],
        [cx - 1, cy],
        [cx, cy + 1],
        [cx, cy - 1]
      ];

      for (const [nx, ny] of neighbors) {
        if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
          const nIdx = ny * width + nx;
          if (!visited[nIdx] && isBg(nIdx)) {
            visited[nIdx] = 1;
            queue.push(nIdx);
          }
        }
      }
    }
  }

  // 1. Five Clouds
  // The 5 clouds in the top row: Sad, Fearful, Angry, Disgusted, Stressed
  const cloudBoxes = [
    { name: 'sad', x: 20, y: 70, w: 200, h: 160 },
    { name: 'fearful', x: 225, y: 80, w: 195, h: 150 },
    { name: 'angry', x: 415, y: 80, w: 185, h: 150 },
    { name: 'disgusted', x: 595, y: 80, w: 185, h: 150 },
    { name: 'stressed', x: 775, y: 60, w: 220, h: 170 },
  ];

  for (const box of cloudBoxes) {
    const croppedBuffer = await sharp(sourcePath)
      .extract({ left: box.x, top: box.y, width: box.w, height: box.h })
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    makeBackgroundTransparent(croppedBuffer.data, croppedBuffer.info.width, croppedBuffer.info.height, 245);

    const outPath = path.join(outDirClouds, `cloud-${box.name}.png`);
    await sharp(croppedBuffer.data, {
      raw: {
        width: croppedBuffer.info.width,
        height: croppedBuffer.info.height,
        channels: 4
      }
    })
      .trim()
      .png()
      .toFile(outPath);

    console.log(`Saved cloud: ${outPath}`);
  }

  // 2. Eight Feeling Cards (2 rows x 4 columns)
  // Row 1: Lonely, Rejected, Hurt, Ashamed
  // Row 2: Guilty, Empty, Overwhelmed, Abandoned
  const cardWidth = 195;
  const cardHeight = 180;
  
  const feelingBoxes = [
    // Row 1
    { name: 'lonely', x: 92, y: 248, w: 195, h: 180 },
    { name: 'rejected', x: 308, y: 248, w: 195, h: 180 },
    { name: 'hurt', x: 520, y: 248, w: 195, h: 180 },
    { name: 'ashamed', x: 735, y: 248, w: 195, h: 180 },

    // Row 2
    { name: 'guilty', x: 92, y: 450, w: 195, h: 180 },
    { name: 'empty', x: 308, y: 450, w: 195, h: 180 },
    { name: 'overwhelmed', x: 520, y: 450, w: 195, h: 180 },
    { name: 'abandoned', x: 735, y: 450, w: 195, h: 180 },
  ];

  for (const box of feelingBoxes) {
    // 1. Save full card with rounded rectangle
    const cardBuffer = await sharp(sourcePath)
      .extract({ left: box.x, top: box.y, width: box.w, height: box.h })
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    makeBackgroundTransparent(cardBuffer.data, cardBuffer.info.width, cardBuffer.info.height, 250);

    const outCardPath = path.join(outDirFeelings, `card-${box.name}.png`);
    await sharp(cardBuffer.data, {
      raw: {
        width: cardBuffer.info.width,
        height: cardBuffer.info.height,
        channels: 4
      }
    })
      .trim()
      .png()
      .toFile(outCardPath);

    console.log(`Saved card: ${outCardPath}`);

    // 2. Also extract just the inner icon (transparent background) for flexible use in UI
    const iconCrop = {
      left: box.x + 35,
      top: box.y + 25,
      width: box.w - 70,
      height: box.h - 50
    };

    const iconBuffer = await sharp(sourcePath)
      .extract(iconCrop)
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    // Make all light purple / whitish pixels transparent in the icon
    for (let i = 0; i < iconBuffer.info.width * iconBuffer.info.height; i++) {
      const r = iconBuffer.data[i * 4];
      const g = iconBuffer.data[i * 4 + 1];
      const b = iconBuffer.data[i * 4 + 2];
      // If pixel is background light tint (r > 200, g > 190, b > 230) or near white
      if (r > 200 && g > 190 && b > 220) {
        iconBuffer.data[i * 4 + 3] = 0;
      }
    }

    const outIconPath = path.join(outDirFeelings, `icon-${box.name}.png`);
    await sharp(iconBuffer.data, {
      raw: {
        width: iconBuffer.info.width,
        height: iconBuffer.info.height,
        channels: 4
      }
    })
      .trim()
      .png()
      .toFile(outIconPath);

    console.log(`Saved icon: ${outIconPath}`);
  }

  console.log('All individual images sliced successfully!');
}

sliceAssets().catch(console.error);
