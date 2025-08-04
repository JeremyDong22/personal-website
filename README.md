# Jeremy's Personal Website

A modern, responsive personal portfolio website built with React and Tailwind CSS.

## Features

- 📱 Fully responsive design that looks great on all devices
- ✨ Modern UI with smooth animations and transitions
- 🎨 Customizable color scheme and styling
- 📝 Detailed about page with skills, experience, and education sections
- 💼 Filterable projects portfolio
- 📬 Functional contact form
- 🔍 SEO-friendly structure

## Tech Stack

- **React**: Frontend library for building user interfaces
- **React Router**: For navigation and routing
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: For animations and transitions
- **React Icons**: For beautiful icons
- **React Intersection Observer**: For scroll animations

## Getting Started

### Prerequisites

- Node.js (v14.0.0 or later)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/personal-website.git
   cd personal-website
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Customization

### Personal Information

Update your personal information in the following files:

- `src/pages/Home.js`: Update hero section, about section, and featured projects
- `src/pages/About.js`: Update bio, skills, experience, and education
- `src/pages/Projects.js`: Update project details
- `src/pages/Contact.js`: Update contact information

### Styling

- Colors: Modify the color scheme in `tailwind.config.js`
- Typography: Update font settings in `tailwind.config.js` and `src/styles/index.css`
- Components: Customize component styles in their respective files

## Deployment

This project can be deployed to various platforms:

### Netlify

1. Push your code to a GitHub repository
2. Sign up for Netlify
3. Click "New site from Git"
4. Select your repository
5. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `build`
6. Click "Deploy site"

### Vercel

1. Push your code to a GitHub repository
2. Sign up for Vercel
3. Import your repository
4. Configure build settings if needed
5. Click "Deploy"

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [React Icons](https://react-icons.github.io/react-icons/)

## Setting Up the Contact Form with EmailJS

The contact form is configured to use EmailJS to send emails directly from the client-side without needing a backend server. Follow these steps to set it up:

1. Create a free account at [EmailJS](https://www.emailjs.com/)
2. Create a new Email Service in your EmailJS dashboard (Gmail, Outlook, etc.)
3. Create a new Email Template with the following variables:
   - `user_name`: The name of the person contacting you
   - `user_email`: The email of the person contacting you
   - `subject`: The subject of the message
   - `message`: The content of the message
4. Get your EmailJS credentials:
   - Service ID: Found in the "Email Services" section
   - Template ID: Found in the "Email Templates" section
   - Public Key: Found in the "Account" section
5. Update the `src/components/ContactForm.js` file with your credentials:
   ```javascript
   const serviceId = 'YOUR_SERVICE_ID';
   const templateId = 'YOUR_TEMPLATE_ID';
   const publicKey = 'YOUR_PUBLIC_KEY';
   ```

Once configured, the contact form will send emails to the address you specified in your EmailJS template whenever someone submits the form.

---

Made with ❤️ by Jeremy Dong # Trigger Vercel deployment
