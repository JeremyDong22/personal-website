import React from 'react';
import { motion } from 'framer-motion';
import { FiInfo, FiGithub, FiExternalLink } from 'react-icons/fi';

// Fixed size card component
const ProjectCard = ({ 
  project,
  language,
  index,
  onViewDetails,
  isFeatured = false
}) => {
  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5, delay: index * 0.1 } 
    },
    hover: { 
      y: -5,
      transition: { duration: 0.2 }
    }
  };
  
  // Image hover animation
  const imageVariants = {
    hover: { 
      scale: 1.05,
      transition: { duration: 0.5 }
    }
  };

  // Category default images
  const getCategoryImage = (category) => {
    switch(category) {
      case 'ai':
        return "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&auto=format&fit=crop&q=80";
      case 'data':
        return "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80";
      case 'web':
        return "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&auto=format&fit=crop&q=80";
      case 'automation':
        return "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&auto=format&fit=crop&q=80";
      default:
        return "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1200&auto=format&fit=crop&q=80";
    }
  };
  
  // Use project image or default image
  const imageSource = project.image || getCategoryImage(project.category);
  
  return (
    <motion.div
      className="bg-dark border border-primary/20 rounded-lg overflow-hidden hover:border-primary transition-all duration-300"
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
    >
      {/* Fixed height image area */}
      <div style={{
        width: '100%',
        height: '200px',
        flexShrink: 0,
        position: 'relative',
        overflow: 'hidden'
      }}>
        <motion.div 
          style={{ 
            width: '100%',
            height: '100%',
            backgroundImage: `url("${imageSource}")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
          variants={imageVariants}
        >
          {/* Dark gradient overlay */}
          <div style={{ 
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(18, 18, 18, 0.9), rgba(18, 18, 18, 0.5), rgba(18, 18, 18, 0.3))'
          }}></div>
        </motion.div>
        
        {/* Category label */}
        <div style={{
          position: 'absolute',
          bottom: '16px',
          left: '16px',
          zIndex: 10
        }}>
          <span className="px-3 py-1 bg-primary text-dark text-xs uppercase tracking-wider font-bold rounded-sm">
            {project.category}
          </span>
        </div>
      </div>
      
      {/* Fixed height content area */}
      <div style={{
        width: '100%',
        flex: '1',
        padding: '20px',
        paddingBottom: '12px',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Title - fixed height */}
        <h3 className="text-xl font-bold text-primary" style={{
          height: '56px',
          marginBottom: '12px',
          overflow: 'hidden',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical'
        }}>
          {project.title[language]}
        </h3>
        
        {/* Description - fixed height */}
        <p className="text-light/70" style={{
          height: '72px',
          marginBottom: '16px',
          overflow: 'hidden',
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical'
        }}>
          {project.description[language]}
        </p>
        
        {/* Tech tags - fixed height */}
        <div style={{
          height: '32px',
          marginBottom: '12px',
          overflow: 'hidden',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px'
        }}>
          {project.technologies.slice(0, 3).map((tech, i) => (
            <span 
              key={i} 
              className="px-2 py-1 bg-darkgray text-primary text-xs border border-primary/30 rounded-sm"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="px-2 py-1 bg-darkgray text-primary text-xs border border-primary/30 rounded-sm">
              +{project.technologies.length - 3}
            </span>
          )}
        </div>
        
        {/* Action buttons */}
        <div style={{
          marginTop: 'auto',
          paddingTop: '12px',
          borderTop: '1px solid rgba(171, 150, 96, 0.2)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <motion.button
            onClick={() => onViewDetails(project)}
            className="flex items-center gap-2 text-primary hover:text-lightgold transition-colors"
            whileHover={{ x: 3 }}
            whileTap={{ scale: 0.97 }}
          >
            <FiInfo size={18} />
            <span className="text-sm font-medium">
              {language === 'en' ? 'Details' : '详情'}
            </span>
          </motion.button>
          
          <div className="flex gap-3">
            {project.githubUrl && !project.title[language].toLowerCase().includes('reddit') && (
              <motion.a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-lightgold p-2 transition-colors"
                aria-label={language === 'en' ? 'View source code on GitHub' : '在GitHub上查看源代码'}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.9 }}
              >
                <FiGithub size={18} />
              </motion.a>
            )}
            
            {project.liveUrl && !project.title[language].toLowerCase().includes('portfolio') && (
              <motion.a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-lightgold p-2 transition-colors"
                aria-label={language === 'en' ? 'View live project' : '查看在线项目'}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.9 }}
              >
                <FiExternalLink size={18} />
              </motion.a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard; 