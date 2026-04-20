// Pre-build image optimizer — resizes and compresses images in-place
// v2: NO format conversion (keeps .jpg/.png/.jpeg as-is to avoid breaking code references)
// Only resizes oversized images and applies quality compression
// Runs in Vercel's ephemeral build env, so in-place modification is safe
//
// Targets (web.dev / Google PageSpeed):
//   Profile/avatar:  800px max
//   Hero/banner:     1920px max
//   Blog inline:     1200px (landscape) / 720px (portrait screenshots)
//   Logos:           240px max
//   OG images:       1200x630 max
//   Sports timeline: 1200px max

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

// Rules matched in order — first match wins
// format: null = keep original, just compress
const RULES = [
  {
    name: 'profile/avatar',
    match: /profile\.(jpe?g|png|webp)$/i,
    maxWidth: 800,
    maxHeight: 800,
    jpegQuality: 80,
    pngCompression: 9,
  },
  {
    name: 'hero/banner',
    match: /(hero|banner)[_-]?\w*\.(jpe?g|png|webp)$/i,
    maxWidth: 1920,
    maxHeight: 1080,
    jpegQuality: 78,
    pngCompression: 9,
  },
  {
    name: 'journey background',
    match: /journey\d*\.(jpe?g|png|webp)$/i,
    maxWidth: 1920,
    maxHeight: 1280,
    jpegQuality: 78,
    pngCompression: 9,
  },
  {
    name: 'company logo',
    match: /logos?\//i,
    maxWidth: 240,
    maxHeight: 240,
    jpegQuality: 85,
    pngCompression: 9,
  },
  {
    name: 'OG social card',
    match: /\/og\//i,
    maxWidth: 1200,
    maxHeight: 630,
    jpegQuality: 80,
    pngCompression: 9,
  },
  {
    name: 'sports timeline',
    match: /sports\/timeline\//i,
    maxWidth: 1200,
    maxHeight: 900,
    jpegQuality: 78,
    pngCompression: 9,
  },
  {
    name: 'wechat QR',
    match: /wechat/i,
    maxWidth: 600,
    maxHeight: 600,
    jpegQuality: 80,
    pngCompression: 9,
  },
  {
    // Blog images — portrait screenshots get 720px, landscape get 1200px
    name: 'blog image',
    match: /blog\//i,
    maxWidth: 1200, // overridden to 720 for portrait at runtime
    maxHeight: null,
    jpegQuality: 80,
    pngCompression: 9,
  },
];

const DEFAULT_RULE = {
  name: 'default',
  maxWidth: 1600,
  maxHeight: 1200,
  jpegQuality: 80,
  pngCompression: 9,
};

const MIN_SIZE_BYTES = 20 * 1024; // skip files under 20KB

const SCAN_DIRS = [
  path.join(ROOT, 'public/assets/images'),
  path.join(ROOT, 'src/assets/images'),
];

function findImages(dir) {
  const results = [];
  if (!fs.existsSync(dir)) return results;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) results.push(...findImages(full));
    else if (/\.(jpe?g|png|webp)$/i.test(entry.name)) results.push(full);
  }
  return results;
}

function matchRule(filePath) {
  const rel = path.relative(ROOT, filePath);
  for (const rule of RULES) {
    if (rule.match.test(rel)) return rule;
  }
  return DEFAULT_RULE;
}

function fmtSize(bytes) {
  if (bytes < 1024) return `${bytes}B`;
  return `${(bytes / 1024).toFixed(0)}KB`;
}

async function optimizeImage(filePath) {
  const stat = fs.statSync(filePath);
  if (stat.size < MIN_SIZE_BYTES) return null;

  const rule = matchRule(filePath);
  const relPath = path.relative(ROOT, filePath);

  try {
    const metadata = await sharp(filePath).metadata();
    const { width, height, format } = metadata;

    // Determine resize targets
    let maxW = rule.maxWidth;
    let maxH = rule.maxHeight;

    // Portrait blog screenshots → 720px wide
    if (rule.name === 'blog image' && height > width) {
      maxW = 720;
      maxH = null;
    }

    const needsResize = (maxW && width > maxW) || (maxH && height > maxH);

    // Build pipeline — keep original format
    // .rotate() with no args auto-applies EXIF orientation to pixels and strips the tag.
    // Must come before resize, otherwise portrait photos with EXIF orientation end up sideways.
    let pipeline = sharp(filePath).rotate();

    if (needsResize) {
      pipeline = pipeline.resize({
        width: maxW || undefined,
        height: maxH || undefined,
        fit: 'inside',
        withoutEnlargement: true,
      });
    }

    // Compress in original format
    if (format === 'jpeg' || /\.jpe?g$/i.test(filePath)) {
      pipeline = pipeline.jpeg({ quality: rule.jpegQuality, mozjpeg: true });
    } else if (format === 'png') {
      pipeline = pipeline.png({ compressionLevel: rule.pngCompression, palette: true });
    } else if (format === 'webp') {
      pipeline = pipeline.webp({ quality: rule.jpegQuality });
    }

    const outputBuffer = await pipeline.toBuffer();

    // Only write if we saved space
    if (outputBuffer.length >= stat.size) return null;

    fs.writeFileSync(filePath, outputBuffer);

    return {
      file: relPath,
      rule: rule.name,
      before: stat.size,
      after: outputBuffer.length,
      saved: stat.size - outputBuffer.length,
    };
  } catch (err) {
    console.error(`  [SKIP] ${relPath}: ${err.message}`);
    return null;
  }
}

async function main() {
  console.log('\n  Image optimizer — pre-build compression\n');

  const allImages = SCAN_DIRS.flatMap(findImages);
  console.log(`  Found ${allImages.length} images\n`);

  let totalBefore = 0;
  let totalAfter = 0;
  let optimized = 0;

  for (const filePath of allImages) {
    const result = await optimizeImage(filePath);
    if (result) {
      optimized++;
      totalBefore += result.before;
      totalAfter += result.after;
      const pct = ((result.saved / result.before) * 100).toFixed(0);
      console.log(
        `  + ${result.file}  ${fmtSize(result.before)} -> ${fmtSize(result.after)} (-${pct}%)  [${result.rule}]`
      );
    }
  }

  if (optimized === 0) {
    console.log('  All images already optimized.\n');
  } else {
    const totalSaved = totalBefore - totalAfter;
    const totalPct = ((totalSaved / totalBefore) * 100).toFixed(0);
    console.log(
      `\n  ${optimized} images, ${fmtSize(totalBefore)} -> ${fmtSize(totalAfter)} (-${totalPct}%, saved ${fmtSize(totalSaved)})\n`
    );
  }
}

main().catch((err) => {
  console.error('Image optimization failed:', err);
  process.exit(0); // don't fail the build
});
