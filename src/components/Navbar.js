import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMenu, FiX, FiGlobe } from 'react-icons/fi';
import { useLanguage } from '../context/LanguageContext';
import translations from '../context/translations';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { language, toggleLanguage } = useLanguage();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Toggle mobile menu
  const toggleMenu = () => setIsOpen(!isOpen);

  // Close menu when clicking a link
  const closeMenu = () => setIsOpen(false);

  // Navigation items with translations
  const navItems = [
    { name: translations.nav.home[language], path: '/' },
    { name: translations.nav.about[language], path: '/journey' },
    { name: translations.nav.projects[language], path: '/projects' },
    { name: translations.nav.sports[language] || 'Sports Career', path: '/sports' },
    { name: translations.nav.resume[language], path: '/resume' },
    { name: translations.nav.contact[language], path: '/contact' },
  ];

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-darkest border-b border-primary/20 backdrop-blur-sm py-3' : 'bg-darkest/90 backdrop-blur-sm py-5'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-heading font-bold">
          <span className="gold-text">Jeremy</span><span className="text-light"> Dong</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center">
          <nav className="flex space-x-8 mr-8">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `text-lg font-medium uppercase tracking-wider transition-colors hover:text-primary ${
                    isActive ? 'text-primary' : 'text-light/90'
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </nav>
          
          {/* Language Switcher */}
          <button 
            onClick={toggleLanguage}
            className="flex items-center gap-2 text-primary hover:text-lightgold transition-colors px-3 py-1 border border-primary/20 hover:border-primary/50 rounded-none"
            aria-label="Switch language"
          >
            <FiGlobe size={16} />
            <span className="text-sm uppercase tracking-wider">{translations.nav.language[language]}</span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          {/* Language Switcher (Mobile) */}
          <button 
            onClick={toggleLanguage}
            className="text-primary hover:text-lightgold transition-colors mr-4"
            aria-label="Switch language"
          >
            <FiGlobe size={20} />
          </button>
          
          {/* Menu Toggle */}
          <button
            className="text-primary focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-darkest border-b border-primary/20 absolute top-full left-0 right-0"
        >
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `text-lg font-medium uppercase tracking-wider py-2 transition-colors hover:text-primary ${
                    isActive ? 'text-primary' : 'text-light/90'
                  }`
                }
                onClick={closeMenu}
              >
                {item.name}
              </NavLink>
            ))}
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Navbar; 