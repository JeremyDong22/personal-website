/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#D4AF37",
        secondary: "#9D8221",
        dark: "#121212",        // Darker base
        darker: "#0A0A0A",      // Almost black
        darkest: "#080808",     // Nearly black
        darkgray: "#1E1E1E",    // Microsoft VS Code dark theme color
        lightgray: "#242424",   // Slightly lighter
        light: "#F5F5F5",
        accent: "#E5C100",
        lightgold: "#F8E9A1",
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
        heading: ['Playfair Display', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-in-out',
        'shimmer': 'shimmer 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(45deg, #D4AF37 0%, #F8E9A1 50%, #D4AF37 100%)',
        'dark-gradient': 'linear-gradient(180deg, #121212 0%, #0A0A0A 100%)',
        'section-gradient': 'linear-gradient(180deg, #1E1E1E 0%, #121212 100%)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
} 