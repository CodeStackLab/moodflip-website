const sharp = require('sharp');
const path = require('path');

async function inspectArtwork() {
  const meta = await sharp(path.join(__dirname, '..', 'public', 'sunrise-artwork.png')).metadata();
  console.log('sunrise-artwork.png dimensions:', meta.width, 'x', meta.height);
}

inspectArtwork().catch(console.error);
