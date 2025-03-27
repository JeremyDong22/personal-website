import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiExternalLink, FiGithub } from 'react-icons/fi';

const ProjectModal = ({ project, isOpen, onClose, language, translations }) => {
  const modalRef = useRef(null);

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Handle ESC key to close
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.keyCode === 27) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen, onClose]);

  // Modal animations
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } }
  };

  const modalVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
    exit: { opacity: 0, y: 20, transition: { duration: 0.2 } }
  };

  // High-quality background images based on category
  const getCategoryImage = (category) => {
    switch(category) {
      case 'ai':
        return "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=1800";
      case 'data':
        return "https://images.unsplash.com/photo-1489389944381-3471b5b30f04?auto=format&fit=crop&q=80&w=1800";
      case 'web':
        return "https://images.unsplash.com/photo-1487014679447-9f8336841d58?auto=format&fit=crop&q=80&w=1800";
      case 'automation':
        return "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=1800";
      default:
        return "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1800";
    }
  };

  if (!project) return null;
  
  // Get the image source (use project image if available, otherwise use category default)
  const imageSource = project.image || getCategoryImage(project.category);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          {/* Backdrop */}
          <div 
            className="absolute inset-0" 
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.9)' }}
            onClick={onClose}
          ></div>
          
          {/* Modal Content */}
          <motion.div
            ref={modalRef}
            className="bg-dark border border-primary/20 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden relative z-10"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-light hover:text-primary p-2 rounded-full z-10 transition-colors"
              aria-label="Close modal"
            >
              <FiX size={24} />
            </button>
            
            {/* Header with Image */}
            <div className="relative h-72 overflow-hidden">
              <div 
                className="w-full h-full"
                style={{ 
                  backgroundImage: `url("${imageSource}")`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                {/* Gradient overlay */}
                <div 
                  className="absolute inset-0" 
                  style={{ background: 'linear-gradient(to top, rgba(18, 18, 18, 1), rgba(18, 18, 18, 0.7), rgba(18, 18, 18, 0.3))' }}
                ></div>
              </div>
              
              {/* Project Title Overlay */}
              <div className="absolute bottom-0 left-0 p-6 w-full">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="px-3 py-1 bg-primary text-dark text-xs uppercase tracking-wider font-bold rounded-sm mb-3 inline-block">
                      {project.category}
                    </span>
                    <h2 className="text-2xl md:text-3xl font-bold text-primary">
                      {project.title[language]}
                    </h2>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Modal Body with Scrolling */}
            <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 288px)' }}>
              {/* Description */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-primary mb-4">
                  {translations && translations.projectDetails.overview 
                    ? translations.projectDetails.overview[language] 
                    : language === 'en' ? 'Overview' : '概述'}
                </h3>
                <p className="text-light/70">
                  {project.description[language]}
                </p>
              </div>
              
              {/* Technologies */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-primary mb-4">
                  {translations && translations.projectDetails.technologies 
                    ? translations.projectDetails.technologies[language] 
                    : language === 'en' ? 'Technologies' : '技术'}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, i) => (
                    <span 
                      key={i} 
                      className="px-3 py-1 bg-darkgray text-primary text-sm border border-primary/30 rounded-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Challenges & Solutions - Only display if they exist */}
              {project.challenges && project.challenges[language] && (
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-primary mb-4">
                    {translations && translations.projectDetails.challenges 
                      ? translations.projectDetails.challenges[language] 
                      : language === 'en' ? 'Challenges' : '挑战'}
                  </h3>
                  <p className="text-light/70 mb-6">
                    {project.challenges[language]}
                  </p>
                  
                  <h3 className="text-xl font-semibold text-primary mb-4">
                    {translations && translations.projectDetails.solutions 
                      ? translations.projectDetails.solutions[language] 
                      : language === 'en' ? 'Solutions' : '解决方案'}
                  </h3>
                  <p className="text-light/70">
                    {project.solutions[language]}
                  </p>
                </div>
              )}
              
              {/* Results - Only display if exists */}
              {project.results && project.results[language] && (
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-primary mb-4">
                    {translations && translations.projectDetails.results 
                      ? translations.projectDetails.results[language] 
                      : language === 'en' ? 'Results' : '结果'}
                  </h3>
                  <p className="text-light/70">
                    {project.results[language]}
                  </p>
                </div>
              )}
            </div>
            
            {/* Footer with Links */}
            <div className="p-6 border-t border-primary/20 flex justify-between items-center">
              <div className="text-light/70 text-sm">
                {project.date}
              </div>
              
              <div className="flex space-x-4">
                {project.githubUrl && (
                  <motion.a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-primary hover:text-lightgold transition-colors px-4 py-2 border border-primary/30 rounded-sm"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <FiGithub size={18} />
                    <span>
                      {translations && translations.projectDetails.viewCode 
                        ? translations.projectDetails.viewCode[language] 
                        : language === 'en' ? 'Source Code' : '源代码'}
                    </span>
                  </motion.a>
                )}
                
                {project.liveUrl && (
                  <motion.a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-primary text-dark px-4 py-2 rounded-sm hover:bg-lightgold transition-colors"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <FiExternalLink size={18} />
                    <span>
                      {translations && translations.projectDetails.viewProject 
                        ? translations.projectDetails.viewProject[language] 
                        : language === 'en' ? 'Live Preview' : '在线预览'}
                    </span>
                  </motion.a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal; 