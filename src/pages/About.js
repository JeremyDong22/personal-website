import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiDownload, FiCalendar, FiBook, FiAward } from 'react-icons/fi';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';

// Components
import Hero from '../components/Hero';
import Section from '../components/Section';
import SkillBar from '../components/SkillBar';

// Import hero image
import aboutImage from '../assets/images/about/background/about_hero.jpeg';
import journeyImage from '../assets/images/about/background/journey.jpg';

// Skills data
const technicalSkills = [
  { name: 'Python', percentage: 95, color: 'primary' },
  { name: 'SQL', percentage: 90, color: 'blue' },
  { name: 'R', percentage: 85, color: 'green' },
  { name: 'Java', percentage: 75, color: 'purple' },
  { name: 'NumPy/Pandas', percentage: 90, color: 'blue' },
  { name: 'Scikit-learn', percentage: 85, color: 'orange' },
];

const softSkills = [
  { name: 'Data Analysis', percentage: 95, color: 'primary' },
  { name: 'Machine Learning', percentage: 90, color: 'blue' },
  { name: 'Business Strategy', percentage: 85, color: 'green' },
  { name: 'Market Research', percentage: 80, color: 'purple' },
  { name: 'AI Automation', percentage: 90, color: 'orange' },
];

// Experience data
const experiences = [
  {
    id: 1,
    role: 'Growth Analyst Intern',
    company: 'Source Ready',
    companyDescription: 'Supply Chain SaaS Startup',
    period: 'Jan 2025 - Present',
    website: 'https://sourceready.com',
    description: 'Enhanced Google SEO by 300% by creating a Reddit strategy and collaborating with high-authority press & media. Developed and executed a growth strategy on Reddit using AI-driven automation, integrating Crew.ai and Cursor. Revealed growth insights by visualizing funnel, flows, and retention report via Mixpanel dashboard.',
    logoUrl: '/assets/images/logos/sourceready.png'
  },
  {
    id: 2,
    role: 'Data Analyst',
    company: 'US Pharmacopeia',
    companyDescription: 'Pharmaceutical Standards Organization',
    period: 'Aug 2024 - Present',
    website: 'https://www.usp.org',
    description: 'Developed an AI/ML-driven automated workflow in Python for continuously gathering and processing research data. Automated a crawling pipeline across 300 keywords using Python and APIs from 15 websites, integrating daily results.',
    logoUrl: '/assets/images/logos/usp.png'
  },
  {
    id: 3,
    role: 'Investment Researcher',
    company: 'Kaifeng Investment',
    companyDescription: 'Mutual Fund',
    period: 'Jul 2024 - Aug 2024',
    website: 'https://www.kaifenginvestment.com',
    description: 'Researched the pan-entertainment sector, leveraging Perplexity AI for market trend insights and Wind for financial data analysis. Conducted field investigations at major retail locations in Shenzhen, tracking foot traffic (20k+), purchase rates, and demographics.',
    logoUrl: '/assets/images/logos/kaifeng.png'
  },
  {
    id: 4,
    role: 'Investment Analyst Intern',
    company: 'GYJA Private Equity',
    companyDescription: 'Private Equity Firm',
    period: 'May 2024 - Jun 2024',
    website: 'https://www.gyja.com',
    description: 'Conducted industry research in manufacturing and energy sectors using Wind/Bloomberg data. Led investment risk control by collaborating with due diligence teams on financial statement reviews and M&A assessments.',
    logoUrl: '/assets/images/logos/gyja.png'
  },
  {
    id: 5,
    role: 'Cost Analyst',
    company: 'Molex',
    companyDescription: 'Manufacturing & Electronics',
    period: 'Jan 2024 - May 2024',
    website: 'https://www.molex.com',
    description: 'Led a strategic framework to identify alternative manufacturing locations outside of China. Developed a cost model integrating economic and geographic data, achieving a 20% reduction in relocation costs.',
    logoUrl: '/assets/images/logos/molex.png'
  },
  {
    id: 6,
    role: 'Consultant Intern',
    company: 'BDO Consulting',
    companyDescription: 'Global Consulting Firm',
    period: 'Jun 2023 - Aug 2023',
    website: 'https://www.bdo.com',
    description: 'Led sales efforts with Infineon and Semikron, generating $700k in prototype sales and securing contracts within 1 week. Conducted negotiation & competitive analysis, achieving a 60% cost advantage against German competitors.',
    logoUrl: '/assets/images/logos/bdo.png'
  },
];

