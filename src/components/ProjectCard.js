import React from 'react';
import { motion } from 'framer-motion';
import { FiExternalLink, FiGithub } from 'react-icons/fi';

const ProjectCard = ({ 
  title, 
  description, 
  image, 
  tags = [], 
  liveUrl, 
  githubUrl,
  index = 0
}) => {
  return (
    <motion.div 
      className="overflow-hidden flex flex-col h-full bg-darkgray border border-primary/20 hover:border-primary transition-all duration-300 luxury-shadow"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      {/* Project Image */}
      <div className="relative overflow-hidden h-64 border-b border-primary/20">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute inset-0 bg-dark/30 hover:bg-transparent transition-all duration-300"></div>
      </div>
      
      {/* Project Content */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-heading font-bold mb-2 text-primary">{title}</h3>
        
        <p className="text-light/80 mb-4 flex-grow">{description}</p>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, i) => (
            <span 
              key={i} 
              className="px-3 py-1 bg-dark text-primary text-xs uppercase tracking-wider border border-primary/30"
            >
              {tag}
            </span>
          ))}
        </div>
        
        {/* Links */}
        <div className="flex gap-4 mt-auto pt-4 border-t border-primary/20">
          {githubUrl && (
            <a 
              href={githubUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-primary hover:text-lightgold transition-colors"
              aria-label="View source code on GitHub"
            >
              <FiGithub /> <span className="text-xs uppercase tracking-wider">Code</span>
            </a>
          )}
          
          {liveUrl && (
            <a 
              href={liveUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-primary hover:text-lightgold transition-colors"
              aria-label="View live project"
            >
              <FiExternalLink /> <span className="text-xs uppercase tracking-wider">Live Demo</span>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard; 