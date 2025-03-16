# Jeremy's Personal Website Structure

```
src/
├── features/                  # Feature-based organization
│   ├── home/                  # Home page feature
│   │   ├── Home.js           # Home page component
│   │   └── index.js          # Export for Home
│   ├── about/                 # About page feature
│   │   ├── About.js          # About page component
│   │   └── index.js          # Export for About
│   ├── contact/               # Contact page feature
│   │   ├── Contact.js        # Contact page component
│   │   ├── ContactForm.js    # Contact form component
│   │   ├── QRCodeModal.js    # QR code modal component
│   │   └── index.js          # Export for Contact
│   ├── resume/                # Resume page feature
│   │   ├── Resume.js         # Resume page component
│   │   └── index.js          # Export for Resume
│   ├── sports/                # Sports page feature
│   │   ├── Sports.js         # Sports page component
│   │   ├── components/       # Sports-specific components
│   │   │   ├── SportsHero.js
│   │   │   ├── CareerHighlights.js
│   │   │   └── BasketballTimeline.js
│   │   ├── data/             # Sports-specific data
│   │   └── index.js          # Export for Sports
│   ├── projects/              # Projects page feature
│   │   ├── Projects.js       # Projects page component
│   │   └── index.js          # Export for Projects
│   └── journey/               # Journey page feature
│       ├── Journey.js        # Journey page component
│       └── index.js          # Export for Journey
│
├── shared/                    # Shared resources across features
│   ├── components/            # Shared UI components
│   │   ├── Hero.js           # Hero component
│   │   ├── Section.js        # Section component
│   │   ├── SkillBar.js       # Skill bar component
│   │   └── ProjectCard.js    # Project card component
│   ├── layouts/               # Layout components
│   │   ├── Navbar.js         # Navigation bar
│   │   └── Footer.js         # Footer component
│   ├── context/               # Application context
│   │   ├── LanguageContext.js # Language context provider
│   │   └── translations.js   # Translation strings
│   ├── hooks/                 # Custom React hooks
│   ├── utils/                 # Utility functions
│   ├── assets/                # Static assets (images, fonts)
│   │   └── images/           # Image assets
│   └── styles/                # Global styles
│
├── App.js                     # Main application component
└── index.js                   # Application entry point
```

## Component Relationships

```
App
├── LanguageProvider (Context)
├── Navbar
├── Routes
│   ├── Home
│   │   ├── Hero
│   │   ├── Section (About)
│   │   ├── Section (Skills)
│   │   ├── Section (Projects)
│   │   │   └── ProjectCard(s)
│   │   └── QRCodeModal
│   ├── About
│   │   ├── Hero
│   │   └── Section(s)
│   ├── Sports
│   │   ├── SportsHero
│   │   ├── CareerHighlights
│   │   └── BasketballTimeline
│   ├── Projects
│   │   ├── Hero
│   │   └── ProjectCard(s)
│   ├── Resume
│   │   └── Section(s)
│   ├── Contact
│   │   ├── Section
│   │   ├── ContactForm
│   │   └── QRCodeModal
│   └── Journey
│       └── Section(s)
└── Footer
``` 