import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const dir = '/Users/mac/projects/rawproject/public/instagram';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jpg'));

const hashes = new Set();
const uniqueFiles = [];

// Sort files to keep the lowest index when duplicates exist
files.sort((a, b) => {
  const numA = parseInt(a.replace('image_', '').replace('.jpg', ''));
  const numB = parseInt(b.replace('image_', '').replace('.jpg', ''));
  return numA - numB;
});

for (const file of files) {
  const filePath = path.join(dir, file);
  const buffer = fs.readFileSync(filePath);
  const hash = crypto.createHash('md5').update(buffer).digest('hex');
  
  if (!hashes.has(hash)) {
    hashes.add(hash);
    uniqueFiles.push(`/instagram/${file}`);
  }
}

fs.writeFileSync('/Users/mac/projects/rawproject/src/data/instagram_images.json', JSON.stringify(uniqueFiles, null, 2));
console.log(`Found ${uniqueFiles.length} unique images out of ${files.length}.`);
