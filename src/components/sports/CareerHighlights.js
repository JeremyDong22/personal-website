import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import translations from '../../context/translations';
import Section from '../Section';

// Import data
import { careerHighlights } from './data/highlightsData';

const CareerHighlights = () => {
  const { language } = useLanguage();
  const t = translations.sports;

  return (
    <Section
      title={t.highlights[language]}
      subtitle="A journey of dedication, perseverance, and achievement"
      className="bg-darkgray pt-24 md:pt-32"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {careerHighlights.map((highlight, index) => (
          <motion.div
            key={index}
            className="bg-dark border border-primary/20 p-6 luxury-shadow"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <div className="flex items-start gap-4">
              <div className="mt-1">{highlight.icon}</div>
              <div>
                <div className="text-primary text-sm uppercase tracking-wider mb-1">{highlight.year}</div>
                <h3 className="text-xl font-heading mb-2">
                  {language === 'en' ? highlight.titleEn : highlight.titleZh}
                </h3>
                <p className="text-light/80">
                  {language === 'en' ? highlight.descriptionEn : highlight.descriptionZh}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};

export default CareerHighlights; 