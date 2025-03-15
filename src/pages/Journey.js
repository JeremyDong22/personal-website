import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import Section from '../components/Section';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

const Journey = () => {
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
      en: "Every transformative journey begins with a moment of clarity. Mine came when I realized that true business value isn't about following rules – it's about creating impact.",
      zh: "每个改变人生的旅程都始于一个清晰的时刻。对我来说，这个时刻就是当我意识到真正的商业价值不在于遵循规则，而在于创造影响力。"
    },
    sections: [
      {
        title: {
          en: "Breaking Free from Convention",
          zh: "打破常规的束缚"
        },
        content: {
          en: "At first, I saw accounting as a gateway to understanding business operations through financial statements. It seemed logical – master the numbers, understand the business. But as I delved deeper, a stark reality emerged. Instead of gaining insights into business operations, I found myself merely following predefined rules and stacking numbers. This wasn't creating value; it was maintaining the status quo.\n\nThe turning point came when I realized that in today's rapidly evolving business landscape, true value creation comes from innovation and adaptability, not from rigid rule-following. This epiphany led me to make what seemed like a crazy decision to many: turning down a $20,000 merit scholarship from Cornell and an offer from Columbia University.",
          zh: "最初，我将会计视为理解企业运营的门户，通过财务报表来洞察业务。这看似合理 – 掌握数字，就能理解业务。但随着深入，一个残酷的现实浮现出来。与其说是获得业务洞察，不如说是在机械地遵循预定规则和堆砌数字。这并非在创造价值，而是在维持现状。\n\n转折点出现在我意识到，在当今快速发展的商业环境中，真正的价值创造来自创新和适应能力，而不是固守规则。这个顿悟让我做出了在许多人看来疯狂的决定：放弃康奈尔大学两万美元的奖学金和哥伦比亚大学的录取通知。"
        }
      },
      {
        title: {
          en: "The AI Revolution: A New Path Forward",
          zh: "AI革命：开启新的道路"
        },
        content: {
          en: "The emergence of AI technology marked a pivotal moment in my journey. Suddenly, the barriers between business insight and technical implementation began to crumble. I discovered that AI wasn't just another tool – it was a bridge between creativity and execution. This revelation was transformative. Without spending years mastering traditional programming, I could now bring my ideas to life through AI-assisted development.\n\nMy first major project – building this website – became a testament to this new paradigm. Using Cursor AI, I completed what would typically be a weeks-long development process in just a day. This wasn't just about speed; it was about reimagining what's possible when technology amplifies human creativity rather than constraining it.",
          zh: "人工智能技术的出现标志着我旅程中的一个关键时刻。突然间，商业洞察和技术实现之间的壁垒开始瓦解。我发现AI不仅仅是另一个工具 – 它是连接创造力和执行力的桥梁。这个发现具有变革性意义。无需花费数年时间掌握传统编程，我现在就能通过AI辅助开发将想法变为现实。\n\n我的第一个重要项目 – 构建这个网站 – 成为这个新范式的见证。使用Cursor AI，我在一天内完成了通常需要数周的开发过程。这不仅仅是关于速度；而是关于当技术放大而不是限制人类创造力时，重新想象什么是可能的。"
        }
      },
      {
        title: {
          en: "Learning Through Diverse Experiences",
          zh: "通过多元经历学习"
        },
        content: {
          en: "My unconventional approach extended beyond education into my professional experiences. Instead of following the traditional path of long-term internships, I chose to explore multiple industries simultaneously – from accounting firms to SaaS companies, supply chain consulting to manufacturing, and even private equity. Each experience revealed a crucial insight: while technical challenges vary across industries, the fundamental barriers often lie in human factors and creativity.\n\nThis realization has profound implications for the future of work. As AI continues to lower technical barriers, the ability to understand human needs and think creatively becomes increasingly valuable. It's no longer about mastering specific technical skills; it's about developing the ability to identify opportunities and craft innovative solutions.",
          zh: "我的非传统方式不仅体现在教育选择上，还延伸到职业经历中。我没有走传统的长期实习道路，而是选择同时探索多个行业 – 从会计师事务所到SaaS公司，从供应链咨询到制造业，甚至私募股权。每段经历都揭示了一个关键洞察：虽然不同行业的技术挑战各不相同，但根本障碍往往在于人的因素和创造力。\n\n这个认识对未来工作有深远影响。随着AI不断降低技术门槛，理解人类需求和创造性思维的能力变得越来越重要。这不再是掌握特定技术技能的问题，而是发展识别机会和制定创新解决方案的能力。"
        }
      },
      {
        title: {
          en: "The Future: Everyone a Product Manager",
          zh: "未来：人人都是产品经理"
        },
        content: {
          en: "Looking ahead, I believe we're moving toward a future where traditional role boundaries will blur. As AI democratizes technical implementation, the focus shifts to understanding user needs, identifying opportunities, and crafting solutions – essentially, the core skills of product management. This isn't just about career progression; it's about fundamentally rethinking how we create value in the digital age.\n\nMy journey from accounting to technology isn't just a career switch; it's a blueprint for adapting to and thriving in this new paradigm. It shows that the most valuable skill isn't technical expertise or domain knowledge, but the ability to see possibilities where others see limitations, and the courage to pursue them.",
          zh: "展望未来，我相信我们正在走向一个传统角色界限模糊的未来。随着AI民主化技术实现，重点转向理解用户需求、识别机会和制定解决方案 – 本质上是产品管理的核心技能。这不仅仅关乎职业发展；而是关于从根本上重新思考我们如何在数字时代创造价值。\n\n我从会计到技术的旅程不仅仅是一次职业转换；它是适应和在这个新范式中茁壮成长的蓝图。它表明最有价值的技能不是技术专长或领域知识，而是在他人看到限制时看到可能性的能力，以及追求这些可能性的勇气。"
        }
      }
    ]
  };

  return (
    <div className="pt-24 bg-darkgray min-h-screen">
      <div className="container mx-auto px-4">
        {/* Top Back Button */}
        <div className="mb-8">
          <Link 
            to="/about" 
            className="inline-flex items-center gap-2 text-light/50 hover:text-primary transition-colors"
          >
            <FiArrowLeft className="text-sm" />
            <span className="text-sm">{language === 'en' ? 'Back to About' : '返回关于页面'}</span>
          </Link>
        </div>

        <Section
          title={bioContent.title[language]}
          subtitle={bioContent.subtitle[language]}
        >
          <div className="max-w-3xl mx-auto">
            <p className="text-lg mb-8 text-light/95">
              {bioContent.greeting[language]}
            </p>
            
            {bioContent.sections.map((section, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="mb-12 last:mb-0"
              >
                <h3 className="text-2xl font-bold text-primary mb-4">
                  {section.title[language]}
                </h3>
                {section.content[language].split('\n\n').map((paragraph, pIndex) => (
                  <p key={pIndex} className="text-lg text-light/95 mb-4 last:mb-0">
                    {paragraph}
                  </p>
                ))}
              </motion.div>
            ))}

            {/* Bottom Back Button */}
            <div className="mt-16 text-right">
              <Link 
                to="/about" 
                className="inline-flex items-center gap-2 text-light/50 hover:text-primary transition-colors"
              >
                <FiArrowLeft className="text-sm" />
                <span className="text-sm">{language === 'en' ? 'Back to About' : '返回关于页面'}</span>
              </Link>
            </div>
          </div>
        </Section>
      </div>
    </div>
  );
};

export default Journey; 