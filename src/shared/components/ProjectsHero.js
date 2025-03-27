import React from 'react';
import { motion } from 'framer-motion';

const ProjectsHero = ({ title, subtitle, language }) => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
        duration: 0.6
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  // Floating animation for decorative elements
  const floatAnimation = {
    y: [-10, 10],
    transition: {
      y: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }
    }
  };

  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-dark border-b border-primary/20">
      {/* Background with parallax effect */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-dark-gradient"></div>
        <div className="absolute inset-0 opacity-20" style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1617791160536-598cf32026fb?auto=format&fit=crop&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center 50%'
        }}></div>
        
        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-10" style={{ 
          backgroundImage: 'linear-gradient(to right, rgba(212, 175, 55, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(212, 175, 55, 0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}></div>
      </div>
      
      {/* Decorative elements */}
      <motion.div 
        className="absolute top-24 right-[10%] w-32 h-32 rounded-full bg-primary opacity-10"
        style={{ filter: 'blur(24px)' }}
        animate={floatAnimation}
      />
      <motion.div 
        className="absolute bottom-24 left-[10%] w-40 h-40 rounded-full bg-primary opacity-10"
        style={{ filter: 'blur(24px)' }}
        animate={{
          ...floatAnimation,
          transition: { ...floatAnimation.transition, delay: 0.5 }
        }}
      />
      
      {/* Tech-inspired decorative polygons */}
      <div className="absolute top-[20%] left-[15%] w-16 h-16 border border-primary/20 transform rotate-45 opacity-20"></div>
      <div className="absolute bottom-[30%] right-[20%] w-24 h-24 border border-primary/20 transform rotate-12 opacity-20"></div>
      <div className="absolute top-[40%] right-[25%] w-12 h-12 border border-primary/20 transform -rotate-12 opacity-20"></div>
      
      {/* Content */}
      <div className="container relative z-10 px-4 md:px-6">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 
            className="text-4xl md:text-6xl font-bold text-primary mb-6"
            variants={itemVariants}
          >
            {title}
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-light/80 mb-20"
            variants={itemVariants}
          >
            {subtitle}
          </motion.p>
        </motion.div>
      </div>
      
      {/* Scroll down indicator - now positioned left */}
      <motion.div 
        className="absolute bottom-8 left-[45%] flex flex-col items-center"
        animate={{ y: [0, 8, 0], transition: { duration: 1.5, repeat: Infinity } }}
      >
        <span className="text-primary/70 mb-2 text-sm">{language === 'en' ? 'Scroll to explore' : '向下滚动探索'}</span>
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          className="text-primary/70"
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <polyline points="19 12 12 19 5 12"></polyline>
        </svg>
      </motion.div>
      
      {/* Tech-inspired decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
    </section>
  );
};

export default ProjectsHero; 