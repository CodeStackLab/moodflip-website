const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function processArrow() {
  const sourcePath = 'C:\\Users\\mohda\\.gemini\\antigravity-ide\\brain\\3febbe53-fb99-43a4-baff-978323311f76\\.user_uploaded\\media_1787409349800.png';
  const outPath = path.join(__dirname, '..', 'public', 'flip-your-mood-arrow.png');

  const { data, info } = await sharp(sourcePath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  console.log(`Arrow image: ${info.width}x${info.height}`);

  // Let's check corner alpha
  const cornerAlpha = data[3];
  console.log(`Corner alpha: ${cornerAlpha}`);

  // If corner is white and opaque, make outer background transparent
  // Let's check if (0,0) is white
  if (data[0] > 240 && data[1] > 240 && data[2] > 240) {
    console.log('Making outer white background transparent...');
    const width = info.width;
    const height = info.height;
    const visited = new Uint8Array(width * height);
    const queue = [];

    function isBg(idx) {
      const r = data[idx * 4];
      const g = data[idx * 4 + 1];
      const b = data[idx * 4 + 2];
      return r >= 245 && g >= 245 && b >= 245;
    }

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

      data[curr * 4 + 3] = 0; // make transparent

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

  await sharp(data, {
    raw: {
      width: info.width,
      height: info.height,
      channels: 4
    }
  })
    .trim()
    .png()
    .toFile(outPath);

  console.log(`Saved transparent arrow button to: ${outPath}`);
}

processArrow().catch(console.error);
