import React from 'react';
import { motion } from 'framer-motion';
import { FiDownload, FiCalendar, FiBook, FiAward } from 'react-icons/fi';
import { useLanguage } from '../context/LanguageContext';

// Components
import Hero from '../components/Hero';
import Section from '../components/Section';
import SkillBar from '../components/SkillBar';

// Import hero image
import aboutImage from '../assets/images/about/IMG_8829.jpeg';

// Skills data
const technicalSkills = [
  { name: 'HTML/CSS', percentage: 95, color: 'primary' },
  { name: 'JavaScript', percentage: 90, color: 'blue' },
  { name: 'React', percentage: 85, color: 'blue' },
  { name: 'Node.js', percentage: 80, color: 'green' },
  { name: 'TypeScript', percentage: 75, color: 'blue' },
  { name: 'UI/UX Design', percentage: 70, color: 'purple' },
];

const softSkills = [
  { name: 'Problem Solving', percentage: 95, color: 'orange' },
  { name: 'Communication', percentage: 90, color: 'primary' },
  { name: 'Teamwork', percentage: 90, color: 'green' },
  { name: 'Time Management', percentage: 85, color: 'purple' },
  { name: 'Adaptability', percentage: 85, color: 'red' },
];

// Experience data
const experiences = [
  {
    id: 1,
    role: 'Senior Frontend Developer',
    company: 'Tech Company',
    period: 'Jan 2022 - Present',
    description: 'Led the development of responsive web applications using React, TypeScript, and Tailwind CSS. Collaborated with designers and backend developers to implement new features and improve user experience.',
  },
  {
    id: 2,
    role: 'Web Developer',
    company: 'Digital Agency',
    period: 'Mar 2019 - Dec 2021',
    description: 'Developed and maintained client websites using modern frontend technologies. Worked closely with the design team to ensure pixel-perfect implementation of UI designs.',
  },
  {
    id: 3,
    role: 'Junior Developer',
    company: 'Startup Inc.',
    period: 'Jun 2017 - Feb 2019',
    description: 'Assisted in the development of web applications. Gained experience in HTML, CSS, JavaScript, and various frontend frameworks.',
  },
];

// Education data
const education = [
  {
    id: 1,
    degree: 'Master of Computer Science',
    institution: 'University Name',
    period: '2015 - 2017',
    description: 'Specialized in web technologies and user interface design. Graduated with honors.',
  },
  {
    id: 2,
    degree: 'Bachelor of Science in Computer Science',
    institution: 'University Name',
    period: '2011 - 2015',
    description: 'Focused on software development and computer programming. Participated in various hackathons and coding competitions.',
  },
];

const About = () => {
  const { language } = useLanguage();

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
        subtitle={language === 'en' ? "Learn more about my background, skills, and experience" : "了解我的背景、技能和经验"}
        image={aboutImage}
        reversed
      >
        <a 
          href="/resume.pdf" 
          className="btn btn-primary inline-flex items-center gap-2"
          download
        >
          {language === 'en' ? "Download Resume" : "下载简历"} <FiDownload />
        </a>
      </Hero>
      
      {/* Bio Section */}
      <Section
        id="bio"
        title={bioContent.title[language]}
        subtitle={bioContent.subtitle[language]}
      >
        <div className="max-w-3xl mx-auto">
          <p className="text-lg mb-4">
            {bioContent.greeting[language]}
          </p>
          
          {bioContent.sections.map((section, index) => (
            <div key={index}>
              <h3 className="text-xl font-bold text-primary mb-3 mt-6">
                {section.title[language]}
              </h3>
              <p className="text-lg mb-4">
                {section.content[language]}
              </p>
            </div>
          ))}
        </div>
      </Section>
      
      {/* Skills Section */}
      <Section
        id="skills"
        title="My Skills"
        subtitle="Technologies and tools I work with"
        dark
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Technical Skills */}
          <div>
            <h3 className="text-2xl font-bold mb-6 text-white">Technical Skills</h3>
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
            <h3 className="text-2xl font-bold mb-6 text-white">Soft Skills</h3>
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
      
      {/* Experience Section */}
      <Section
        id="experience"
        title="Work Experience"
        subtitle="My professional journey"
      >
        <div className="max-w-3xl mx-auto">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              className="mb-12 last:mb-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex items-start gap-4">
                <div className="bg-primary text-white p-3 rounded-full">
                  <FiCalendar size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">{exp.role}</h3>
                  <p className="text-primary font-medium">{exp.company}</p>
                  <p className="text-gray-500 mb-4">{exp.period}</p>
                  <p className="text-gray-700">{exp.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>
      
      {/* Education Section */}
      <Section
        id="education"
        title="Education"
        subtitle="My academic background"
        dark
      >
        <div className="max-w-3xl mx-auto">
          {education.map((edu, index) => (
            <motion.div
              key={edu.id}
              className="mb-12 last:mb-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex items-start gap-4">
                <div className="bg-white text-primary p-3 rounded-full">
                  {index === 0 ? <FiAward size={24} /> : <FiBook size={24} />}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">{edu.degree}</h3>
                  <p className="text-primary font-medium">{edu.institution}</p>
                  <p className="text-gray-300 mb-4">{edu.period}</p>
                  <p className="text-gray-300">{edu.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>
    </>
  );
};

export default About; 