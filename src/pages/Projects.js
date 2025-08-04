import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import Section from '../components/common/Section';
import ProjectsHero from '../components/common/ProjectsHero';
import ProjectCard from '../components/cards/ProjectCard';
import ProjectModal from '../components/modals/ProjectModal';

const Projects = () => {
  const { language } = useLanguage();
  const [activeFilter, setActiveFilter] = useState('all');
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [modalProject, setModalProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const translations = {
    hero: {
      title: {
        en: "My Projects",
        zh: "我的项目"
      },
      subtitle: {
        en: "Innovative solutions to real-world problems",
        zh: "创新解决方案，应对现实世界问题"
      }
    },
    filters: {
      all: {
        en: "All Projects",
        zh: "所有项目"
      },
      ai: {
        en: "AI & Machine Learning",
        zh: "人工智能和机器学习"
      },
      web: {
        en: "Web Development",
        zh: "网页开发"
      },
      data: {
        en: "Data Science",
        zh: "数据科学"
      },
      automation: {
        en: "Automation",
        zh: "自动化"
      }
    },
    projectDetails: {
      viewProject: {
        en: "View Project",
        zh: "查看项目"
      },
      viewCode: {
        en: "View Code",
        zh: "查看代码"
      },
      overview: {
        en: "Overview",
        zh: "概述"
      },
      technologies: {
        en: "Technologies Used",
        zh: "使用的技术"
      },
      challenges: {
        en: "Challenges",
        zh: "挑战"
      },
      solutions: {
        en: "Solutions",
        zh: "解决方案"
      },
      results: {
        en: "Results",
        zh: "结果"
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

  // Project data with enhanced structure for our new components
  const projects = [
    {
      id: 1,
      title: {
        en: "Logistics Aggregation Solution",
        zh: "菜鸟物流价格查询系统"
      },
      description: {
        en: "Built in just 2 weeks, this Node.js logistics system provides optimal shipping recommendations based on item specifications and destination countries. Features intelligent weight estimation, automated item classification, and AI-powered conversation flow.",
        zh: "仅用2周时间构建，这个基于Node.js的物流系统根据物品规格和目的地国家提供最佳运输建议。具有智能重量估算、自动物品分类和AI驱动的对话流程。"
      },
      image: "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=1200&auto=format&fit=crop&q=80",
      category: "automation",
      technologies: ["Node.js", "Express.js", "SQLite3", "OpenAI API", "JavaScript"],
      featured: true,
      challenges: {
        en: "Creating an intelligent system that could accurately estimate package dimensions and weights while navigating complex international shipping regulations.",
        zh: "创建一个智能系统，能够准确估计包裹尺寸和重量，同时应对复杂的国际运输法规。"
      },
      solutions: {
        en: "Implemented a neural network for dimension prediction based on item descriptions and developed a decision tree for optimal carrier selection based on multiple factors.",
        zh: "实施了基于物品描述的神经网络尺寸预测，并开发了基于多种因素的决策树，用于最佳承运人选择。"
      },
      githubUrl: "https://github.com/JeremyDong22/Logistics-Aggregation-Solution",
      liveUrl: null
    },
    {
      id: 2,
      title: {
        en: "JD Price Intelligence Crawler",
        zh: "京东价格爬虫工具"
      },
      description: {
        en: "A sophisticated 3-day prototype for e-commerce price monitoring that uses computer vision and browser automation to avoid detection. Crawls product pages, extracts pricing data, and provides real-time market intelligence.",
        zh: "一个用于电子商务价格监控的3天原型，使用计算机视觉和浏览器自动化以避免被检测。爬取产品页面，提取价格数据，并提供实时市场情报。"
      },
      image: "/images/jd-logo.jpg",
      category: "automation",
      technologies: ["Python", "Selenium", "OpenCV", "PyAutoGUI", "Flask"],
      featured: true,
      challenges: {
        en: "Developing a crawler that could navigate anti-scraping measures while maintaining high accuracy in extracting structured data from dynamic e-commerce pages.",
        zh: "开发一个能够绕过反爬取措施的爬虫，同时保持从动态电子商务页面提取结构化数据的高准确性。"
      },
      solutions: {
        en: "Implemented computer vision techniques to identify and interact with page elements, mimicking human behavior with randomized timing patterns and mouse movements.",
        zh: "实施计算机视觉技术来识别和交互页面元素，通过随机时间模式和鼠标移动模拟人类行为。"
      },
      githubUrl: "https://github.com/JeremyDong22/JD_Price_Crawler",
      liveUrl: null
    },
    {
      id: 3,
      title: {
        en: "XHS Content Crawler with Supabase",
        zh: "小红书爬虫与Supabase集成"
      },
      description: {
        en: "An automated content harvesting tool for Xiaohongshu (Little Red Book) that extracts posts, images, and engagement metrics. Features automatic keyword detection, content filtering by likes, and seamless Supabase integration for storage.",
        zh: "一个针对小红书的自动内容采集工具，可提取帖子、图片和互动指标。具有自动关键词检测、按点赞数过滤内容，以及与Supabase无缝集成以进行存储的功能。"
      },
      image: "/images/xhs-interface.jpg",
      category: "data",
      technologies: ["Python", "Selenium", "Supabase", "Chrome WebDriver", "PostgreSQL"],
      featured: false,
      challenges: {
        en: "Building a reliable scraper for a mobile-first platform with complex JavaScript rendering and strict rate limiting that regularly changes its interface.",
        zh: "为一个具有复杂JavaScript渲染和严格速率限制的移动优先平台构建可靠的爬虫，该平台经常更改其界面。"
      },
      solutions: {
        en: "Created an adaptive selector system that could recover from UI changes, implemented intelligent rate limiting with exponential backoff, and built a robust image processing pipeline.",
        zh: "创建了一个可以从UI变更中恢复的自适应选择器系统，实施了具有指数退避的智能速率限制，并构建了一个强大的图像处理管道。"
      },
      githubUrl: "https://github.com/JeremyDong22/XHS_Crawler_supabase",
      liveUrl: null
    },
    {
      id: 4,
      title: {
        en: "Personal Portfolio Website",
        zh: "个人作品集网站"
      },
      description: {
        en: "Developed in just 5 days, this portfolio showcases my work with a luxury-inspired design. Features include bilingual support, responsive layouts, smooth animations, and dark theme throughout.",
        zh: "在短短5天内开发，这个作品集以奢华为灵感的设计展示了我的工作。功能包括双语支持、响应式布局、流畅的动画和全暗色主题。"
      },
      image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1200&auto=format&fit=crop&q=80",
      category: "web",
      technologies: ["React", "Tailwind CSS", "Framer Motion", "Responsive Design", "Vercel"],
      featured: true,
      challenges: {
        en: "Creating a visually striking and performant website that maintains consistent aesthetics across languages and device sizes while implementing smooth transitions.",
        zh: "创建一个视觉上引人注目且性能良好的网站，在不同语言和设备尺寸上保持一致的美学效果，同时实现平滑过渡。"
      },
      solutions: {
        en: "Leveraged Tailwind CSS for responsive design, implemented context-based language switching that preserves UI state, and used Framer Motion for performant animations.",
        zh: "利用Tailwind CSS进行响应式设计，实施基于上下文的语言切换，保持UI状态，并使用Framer Motion实现高性能动画。"
      },
      githubUrl: "https://github.com/JeremyDong22/portfolio-2023",
      liveUrl: "https://jeremydong.dev"
    },
    {
      id: 5,
      title: {
        en: "AI-Powered Reddit Growth Strategy",
        zh: "AI驱动的Reddit增长策略"
      },
      description: {
        en: "Developed a sophisticated AI automation system using Crew.ai and PRAW for community engagement, with personalized ChatGPT integration for content generation and user interaction.",
        zh: "开发了一个使用Crew.ai和PRAW的复杂AI自动化系统，用于社区参与，并集成了个性化ChatGPT进行内容生成和用户互动。"
      },
      image: "/images/reddit-app.jpg",
      category: "ai",
      technologies: ["Python", "OpenAI API", "PRAW", "Crew.ai", "NLP"],
      featured: false,
      challenges: {
        en: "Maintaining natural-sounding interactions while automating community engagement at scale was challenging. Also needed to respect Reddit's API rate limits.",
        zh: "在大规模自动化社区参与的同时保持自然的交互是具有挑战性的。还需要遵守Reddit的API速率限制。"
      },
      solutions: {
        en: "Implemented distributed task scheduling with intelligent retry mechanisms. Developed a sophisticated prompt engineering system for ChatGPT to maintain consistent voice across interactions.",
        zh: "实施了具有智能重试机制的分布式任务调度。为ChatGPT开发了一个复杂的提示工程系统，以在互动中保持一致的声音。"
      },
      githubUrl: "https://github.com/JeremyDong22/reddit-growth",
      liveUrl: null
    }
  ];

  // Filter projects when activeFilter changes
  useEffect(() => {
    setFilteredProjects(
      activeFilter === 'all'
        ? projects
        : projects.filter(project => project.category === activeFilter)
    );
  }, [activeFilter, projects]);

  // Handle filter click
  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
  };
  
  // Handle modal open/close
  const handleOpenModal = (project) => {
    setModalProject(project);
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="bg-dark text-light min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <ProjectsHero
        title={translations.hero.title[language]}
        subtitle={translations.hero.subtitle[language]}
        language={language}
      />
      
      {/* Projects Section */}
      <Section className="py-16">
        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {Object.entries(translations.filters).map(([key, value]) => (
            <motion.button
              key={key}
              onClick={() => handleFilterClick(key)}
              className={`px-4 py-2 rounded-sm text-sm font-medium transition-colors ${
                activeFilter === key
                  ? 'bg-primary text-dark'
                  : 'bg-dark text-light hover:bg-primary/20 border border-primary/20'
              }`}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              {value[language]}
            </motion.button>
          ))}
        </div>
        
        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, index) => (
              <div 
                key={project.id}
                className="h-[480px]"
                style={{ 
                  display: 'flex',
                  width: '100%'
                }}
              >
                <ProjectCard
                  project={project}
                  language={language}
                  index={index}
                  onViewDetails={handleOpenModal}
                  isFeatured={project.featured}
                />
              </div>
            ))}
          </AnimatePresence>
        </div>
      </Section>
      
      {/* Project Details Modal */}
      <ProjectModal
        project={modalProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        language={language}
        translations={translations}
      />
      
      <Footer />
    </div>
  );
};

export default Projects; 