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

  // Extract background class from className prop
  const bgClass = className.includes('bg-') ? className : `${className} bg-dark`;

  return (
    <section 
      id={id} 
      className={`py-12 sm:py-16 md:py-20 lg:py-24 relative ${bgClass}`}
    >
      <div className={`${fullWidth ? 'w-full' : 'container mx-auto px-4'}`}>
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={variants}
          className={`text-center ${id && id.startsWith('contact') ? 'mb-4' : 'mb-8 md:mb-12'}`}
        >
          {title && (
            <motion.h2 
              className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4 text-primary"
              variants={variants}
            >
              {title}
            </motion.h2>
          )}
          
          {subtitle && (
            <motion.p 
              className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto text-light/80"
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