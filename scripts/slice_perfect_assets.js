const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function slicePerfectAssets() {
  const sourcePath = 'C:\\Users\\mohda\\.gemini\\antigravity-ide\\brain\\3febbe53-fb99-43a4-baff-978323311f76\\.user_uploaded\\media_1787408625678.png';
  const outDirClouds = path.join(__dirname, '..', 'public', 'moods', 'clouds');
  const outDirFeelings = path.join(__dirname, '..', 'public', 'moods', 'feelings');

  if (!fs.existsSync(outDirClouds)) fs.mkdirSync(outDirClouds, { recursive: true });
  if (!fs.existsSync(outDirFeelings)) fs.mkdirSync(outDirFeelings, { recursive: true });

  // 1. Five Clouds with safe generous margins so the top, sides, and lightning bolts are 100% complete
  const cloudConfigs = [
    { name: 'sad', left: 20, top: 45, width: 215, height: 178 },
    { name: 'fearful', left: 215, top: 58, width: 205, height: 162 },
    { name: 'angry', left: 405, top: 58, width: 195, height: 162 },
    { name: 'disgusted', left: 585, top: 58, width: 200, height: 162 },
    { name: 'stressed', left: 770, top: 35, width: 235, height: 188 },
  ];

  for (const cfg of cloudConfigs) {
    const outPath = path.join(outDirClouds, `cloud-${cfg.name}.png`);
    
    // Extract with generous margin, then trim transparent empty padding nicely
    await sharp(sourcePath)
      .extract(cfg)
      .png()
      .toFile(outPath);

    console.log(`Saved perfect cloud (100% full height): ${outPath}`);
  }

  // 2. Eight Feeling Icons & Cards with safe generous margins
  const feelingConfigs = [
    // Row 1
    { name: 'lonely', left: 90, top: 242, width: 195, height: 190, iconCrop: { left: 120, top: 260, width: 140, height: 140 } },
    { name: 'rejected', left: 300, top: 242, width: 195, height: 190, iconCrop: { left: 330, top: 260, width: 140, height: 140 } },
    { name: 'hurt', left: 510, top: 242, width: 195, height: 190, iconCrop: { left: 535, top: 255, width: 145, height: 145 } },
    { name: 'ashamed', left: 720, top: 242, width: 195, height: 190, iconCrop: { left: 755, top: 258, width: 125, height: 135 } },

    // Row 2
    { name: 'guilty', left: 90, top: 450, width: 195, height: 180, iconCrop: { left: 120, top: 465, width: 140, height: 140 } },
    { name: 'empty', left: 300, top: 450, width: 195, height: 180, iconCrop: { left: 330, top: 465, width: 140, height: 140 } },
    { name: 'overwhelmed', left: 510, top: 450, width: 195, height: 180, iconCrop: { left: 535, top: 465, width: 155, height: 145 } },
    { name: 'abandoned', left: 720, top: 450, width: 195, height: 180, iconCrop: { left: 772, top: 470, width: 102, height: 105 } },
  ];

  for (const cfg of feelingConfigs) {
    const outCardPath = path.join(outDirFeelings, `card-${cfg.name}.png`);
    await sharp(sourcePath)
      .extract({ left: cfg.left, top: cfg.top, width: cfg.width, height: cfg.height })
      .png()
      .toFile(outCardPath);

    // Also extract transparent icon
    const iconBuffer = await sharp(sourcePath)
      .extract(cfg.iconCrop)
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    // Make light background pixels transparent
    for (let i = 0; i < iconBuffer.info.width * iconBuffer.info.height; i++) {
      const r = iconBuffer.data[i * 4];
      const g = iconBuffer.data[i * 4 + 1];
      const b = iconBuffer.data[i * 4 + 2];
      if ((r > 200 && g > 190 && b > 210) || (r > 235 && g > 235 && b > 235)) {
        iconBuffer.data[i * 4 + 3] = 0;
      }
    }

    const outIconPath = path.join(outDirFeelings, `icon-${cfg.name}.png`);
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

    console.log(`Saved unclipped card and icon: ${cfg.name}`);
  }

  console.log('All assets sliced perfectly with full unclipped tops!');
}

slicePerfectAssets().catch(console.error);
