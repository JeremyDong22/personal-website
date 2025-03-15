import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiGithub, FiLinkedin, FiMail, FiPhone } from 'react-icons/fi';
import { SiWechat } from 'react-icons/si';
import { useLanguage } from '../context/LanguageContext';
import translations from '../context/translations';
import QRCodeModal from './QRCodeModal';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { language } = useLanguage();
  const [showQRModal, setShowQRModal] = useState(false);

  return (
    <footer className="bg-darkgray text-light py-12 relative">
      {/* QR Code Modal */}
      <QRCodeModal isOpen={showQRModal} onClose={() => setShowQRModal(false)} />
      
      {/* Gold accent line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gold-gradient"></div>
      
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                JD
              </div>
              <span className="gold-text text-2xl font-heading font-bold">Jeremy Dong</span>
            </Link>
            <p className="mt-4 text-light/70">
              {translations.footer.description[language]}
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-xl font-heading font-semibold mb-4 text-primary">{translations.footer.navigation[language]}</h3>
            <ul className="space-y-2">
              {[
                { name: translations.nav.home[language], path: '/' },
                { name: translations.nav.about[language], path: '/about' },
                { name: translations.nav.projects[language], path: '/projects' },
                { name: translations.nav.contact[language], path: '/contact' },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-light/70 hover:text-primary transition-colors uppercase tracking-wider text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div className="col-span-1">
            <h3 className="text-xl font-heading font-semibold mb-4 text-primary">{translations.footer.connect[language]}</h3>
            <div className="flex space-x-4">
              <a
                href="https://github.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="text-light/70 hover:text-primary transition-colors"
                aria-label="GitHub"
              >
                <FiGithub size={24} />
              </a>
              <a
                href="https://linkedin.com/in/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="text-light/70 hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <FiLinkedin size={24} />
              </a>
              <a
                href="mailto:hengd3@outlook.com"
                className="text-light/70 hover:text-primary transition-colors"
                aria-label="Email"
              >
                <FiMail size={24} />
              </a>
              <a
                href="tel:+12179740277"
                className="text-light/70 hover:text-primary transition-colors"
                aria-label="Phone"
              >
                <FiPhone size={24} />
              </a>
              <a
                href="#"
                className="text-light/70 hover:text-primary transition-colors"
                aria-label="WeChat"
                onClick={(e) => {
                  e.preventDefault();
                  setShowQRModal(true);
                }}
              >
                <SiWechat size={24} />
              </a>
            </div>
            <p className="mt-4 text-light/70">
              {translations.footer.availability[language]}
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 text-center text-light/50 relative">
          <div className="gold-divider"></div>
          <p className="uppercase tracking-widest text-xs">
            © {currentYear} Jeremy Dong. {translations.footer.rights[language]}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 