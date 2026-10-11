const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function optimizeFile(filePath, { maxDim = 1400, quality = 80, outputExt = 'webp', inPlace = false } = {}) {
  try {
    if (!fs.existsSync(filePath)) return null;
    const stat = fs.statSync(filePath);
    const originalSize = stat.size;

    const ext = path.extname(filePath).toLowerCase();
    const targetPath = inPlace ? filePath : filePath.replace(new RegExp(`\\${ext}$`, 'i'), `.${outputExt}`);

    let pipeline = sharp(filePath).rotate(); // auto-rotate based on EXIF
    const metadata = await pipeline.metadata();

    if (metadata.width > maxDim || metadata.height > maxDim) {
      pipeline = pipeline.resize({
        width: maxDim,
        height: maxDim,
        fit: 'inside',
        withoutEnlargement: true
      });
    }

    let buffer;
    if (outputExt === 'webp') {
      buffer = await pipeline.webp({ quality, effort: 4 }).toBuffer();
    } else if (outputExt === 'jpg' || outputExt === 'jpeg') {
      buffer = await pipeline.jpeg({ quality, mozjpeg: true }).toBuffer();
    } else if (outputExt === 'png') {
      buffer = await pipeline.png({ compressionLevel: 9, quality }).toBuffer();
    } else {
      buffer = await pipeline.toBuffer();
    }

    // Only write if buffer is smaller or format is different
    if (targetPath !== filePath || buffer.length < originalSize) {
      fs.writeFileSync(targetPath, buffer);
    }

    return {
      source: filePath,
      target: targetPath,
      originalSize,
      newSize: buffer.length,
      saved: originalSize - buffer.length
    };
  } catch (err) {
    console.error(`Error processing ${filePath}:`, err.message);
    return null;
  }
}

async function run() {
  console.log('=== STARTING COMPREHENSIVE IMAGE OPTIMIZATION ===\n');
  let totalOriginal = 0;
  let totalOptimized = 0;
  let count = 0;

  // 1. FIRST FOLD IMAGES (Critical Priority)
  console.log('--- 1. Optimizing First Fold (Above-the-Fold) Images ---');
  const firstFoldImages = [
    { file: 'public/images/home/carousel/mainhero.png', target: 'public/images/home/carousel/mainhero.webp', maxDim: 1600, quality: 82 },
    { file: 'public/images/home/hero/hero_slide2.png', target: 'public/images/home/hero/hero_slide2.webp', maxDim: 800, quality: 80 },
    { file: 'public/images/experience/exp1.jpg', target: 'public/images/experience/exp1.webp', maxDim: 800, quality: 80 },
    { file: 'public/images/experience/exp2.jpg', target: 'public/images/experience/exp2.webp', maxDim: 800, quality: 80 },
    { file: 'public/images/experience/exp3.jpg', target: 'public/images/experience/exp3.webp', maxDim: 800, quality: 80 },
    { file: 'public/images/home/instagram/post1.jpg', target: 'public/images/home/instagram/post1.webp', maxDim: 800, quality: 80 },
    { file: 'public/images/home/instagram/post2.jpg', target: 'public/images/home/instagram/post2.webp', maxDim: 800, quality: 80 },
  ];

  for (const item of firstFoldImages) {
    const srcFile = fs.existsSync(item.file) ? item.file : item.target;
    const res = await optimizeFile(srcFile, { maxDim: item.maxDim, quality: item.quality, outputExt: 'webp' });
    if (res) {
      // Force write to the exact target webp path
      fs.writeFileSync(item.target, fs.readFileSync(res.target));
      const targetSize = fs.statSync(item.target).size;
      console.log(`[First Fold] ${item.target}: ${(targetSize / 1024).toFixed(1)} KB`);
      totalOriginal += res.originalSize;
      totalOptimized += targetSize;
      count++;
    }
  }

  // 2. PRODUCTS DIRECTORY
  console.log('\n--- 2. Optimizing Products Directory ---');
  const productsDir = 'public/images/products';
  if (fs.existsSync(productsDir)) {
    const productFiles = fs.readdirSync(productsDir);
    for (const f of productFiles) {
      if (f.match(/\.(jpg|jpeg|png|avif|webp)$/i)) {
        const fullPath = path.join(productsDir, f);
        const res = await optimizeFile(fullPath, { maxDim: 1400, quality: 80, outputExt: 'webp' });
        if (res) {
          totalOriginal += res.originalSize;
          totalOptimized += res.newSize;
          count++;
        }
      }
    }
    console.log(`Processed all product images to WebP.`);
  }

  // 3. HOME DIRECTORY SUBFOLDERS
  console.log('\n--- 3. Optimizing Home & Carousel & Inspiration Images ---');
  const homeDirs = [
    { dir: 'public/images/home/inspiration', maxDim: 1200 },
    { dir: 'public/images/home/instagram', maxDim: 900 },
    { dir: 'public/images/home/carousel', maxDim: 1400 },
    { dir: 'public/images/home/hero', maxDim: 1400 },
    { dir: 'public/images/home', maxDim: 1400, recursive: false },
    { dir: 'public/images/about', maxDim: 900 },
    { dir: 'public/images/experience', maxDim: 1400 }
  ];

  for (const { dir, maxDim, recursive } of homeDirs) {
    if (!fs.existsSync(dir)) continue;
    const files = fs.readdirSync(dir);
    for (const f of files) {
      const fullPath = path.join(dir, f);
      const isDir = fs.statSync(fullPath).isDirectory();
      if (isDir) continue;
      if (f.match(/\.(jpg|jpeg|png|webp)$/i)) {
        const res = await optimizeFile(fullPath, { maxDim, quality: 80, outputExt: 'webp' });
        if (res) {
          totalOriginal += res.originalSize;
          totalOptimized += res.newSize;
          count++;
        }
      }
    }
  }

  // 4. NEWS PAGE INSTAGRAM IMAGES
  console.log('\n--- 4. Optimizing News Page Instagram Images ---');
  const instagramDir = 'public/instagram';
  if (fs.existsSync(instagramDir)) {
    const igFiles = fs.readdirSync(instagramDir);
    for (const f of igFiles) {
      if (f.match(/\.(jpg|jpeg|png)$/i)) {
        const fullPath = path.join(instagramDir, f);
        const res = await optimizeFile(fullPath, { maxDim: 800, quality: 80, outputExt: 'webp' });
        if (res) {
          totalOriginal += res.originalSize;
          totalOptimized += res.newSize;
          count++;
        }
      }
    }
    console.log(`Processed all ${igFiles.length} instagram images to WebP.`);
  }

  console.log('\n=== OPTIMIZATION SUMMARY ===');
  console.log(`Total images processed: ${count}`);
  console.log(`Original total size: ${(totalOriginal / 1024 / 1024).toFixed(1)} MB`);
  console.log(`Optimized total size: ${(totalOptimized / 1024 / 1024).toFixed(1)} MB`);
  const savings = totalOriginal > 0 ? (((totalOriginal - totalOptimized) / totalOriginal) * 100).toFixed(1) : 0;
  console.log(`Bandwidth savings: ${savings}% reduction!`);
}

run();
