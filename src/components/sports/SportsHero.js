import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import translations from '../../context/translations';
import Hero from '../Hero';
import heroImage from '../../assets/images/sports/hero/sports_hero.jpg';

const SportsHero = () => {
  const { language } = useLanguage();
  const t = translations.sports;

  return (
    <div className="relative">
      <Hero
        title={t.title[language]}
        subtitle={t.subtitle[language]}
        image={heroImage}
      />
      <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 bg-dark/80 backdrop-blur-sm p-2 md:p-3 max-w-xs text-light/80 text-xs md:text-sm border-l-2 border-primary">
        {t.photoCaption[language]}
      </div>
    </div>
  );
};

export default SportsHero; 