// Education data
const education = [
  {
    id: 1,
    degree: 'Master of Science in Business Analytics',
    institution: 'University of Illinois Urbana-Champaign',
    period: 'Aug 2024 - May 2025',
    description: 'GPA: 3.7/4.0',
    courses: [
      'BADM 550: Business Practicum - A-',
      'BADM 554: Enterprise Database Management - B+',
      'BDI 513: Data Storytelling - A+',
      'FIN 550: Big Data Analytics in Finance - A-',
      'FIN 553: Machine Learning in Finance - B',
      'ACCY 512: Data Analytics for Mgmt Acctg - In Progress',
      'BADM 557: Topics in Bus Intelligence - In Progress',
      'BADM 576: Data Science and Analytics - In Progress',
      'FIN 557: Financial Data Mgt. & Analysis - In Progress'
    ]
  },
  {
    id: 2,
    degree: 'Bachelor of Science in Accounting',
    institution: 'University of Illinois Urbana-Champaign',
    period: 'Aug 2021 - May 2024',
    description: 'GPA: 3.9/4.0',
    courses: [
      'ACCY 201: Accounting and Accountancy I - A',
      'ACCY 202: Accounting and Accountancy II - A',
      'ACCY 301: Atg Measurement & Disclosure - A',
      'ACCY 302: Decision Making for Atg - A-',
      'ACCY 303: Atg Institutions and Reg - A-',
      'ACCY 304: Accounting Control Systems - B',
      'ACCY 312: Principles of Taxation - A',
      'ACCY 405: Assurance and Attestation - B-',
      'ACCY 410: Advanced Financial Reporting - B',
      'FIN 221: Corporate Finance - A',
      'BADM 210: Business Analytics I - A-',
      'BADM 211: Business Analytics II - A+',
      'BADM 275: Operations Management - A-',
      'BADM 300: The Legal Environment of Bus - A-',
      'BADM 310: Mgmt and Organizational Beh - A+',
      'BADM 320: Principles of Marketing - A',
      'BADM 350: IT for Networked Organizations - A',
      'BADM 351: Social Media Strategy - A',
      'BADM 449: Business Policy and Strategy - A-',
      'ECON 102: Microeconomic Principles - PS',
      'ECON 103: Macroeconomic Principles - A'
    ]
  },
];

