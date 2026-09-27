const sharp = require('sharp');
const fs = require('fs');

const files = [
  'public/images/home/carousel/mainhero.png',
  'public/images/experience/exp1.jpg',
  'public/images/home/instagram/post1.jpg',
  'public/images/experience/exp2.jpg',
  'public/images/home/instagram/post2.jpg',
  'public/images/home/hero/hero_slide2.png',
  'public/images/home/inspiration/8.jpg',
  'public/images/experience/exp3.jpg',
];

(async () => {
  for (const file of files) {
    if (fs.existsSync(file)) {
      const outFile = file.replace(/\.(png|jpg|jpeg)$/, '.webp');
      console.log(`Converting ${file} to ${outFile}...`);
      await sharp(file)
        .webp({ quality: 85 })
        .toFile(outFile);
      console.log(`Done converting ${outFile}`);
    } else {
      console.log(`File not found: ${file}`);
    }
  }
})();
