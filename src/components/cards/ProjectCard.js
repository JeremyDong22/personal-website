import React from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink } from 'react-icons/fi';

const ProjectCard = ({
  project = {},
  language = 'en',
  index = 0,
  onViewDetails,
  isFeatured = false
}) => {
  if (!project || Object.keys(project).length === 0) return null;

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: index * 0.05 }
    },
    hover: {
      scale: 1.02,
      boxShadow: '0px 10px 20px rgba(0,0,0,0.25)',
      transition: { duration: 0.3, ease: 'easeInOut' }
    }
  };

  return (
    <motion.div
      className="bg-dark border border-primary/20 rounded-lg overflow-hidden luxury-shadow cursor-pointer flex flex-col h-full"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      onClick={() => {
        if (onViewDetails) {
          onViewDetails(project);
        } else {
          const url = project.liveUrl || project.githubUrl;
          if (url) window.open(url, '_blank', 'noopener,noreferrer');
        }
      }}
    >
      {/* Cover image */}
      {project.image && (
        <div className="relative h-44 overflow-hidden flex-shrink-0">
          <img
            src={project.image}
            alt={project.title?.[language] || ''}
            className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
          />
          {isFeatured && (
            <div className="absolute top-3 left-3">
              <span className="px-2 py-0.5 bg-primary text-dark text-xs font-bold rounded-sm uppercase tracking-wider">
                {language === 'en' ? 'Featured' : '精选'}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Card body */}
      <div className="p-5 flex flex-col flex-1 relative">
        {/* Title — max 2 lines */}
        <h3
          className="text-base font-bold text-primary mb-2 leading-snug"
          style={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}
        >
          {project.title?.[language] || ''}
        </h3>

        {/* Tech tags — show up to 4, then +N */}
        {project.technologies && project.technologies.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {project.technologies.slice(0, 4).map((tech, i) => (
              <span
                key={i}
                className="text-xs px-2 py-0.5 bg-primary/10 text-primary/80 rounded-sm border border-primary/20"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="text-xs px-2 py-0.5 text-light/40">
                +{project.technologies.length - 4}
              </span>
            )}
          </div>
        )}

        {/* Description — max 4 lines with ellipsis */}
        <p
          className="text-light/70 text-sm leading-relaxed flex-1"
          style={{
            display: '-webkit-box',
            WebkitLineClamp: 4,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}
        >
          {project.description?.[language] || ''}
        </p>

        {/* Bottom row: live URL or "click for details" hint + GitHub icon */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-primary/10">
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              className="text-xs text-primary/70 hover:text-primary transition-colors flex items-center gap-1"
            >
              <FiExternalLink size={12} />
              {project.liveUrl.replace(/^https?:\/\//, '')}
            </a>
          ) : (
            <span />
          )}

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              className="text-light/40 hover:text-primary transition-colors"
              title="View on GitHub"
            >
              <FiGithub size={17} />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
