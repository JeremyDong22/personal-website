#!/usr/bin/env node
// Generate static OG images (1200x630 PNG) for each blog post
// Uses Puppeteer to screenshot HTML templates
// Usage: node scripts/generate-og-images.js

const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'assets', 'images', 'og');

// Blog post OG designs — same visual identity as BlogCoverArt.js
const posts = [
  {
    slug: 'symptom-driven-development',
    bg: 'linear-gradient(135deg, #0a0a0a 0%, #1a0a2e 50%, #0d1117 100%)',
    accent: '#D4AF37',
    mainText: 'SDD',
    subText: '症状驱动开发',
    tagline: 'Symptom Driven Development',
    decoration: 'terminal',
  },
  {
    slug: 'mianyang-cursor-summer',
    bg: 'linear-gradient(135deg, #1a0a00 0%, #2d1810 40%, #0d1117 100%)',
    accent: '#ff6b35',
    mainText: '绵阳',
    subText: '35°C · Cursor · 街头',
    tagline: 'From UIUC to Mianyang',
    decoration: 'heatwave',
  },
  {
    slug: 'inventory-from-two-hours-to-ten-minutes',
    bg: 'linear-gradient(135deg, #0a1628 0%, #0d2137 50%, #0d1117 100%)',
    accent: '#4ade80',
    mainText: '2h → 10min',
    subText: '进销存革命',
    tagline: 'Inventory Revolution',
    decoration: 'data',
  },
  {
    slug: 'pos-printer-interception',
    bg: 'linear-gradient(135deg, #0a0d0a 0%, #0d1a0d 50%, #0d1117 100%)',
    accent: '#22d3ee',
    mainText: '截获',
    subText: 'POS · 小票 · 数据流',
    tagline: 'POS Printer Interception',
    decoration: 'matrix',
  },
];

function buildDecorationHTML(post) {
  if (post.decoration === 'terminal') {
    const lines = [
      '$ symptom --detect',
      '  no issues found',
      '$ ship --now',
      '  deployed',
      '$ symptom --detect',
      '  ERROR: cache miss',
      '$ fix --apply swr',
      '  resolved',
    ];
    return `<div style="position:absolute;top:30px;left:40px;opacity:0.15;font-family:monospace;font-size:16px;color:${post.accent};line-height:1.8">${lines.map(l => `<div>${l}</div>`).join('')}</div>`;
  }
  if (post.decoration === 'heatwave') {
    let html = '';
    for (let i = 0; i < 6; i++) {
      html += `<div style="position:absolute;bottom:${20 + i * 18}px;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent 0%,${post.accent}22 30%,${post.accent}11 70%,transparent 100%)"></div>`;
    }
    return html;
  }
  if (post.decoration === 'data') {
    const nums = ['120', '2:00', '0:10', '98%', '→', '42', '0.3s'];
    return nums.map((n, i) =>
      `<span style="position:absolute;font-family:monospace;font-size:${14 + (i % 3) * 3}px;color:${post.accent};opacity:${0.08 + (i % 4) * 0.03};top:${15 + ((i * 37) % 70)}%;left:${5 + ((i * 43) % 85)}%;transform:rotate(${-10 + (i * 7) % 20}deg)">${n}</span>`
    ).join('');
  }
  if (post.decoration === 'matrix') {
    let html = '';
    for (let i = 0; i < 10; i++) {
      html += `<div style="position:absolute;top:0;left:${6 + i * 10}%;width:1px;height:100%;background:linear-gradient(180deg,transparent 0%,${post.accent}15 40%,${post.accent}08 80%,transparent 100%)"></div>`;
    }
    return html;
  }
  return '';
}

function buildHTML(post) {
  return `<!DOCTYPE html>
<html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@900&family=Montserrat:wght@500;600&family=Noto+Serif+SC:wght@900&display=swap" rel="stylesheet">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { width: 1200px; height: 630px; overflow: hidden; }
</style>
</head><body>
<div style="position:relative;width:1200px;height:630px;background:${post.bg};display:flex;flex-direction:column;justify-content:center;align-items:center;overflow:hidden">
  ${buildDecorationHTML(post)}
  <div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 50%,transparent 30%,rgba(0,0,0,0.4) 100%)"></div>
  <div style="position:relative;z-index:1;text-align:center;padding:0 60px">
    <div style="font-family:'Playfair Display','Noto Serif SC',serif;font-size:96px;font-weight:900;color:${post.accent};letter-spacing:0.05em;line-height:1.1;text-shadow:0 0 60px ${post.accent}33">${post.mainText}</div>
    <div style="font-family:'Montserrat','Noto Sans SC',sans-serif;font-size:22px;color:rgba(255,255,255,0.45);margin-top:16px;letter-spacing:0.12em;font-weight:500">${post.subText}</div>
    <div style="font-family:'Montserrat',sans-serif;font-size:14px;color:rgba(255,255,255,0.25);margin-top:28px;letter-spacing:0.2em;text-transform:uppercase;font-weight:600">${post.tagline}</div>
  </div>
  <div style="position:absolute;bottom:24px;left:60px;display:flex;align-items:center;gap:12px;z-index:1">
    <div style="width:36px;height:36px;border-radius:50%;background:#333;border:2px solid rgba(255,255,255,0.2)"></div>
    <span style="font-family:'Montserrat',sans-serif;font-size:14px;color:rgba(255,255,255,0.4);font-weight:500">Jeremy Dong</span>
    <span style="font-family:'Montserrat',sans-serif;font-size:12px;color:rgba(255,255,255,0.2);margin-left:8px">jeremydong.blog</span>
  </div>
  <div style="position:absolute;bottom:0;left:10%;right:10%;height:2px;background:linear-gradient(90deg,transparent,${post.accent}55,transparent)"></div>
</div>
</body></html>`;
}

async function main() {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({ headless: 'new' });

  for (const post of posts) {
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });

    const html = buildHTML(post);
    await page.setContent(html, { waitUntil: 'networkidle0' });

    // Wait for fonts
    await page.evaluate(() => document.fonts.ready);
    await new Promise(r => setTimeout(r, 500));

    const outPath = path.join(OUTPUT_DIR, `${post.slug}.png`);
    await page.screenshot({ path: outPath, type: 'png' });
    console.log(`✓ ${post.slug}.png`);
    await page.close();
  }

  await browser.close();
  console.log(`\nDone! ${posts.length} images saved to ${OUTPUT_DIR}`);
}

main().catch(console.error);
