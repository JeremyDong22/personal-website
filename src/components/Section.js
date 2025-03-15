import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Section = ({ 
  id, 
  title, 
  subtitle, 
  children, 
  className = '', 
  dark = false,
  fullWidth = false
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  return (
    <section 
      id={id} 
      className={`py-16 md:py-24 ${dark ? 'bg-dark text-white' : 'bg-light text-dark'} ${className}`}
    >
      <div className={`${fullWidth ? 'w-full' : 'container mx-auto px-4'}`}>
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={variants}
          className="text-center mb-12"
        >
          {title && (
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-4"
              variants={variants}
            >
              {title}
            </motion.h2>
          )}
          
          {subtitle && (
            <motion.p 
              className={`text-xl max-w-3xl mx-auto ${dark ? 'text-gray-300' : 'text-gray-600'}`}
              variants={variants}
            >
              {subtitle}
            </motion.p>
          )}
        </motion.div>
        
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={variants}
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
};

export default Section; 