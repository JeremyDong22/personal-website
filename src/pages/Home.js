import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiGithub, FiLinkedin, FiMail, FiPhone, FiCode, FiLayers, FiUsers } from 'react-icons/fi';
import { SiWechat } from 'react-icons/si';
import { motion } from 'framer-motion';

// Components
import Hero from '../components/common/Hero';
import Section from '../components/common/Section';
import ProjectCard from '../components/cards/ProjectCard';
import QRCodeModal from '../components/modals/QRCodeModal';
import ProjectModal from '../components/modals/ProjectModal';

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
    descriptionZh: '专注于利用AI进行敏捷开发，创建数据收集分析的自动化工作流程，帮助企业完成数字化转型与AI融合。'
  }
];

// Most recent 6 projects (reverse-chronological by last commit date)
const featuredProjects = [
  {
    id: 10,
    title: {
      en: "InventoryEntry – Voice-Powered SmartICE Inventory System",
      zh: "野百灵库存管理系统 – 语音 AI 驱动的库存录入"
    },
    description: {
      en: "Restaurant chain inventory management system with both manual and voice-based entry. Uses iFlytek ASR for real-time Chinese speech transcription and Alibaba Qwen for AI-structured data extraction from free-form speech. Supports 4-role RBAC permissions, deployed live at inv.smartice.ai.",
      zh: "连锁餐厅库存管理系统，支持手动录入和语音录入两种模式——讯飞 ASR 实时中文语音识别 + 阿里云通义千问 AI 结构化提取库存数据。4 角色 RBAC 权限控制，线上运行于 inv.smartice.ai。"
    },
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&auto=format&fit=crop&q=80",
    technologies: ["React 19", "Vite 6", "TypeScript", "FastAPI", "Supabase", "iFlytek ASR", "Alibaba Qwen"],
    featured: true,
    githubUrl: "https://github.com/JeremyDong22/InventoryEntryOfSmartICE",
    liveUrl: "https://inv.smartice.ai"
  },
  {
    id: 19,
    title: {
      en: "SightLink – Smart Badge Hardware Assembly Guide",
      zh: "SightLink – 智能抓拍工牌硬件组装交互指南"
    },
    description: {
      en: "Interactive hardware assembly and operation guide for the SightLink intelligent employee badge system featuring automatic face capture and identification. A web-based step-by-step guide with progress tracking and validation checkpoints.",
      zh: "SightLink 智能员工工牌系统的交互式硬件组装与操作指南。工牌具有自动人脸抓拍与识别功能，Web 指南含进度追踪和验证检查点，引导技术人员独立完成部署。"
    },
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop&q=80",
    technologies: ["HTML5", "CSS3", "JavaScript", "Interactive Step Guide"],
    featured: false,
    githubUrl: "https://github.com/JeremyDong22/sightlink-hardware-guide",
    liveUrl: null
  },
  {
    id: 9,
    title: {
      en: "Maiyouweng – B2B Grain & Oil Options Trading Platform",
      zh: "卖油翁 – B2B 粮油含权贸易平台"
    },
    description: {
      en: "Full-stack B2B platform for China's grain and oil options-embedded trade market — a complex derivative pricing model where buyers receive embedded optionality on commodity prices. Features basis pricing, fund flow management, and an interactive HTML5 business logic visualizer.",
      zh: "面向中国粮油含权贸易市场的 B2B 全栈平台。实现了基差定价、资金流转、盈亏计算，并附有交互式 HTML5 业务逻辑可视化模型，Docker Compose 一键部署。"
    },
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&auto=format&fit=crop&q=80",
    technologies: ["React", "TypeScript", "FastAPI", "PostgreSQL", "Docker"],
    featured: true,
    githubUrl: "https://github.com/JeremyDong22/maiyouweng",
    liveUrl: null
  },
  {
    id: 25,
    title: {
      en: "Taobao / Tmall MCP Server for AI Assistants",
      zh: "淘宝 / 天猫 AI 助手 MCP 服务器"
    },
    description: {
      en: "Model Context Protocol (MCP) server that lets AI assistants like Claude directly call tools to scrape Taobao / Tmall product data. Accepts multiple input formats and maintains a persistent Playwright browser session to preserve login state.",
      zh: "让 Claude 等 AI 助手直接调用工具爬取淘宝/天猫商品数据的 MCP 服务器。支持多种输入格式，通过持久化 Playwright Session 保持登录状态，输出结构化 Markdown。"
    },
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&auto=format&fit=crop&q=80",
    technologies: ["Python", "Playwright", "MCP Protocol", "Chromium", "uv"],
    featured: false,
    githubUrl: "https://github.com/JeremyDong22/taobao_mcp",
    liveUrl: null
  },
  {
    id: 20,
    title: {
      en: "XHS Multi-Account Crawler & AI Annotation Platform",
      zh: "小红书多账号爬取与 AI 数据标注平台"
    },
    description: {
      en: "Full-stack data collection and AI labeling platform for Xiaohongshu. FastAPI backend manages multiple isolated Chrome account instances via Playwright, feeds images/text to Gemini Flash for automatic classification, with real-time SSE-based status monitoring.",
      zh: "面向小红书的全栈数据采集与 AI 标注平台。FastAPI 后端通过 Playwright 管理多个独立 Chrome 账号实例，Gemini Flash 进行图文分类标注，SSE 实时展示浏览器状态。"
    },
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80",
    technologies: ["Python", "FastAPI", "Playwright", "Gemini Flash", "Next.js 16", "PostgreSQL"],
    featured: true,
    githubUrl: "https://github.com/JeremyDong22/XHSCOfSmartICE",
    liveUrl: null
  },
  {
    id: 8,
    title: {
      en: "EarOfSmartICE – SDR Communication Monitor",
      zh: "EarOfSmartICE – 软件定义无线电通信监测系统"
    },
    description: {
      en: "Restaurant communication monitoring and analysis system using Software Defined Radio (SDR). Intercepts and analyzes wireless communication channels in the restaurant environment — a novel approach to operations monitoring that goes beyond cameras.",
      zh: "使用软件定义无线电（SDR）技术的餐厅通信监测与分析系统。拦截并分析餐厅环境中的无线通信频道，是超越摄像头监控的全新运营监测探索。"
    },
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1200&auto=format&fit=crop&q=80",
    technologies: ["SDR", "Python", "Signal Processing", "HTML"],
    featured: false,
    githubUrl: "https://github.com/JeremyDong22/EarOfSmartICE",
    liveUrl: null
  }
];

const Home = () => {
  const { language } = useLanguage();
  const t = translations.home;
  const [showQRModal, setShowQRModal] = useState(false);
  const [modalProject, setModalProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
                : "作为一名认证Scrum产品负责人（CSPO®），我毕业于UIUC，获得商业分析硕士和会计学士学位。我专注于数据驱动决策和商业战略。我的经验涵盖供应链、制造业、技术和金融服务领域，为成本优化和运营效率提供了有效的解决方案。"}
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
            <ProjectCard
              key={project.id}
              project={project}
              language={language}
              index={index}
              onViewDetails={(p) => { setModalProject(p); setIsModalOpen(true); }}
            />
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

      {/* Project Details Modal */}
      <ProjectModal
        project={modalProject}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        language={language}
        translations={translations}
      />
    </div>
  );
};

export default Home; 