# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
Jeremy's Personal Website - A modern React-based portfolio website deployed on GitHub Pages with multilingual support (English/Chinese).

## Development Commands

### Essential Commands
```bash
# Start development server (Vite - instant ~250ms startup)
npm start
# or: npm run dev

# Build for production (outputs to dist/)
npm run build

# Preview production build locally
npm run preview

# Deploy to GitHub Pages (builds first via predeploy, then gh-pages -d dist)
npm run deploy
```

### Common Development Tasks
- **Adding a new page**: Create component in `src/pages/`, add route in `src/App.js` using HashRouter
- **Modifying styles**: Update Tailwind classes or modify `tailwind.config.js` for theme changes
- **Adding translations**: Update components to use `LanguageContext` and add translations inline
- **EmailJS issues**: Check credentials in `src/components/ContactForm.js` (lines 64-79)

## Architecture & Key Patterns

### Routing Strategy
Uses HashRouter (not BrowserRouter) for GitHub Pages compatibility. All routes are defined in `src/App.js` with the pattern:
```jsx
<Route path="/routename" element={<ComponentName />} />
```

### Component Structure
- **Pages**: Self-contained page components in `/src/pages/`
- **Shared Components**: Reusable UI components in `/src/shared/components/`
- **Context**: Language switching via `src/context/LanguageContext.js`

### Styling Approach
- Tailwind CSS with custom theme colors (gold/dark theme)
- Custom colors defined in `tailwind.config.js`:
  - `primary`: #D4AF37 (gold)
  - `dark`/`darker`/`darkest`: Dark theme variations
- Fonts: Montserrat (body), Playfair Display (headings)

### State Management
- Language preference: React Context API + localStorage
- No global state management library - components manage local state

### EmailJS Configuration
Contact form uses two templates:
1. **Notification** (template_kawpou6): Sends to dongheng@illinois.edu
2. **Auto-reply** (template_r968gel): Sends confirmation to form submitter

Required template parameters: `name`, `email`, `title`, `message`

### Build & Deployment
- **Build flags**: `CI=false` prevents treating warnings as errors, `NODE_OPTIONS=--openssl-legacy-provider` handles OpenSSL compatibility
- **Deployment**: Automated via `gh-pages` package to GitHub Pages
- **Homepage**: Set in package.json as `https://jeremydong22.github.io`

## File Organization
```
src/
├── pages/          # Page components (Home, About, Projects, etc.)
├── components/     # Feature-specific components
├── shared/         # Reusable components (Section, Hero, etc.)
├── context/        # React Context providers
├── assets/         # Images organized by feature
└── styles/         # Global styles and Tailwind imports
```

## Important Considerations
- **No backend**: Pure client-side application
- **Image paths**: Use `/assets/` for public assets
- **Responsive design**: Mobile-first approach required
- **Dark theme**: All new components must support the dark color scheme
- **Performance**: Use Framer Motion sparingly for animations
- **SEO**: Limited due to client-side rendering

## Testing Approach
Currently uses Create React App's default test setup. No existing tests - would use React Testing Library if added.

---

## Resume Editing Guide

### Where everything lives
```
resume-builder/
├── data/
│   ├── resume.en.json   ← Edit English resume content here
│   └── resume.zh.json   ← Edit Chinese resume content here
├── assets/
│   └── photo.jpeg       ← Headshot photo (replace this file to update photo)
└── generate.js          ← Generator script (don't touch unless fixing layout)

resume-builder/output/   ← Generated files (do NOT edit directly)
├── debug_en.html        ← Browser preview of English resume
├── debug_zh.html        ← Browser preview of Chinese resume
├── Resume_English.pdf   ← Final English PDF
└── Resume_Chinese.pdf   ← Final Chinese PDF
```

### Editing workflow
1. Edit `resume-builder/data/resume.zh.json` or `resume.en.json`
2. Run `/resume zh --open` or `/resume en --open` to generate + preview PDF
3. Or open `resume-builder/output/debug_zh.html` in browser for quick HTML preview (just refresh after each generate)

### Generate commands
```bash
cd resume-builder
node generate.js zh          # generate Chinese PDF
node generate.js en          # generate English PDF
node generate.js zh --open   # generate + auto-open in Preview
node generate.js en --open
node generate.js zh --copy   # generate + sync to website (see below)
```
Or use the slash command: `/resume zh --open`

### One-page guarantee
The generator auto-zooms content to fit exactly one page. If zoom drops below ~88%, consider removing less important bullet points from the JSON.

---

## Syncing Resume to the Website

### Sync 1 — Resume page (PDF download)
The resume page at `/resume` serves the PDF files directly from `public/assets/documents/`.
To update:
```bash
cd resume-builder
node generate.js zh --copy   # copies Resume_Chinese.pdf → public/assets/documents/
node generate.js en --copy   # copies Resume_English.pdf → public/assets/documents/
```
Then deploy: `npm run deploy`

The About page also has a broken reference at `src/pages/About.js` line 324 pointing to `/assets/resume/resume_en.pdf` — fix it to `/assets/documents/Resume_English.pdf` if needed.

### Sync 2 — About/Experience page (company cards with logos)
The About page (`src/pages/About.js`) has a hardcoded experience list starting around line 39. Each entry looks like:
```js
{
  company: 'Source Ready',
  companyDescription: 'Supply Chain SaaS Startup',
  role: 'Growth Analyst Intern',
  period: 'Jan 2025 – Mar 2025',
  website: 'https://sourceready.com',
  logoUrl: '/assets/images/logos/sourceready.png'
}
```

To add a new company to the About page:
1. Add a PNG logo to `public/assets/images/logos/<companyname>.png`
2. Add a new entry object in `About.js` experience array
3. Add a logo `<img>` case in the logo rendering section (~line 533)
4. Add Chinese name mapping (~line 578) and title mapping (~line 579)

Existing logos: `sourceready.png`, `usp.png`, `kaifeng.png`, `gyja.png`, `molex.png`, `bdo.png`, `uiuc.png`
Missing logos needed: `smartice.png`, `shootit.png` (for new companies added to resume)