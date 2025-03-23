import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiFilter } from 'react-icons/fi';
import { useLanguage } from '../context/LanguageContext';

// Components
import Hero from '../components/Hero';
import Section from '../components/Section';
import ProjectCard from '../components/ProjectCard';

const Projects = () => {
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredProjects, setFilteredProjects] = useState([]);

  const translations = {
    hero: {
      title: {
        en: "My Projects",
        zh: "我的项目"
      },
      subtitle: {
        en: "From concept to prototype in days – accelerating business validation through rapid development",
        zh: "从概念到原型仅需数天 – 通过快速开发加速商业验证"
      }
    },
    filters: {
      all: {
        en: "All Projects",
        zh: "所有项目"
      },
      backend: {
        en: "Backend",
        zh: "后端"
      },
      frontend: {
        en: "Frontend",
        zh: "前端"
      },
      fullstack: {
        en: "Full Stack",
        zh: "全栈"
      },
      automation: {
        en: "Automation",
        zh: "自动化"
      },
      featured: {
        en: "Featured",
        zh: "精选"
      }
    },
    projects: {
      title: {
        en: "Rapid Prototypes & MVPs",
        zh: "快速原型和最小可行产品"
      },
      description: {
        en: "All projects built in days, not months. Perfect for business validation, quick market entry, and gathering user feedback before full investment.",
        zh: "所有项目都在几天内完成，而非数月。适合业务验证、快速进入市场和在全面投资前收集用户反馈。"
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

  // Project data
  const projects = [
    {
      id: 1,
      title: {
        en: "Logistics Aggregation Solution",
        zh: "菜鸟物流价格查询系统"
      },
      description: {
        en: "Built in just 2 weeks, this Node.js logistics system provides optimal shipping recommendations based on item specifications. Perfect for rapidly validating shipping aggregation services with minimal investment.",
        zh: "仅用2周时间构建，这个基于Node.js的物流系统根据物品规格提供最佳运输建议。以最小的投入快速验证物流聚合服务的理想解决方案。"
      },
      tech: {
        en: "Node.js, Express.js, SQLite3, OpenAI API (GPT-3.5-turbo)",
        zh: "Node.js, Express.js, SQLite3, OpenAI API (GPT-3.5-turbo)"
      },
      emoji: "📦",
      categories: ["backend", "automation", "featured"],
      categoriesZh: ["后端", "自动化", "精选"],
      status: "completed",
      statusZh: "已完成",
      duration: "2 weeks",
      role: {
        en: "Lead Developer",
        zh: "主要开发者"
      },
      teamSize: "1",
      githubUrl: "https://github.com/JeremyDong22/Logistics-Aggregation-Solution",
      featured: true
    },
    {
      id: 2,
      title: {
        en: "JD Price Crawler",
        zh: "京东价格爬虫工具"
      },
      description: {
        en: "A 3-day prototype for intelligent e-commerce price monitoring. This rapid solution helped validate market demand for pricing intelligence tools before committing to a full-scale development.",
        zh: "一个用于智能电商价格监控的3天原型。这个快速解决方案帮助在投入全面开发前验证了定价情报工具的市场需求。"
      },
      tech: {
        en: "Python, Selenium, OpenCV, PyAutoGUI, Flask",
        zh: "Python, Selenium, OpenCV, PyAutoGUI, Flask"
      },
      emoji: "🔍",
      categories: ["backend", "automation", "featured"],
      categoriesZh: ["后端", "自动化", "精选"],
      status: "completed",
      statusZh: "已完成",
      duration: "3 days",
      role: {
        en: "Solo Developer",
        zh: "独立开发者"
      },
      teamSize: "1",
      githubUrl: "https://github.com/JeremyDong22/JD_Price_Crawler",
      featured: true
    },
    {
      id: 3,
      title: {
        en: "Personal Portfolio Website",
        zh: "个人作品集网站"
      },
      description: {
        en: "Developed in just 5 days from concept to deployment, this portfolio showcases rapid iteration capabilities. Built with modern technologies for quick business validation and easy extension.",
        zh: "从概念到部署仅用5天开发，这个作品集展示了快速迭代能力。使用现代技术构建，便于快速业务验证和轻松扩展。"
      },
      tech: {
        en: "React, Tailwind CSS, Framer Motion, React Router",
        zh: "React, Tailwind CSS, Framer Motion, React Router"
      },
      emoji: "🌐",
      categories: ["frontend", "featured"],
      categoriesZh: ["前端", "精选"],
      status: "in-progress",
      statusZh: "进行中",
      duration: "5 days",
      role: {
        en: "Designer & Developer",
        zh: "设计师和开发者"
      },
      teamSize: "1",
      githubUrl: "https://github.com/JeremyDong22/jeremydong22.github.io",
      liveUrl: "https://jeremydong22.github.io",
      featured: true
    }
  ];

  // Initialize filtered projects with all projects on component mount
  useEffect(() => {
    setFilteredProjects(projects);
  }, [projects]);

  // Filter projects based on selected category
  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(
        projects.filter(project => 
          project.categories.includes(selectedCategory)
        )
      );
    }
  }, [selectedCategory, projects]);

  // Animation variants for filter buttons
  const buttonVariants = {
    active: {
      backgroundColor: "#D4AF37",
      color: "#080808",
      scale: 1.05,
      transition: { type: "spring", stiffness: 300 }
    },
    inactive: {
      backgroundColor: "rgba(212, 175, 55, 0.1)",
      color: "#D4AF37",
      scale: 1
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1
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
          className="py-16 md:py-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-4xl font-bold mb-4 text-primary">
              {translations.projects.title[language]}
            </h2>
            <p className="text-xl text-light/80 max-w-2xl mx-auto">
              {translations.projects.description[language]}
            </p>
          </div>
          
          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-10">
            <motion.button
              className="px-4 py-2 rounded-full text-sm font-medium flex items-center"
              onClick={() => setSelectedCategory('all')}
              variants={buttonVariants}
              initial="inactive"
              animate={selectedCategory === 'all' ? "active" : "inactive"}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {translations.filters.all[language]}
            </motion.button>
            
            <motion.button
              className="px-4 py-2 rounded-full text-sm font-medium flex items-center"
              onClick={() => setSelectedCategory('frontend')}
              variants={buttonVariants}
              initial="inactive"
              animate={selectedCategory === 'frontend' ? "active" : "inactive"}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {translations.filters.frontend[language]}
            </motion.button>
            
            <motion.button
              className="px-4 py-2 rounded-full text-sm font-medium flex items-center"
              onClick={() => setSelectedCategory('backend')}
              variants={buttonVariants}
              initial="inactive"
              animate={selectedCategory === 'backend' ? "active" : "inactive"}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {translations.filters.backend[language]}
            </motion.button>
            
            <motion.button
              className="px-4 py-2 rounded-full text-sm font-medium flex items-center"
              onClick={() => setSelectedCategory('fullstack')}
              variants={buttonVariants}
              initial="inactive"
              animate={selectedCategory === 'fullstack' ? "active" : "inactive"}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {translations.filters.fullstack[language]}
            </motion.button>
            
            <motion.button
              className="px-4 py-2 rounded-full text-sm font-medium flex items-center"
              onClick={() => setSelectedCategory('automation')}
              variants={buttonVariants}
              initial="inactive"
              animate={selectedCategory === 'automation' ? "active" : "inactive"}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {translations.filters.automation[language]}
            </motion.button>
            
            <motion.button
              className="px-4 py-2 rounded-full text-sm font-medium flex items-center"
              onClick={() => setSelectedCategory('featured')}
              variants={buttonVariants}
              initial="inactive"
              animate={selectedCategory === 'featured' ? "active" : "inactive"}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiFilter className="mr-2" />
              {translations.filters.featured[language]}
            </motion.button>
          </div>
          
          {/* Projects Grid */}
          <AnimatePresence mode="wait">
            <motion.div 
              key={selectedCategory}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            >
              {filteredProjects.map((project, index) => (
                <ProjectCard 
                  key={project.id}
                  project={project}
                  language={language}
                  index={index}
                  layoutType={project.featured && index === 0 ? 'featured' : 'grid'}
                />
              ))}
              
              {filteredProjects.length === 0 && (
                <motion.div 
                  className="col-span-full text-center py-20"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <p className="text-xl text-light/60">
                    {language === 'en' 
                      ? 'No projects found in this category.' 
                      : '在此类别中没有找到项目。'
                    }
                  </p>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </Section>
      
      {/* Call to Action */}
      <Section className="bg-dark text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="py-16"
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