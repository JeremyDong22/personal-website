import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import translations from '../../context/translations';
import heroImage from '../../assets/images/sports/hero/sports_hero.jpg';

const SportsHero = () => {
  const { language } = useLanguage();
  const t = translations.sports;

  return (
    <section className="sports-hero bg-dark">
      {/* Gold accent lines */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gold-gradient"></div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gold-gradient"></div>
      
      {/* Background Image with Overlay */}
      <img 
        src={heroImage} 
        alt="Sports Hero" 
        className="sports-hero-image"
      />
      <div className="sports-hero-overlay"></div>
      
      <div className="sports-hero-content">
        <motion.div 
          className="w-full max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="mb-8 relative">
            <span className="gold-text text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">{t.title[language]}</span>
            <div className="w-24 h-1 bg-primary mt-6 mx-auto"></div>
          </h1>
          
          <p className="text-xl md:text-2xl text-light/90 mb-8 leading-relaxed">
            {t.subtitle[language]}
          </p>
        </motion.div>
      </div>
      
      <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 bg-dark/80 backdrop-blur-sm p-2 md:p-3 max-w-xs text-light/80 text-xs md:text-sm border-l-2 border-primary z-10">
        {t.photoCaption[language]}
      </div>
    </section>
  );
};

export default SportsHero; 