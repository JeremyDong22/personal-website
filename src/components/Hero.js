import React from 'react';
import { motion } from 'framer-motion';

const Hero = ({ 
  title, 
  subtitle, 
  image, 
  children, 
  reversed = false, 
  className = '',
  imageClassName = 'hero-image'
}) => {
  return (
    <section className="py-16 md:py-24 lg:py-32 overflow-hidden bg-dark relative">
      {/* Gold accent lines */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gold-gradient"></div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gold-gradient"></div>
      
      <div className={className || 'container mx-auto px-4'}>
        <div className={`flex flex-col ${reversed ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-8 md:gap-12 lg:gap-16`}>
          {/* Text Content */}
          <motion.div 
            className="w-full md:w-1/2 px-2 sm:px-4"
            initial={{ opacity: 0, x: reversed ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {title && (
              <h1 className="mb-4 md:mb-8 relative">
                <span className="gold-text text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">{title}</span>
                <div className="w-16 md:w-24 h-1 bg-primary mt-4 md:mt-6"></div>
              </h1>
            )}
            
            {subtitle && (
              <p className="text-base md:text-lg lg:text-xl xl:text-2xl text-light/80 mb-4 md:mb-8 leading-relaxed">
                {subtitle}
              </p>
            )}
            
            {children}
          </motion.div>
          
          {/* Image */}
          {image && (
            <motion.div 
              className="w-full md:w-1/2 px-2 sm:px-4 mt-6 md:mt-0"
              initial={{ opacity: 0, x: reversed ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="hero-image-container relative p-1 bg-gold-gradient overflow-hidden rounded-lg shadow-2xl">
                <img 
                  src={image} 
                  alt="Hero" 
                  className={imageClassName}
                />
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero; 