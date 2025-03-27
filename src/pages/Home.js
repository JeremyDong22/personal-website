import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiGithub, FiLinkedin, FiMail, FiPhone, FiCode, FiLayers, FiUsers } from 'react-icons/fi';
import { SiWechat } from 'react-icons/si';
import { motion } from 'framer-motion';

// Components
import Hero from '../components/Hero';
import Section from '../components/Section';
import ProjectCard from '../components/ProjectCard';
import QRCodeModal from '../components/QRCodeModal';

// Language Context
import { useLanguage } from '../context/LanguageContext';
import translations from '../context/translations';

// Import hero image
import heroImage from '../assets/images/home/hero/home_hero.jpg';
import aboutImage from '../assets/images/home/profile.jpeg';

// Project images
const projectImages = {
  webDev: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80',  // Beautiful abstract tech visualization
  design: 'https://images.unsplash.com/photo-1584291527935-456e8e2dd734?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
  business: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2832&q=80',
};

// Professional skills data
const professionalSkills = [
  {
    id: 1,
    icon: <FiCode className="text-primary text-2xl" />,
    titleEn: 'Data Science & ML',
    titleZh: '数据科学与机器学习',
    descriptionEn: 'Proficient in Python, R, SQL, and ML algorithms including Random Forest, Boosting, Neural Nets, and Causal Analysis. Experienced with NumPy, Pandas, Scikit-learn.',
    descriptionZh: '精通Python、R、SQL及机器学习算法，包括随机森林、提升算法、神经网络和因果分析。熟练使用NumPy、Pandas、Scikit-learn等数据分析工具。'
  },
  {
    id: 2,
    icon: <FiLayers className="text-primary text-2xl" />,
    titleEn: 'Business Analytics',
    titleZh: '商业分析',
    descriptionEn: 'Experience in investment research, financial analysis, and strategic consulting. Specialized in market research, cost analysis, and business strategy.',
    descriptionZh: '在投资研究、财务分析和战略咨询方面经验丰富。专注于市场研究、成本分析和商业战略。'
  },
  {
    id: 3,
    icon: <FiUsers className="text-primary text-2xl" />,
    titleEn: 'AI & Automation',
    titleZh: 'AI与自动化',
    descriptionEn: 'Expertise in AI-driven automation, developing ChatGPT applications, and creating automated workflows for data collection and analysis.',
    descriptionZh: '专注于AI驱动自动化，开发ChatGPT应用，创建数据收集和分析的自动化工作流程。'
  }
];

