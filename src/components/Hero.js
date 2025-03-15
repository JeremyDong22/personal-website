import React from 'react';
import { motion } from 'framer-motion';

const Hero = ({ title, subtitle, image, children, reversed = false }) => {
  return (
    <section className="py-20 md:py-32 overflow-hidden bg-dark relative">
      {/* Gold accent lines */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gold-gradient"></div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gold-gradient"></div>
      
      <div className="container mx-auto px-4">
        <div className={`flex flex-col ${reversed ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12`}>
          {/* Text Content */}
          <motion.div 
            className="w-full md:w-1/2"
            initial={{ opacity: 0, x: reversed ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {title && (
              <h1 className="mb-6 relative">
                <span className="gold-text">{title}</span>
                <div className="w-24 h-1 bg-primary mt-4"></div>
              </h1>
            )}
            
            {subtitle && (
              <p className="text-xl text-light/80 mb-8">
                {subtitle}
              </p>
            )}
            
            {children}
          </motion.div>
          
          {/* Image */}
          {image && (
            <motion.div 
              className="w-full md:w-1/2"
              initial={{ opacity: 0, x: reversed ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="relative p-1 bg-gold-gradient w-full overflow-hidden">
                <img 
                  src={image} 
                  alt="Hero" 
                  className="w-full h-[500px] relative z-10 object-cover object-center"
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