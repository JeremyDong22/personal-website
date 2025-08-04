import React from 'react';
import SportsHero from '../../features/sports/SportsHero';
import CareerHighlights from '../../features/sports/CareerHighlights';
import BasketballTimeline from '../../features/sports/BasketballTimeline';

/**
 * Sports Career Page
 * 
 * This page showcases the user's sports career, including:
 * - Basketball achievements from 2009 to present
 * - Career highlights and notable accomplishments
 * - Detailed timeline of basketball journey
 * 
 * The page is fully bilingual (English/Chinese) and uses a luxury black and gold theme.
 */
const Sports = () => {
  return (
    <div>
      <SportsHero />
      <CareerHighlights />
      <BasketballTimeline />
    </div>
  );
};

export default Sports; 