// Featured projects data
const featuredProjects = [
  {
    id: 1,
    title: {
      en: 'AI-Powered Logistics Aggregation',
      zh: 'AI驱动的物流聚合系统'
    },
    description: {
      en: 'Built in just 2 weeks, this system leverages Node.js and AI to provide optimal shipping recommendations based on item specifications and destination countries.',
      zh: '仅用2周时间构建，该系统利用Node.js和AI根据物品规格和目的地国家提供最佳运输建议。'
    },
    image: projectImages.webDev,
    tags: ['Node.js', 'AI', 'Express.js', 'SQLite3'],
    categories: ['backend', 'automation'],
    categoriesZh: ['后端', '自动化'],
    githubUrl: 'https://github.com/JeremyDong22/Logistics-Aggregation-Solution',
    liveUrl: '#',
    tech: {
      en: 'Node.js, Express.js, SQLite3, OpenAI API',
      zh: 'Node.js, Express.js, SQLite3, OpenAI API'
    },
    emoji: '📦',
    status: 'completed',
    statusZh: '已完成',
    duration: '2 weeks',
    role: {
      en: 'Lead Developer',
      zh: '主要开发者'
    },
    teamSize: '1'
  },
  {
    id: 2,
    title: {
      en: 'JD Price Intelligence Crawler',
      zh: 'JD价格情报爬虫'
    },
    description: {
      en: 'A sophisticated web scraper developed in 3 days that uses computer vision and browser automation to extract pricing data from JD.com while avoiding detection.',
      zh: '一个在3天内开发的复杂网页爬虫，利用计算机视觉和浏览器自动化从京东提取价格数据，同时避免被检测。'
    },
    image: projectImages.design,
    tags: ['Python', 'Computer Vision', 'Automation'],
    categories: ['backend', 'automation'],
    categoriesZh: ['后端', '自动化'],
    githubUrl: 'https://github.com/JeremyDong22/JD_Price_Crawler',
    liveUrl: '#',
    tech: {
      en: 'Python, Selenium, OpenCV, Flask',
      zh: 'Python, Selenium, OpenCV, Flask'
    },
    emoji: '🔍',
    status: 'completed',
    statusZh: '已完成',
    duration: '3 days',
    role: {
      en: 'Solo Developer',
      zh: '独立开发者'
    },
    teamSize: '1'
  },
  {
    id: 3,
    title: {
      en: 'Modern Portfolio Website',
      zh: '现代个人作品集网站'
    },
    description: {
      en: 'Personal portfolio showcasing my expertise in rapid prototyping and development. Features bilingual support, responsive design, and smooth animations.',
      zh: '展示我在快速原型设计和开发方面专长的个人作品集。具有双语支持、响应式设计和流畅动画效果。'
    },
    image: projectImages.business,
    tags: ['React', 'Tailwind CSS', 'Framer Motion'],
    categories: ['frontend', 'design'],
    categoriesZh: ['前端', '设计'],
    githubUrl: 'https://github.com/JeremyDong22/jeremydong22.github.io',
    liveUrl: 'https://jeremydong22.github.io',
    tech: {
      en: 'React, Tailwind CSS, Framer Motion',
      zh: 'React, Tailwind CSS, Framer Motion'
    },
    emoji: '🌐',
    status: 'in-progress',
    statusZh: '进行中',
    duration: '1 week',
    role: {
      en: 'Designer & Developer',
      zh: '设计师和开发者'
    },
    teamSize: '1'
  }
];

