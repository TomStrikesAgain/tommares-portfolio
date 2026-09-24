const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const inputDir = path.join(__dirname, 'raw_screenshots');
const outputDir = path.join(__dirname, 'public', 'images', 'bandmath');

async function processImagesBetter() {
  try {
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const files = fs.readdirSync(inputDir);
    let count = 1;

    for (const file of files) {
      if (file.match(/\.(png|jpe?g)$/i)) {
        const inputPath = path.join(inputDir, file);
        const nameWithoutExt = file.replace(/\.(png|jpe?g)$/i, '');
        const outputPath = path.join(outputDir, `${nameWithoutExt}.webp`);

        console.log(`Processing ${file}...`);

        await sharp(inputPath)
          .resize({
            width: 1920,
            height: 1080,
            fit: 'contain',
            background: '#6325a6' // The portfolio purple
          })
          .webp({ quality: 85 })
          .toFile(outputPath);

        count++;
      }
    }
    console.log(`\n✅ Successfully processed ${count - 1} images into ${outputDir}`);
  } catch (err) {
    console.error("Error:", err);
  }
}

processImagesBetter();
