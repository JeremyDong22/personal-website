import React from 'react';
import { motion } from 'framer-motion';
import { FiAward, FiUsers, FiStar, FiClock } from 'react-icons/fi';
import { useLanguage } from '../../../context/LanguageContext';
import translations from '../../../context/translations';

// Components
import Hero from '../../../components/common/Hero';
import Section from '../../../components/common/Section';

// Import your actual sports photos
import twilightBasketball from '../../../assets/images/sports/twilight_basketball.jpg';
import varsityBasketball from '../../../assets/images/sports/varsity_basketball.jpg';
import highschoolBasketball from '../../../assets/images/sports/highschool_basketball.jpg';
import beijingBasketball from '../../../assets/images/sports/beijing_basketball.jpg';
import footballCareer from '../assets/images/sports/football_career.jpeg';
import heroImage from '../assets/images/sports/hero/IMG_1479.JPG';

// Career highlights data
const careerHighlights = [
  {
    year: '2021-2024',
    titleEn: 'Twilight Illini Basketball Club',
    titleZh: '伊利诺伊大学日落篮球俱乐部',
    descriptionEn: 'Best Asian basketball club at UIUC, 3rd place in America-China Cup, 2nd place in CSSA Tournament',
    descriptionZh: 'UIUC最佳亚洲篮球俱乐部，美中杯大区赛季军，CSSA亚军',
    icon: <FiAward className="text-primary text-2xl" />,
  },
  {
    year: '2021-2022',
    titleEn: 'Shenzhen College of International Education Flag Football Team',
    titleZh: '深圳国际交流学院腰旗橄榄球队',
    descriptionEn: 'Champions of Shenzhen High School Flag Football League',
    descriptionZh: '深圳高中橄榄球联赛冠军',
    icon: <FiStar className="text-primary text-2xl" />,
  },
  {
    year: '2018-2021',
    titleEn: 'Donovan Catholic High School Varsity Athlete',
    titleZh: '多诺万天主教高中校队运动员',
    descriptionEn: 'Elite Eight in New Jersey Regional Championships',
    descriptionZh: '新泽西州地区赛八强',
    icon: <FiStar className="text-primary text-2xl" />,
  },
  {
    year: '2017-2018',
    titleEn: 'International Department of Shenzhen Senior High School Basketball Team',
    titleZh: '深圳市高级中学国际部篮球队',
    descriptionEn: 'Grade-level Champions, Founder of prestigious "International Cup"',
    descriptionZh: '级赛冠军，创立知名"国际杯"比赛',
    icon: <FiUsers className="text-primary text-2xl" />,
  },
];

// Career timeline data
const careerTimeline = [
  {
    year: '2021-2024',
    titleEn: 'President, Point Guard, Twilight Illini Basketball Club of UIUC',
    titleZh: '社长，控球后卫，伊利诺伊大学日落篮球俱乐部',
    descriptionEn: 'Led the "most prestigious Chinese basketball team on campus." Achieved 3rd place in the America-China Cup and 2nd place in CSSA tournament.',
    descriptionZh: '美中杯季军，CSSA亚军，"校内最有名誉的华人篮球队"。',
    image: twilightBasketball
  },
  {
    year: '2021-2022',
    titleEn: 'Wide Receiver, Shenzhen College of International Education Flag Football',
    titleZh: '外接手，深圳国际交流学院腰旗橄榄球队',
    descriptionEn: 'Played as Wide Receiver for the championship-winning flag football team.',
    descriptionZh: '深圳市冠军',
  },
  {
    year: '2018-2021',
    titleEn: 'Donovan Catholic High School Varsity Basketball Team',
    titleZh: '多诺万天主教高中篮球校队',
    descriptionEn: 'Competed at the highest level of high school basketball, reaching the Elite Eight in New Jersey state.',
    descriptionZh: '新泽西州八强。',
    image: varsityBasketball
  },
  {
    year: '2017',
    titleEn: 'Captain, International Department of Shenzhen Senior High School',
    titleZh: '队长，深圳市高级中学国际部',
    descriptionEn: 'Founder of the "International Cup." Led team to class basketball championship. Member of the school team.',
    descriptionZh: '"国际杯"发起人，校内篮球班赛冠军，校队成员。',
    image: highschoolBasketball
  },
  {
    year: '2014',
    titleEn: 'President, Shenzhen Baihe Foreign Language School Basketball Club',
    titleZh: '社长，深圳市百合外国语学校篮球社',
    descriptionEn: 'Led team to class basketball championship.',
    descriptionZh: '校内篮球班赛冠军。',
  },
  {
    year: '2012',
    titleEn: 'Athlete, Invited to join Shenzhen City Basketball Team',
    titleZh: '运动员，受邀进入深圳市篮球队',
    descriptionEn: 'Received prestigious invitation to join the Shenzhen City basketball team.',
    descriptionZh: '受邀进入深圳市队。',
  },
  {
    year: '2009',
    titleEn: 'The rookie year of basketball',
    titleZh: '篮球新秀年',
    descriptionEn: 'First introduction to basketball, beginning of a lifelong passion.',
    descriptionZh: '初次接触篮球，开始了一生的热爱。',
  },
];

const Sports = () => {
  const { language } = useLanguage();
  const t = translations.sports;

  return (
    <div>
      {/* Hero Section */}
      <div className="relative">
        <Hero
          title={t.title[language]}
          subtitle={t.subtitle[language]}
          image={heroImage}
        />
        <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 bg-dark/80 backdrop-blur-sm p-2 md:p-3 max-w-xs text-light/80 text-xs md:text-sm border-l-2 border-primary">
          {t.photoCaption[language]}
        </div>
      </div>

      {/* Career Highlights - Moved to front */}
      <Section
        title={t.highlights[language]}
        subtitle="A journey of dedication, perseverance, and achievement"
        className="bg-darkgray"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {careerHighlights.map((highlight, index) => (
            <motion.div
              key={index}
              className="bg-dark border border-primary/20 p-6 luxury-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex items-start gap-4">
                <div className="mt-1">{highlight.icon}</div>
                <div>
                  <div className="text-primary text-sm uppercase tracking-wider mb-1">{highlight.year}</div>
                  <h3 className="text-xl font-heading mb-2">
                    {language === 'en' ? highlight.titleEn : highlight.titleZh}
                  </h3>
                  <p className="text-light/80">
                    {language === 'en' ? highlight.descriptionEn : highlight.descriptionZh}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Basketball Timeline */}
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
                  <img
                    src={event.image}
                    alt={language === 'en' ? event.titleEn : event.titleZh}
                    className="w-full h-auto relative z-10"
                  />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </Section>
    </div>
  );
};

export default Sports; 