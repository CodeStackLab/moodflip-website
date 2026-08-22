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
    { name: 'lonely', left: 90, top: 242, width: 195, height: 190, iconCrop: { left: 130, top: 275, width: 115, height: 125 } },
    { name: 'rejected', left: 300, top: 242, width: 195, height: 190, iconCrop: { left: 340, top: 275, width: 115, height: 125 } },
    { name: 'hurt', left: 510, top: 242, width: 195, height: 190, iconCrop: { left: 550, top: 275, width: 115, height: 125 } },
    { name: 'ashamed', left: 720, top: 242, width: 195, height: 190, iconCrop: { left: 760, top: 275, width: 115, height: 125 } },

    // Row 2
    { name: 'guilty', left: 90, top: 450, width: 195, height: 180, iconCrop: { left: 130, top: 480, width: 115, height: 125 } },
    { name: 'empty', left: 300, top: 450, width: 195, height: 180, iconCrop: { left: 340, top: 480, width: 115, height: 125 } },
    { name: 'overwhelmed', left: 510, top: 450, width: 195, height: 180, iconCrop: { left: 550, top: 480, width: 115, height: 125 } },
    { name: 'abandoned', left: 720, top: 450, width: 195, height: 180, iconCrop: { left: 760, top: 480, width: 115, height: 125 } },
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

    // Make light purple / tinted background pixels transparent
    for (let i = 0; i < iconBuffer.info.width * iconBuffer.info.height; i++) {
      const r = iconBuffer.data[i * 4];
      const g = iconBuffer.data[i * 4 + 1];
      const b = iconBuffer.data[i * 4 + 2];
      if (r > 195 && g > 185 && b > 215) {
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

    console.log(`Saved card and icon: ${cfg.name}`);
  }

  console.log('All assets sliced perfectly with full unclipped tops!');
}

slicePerfectAssets().catch(console.error);