const About = () => {
  const { language } = useLanguage();
  const [logoErrors, setLogoErrors] = useState({});
  const [useClearbit, setUseClearbit] = useState({});
  
  // Function to handle smooth scrolling to sections
  const scrollToSection = (sectionId) => (e) => {
    e.preventDefault();
    
    // Create a temporary visual indicator
    const indicator = document.createElement('div');
    indicator.className = 'scroll-indicator';
    indicator.style.position = 'fixed';
    indicator.style.left = '50%';
    indicator.style.transform = 'translateX(-50%)';
    indicator.style.bottom = '20px';
    indicator.style.width = '40px';
    indicator.style.height = '40px';
    indicator.style.borderRadius = '50%';
    indicator.style.backgroundColor = 'rgba(255, 215, 0, 0.3)';
    indicator.style.border = '2px solid #FFD700';
    indicator.style.zIndex = '1000';
    indicator.style.display = 'flex';
    indicator.style.justifyContent = 'center';
    indicator.style.alignItems = 'center';
    indicator.style.animation = 'pulse 1.5s infinite';
    
    // Add arrow icon
    indicator.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFD700" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12l7 7 7-7"/></svg>';
    
    // Add animation style
    const style = document.createElement('style');
    style.textContent = `
      @keyframes pulse {
        0% { transform: translateX(-50%) translateY(0); opacity: 1; }
        50% { transform: translateX(-50%) translateY(10px); opacity: 0.7; }
        100% { transform: translateX(-50%) translateY(0); opacity: 1; }
      }
      @keyframes sectionHighlight {
        0% { box-shadow: 0 0 0 0 rgba(255, 215, 0, 0); }
        50% { box-shadow: 0 0 20px 10px rgba(255, 215, 0, 0.2); }
        100% { box-shadow: 0 0 0 0 rgba(255, 215, 0, 0); }
      }
    `;
    document.head.appendChild(style);
    
    // Add to body
    document.body.appendChild(indicator);
    
    // Scroll to section
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80,
        behavior: 'smooth'
      });
      
      // Add highlight effect to the section
      setTimeout(() => {
        section.style.animation = 'sectionHighlight 2s ease-in-out';
        
        // Remove animation after it completes
        setTimeout(() => {
          section.style.animation = '';
        }, 2000);
      }, 500);
      
      // Remove indicator after scrolling completes
      setTimeout(() => {
        document.body.removeChild(indicator);
        document.head.removeChild(style);
      }, 1500);
    }
  };
  
  // Improved logo handling with better fallback
  const renderLogo = (company) => {
    // Map company names to their logo URLs
    const logoMap = {
      'Source Ready': '/assets/images/logos/sourceready.png',
      'US Pharmacopeia': '/assets/images/logos/usp.png',
      'Kaifeng Investment': '/assets/images/logos/kaifeng.png',
      'GYJA Private Equity': '/assets/images/logos/gyja.png',
      'Molex': '/assets/images/logos/molex.png',
      'BDO Consulting': '/assets/images/logos/bdo.png'
    };
    
    // Alternative logo URLs from Clearbit (as fallback)
    const clearbitLogoMap = {
      'Source Ready': 'https://logo.clearbit.com/sourceready.com',
      'US Pharmacopeia': 'https://logo.clearbit.com/usp.org',
      'Kaifeng Investment': null, // No clear domain
      'GYJA Private Equity': null, // No clear domain
      'Molex': 'https://logo.clearbit.com/molex.com',
      'BDO Consulting': 'https://logo.clearbit.com/bdo.com'
    };
    
    // Try local logo first, then Clearbit, then fallback to icon
    if (logoErrors[company] && useClearbit[company]) {
      // Both local and Clearbit failed, use icon
      return <FiCalendar size={24} className="text-primary" />;
    } else if (logoErrors[company] && clearbitLogoMap[company]) {
      // Local failed, try Clearbit if available
      return (
        <img 
          src={clearbitLogoMap[company]} 
          alt={company} 
          className="w-8 h-8 object-contain"
          onError={() => {
            setUseClearbit(prev => ({...prev, [company]: true}));
          }}
        />
      );
    } else {
      // Try local logo first
      return (
        <img 
          src={logoMap[company]} 
          alt={company} 
          className="w-8 h-8 object-contain"
          onError={(e) => {
            e.target.onerror = null;
            e.target.style.display = 'none';
            e.target.parentNode.innerHTML = '<div class="w-12 h-12 flex items-center justify-center text-primary text-xl font-bold">SR</div>';
          }}
        />
      );
    }
  };

  const bioContent = {
    title: {
      en: "My Journey",
      zh: "我的故事"
    },
    subtitle: {
      en: "From Accounting to Tech: A Story of Following My Passion",
      zh: "从会计到科技：追随内心的故事"
    },
    greeting: {
      en: "👋 Hey there! I'm Jeremy, and my journey is a bit different from the usual path. Let me share how I went from crunching numbers to building products and exploring the exciting world of technology.",
      zh: "👋 你好！我是董衡，我的经历可能和常人有些不同。让我来分享一下我是如何从处理数字到构建产品，探索科技世界的精彩旅程。"
    },
    sections: [
      {
        title: {
          en: "The Early Days: Breaking the Mold",
          zh: "早期经历：打破常规"
        },
        content: {
          en: "I started in accounting, and here's a fun fact: I was so eager to learn that I tried to triple major in accounting, finance, and information systems! When the university told me that wasn't possible (apparently, double majors were their limit), I took a different approach. Instead of staying the full four years, I completed my accounting degree early and decided to follow my true interests.",
          zh: "我最初学习会计，这里有个有趣的事实：我当时对学习充满热情，甚至尝试同时主修会计、金融和信息系统三个专业！当大学告诉我这不可能时（显然他们最多只允许双学位），我选择了一个不同的方向。我没有读完四年，而是提前完成了会计学位，决定追随自己真正的兴趣。"
        }
      },
      {
        title: {
          en: "Taking the Leap: Choosing My Path",
          zh: "重要抉择：选择自己的道路"
        },
        content: {
          en: "When it came time to choose a graduate program, I had some amazing opportunities - including offers from Cornell's MPS Accounting and Columbia's Applied Analytics with a $20,000 scholarship. But you know what? I followed my heart and chose UIUC's MSBA program. Why? Because I wanted to dive deeper into the technical side of business and really understand how data can transform companies.",
          zh: "在选择研究生项目时，我收到了一些很棒的机会 - 包括康奈尔大学的会计硕士和哥伦比亚大学的应用分析专业（带2万美元奖学金）。但你猜怎么着？我听从了内心的声音，选择了伊利诺伊大学的商业分析硕士项目。为什么？因为我想深入了解商业的技术层面，真正理解数据如何改变企业。"
        }
      },
      {
        title: {
          en: "Learning Through Experience",
          zh: "在实践中学习"
        },
        content: {
          en: "My internship journey might look a bit unconventional on paper. Instead of doing the typical three-month summer internships, I've worked across multiple industries - from accounting firms to SaaS companies, supply chain consulting to manufacturing, and even private equity. I often took on multiple shorter internships, sometimes even during the school year. Why? Because I'm genuinely curious about how different parts of the business world work!",
          zh: "我的实习经历可能看起来有点与众不同。我没有像常人那样只做三个月的暑期实习，而是跨越多个行业工作 - 从会计师事务所到SaaS公司，从供应链咨询到制造业，甚至私募股权。我经常同时进行多个短期实习，有时甚至在学期中也在实习。为什么？因为我真的很好奇商业世界不同领域是如何运作的！"
        }
      },
      {
        title: {
          en: "Embracing New Technologies",
          zh: "拥抱新技术"
        },
        content: {
          en: "Recently, I've become fascinated with AI and its potential. Fun fact: this website you're looking at? I built it in just a day using Cursor AI! It's probably the most efficient project I've ever completed, and it's opened my eyes to the incredible possibilities of AI technology.",
          zh: "最近，我对人工智能及其潜力产生了浓厚的兴趣。有趣的是：你现在看到的这个网站？我使用Cursor AI仅用一天就完成了！这可能是我完成过的最高效的项目，它让我看到了AI技术令人难以置信的可能性。"
        }
      },
      {
        title: {
          en: "Looking Forward",
          zh: "展望未来"
        },
        content: {
          en: "My goal is to become a Product Manager, but I'm keeping my options open. I've purposely explored both large corporations and small startups because I believe growth happens when you step out of your comfort zone. I'm not tied to any specific industry - what excites me is the opportunity to learn, innovate, and create impact. If there's a chance to explore unknown territory and make a difference, count me in!",
          zh: "我的目标是成为一名产品经理，但我也保持开放的态度。我特意在大公司和小型创业公司都进行了尝试，因为我相信只有走出舒适区才能获得成长。我并不局限于特定的行业 - 真正让我兴奋的是学习、创新和创造影响的机会。如果有机会探索未知领域并做出改变，我一定会全力以赴！"
        }
      }
    ]
  };

  return (
    <>
      {/* Hero Section */}
      <Hero
        title={language === 'en' ? "About Me" : "关于我"}
        subtitle={language === 'en' 
          ? <>Learn more about my <a href="#skills" onClick={scrollToSection('skills')} className="btn-link">skills</a>, <a href="#experience" onClick={scrollToSection('experience')} className="btn-link">experience</a>, and <a href="#education" onClick={scrollToSection('education')} className="btn-link">education</a></>
          : <>了解更多关于我的<a href="#skills" onClick={scrollToSection('skills')} className="btn-link">技能</a>、<a href="#experience" onClick={scrollToSection('experience')} className="btn-link">经验</a>和<a href="#education" onClick={scrollToSection('education')} className="btn-link">教育背景</a></>
        }
        image={aboutImage}
        reversed
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
        imageClassName="w-full h-[600px] object-cover object-center rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-500"
      >
        <div className="flex flex-col space-y-6">
          <p className="text-xl text-light/90">
            {language === 'en' 
              ? "I'm a passionate developer with a unique journey from accounting to tech." 
              : "我是一位充满热情的开发者，有着从会计到科技的独特经历。"
            }
          </p>
          <a 
            href={language === 'en' ? "/assets/resume/resume_en.pdf" : "/assets/resume/resume_zh.pdf"} 
            className="btn btn-primary inline-flex items-center gap-2 w-fit"
            download={language === 'en' ? "Jeremy Dong Resume.pdf" : "董衡简历.pdf"}
            target="_blank"
            rel="noopener noreferrer"
          >
            {language === 'en' ? "Download Resume" : "下载简历"} <FiDownload />
          </a>
        </div>
      </Hero>
      
      {/* Bio Section */}
      <Section
        id="bio"
        title={bioContent.title[language]}
        subtitle={bioContent.subtitle[language]}
      >
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Journey Content */}
            <motion.div 
              className="flex flex-col justify-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <p className="text-lg text-light/95">
                {language === 'en' ? (
                  <>
                    <motion.span 
                      className="text-lg block"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      viewport={{ once: true }}
                    >
                      {"Imagine turning down a $20,000 merit scholarship from Cornell and an offer from Columbia University. "}
                    </motion.span>
                    <motion.span 
                      className="block mt-6"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                      viewport={{ once: true }}
                    >
                      {"Why did I make this seemingly crazy decision? Because I discovered something powerful: while accounting taught me to follow rules, the future of business lies in breaking them. In today's world, true transformation comes through data and AI – tools that let us create without boundaries."}
                    </motion.span>
                    <motion.span 
                      className="block mt-6"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.6 }}
                      viewport={{ once: true }}
                    >
                      {"Through AI, I've evolved from an accounting student to a full-stack developer, proving that the most valuable skill isn't following conventions, but daring to redefine what's possible."}
                    </motion.span>
                  </>
                ) : (
                  <>
                    <motion.span 
                      className="text-lg block"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      viewport={{ once: true }}
                    >
                      {"拒绝康奈尔大学两万美元的奖学金和哥伦比亚大学的录取通知，听起来疯狂吗？"}
                    </motion.span>
                    <motion.span 
                      className="block mt-6"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                      viewport={{ once: true }}
                    >
                      {"为什么我做出这个看似疯狂的决定？因为我发现了一个强大的真相：当会计教会我遵循规则时，商业的未来在于打破它们。在当今世界，真正的转型来自于数据和人工智能 – 这些工具让我们能够不受限制地创造。"}
                    </motion.span>
                    <motion.span 
                      className="block mt-6"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.6 }}
                      viewport={{ once: true }}
                    >
                      {"通过AI，我从一名会计学生蜕变为全栈开发者，证明最有价值的技能不是遵循常规，而是敢于重新定义可能性。"}
                    </motion.span>
                  </>
                )}
              </p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                viewport={{ once: true }}
              >
                <Link 
                  to="/journey" 
                  className="text-primary hover:text-lightgold transition-colors inline-flex items-center gap-2 group mt-6"
                >
                  {language === 'en' ? "Read My Full Journey" : "阅读完整故事"} 
                  <span className="transform transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </motion.div>
            </motion.div>

            {/* Journey Image */}
            <motion.div 
              className="flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="w-full h-full flex items-center justify-center">
                <motion.img
                  src={journeyImage}
                  alt={language === 'en' ? "Jeremy's Journey" : "董衡的旅程"}
                  className="w-full h-full object-cover rounded-lg hover:opacity-95 transition-opacity duration-500"
                  style={{ maxHeight: '400px' }}
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>
          </div>

          {/* Decorative Separator */}
          <div className="relative my-16">
            <div className="absolute left-0 right-0 top-1/2 transform -translate-y-1/2 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 rotate-45 border-2 border-primary/20 bg-darkgray"></div>
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 rotate-45 border-2 border-primary/30 bg-darkgray"></div>
          </div>
        </div>
      </Section>
      
      {/* Skills Section */}
      <Section
        id="skills"
        title={language === 'en' ? "Technical Expertise" : "技术专长"}
        subtitle={language === 'en' ? "Data Science & Business Analytics Skills" : "数据科学与商业分析技能"}
        dark
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Technical Skills */}
          <div>
            <h3 className="text-2xl font-bold mb-6 text-white">{language === 'en' ? "Programming & Tools" : "编程与工具"}</h3>
            {technicalSkills.map((skill, index) => (
              <SkillBar
                key={skill.name}
                name={skill.name}
                percentage={skill.percentage}
                color={skill.color}
                index={index}
              />
            ))}
          </div>
          
          {/* Soft Skills */}
          <div>
            <h3 className="text-2xl font-bold mb-6 text-white">{language === 'en' ? "Domain Expertise" : "领域专长"}</h3>
            {softSkills.map((skill, index) => (
              <SkillBar
                key={skill.name}
                name={skill.name}
                percentage={skill.percentage}
                color={skill.color}
                index={index}
              />
            ))}
          </div>
        </div>
      </Section>
      
      {/* Decorative Separator */}
      <div className="relative my-16">
        <div className="absolute left-0 right-0 top-1/2 transform -translate-y-1/2 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 rotate-45 border-2 border-primary/20 bg-darkgray"></div>
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 rotate-45 border-2 border-primary/30 bg-darkgray"></div>
      </div>
      
      {/* Experience Section */}
      <Section
        id="experience"
        title={language === 'en' ? "Professional Experience" : "实习经历"}
        subtitle={language === 'en' ? "My internships and consulting work" : "我的实习与咨询工作经验"}
      >
        <div className="max-w-3xl mx-auto">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              className="mb-12 last:mb-0"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center">
                  {exp.company === 'Source Ready' && (
                    <img 
                      src="/assets/images/logos/sourceready.png" 
                      alt="Source Ready" 
                      className="w-12 h-12 object-contain"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.style.display = 'none';
                        e.target.parentNode.innerHTML = '<div class="w-12 h-12 flex items-center justify-center text-primary text-xl font-bold">SR</div>';
                      }}
                    />
                  )}
                  {exp.company === 'US Pharmacopeia' && (
                    <img 
                      src="/assets/images/logos/usp.png" 
                      alt="US Pharmacopeia" 
                      className="w-12 h-12 object-contain"
                    />
                  )}
                  {exp.company === 'Kaifeng Investment' && (
                    <img 
                      src="/assets/images/logos/kaifeng.png" 
                      alt="Kaifeng Investment" 
                      className="w-12 h-12 object-contain"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.style.display = 'none';
                        e.target.parentNode.innerHTML = '<div class="w-12 h-12 flex items-center justify-center text-primary text-xl font-bold">KF</div>';
                      }}
                    />
                  )}
                  {exp.company === 'GYJA Private Equity' && (
                    <img 
                      src="/assets/images/logos/gyja.png" 
                      alt="GYJA Private Equity" 
                      className="w-12 h-12 object-contain"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.style.display = 'none';
                        e.target.parentNode.innerHTML = '<div class="w-12 h-12 flex items-center justify-center text-primary text-xl font-bold">GY</div>';
                      }}
                    />
                  )}
                  {exp.company === 'Molex' && (
                    <img 
                      src="/assets/images/logos/molex.png" 
                      alt="Molex" 
                      className="w-12 h-12 object-contain"
                    />
                  )}
                  {exp.company === 'BDO Consulting' && (
                    <img 
                      src="/assets/images/logos/bdo.png" 
                      alt="BDO Consulting" 
                      className="w-12 h-12 object-contain"
                    />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold">{language === 'en' ? exp.role : 
                    exp.company === 'Source Ready' ? '增长战略实习生' :
                    exp.company === 'US Pharmacopeia' ? 'AI/ML技术咨询者' :
                    exp.company === 'Kaifeng Investment' ? 'TMT研究员实习生' :
                    exp.company === 'GYJA Private Equity' ? '投资分析实习生' :
                    exp.company === 'Molex' ? '成本分析师' :
                    exp.company === 'BDO Consulting' ? '咨询实习生' :
                    exp.role
                  }</h3>
                  <div className="flex flex-wrap items-center gap-2">
                    <a 
                      href={exp.website} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-primary font-medium hover:text-lightgold transition-colors"
                    >
                      {language === 'en' ? exp.company : 
                        exp.company === 'Source Ready' ? 'SourceReady' :
                        exp.company === 'US Pharmacopeia' ? '美国药典' :
                        exp.company === 'Kaifeng Investment' ? '凯丰投资' :
                        exp.company === 'GYJA Private Equity' ? '国悦君安私募基金' :
                        exp.company === 'Molex' ? 'Molex' :
                        exp.company === 'BDO Consulting' ? 'BDO立信' :
                        exp.company
                      }
                    </a>
                    <span className="text-gray-500">•</span>
                    <span className="text-gray-500 italic">{language === 'en' ? exp.companyDescription : 
                      exp.company === 'Source Ready' ? '初创供应链引擎' :
                      exp.company === 'US Pharmacopeia' ? '制药标准组织' :
                      exp.company === 'Kaifeng Investment' ? '共同基金' :
                      exp.company === 'GYJA Private Equity' ? '私募股权公司' :
                      exp.company === 'Molex' ? '制造业与电子' :
                      exp.company === 'BDO Consulting' ? '全球咨询公司' :
                      exp.companyDescription
                    }</span>
                  </div>
                  <p className="text-gray-500 mb-4">{exp.period}</p>
                  <div className="text-white font-medium">
                    {exp.description.split('. ').filter(sentence => sentence.trim().length > 0).map((sentence, i, arr) => (
                      <div key={i} className="flex items-start mb-2 last:mb-0">
                        <span className="text-primary font-bold mr-2 mt-1">•</span>
                        <span>{language === 'en' ? 
                          (sentence + (i < arr.length - 1 && sentence.trim().slice(-1) !== '.' ? '.' : '')) : 
                          (exp.company === 'Source Ready' ? 
                            (i === 0 ? '基于AI自动化开发并执行Reddit增长策略，通过Crew.ai与Cursor工具，训练Reddit机器人提升社区互动' : 
                             i === 1 ? '利用PRAW（Python Reddit API工具包）及Pandas进行社区互动的数据分析，识别用户互动趋势，精准投放营销' : 
                             '通过Mixpanel仪表盘可视化漏斗、流程和留存报告，揭示增长洞察') :
                           exp.company === 'US Pharmacopeia' ?
                            (i === 0 ? '使用Python开发自动化工作流，持续收集和处理连续制造领域的研究数据，实现每月实时更新' : 
                             '利用API自动化抓取300个医疗关键词的数据，并制作搜索引擎供客户搜索医学期刊、视频、报道') :
                           exp.company === 'Kaifeng Investment' ?
                            (i === 0 ? '研究泛娱乐行业，结合Perplexity AI分析市场趋势及舆论走向，整合实地调研结果至投资报告' : 
                             '在深圳核心商圈实地调研，追踪超2万+人流量、购买率及客群画像，评估市场潜力') :
                           exp.company === 'GYJA Private Equity' ?
                            (i === 0 ? '使用Wind金融终端整合行业数据，学习行业Value Chain并撰写行业报告' : 
                             '协助尽调团队分析生产线及财务报表，评估微电子公司上市可能与市场增长潜力') :
                           exp.company === 'Molex' ?
                            (i === 0 ? '制定战略框架，帮助客户识别中国境外替代制造地点，评估成本、商业风险及关税政策' : 
                             '变量参数建模并基于优先级推荐最佳地区，成功纳入企业战略计划，降低20%迁移成本') :
                           exp.company === 'BDO Consulting' ?
                            (i === 0 ? '主导英飞凌与赛米控客户销售，1个月达成700万元订单，并获华为创投注资' : 
                             '竞品分析及价格谈判，实现60%成本优势及40%毛利率，最终成交') :
                            sentence)
                        }</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Timeline connector (except for last item) */}
              {index < experiences.length - 1 && (
                <div className="ml-6 mt-4 mb-4 w-0.5 h-8 bg-gradient-to-b from-primary/50 to-transparent"></div>
              )}
            </motion.div>
          ))}
        </div>
      </Section>
      
      {/* Decorative Separator */}
      <div className="relative my-16">
        <div className="absolute left-0 right-0 top-1/2 transform -translate-y-1/2 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 rotate-45 border-2 border-primary/20 bg-darkgray"></div>
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 rotate-45 border-2 border-primary/30 bg-darkgray"></div>
      </div>
      
      {/* Education Section */}
      <Section
        id="education"
        title={language === 'en' ? "Education" : "教育背景"}
        subtitle={language === 'en' ? "University of Illinois Urbana-Champaign" : "伊利诺伊大学厄巴纳-香槟分校"}
        dark
      >
        <div className="max-w-3xl mx-auto">
          {education.map((edu, index) => (
            <motion.div
              key={edu.id}
              className="mb-12 last:mb-0"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center">
                  <img 
                    src="/assets/images/logos/uiuc.png" 
                    alt="University of Illinois Urbana-Champaign" 
                    className="w-12 h-12 object-contain"
                  />
                </div>
                <div className="w-full">
                  <h3 className="text-2xl font-bold text-white">{edu.degree}</h3>
                  <p className="text-primary font-medium">{edu.institution}</p>
                  <p className="text-gray-300 mb-2">{edu.period}</p>
                  
                  <div className="mt-4">
                    <p className="text-gray-300 mb-2">
                      <span className="font-semibold text-primary">GPA:</span> {index === 0 ? '3.7/4.0' : '3.9/4.0'}
                    </p>
                    
                    <p className="text-gray-300 mb-2 font-semibold text-primary">
                      {language === 'en' ? "Key Courses:" : "核心课程:"}
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                      {index === 0 ? (
                        // Master's courses
                        <>
                          {edu.courses.map((course, courseIndex) => (
                            <div key={courseIndex} className="bg-darkgray/50 p-2 rounded border border-primary/20">
                              <span className="text-white">{language === 'en' ? course : 
                                course === 'BADM 550: Business Practicum - A-' ? 'BADM 550: 商业实践 - A-' :
                                course === 'BADM 554: Enterprise Database Management - B+' ? 'BADM 554: 企业数据库管理 - B+' :
                                course === 'BDI 513: Data Storytelling - A+' ? 'BDI 513: 数据叙事 - A+' :
                                course === 'FIN 550: Big Data Analytics in Finance - A-' ? 'FIN 550: 金融大数据分析 - A-' :
                                course === 'FIN 553: Machine Learning in Finance - B' ? 'FIN 553: 金融机器学习 - B' :
                                course === 'ACCY 512: Data Analytics for Mgmt Acctg - In Progress' ? 'ACCY 512: 管理会计数据分析 - 进行中' :
                                course === 'BADM 557: Topics in Bus Intelligence - In Progress' ? 'BADM 557: 商业智能专题 - 进行中' :
                                course === 'BADM 576: Data Science and Analytics - In Progress' ? 'BADM 576: 数据科学与分析 - 进行中' :
                                'FIN 557: 金融数据管理与分析 - 进行中'
                              }</span>
                            </div>
                          ))}
                        </>
                      ) : (
                        // Bachelor's courses
                        <>
                          {edu.courses.map((course, courseIndex) => (
                            <div key={courseIndex} className="bg-darkgray/50 p-2 rounded border border-primary/20">
                              <span className="text-white">{language === 'en' ? course : 
                                course === 'ACCY 201: Accounting and Accountancy I - A' ? 'ACCY 201: 会计学 I - A' :
                                course === 'ACCY 202: Accounting and Accountancy II - A' ? 'ACCY 202: 会计学 II - A' :
                                course === 'ACCY 301: Atg Measurement & Disclosure - A' ? 'ACCY 301: 会计计量与披露 - A' :
                                course === 'ACCY 302: Decision Making for Atg - A-' ? 'ACCY 302: 会计决策 - A-' :
                                course === 'ACCY 303: Atg Institutions and Reg - A-' ? 'ACCY 303: 会计制度与法规 - A-' :
                                course === 'ACCY 304: Accounting Control Systems - B' ? 'ACCY 304: 会计控制系统 - B' :
                                course === 'ACCY 312: Principles of Taxation - A' ? 'ACCY 312: 税务原理 - A' :
                                course === 'ACCY 405: Assurance and Attestation - B-' ? 'ACCY 405: 审计与认证 - B-' :
                                course === 'ACCY 410: Advanced Financial Reporting - B' ? 'ACCY 410: 高级财务报告 - B' :
                                course === 'FIN 221: Corporate Finance - A' ? 'FIN 221: 公司金融 - A' :
                                course === 'BADM 210: Business Analytics I - A-' ? 'BADM 210: 商业分析 I - A-' :
                                course === 'BADM 211: Business Analytics II - A+' ? 'BADM 211: 商业分析 II - A+' :
                                course === 'BADM 275: Operations Management - A-' ? 'BADM 275: 运营管理 - A-' :
                                course === 'BADM 300: The Legal Environment of Bus - A-' ? 'BADM 300: 商业法律环境 - A-' :
                                course === 'BADM 310: Mgmt and Organizational Beh - A+' ? 'BADM 310: 管理与组织行为 - A+' :
                                course === 'BADM 320: Principles of Marketing - A' ? 'BADM 320: 市场营销原理 - A' :
                                course === 'BADM 350: IT for Networked Organizations - A' ? 'BADM 350: 网络组织信息技术 - A' :
                                course === 'BADM 351: Social Media Strategy - A' ? 'BADM 351: 社交媒体策略 - A' :
                                course === 'BADM 449: Business Policy and Strategy - A-' ? 'BADM 449: 商业政策与战略 - A-' :
                                course === 'ECON 102: Microeconomic Principles - PS' ? 'ECON 102: 微观经济学原理 - PS' :
                                'ECON 103: 宏观经济学原理 - A'
                              }</span>
                            </div>
                          ))}
                        </>
                      )}
                    </div>
                    
                    {index === 1 && (
                      <div className="mt-6">
                        <p className="text-gray-300 mb-2 font-semibold text-primary">
                          {language === 'en' ? "AP & Placement Tests:" : "AP课程与测试:"}
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                          <div className="bg-darkgray/50 p-2 rounded border border-primary/20">
                            <span className="text-white">{language === 'en' ? 
                              "AP Calculus BC (Replaced MATH 220, 231)" : 
                              "AP 微积分 BC (替代 MATH 220, 231)"}</span>
                          </div>
                          <div className="bg-darkgray/50 p-2 rounded border border-primary/20">
                            <span className="text-white">{language === 'en' ? 
                              "AP Statistics (Replaced STAT 100)" : 
                              "AP 统计学 (替代 STAT 100)"}</span>
                          </div>
                          <div className="bg-darkgray/50 p-2 rounded border border-primary/20">
                            <span className="text-white">{language === 'en' ? 
                              "AP Computer Science (Replaced CS 101)" : 
                              "AP 计算机科学 (替代 CS 101)"}</span>
                          </div>
                          <div className="bg-darkgray/50 p-2 rounded border border-primary/20">
                            <span className="text-white">{language === 'en' ? 
                              "AP Physics (Replaced PHYS 211)" : 
                              "AP 物理学 (替代 PHYS 211)"}</span>
                          </div>
                          <div className="bg-darkgray/50 p-2 rounded border border-primary/20">
                            <span className="text-white">{language === 'en' ? 
                              "Proficiency Exam (Replaced ECON 102)" : 
                              "能力测试 (替代 ECON 102)"}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Timeline connector (except for last item) */}
              {index < education.length - 1 && (
                <div className="ml-6 mt-4 mb-4 w-0.5 h-8 bg-gradient-to-b from-primary/50 to-transparent"></div>
              )}
            </motion.div>
          ))}
        </div>
      </Section>
    </>
  );
};

export default About; 