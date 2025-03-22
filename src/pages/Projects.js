import React from 'react';
import { motion } from 'framer-motion';
import { FiClock, FiGithub, FiExternalLink } from 'react-icons/fi';
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
    projects: {
      title: {
        en: "Featured Projects",
        zh: "精选项目"
      },
      description: {
        en: "Here are some of my recent projects that showcase my skills and interests.",
        zh: "以下是我最近的一些项目，展示了我的技能和兴趣。"
      },
      logistics: {
        title: {
          en: "Logistics Aggregation Solution",
          zh: "菜鸟物流价格查询系统"
        },
        description: {
          en: "A Node.js-based logistics price query system that provides optimal shipping recommendations based on item type, weight, and destination country. Features include intelligent weight estimation, automatic item classification, multi-country support, AI-powered conversation, and database integration.",
          zh: "这是一个基于Node.js的物流价格查询系统，可以根据物品类型、重量和目的地国家，提供最合适的物流方案建议。功能包括智能物品重量估算、自动物品分类、多国家支持、AI对话交互和数据库支持。"
        },
        tech: {
          en: "Node.js, Express.js, SQLite3, OpenAI API (GPT-3.5-turbo)",
          zh: "Node.js, Express.js, SQLite3, OpenAI API (GPT-3.5-turbo)"
        }
      },
      priceCrawler: {
        title: {
          en: "JD Price Crawler",
          zh: "京东价格爬虫工具"
        },
        description: {
          en: "A modern, intelligent web scraper for JD.com with an easy-to-use web interface. Features include smart page detection, improved login handling, price variation detection, and detailed data extraction. The system uses human-like browser interactions and image recognition to avoid detection.",
          zh: "一个现代、智能的京东网站爬虫，具有易用的网页界面。特点包括智能页面检测、改进的登录处理、价格变化监测、以及详细的数据提取。系统使用类人浏览器交互和图像识别技术以避免被检测。"
        },
        tech: {
          en: "Python, Selenium, OpenCV, PyAutoGUI, Flask",
          zh: "Python, Selenium, OpenCV, PyAutoGUI, Flask"
        }
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
      
      {/* Projects Section */}
      <Section className="bg-darkgray">
        <motion.div 
          className="py-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-primary">
              {translations.projects.title[language]}
            </h2>
            <p className="text-xl text-light/80 max-w-2xl mx-auto">
              {translations.projects.description[language]}
            </p>
          </div>
          
          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-12">
            {/* Logistics Aggregation Solution */}
            <motion.div
              className="bg-dark border border-primary/20 rounded-lg overflow-hidden luxury-shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="aspect-w-16 aspect-h-9 bg-gray-800 p-8 flex items-center justify-center text-primary">
                <div className="text-center">
                  <div className="text-6xl mb-4">📦</div>
                  <h3 className="text-xl font-semibold">
                    {translations.projects.logistics.title[language]}
                  </h3>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-primary">
                  {translations.projects.logistics.title[language]}
                </h3>
                <p className="text-light/80 mb-4">
                  {translations.projects.logistics.description[language]}
                </p>
                <div className="mb-4">
                  <h4 className="text-sm uppercase tracking-wider text-primary/70 mb-2">
                    {language === 'en' ? 'Technologies' : '技术栈'}
                  </h4>
                  <p className="text-light/60 text-sm">
                    {translations.projects.logistics.tech[language]}
                  </p>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-primary/10">
                  <a 
                    href="https://github.com/JeremyDong22/Logistics-Aggregation-Solution" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center text-primary hover:text-primary/80 transition-colors"
                  >
                    <FiGithub className="mr-2" />
                    {language === 'en' ? 'View on GitHub' : '在GitHub上查看'}
                  </a>
                </div>
              </div>
            </motion.div>
            
            {/* JD Price Crawler */}
            <motion.div
              className="bg-dark border border-primary/20 rounded-lg overflow-hidden luxury-shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="aspect-w-16 aspect-h-9 bg-gray-800 p-8 flex items-center justify-center text-primary">
                <div className="text-center">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold">
                    {translations.projects.priceCrawler.title[language]}
                  </h3>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-primary">
                  {translations.projects.priceCrawler.title[language]}
                </h3>
                <p className="text-light/80 mb-4">
                  {translations.projects.priceCrawler.description[language]}
                </p>
                <div className="mb-4">
                  <h4 className="text-sm uppercase tracking-wider text-primary/70 mb-2">
                    {language === 'en' ? 'Technologies' : '技术栈'}
                  </h4>
                  <p className="text-light/60 text-sm">
                    {translations.projects.priceCrawler.tech[language]}
                  </p>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-primary/10">
                  <a 
                    href="https://github.com/JeremyDong22/JD_Price_Crawler" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center text-primary hover:text-primary/80 transition-colors"
                  >
                    <FiGithub className="mr-2" />
                    {language === 'en' ? 'View on GitHub' : '在GitHub上查看'}
                  </a>
                </div>
              </div>
            </motion.div>
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
            href="mailto:hengd3@outlook.com" 
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