import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const sizes = [192, 512];

async function generateIcons() {
  const svgPath = path.join(process.cwd(), 'public', 'icon.svg');
  const outputDir = path.join(process.cwd(), 'public');

  console.log('Generating PNG icons from SVG...');

  for (const size of sizes) {
    const outputPath = path.join(outputDir, `icon-${size}x${size}.png`);
    
    try {
      await sharp(svgPath)
        .resize(size, size)
        .png()
        .toFile(outputPath);
      
      console.log(`✅ Generated icon-${size}x${size}.png`);
    } catch (error) {
      console.error(`❌ Error generating icon-${size}x${size}.png:`, error.message);
    }
  }

  console.log('Icon generation complete!');
}

generateIcons().catch(console.error); 