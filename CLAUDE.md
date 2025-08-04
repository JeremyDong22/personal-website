# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
Jeremy's Personal Website - A modern React-based portfolio website deployed on GitHub Pages with multilingual support (English/Chinese).

## Development Commands

### Essential Commands
```bash
# Start development server
npm start

# Build for production (with required flags for CRA compatibility)
CI=false NODE_OPTIONS=--openssl-legacy-provider npm run build

# Deploy to GitHub Pages
npm run deploy

# Run tests (if any are added)
npm test
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