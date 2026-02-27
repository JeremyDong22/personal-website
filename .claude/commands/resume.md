---
description: Generate resume PDF from JSON data. Usage: /resume [en|zh] [--open] [--copy]
---

# Resume Generator

Generate a pixel-perfect one-page PDF resume from structured JSON data.

## Usage
```
/resume [en|zh] [--open] [--copy]
```

## Arguments
- `en` — Generate English resume (default)
- `zh` — Generate Chinese resume
- `--open` — Open the PDF in Preview after generating
- `--copy` — Copy the generated PDF to `public/assets/documents/` (updates the website)

## How it works

Run the generator from the `resume-builder/` directory:

```bash
cd resume-builder && node generate.js $ARGUMENTS
```

## Editing resume content

Edit the JSON data files — no code changes needed:
- `resume-builder/data/resume.en.json` — English resume content
- `resume-builder/data/resume.zh.json` — Chinese resume content

Each entry supports:
- `company` / `institution` — Organization name
- `title` — Your role/position
- `date` — Date range
- `location` — City, Country
- `bullets` — Array of bullet point strings

## Output files
- `resume-builder/output/Resume_English.pdf`
- `resume-builder/output/Resume_Chinese.pdf`
- `resume-builder/output/debug_en.html` — Browser preview (no Puppeteer needed)
- `resume-builder/output/debug_zh.html`

## One-page guarantee
The generator automatically zooms content to fit exactly one page. If zoom drops below 85%, consider removing less relevant entries from the JSON.

## Update website PDFs
After generating, run with `--copy` flag to push updated PDFs to the live website:
```bash
cd resume-builder && node generate.js en --copy && node generate.js zh --copy
```