const Home = () => {
  const { language } = useLanguage();
  const t = translations.home;
  const [showQRModal, setShowQRModal] = useState(false);

  return (
    <div>
      {/* QR Code Modal */}
      <QRCodeModal isOpen={showQRModal} onClose={() => setShowQRModal(false)} />
      
      {/* Hero Section */}
      <Hero
        title={t.hero.title[language]}
        subtitle={t.hero.subtitle[language]}
        image={heroImage}
        imageClassName="hero-image"
      >
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <Link to="/projects" className="btn btn-primary flex items-center justify-center gap-2">
            {t.hero.viewPortfolio[language]} <FiArrowRight />
          </Link>
          <Link to="/contact" className="btn btn-outline flex items-center justify-center gap-2">
            {t.hero.getInTouch[language]}
          </Link>
        </div>
        
        {/* Social Links */}
        <div className="flex gap-4 mt-8">
          <a
            href="https://github.com/JeremyDong22"
            target="_blank"
            rel="noopener noreferrer"
            className="text-light hover:text-primary transition-colors"
            aria-label="GitHub"
          >
            <FiGithub size={24} />
          </a>
          <a
            href="https://www.linkedin.com/in/jeremy-dong-176092256"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-light hover:text-primary transition-colors"
          >
            <FiLinkedin size={24} />
          </a>
          <a
            href="mailto:hengd3@outlook.com"
            className="text-light hover:text-primary transition-colors"
            aria-label="Email"
          >
            <FiMail size={24} />
          </a>
          <a
            href="tel:+12179740277"
            className="text-light hover:text-primary transition-colors"
            aria-label="Phone"
          >
            <FiPhone size={24} />
          </a>
          <button
            className="text-light hover:text-primary transition-colors bg-transparent border-0 p-0 cursor-pointer"
            aria-label="WeChat"
            onClick={(e) => {
              e.preventDefault();
              setShowQRModal(true);
            }}
          >
            <SiWechat size={24} />
          </button>
        </div>
      </Hero>

      {/* Professional Skills Section */}
      <Section
        title={language === 'en' ? "Professional Skills" : "专业技能"}
        subtitle={language === 'en' ? "Core competencies and expertise" : "核心能力和专长"}
        className="bg-darkest"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {professionalSkills.map((skill, index) => (
            <motion.div
              key={skill.id}
              className="bg-darkgray border border-primary/20 p-6 luxury-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex items-start gap-4">
                <div className="mt-1">{skill.icon}</div>
                <div>
                  <h3 className="text-xl font-heading mb-2 text-primary font-bold">
                    {language === 'en' ? skill.titleEn : skill.titleZh}
                  </h3>
                  <p className="text-light/95">
                    {language === 'en' ? skill.descriptionEn : skill.descriptionZh}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* About Section */}
      <Section
        title={t.about.title[language]}
        subtitle={language === 'en' ? "Professional Background & Expertise" : "专业背景和专长"}
        className="bg-dark"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-light/95 mb-6">
              {language === 'en' 
                ? "As a Certified Scrum Product Owner (CSPO®) pursuing MS in Business Analytics & BA in Accounting at UIUC, I specialize in data-driven decision making and business strategy. My experience spans across supply chain, manufacturing, technology, and financial services, where I've delivered impactful solutions for cost optimization and operational efficiency."
                : "作为一名认证Scrum产品负责人（CSPO®），我正在UIUC攻读商业分析硕士和会计学士学位。我专注于数据驱动决策和商业战略。我的经验涵盖供应链、制造业、技术和金融服务领域，为成本优化和运营效率提供了有效的解决方案。"}
            </p>
            <div className="gold-divider"></div>
            <p className="text-light/95 mb-6">
              {language === 'en'
                ? "Passionate about emerging technologies, I'm currently exploring AI applications in business process optimization. Beyond my professional pursuits, I lead a basketball team, practice kinesiology, and engage in various interests from gourmet cooking to philosophical discussions, bringing a well-rounded perspective to my work."
                : "我对新兴技术充满热情，目前正在探索AI在业务流程优化中的应用。除了专业追求，我还领导着一支篮球队，研究运动学，并涉足美食烹饪和哲学讨论等多个领域，为工作带来全面的视角。"}
            </p>
            <div className="flex gap-4">
              <Link to="/about" className="btn btn-primary inline-flex items-center gap-2 mt-4">
                {language === 'en' ? "Learn More" : "了解更多"} <FiArrowRight />
              </Link>
              <Link to="/contact" className="btn btn-outline inline-flex items-center gap-2 mt-4">
                {language === 'en' ? "Let's Connect" : "联系我"} <FiArrowRight />
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="p-1 bg-gold-gradient overflow-hidden">
              <img
                src={aboutImage}
                alt={language === 'en' ? "Jeremy Dong" : "董衡"}
                className="w-full h-[400px] relative z-10 object-cover transform scale-125 translate-x-8 translate-y-4 rounded-lg"
              />
            </div>
          </div>
        </div>
      </Section>

      {/* Featured Projects */}
      <Section
        title={t.projects.title[language]}
        subtitle={t.projects.subtitle[language]}
        className="bg-darkest"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} language={language} index={index} />
          ))}
        </div>
        <div className="text-center mt-12">
          <Link to="/projects" className="btn btn-primary inline-flex items-center gap-2">
            {t.projects.viewAll[language]} <FiArrowRight />
          </Link>
        </div>
      </Section>

      {/* Contact CTA */}
      <Section className="bg-dark text-center">
        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6 text-primary">
          {language === 'en' ? "Let's Work Together" : "让我们合作"}
        </h2>
        <p className="text-light/95 max-w-2xl mx-auto mb-8">
          {language === 'en' 
            ? "Interested in collaborating on a project or discussing potential opportunities? I'm currently available for freelance work and open to new challenges."
            : "有兴趣在项目上合作或讨论潜在机会？我目前可以接受自由职业工作，并乐于接受新的挑战。"}
        </p>
        <Link to="/contact" className="btn btn-primary inline-flex items-center gap-2">
          {language === 'en' ? "Get In Touch" : "联系我"} <FiArrowRight />
        </Link>
      </Section>
    </div>
  );
};

export default Home; 