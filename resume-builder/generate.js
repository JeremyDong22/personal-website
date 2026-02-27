// Resume Generator — converts JSON data to pixel-perfect one-page PDF
// Usage:
//   node generate.js en          → English PDF
//   node generate.js zh          → Chinese PDF
//   node generate.js en --open   → generate + open in Preview
//   node generate.js en --copy   → generate + copy to public/assets/documents/
// v1.1 — fix: exp-bullets padding-left aligns zh experience bullets under company column

const puppeteer = require('puppeteer-core');
const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const PROJECT_ROOT = path.join(ROOT, '..');
const lang = process.argv[2] || 'en';
const shouldOpen = process.argv.includes('--open');
const shouldCopy = process.argv.includes('--copy');

if (!['en', 'zh'].includes(lang)) {
  console.error('Usage: node generate.js [en|zh] [--open] [--copy]');
  process.exit(1);
}

const dataPath   = path.join(ROOT, 'data', `resume.${lang}.json`);
const outputName = lang === 'en' ? 'Resume_English.pdf' : 'Resume_Chinese.pdf';
const outputPath = path.join(ROOT, 'output', outputName);
const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

// ─── Helpers ──────────────────────────────────────────────────────────────────

function esc(str) {
  return String(str)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// Embed local image as base64 so Puppeteer renders it without file:// restrictions
function imgDataUrl(relPath) {
  const abs = path.join(ROOT, relPath);
  const buf = fs.readFileSync(abs);
  const ext = path.extname(relPath).slice(1).toLowerCase();
  const mime = (ext === 'jpg' || ext === 'jpeg') ? 'image/jpeg' : `image/${ext}`;
  return `data:${mime};base64,${buf.toString('base64')}`;
}

// ─── English HTML ─────────────────────────────────────────────────────────────

function buildEnHtml(d) {
  const contactStr = d.header.contact.map(c => esc(c.value)).join(' | ');

  let body = `
    <div class="name">${esc(d.header.name)}</div>
    <div class="contact">${contactStr}</div>
  `;

  for (const sec of d.sections) {
    body += `<div class="section-title">${esc(sec.title)}</div>`;

    if (sec.type === 'education') {
      for (const e of sec.entries) {
        body += `<div class="entry-header"><span>${esc(e.institution)}</span></div>`;
        for (const deg of e.degrees) {
          body += `<div class="entry-meta"><span>${esc(deg.degree)} | ${esc(deg.gpa)}</span><span>${esc(deg.date)}</span></div>`;
        }
        if (e.coursework) body += `<div class="minor">Relevant Coursework: ${esc(e.coursework)}</div>`;
      }
    }

    if (sec.type === 'experience') {
      for (const e of sec.entries) {
        body += `
          <div class="entry-header"><span>${esc(e.company)}</span><span>${esc(e.location)}</span></div>
          <div class="entry-meta"><span>${esc(e.title)}</span><span>${esc(e.date)}</span></div>
          <ul>${e.bullets.map(b => `<li>${esc(b)}</li>`).join('')}</ul>`;
      }
    }

    if (sec.type === 'skills') {
      for (const e of sec.entries) {
        body += `<div class="skill-row"><b>${esc(e.label)}: </b>${esc(e.value)}</div>`;
      }
    }
  }

  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><style>
    *{margin:0;padding:0;box-sizing:border-box}
    html,body{width:8.5in;font-family:'Times New Roman',Times,serif;font-size:9.8pt;line-height:1.18;color:#000}
    body{padding:0.42in 0.55in}
    .name{text-align:center;font-size:20pt;font-weight:bold;margin-bottom:2pt;letter-spacing:.5pt}
    .contact{text-align:center;font-size:9pt;margin-bottom:4pt}
    .section-title{font-size:10.5pt;font-weight:bold;border-bottom:1.2px solid #000;margin-top:5pt;margin-bottom:2pt;padding-bottom:1pt}
    .entry-header{display:flex;justify-content:space-between;font-weight:bold;font-size:9.8pt;margin-top:2.5pt}
    .entry-meta{display:flex;justify-content:space-between;font-style:italic;font-size:9.5pt;margin-bottom:1pt}
    ul{margin:1.5pt 0 1pt 0;padding-left:12pt}
    li{margin-bottom:1.5pt;font-size:9.5pt;line-height:1.2}
    .minor{font-size:9.5pt;margin-top:1pt}
    .skill-row{font-size:9.5pt;margin-bottom:1.5pt;line-height:1.2}
  </style></head><body>${body}</body></html>`;
}

// ─── Chinese HTML ─────────────────────────────────────────────────────────────

function buildZhHtml(d) {
  const photoUrl   = d.header.photo ? imgDataUrl(d.header.photo) : null;
  const contactStr = d.header.contact.map(c => esc(c.value)).join('　|　');

  const headerHtml = `
    <div class="zh-header">
      <div class="zh-left">
        <div class="zh-name">${esc(d.header.name)}</div>
        <div class="zh-contact">${contactStr}</div>
        ${d.header.website ? `<div class="zh-web">个人网站：${esc(d.header.website)}</div>` : ''}
        ${d.header.github ? `<div class="zh-web">GitHub：${esc(d.header.github)}</div>` : ''}
        ${d.header.tagline ? `<div class="zh-tagline">${esc(d.header.tagline)}</div>` : ''}
      </div>
      ${photoUrl ? `<div class="zh-right"><img src="${photoUrl}" class="zh-photo"/></div>` : ''}
    </div>`;

  let sectionsHtml = '';

  for (const sec of d.sections) {
    sectionsHtml += `<div class="section-title">${esc(sec.title)}</div>`;

    if (sec.type === 'education_zh') {
      for (const e of sec.entries) {
        sectionsHtml += `
          <div class="edu-row">
            <span class="edu-date">${esc(e.date)}</span>
            <span class="edu-inst">${esc(e.institution)}</span>
            <span class="edu-deg">${esc(e.degree)}</span>
            <span class="edu-gpa">${esc(e.gpa)}</span>
          </div>`;
      }
      if (sec.coursework) sectionsHtml += `<div class="minor">${esc(sec.coursework)}</div>`;
      if (sec.website)    sectionsHtml += `<div class="minor">${esc(sec.website)}</div>`;
    }

    if (sec.type === 'experience_zh') {
      for (const e of sec.entries) {
        sectionsHtml += `
          <div class="exp-header">
            <span class="exp-date">${esc(e.date)}</span>
            <span class="exp-company">${esc(e.company)}</span>
            <span class="exp-title">${esc(e.title)}</span>
            <span class="exp-loc">${esc(e.location)}</span>
          </div>
          <ul>${e.bullets.map(b => `<li>${esc(b)}</li>`).join('')}</ul>`;
      }
    }

    if (sec.type === 'skills_zh') {
      for (const e of sec.entries) {
        sectionsHtml += `<div class="skill-row"><b>${esc(e.label)}：</b>${esc(e.value)}</div>`;
      }
    }
  }

  return `<!DOCTYPE html><html lang="zh"><head><meta charset="UTF-8">
  <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;500;700&display=swap" rel="stylesheet">
  <style>
    *{margin:0;padding:0;box-sizing:border-box}
    html,body{width:210mm;font-family:'Noto Serif SC','PingFang SC','Microsoft YaHei',serif;font-size:9.5pt;line-height:1.25;color:#000}
    body{padding:10mm 13mm}
    .zh-header{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:4pt;padding-bottom:4pt;border-bottom:1.5px solid #000}
    .zh-left{flex:1}
    .zh-name{font-size:22pt;font-weight:700;letter-spacing:4pt;margin-bottom:3pt}
    .zh-contact{font-size:9pt;margin-bottom:2pt}
    .zh-web{font-size:9pt;color:#333}
    .zh-tagline{font-size:8.5pt;color:#555;margin-top:3pt;font-style:italic}
    .zh-right{margin-left:12pt}
    .zh-photo{width:68pt;height:90pt;object-fit:cover;object-position:top;border:.5px solid #ccc}
    .section-title{font-size:10.5pt;font-weight:700;border-bottom:1.2px solid #000;margin-top:5pt;margin-bottom:2.5pt;padding-bottom:1pt}
    .edu-row{display:flex;gap:6pt;font-size:9.5pt;margin-bottom:2pt;align-items:baseline}
    .edu-date{min-width:82pt;color:#333}
    .edu-inst{flex:1;font-weight:700}
    .edu-deg{min-width:68pt}
    .edu-gpa{min-width:58pt;text-align:right}
    .minor{font-size:9pt;margin-top:1.5pt;margin-bottom:1pt;color:#222}
    .exp-header{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));font-size:9.5pt;font-weight:700;margin-top:3pt;align-items:baseline}
    .exp-date{font-weight:400;color:#333}
    .exp-company{}
    .exp-title{padding-left:12pt}
    .exp-loc{color:#444;font-weight:400;text-align:right}
    ul{margin:2pt 0 1pt 0;padding-left:12pt}
    li{font-size:9pt;margin-bottom:1.5pt;line-height:1.3}
    .skill-row{font-size:9pt;margin-bottom:1.5pt}
  </style></head><body>${headerHtml}${sectionsHtml}</body></html>`;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

(async () => {
  console.log(`\nGenerating ${lang.toUpperCase()} resume...`);
  fs.mkdirSync(path.join(ROOT, 'output'), { recursive: true });

  const html = lang === 'en' ? buildEnHtml(data) : buildZhHtml(data);

  // Write debug HTML (open this in browser to preview without running Puppeteer)
  const debugPath = path.join(ROOT, 'output', `debug_${lang}.html`);
  fs.writeFileSync(debugPath, html);
  console.log(`  HTML preview: ${debugPath}`);

  // Page dimensions in px at 96dpi: Letter=8.5×11in, A4=210×297mm
  const pageW   = lang === 'en' ? 816  : 794;
  const pageH   = lang === 'en' ? 1056 : 1123;

  const browser = await puppeteer.launch({
    headless: true,
    executablePath: CHROME_PATH,
    args: ['--font-render-hinting=none'],
  });
  const page = await browser.newPage();

  // Set viewport to exact page width so layout matches paper width
  await page.setViewport({ width: pageW, height: pageH, deviceScaleFactor: 1 });
  await page.setContent(html, { waitUntil: 'networkidle0' });

  // Measure real content height
  const contentH = await page.evaluate(() => document.documentElement.scrollHeight);

  if (contentH > pageH) {
    // CSS zoom (unlike transform) affects layout flow — content physically shrinks
    const zoom = pageH / contentH;
    console.warn(`  ⚠  Content is ${contentH}px — zooming to ${(zoom * 100).toFixed(1)}% to fit one page.`);
    await page.evaluate((z, pW) => {
      document.documentElement.style.zoom = String(z);
      // Re-center: zoom scales from top-left, so right side gets extra whitespace.
      // Add margin-left = half the freed space to restore symmetric margins.
      const offset = Math.round(pW * (1 - z) / 2);
      document.documentElement.style.marginLeft = `${offset}px`;
    }, zoom, pageW);
  } else {
    console.log(`  ✓  Fits one page (${contentH}px / ${pageH}px)`);
  }

  // Measure again after zoom — use this as the exact PDF height (= 1 page guaranteed)
  const finalH = await page.evaluate(() => document.documentElement.scrollHeight);

  await page.pdf({
    path: outputPath,
    width:  `${pageW}px`,
    height: `${finalH + 1}px`, // +1px avoids float rounding overflow
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  });
  await browser.close();
  console.log(`  PDF saved: ${outputPath}`);

  // --copy: push PDF to public/assets/documents/ so the website serves it
  if (shouldCopy) {
    const dest = path.join(PROJECT_ROOT, 'public', 'assets', 'documents', outputName);
    fs.copyFileSync(outputPath, dest);
    console.log(`  Copied to: ${dest}`);
  }

  if (shouldOpen) {
    require('child_process').exec(`open "${outputPath}"`);
  }

  console.log('');
})();
