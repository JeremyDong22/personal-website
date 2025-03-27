import React from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink, FiClock, FiUsers, FiTag } from 'react-icons/fi';

const ProjectCard = ({ 
  project = {}, // Add default empty object to prevent undefined errors
  language = 'en', // Add default language
  index = 0,
  layoutType = 'grid' // 'grid' or 'featured'
}) => {
  // Add safety check to return null if project is missing
  if (!project || Object.keys(project).length === 0) {
    return null;
  }
  
  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5, 
        delay: index * 0.1 
      }
    },
    hover: { 
      scale: 1.02,
      boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
      transition: { duration: 0.3, ease: "easeInOut" }
    },
    rest: { 
      scale: 1,
      boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.2, ease: "easeInOut" }
    }
  };

  // Status color map
  const statusColors = {
    completed: "bg-green-500",
    "in-progress": "bg-yellow-500",
    archived: "bg-gray-500"
  };

  // Get background pattern based on project category
  const getBackgroundPattern = () => {
    if (project.featured) {
      return 'pattern-featured';
    }
    
    if (project.categories.includes('frontend')) {
      return 'pattern-frontend';
    }
    
    if (project.categories.includes('backend')) {
      return 'pattern-backend';
    }
    
    if (project.categories.includes('fullstack')) {
      return 'pattern-fullstack';
    }
    
    if (project.categories.includes('automation')) {
      return 'pattern-automation';
    }
    
    return '';
  };

  return (
    <motion.div
      className={`bg-dark border border-primary/20 rounded-lg overflow-hidden luxury-shadow ${
        layoutType === 'featured' ? 'col-span-2' : ''
      }`}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
    >
      {/* Project Image */}
      <div className="relative">
        {project.image ? (
          <div className="aspect-w-16 aspect-h-9">
            <img 
              src={project.image} 
              alt={project.title?.[language] || ''} 
              className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-500"
            />
          </div>
        ) : (
          <div className={`aspect-w-16 aspect-h-9 ${getBackgroundPattern()}`}>
            <div className="flex items-center justify-center w-full h-full p-8 text-primary">
              <div className="text-center">
                <div className="text-6xl mb-4">{project.emoji || '🚀'}</div>
                <h3 className="text-xl font-semibold">{project.title?.[language] || 'Project'}</h3>
              </div>
            </div>
          </div>
        )}
        
        {/* Status badge */}
        {project.status && (
          <div className="absolute top-4 right-4">
            <span className={`text-xs px-2 py-1 rounded-full text-white ${statusColors[project.status] || "bg-blue-500"}`}>
              {language === 'en' ? project.status : project.statusZh || project.status}
            </span>
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold mb-3 text-primary h-14 overflow-hidden flex items-center">
          {project.title?.[language] || 'Project Title'}
        </h3>
        
        {/* Categories/Tags */}
        <div className="flex flex-wrap gap-2 mb-3 h-8 overflow-hidden">
          {project.categories && project.categories.length > 0 && 
            project.categories.map((category, idx) => (
              <span 
                key={idx} 
                className="inline-flex items-center text-xs px-2 py-1 rounded-full bg-primary/10 text-primary"
              >
                <FiTag className="mr-1" />
                {language === 'en' ? category : project.categoriesZh?.[idx] || category}
              </span>
            ))
          }
        </div>
        
        <p className="text-light/80 mb-4 h-24 overflow-hidden">
          {project.description?.[language] || ''}
        </p>
        
        {/* Project details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
          {/* Tech stack */}
          <div>
            <h4 className="text-sm uppercase tracking-wider text-primary/70 mb-2 h-5">
              {project.tech ? (language === 'en' ? 'Technologies' : '技术栈') : ''}
            </h4>
            <p className="text-light/60 text-sm h-10 overflow-hidden">
              {project.tech ? (project.tech[language] || '') : ''}
            </p>
          </div>
          
          {/* Project duration if available */}
          <div>
            <h4 className="text-sm uppercase tracking-wider text-primary/70 mb-2 h-5">
              {project.duration ? (language === 'en' ? 'Duration' : '项目周期') : ''}
            </h4>
            <p className="text-light/60 text-sm flex items-center h-10">
              {project.duration && <><FiClock className="mr-1" />{project.duration}</>}
            </p>
          </div>
          
          {/* Team size if available */}
          <div>
            <h4 className="text-sm uppercase tracking-wider text-primary/70 mb-2 h-5">
              {project.teamSize ? (language === 'en' ? 'Team Size' : '团队规模') : ''}
            </h4>
            <p className="text-light/60 text-sm flex items-center h-10">
              {project.teamSize && <><FiUsers className="mr-1" />{project.teamSize}</>}
            </p>
          </div>
          
          {/* Role if available */}
          <div>
            <h4 className="text-sm uppercase tracking-wider text-primary/70 mb-2 h-5">
              {project.role ? (language === 'en' ? 'My Role' : '我的角色') : ''}
            </h4>
            <p className="text-light/60 text-sm h-10 overflow-hidden">
              {project.role ? (project.role[language] || '') : ''}
            </p>
          </div>
        </div>
        
        {/* Links */}
        <div className="flex items-center justify-between pt-4 border-t border-primary/10">
          {project.githubUrl && (
            <a 
              href={project.githubUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center text-primary hover:text-primary/80 transition-colors"
            >
              <FiGithub className="mr-2" />
              {language === 'en' ? 'View on GitHub' : '在GitHub上查看'}
            </a>
          )}
          
          {project.liveUrl && (
            <a 
              href={project.liveUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center text-primary hover:text-primary/80 transition-colors ml-auto"
            >
              <FiExternalLink className="mr-2" />
              {language === 'en' ? 'Live Demo' : '在线演示'}
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard; 