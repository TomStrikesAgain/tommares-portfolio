const sharp = require('sharp');
const path = require('path');

const imgPath = '/Users/tomhome/.gemini/antigravity/brain/ea2a3963-d5a6-4338-bd31-61f6c8318a40/tm_logo_purple_cream_1788249235599.jpg';
const destPng = path.join(__dirname, 'src', 'app', 'icon.png');

async function makeFavicon() {
  const { data, info } = await sharp(imgPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const w = info.width;
  const h = info.height;
  
  // Find the exact bounds of the purple circle by checking the middle row
  const cy = Math.floor(h / 2);
  let left = 0;
  let right = w - 1;
  
  // A pixel is background if it's close to white (R>240, G>240, B>240)
  function isBg(x, y) {
    const idx = (y * w + x) * 4;
    return data[idx] > 240 && data[idx+1] > 240 && data[idx+2] > 240;
  }
  
  while (left < w / 2 && isBg(left, cy)) left++;
  while (right > w / 2 && isBg(right, cy)) right--;
  
  let top = 0;
  let bottom = h - 1;
  const cx = Math.floor(w / 2);
  while (top < h / 2 && isBg(cx, top)) top++;
  while (bottom > h / 2 && isBg(cx, bottom)) bottom--;
  
  const widthBox = right - left;
  const heightBox = bottom - top;
  const radius = Math.min(widthBox, heightBox) / 2 - 4; // -4 to remove any anti-aliased edge
  
  const realCx = left + widthBox / 2;
  const realCy = top + heightBox / 2;

  // We want the final image to be exactly the bounding box of the circle so there is no padding at all
  const cropSize = Math.floor(radius * 2);
  const extractLeft = Math.floor(realCx - radius);
  const extractTop = Math.floor(realCy - radius);

  const mask = Buffer.from(`<svg width="${cropSize}" height="${cropSize}"><circle cx="${cropSize/2}" cy="${cropSize/2}" r="${cropSize/2}" fill="#fff" /></svg>`);

  await sharp(imgPath)
    .extract({ left: extractLeft, top: extractTop, width: cropSize, height: cropSize })
    .ensureAlpha()
    .composite([{
      input: mask,
      blend: 'dest-in'
    }])
    .png()
    .toFile(destPng);
    
  console.log('Favicon created successfully. Extracted size: ' + cropSize + 'x' + cropSize);
}

makeFavicon().catch(console.error);
