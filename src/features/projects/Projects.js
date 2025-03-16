import React from 'react';
import { motion } from 'framer-motion';
import { FiClock } from 'react-icons/fi';
import { useLanguage } from '../context/LanguageContext';

// Components
import Hero from '../components/Hero';
import Section from '../components/Section';

const Projects = () => {
  const { language } = useLanguage();

  const translations = {
    hero: {
      title: {
        en: "My Projects",
        zh: "我的项目"
      },
      subtitle: {
        en: "A showcase of my work and contributions",
        zh: "展示我的工作和贡献"
      }
    },
    comingSoon: {
      title: {
        en: "Projects Coming Soon",
        zh: "项目即将推出"
      },
      description: {
        en: "I'm currently working on exciting projects that will be showcased here. Stay tuned!",
        zh: "我正在开发一些令人兴奋的项目，它们将在这里展示。敬请期待！"
      }
    },
    cta: {
      title: {
        en: "Have a project in mind?",
        zh: "有项目想法？"
      },
      description: {
        en: "I'm always looking for new challenges and opportunities to collaborate on interesting projects.",
        zh: "我一直在寻找新的挑战和机会，希望能在有趣的项目上进行合作。"
      },
      button: {
        en: "Get in Touch",
        zh: "联系我"
      }
    }
  };
  
  return (
    <>
      {/* Hero Section */}
      <Hero
        title={translations.hero.title[language]}
        subtitle={translations.hero.subtitle[language]}
      />
      
      {/* Coming Soon Section */}
      <Section className="bg-darkgray">
        <motion.div 
          className="text-center py-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <FiClock className="text-primary text-6xl mx-auto mb-6" />
          <h2 className="text-4xl font-bold mb-4 text-primary">
            {translations.comingSoon.title[language]}
          </h2>
          <p className="text-xl text-light/80 max-w-2xl mx-auto mb-8">
            {translations.comingSoon.description[language]}
          </p>
          
          {/* Placeholder Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {[1, 2, 3].map((index) => (
              <motion.div
                key={index}
                className="bg-dark border border-primary/20 rounded-lg p-6 luxury-shadow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="aspect-w-16 aspect-h-9 bg-gray-800 rounded-lg mb-4 overflow-hidden">
                  <div className="flex items-center justify-center h-full text-primary/50">
                    <FiClock className="text-4xl" />
                  </div>
                </div>
                <div className="h-4 bg-gray-800 rounded w-3/4 mb-3"></div>
                <div className="h-3 bg-gray-800 rounded w-1/2"></div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Section>
      
      {/* Call to Action */}
      <Section className="bg-dark text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
            {translations.cta.title[language]}
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-light/80">
            {translations.cta.description[language]}
          </p>
          <a 
            href="mailto:your.email@example.com" 
            className="btn btn-primary"
          >
            {translations.cta.button[language]}
          </a>
        </motion.div>
      </Section>
    </>
  );
};

export default Projects; 