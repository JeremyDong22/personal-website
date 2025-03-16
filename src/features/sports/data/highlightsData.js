import React from 'react';
import { FiAward, FiUsers, FiStar } from 'react-icons/fi';

// Career highlights data
export const careerHighlights = [
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
    descriptionEn: 'Champions of Shenzhen High School Flag Football League as Wide Receiver',
    descriptionZh: '作为外接手赢得深圳高中橄榄球联赛冠军',
    icon: <FiStar className="text-primary text-2xl" />,
  },
  {
    year: '2018-2021',
    titleEn: 'Donovan Catholic High School Varsity Team',
    titleZh: '多诺万天主教高中校队',
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