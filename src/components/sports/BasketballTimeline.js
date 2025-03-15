import React from 'react';
import { motion } from 'framer-motion';
import { FiClock } from 'react-icons/fi';
import { useLanguage } from '../../context/LanguageContext';
import translations from '../../context/translations';
import Section from '../Section';

// Import timeline images
import twilightBasketball from '../../assets/images/sports/timeline/uiuc_twilight_team_2021.jpg';
import varsityBasketball from '../../assets/images/sports/timeline/donovan_varsity_team_2018.jpg';
import highschoolBasketball from '../../assets/images/sports/timeline/shenzhen_intl_team_2017.jpg';

// Import timeline data
import { careerTimeline } from './data/timelineData';

const BasketballTimeline = () => {
  const { language } = useLanguage();
  const t = translations.sports;

  return (
    <Section
      title={t.timeline[language]}
      subtitle={t.timelineSubtitle[language]}
      className="bg-dark"
    >
      <div className="relative border-l-2 border-primary/30 pl-8 ml-4 md:ml-8 space-y-12">
        {careerTimeline.map((event, index) => (
          <motion.div
            key={index}
            className="relative"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            {/* Timeline dot */}
            <div className="absolute -left-[41px] top-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
              <FiClock className="text-dark text-sm" />
            </div>
            
            {/* Year badge */}
            <div className="inline-block bg-primary/20 text-primary px-3 py-1 text-sm font-medium uppercase tracking-wider mb-3">
              {event.year}
            </div>
            
            {/* Content */}
            <h3 className="text-xl font-heading mb-2">
              {language === 'en' ? event.titleEn : event.titleZh}
            </h3>
            <p className="text-light/80 mb-2">
              {language === 'en' ? event.descriptionEn : event.descriptionZh}
            </p>
            
            {/* Show the other language in smaller text */}
            <p className="text-light/50 text-sm italic mb-4">
              {language === 'en' ? event.titleZh : event.titleEn}
            </p>
            
            {/* Add team photo if available */}
            {event.image && (
              <div className="mt-4 p-1 bg-gold-gradient max-w-md">
                <div className={`overflow-hidden ${event.year === '2021-2022' ? 'relative' : ''}`}>
                  <img
                    src={event.image}
                    alt={language === 'en' ? event.titleEn : event.titleZh}
                    className={`w-full relative z-10 ${
                      event.year === '2021-2022' 
                        ? 'h-auto scale-110 transform -translate-y-4' 
                        : 'h-auto'
                    }`}
                  />
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </Section>
  );
};

export default BasketballTimeline; 