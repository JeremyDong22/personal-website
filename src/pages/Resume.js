import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiDownload, FiExternalLink } from 'react-icons/fi';
import Section from '../components/Section';
import { useLanguage } from '../context/LanguageContext';
import translations from '../context/translations';

const Resume = () => {
  const { language } = useLanguage();
  const [activeResume, setActiveResume] = useState('en'); // Default to English resume

  // Resume file paths
  const resumeFiles = {
    en: '/assets/resume/resume_en.pdf',
    zh: '/assets/resume/resume_zh.pdf'
  };

  return (
    <div className="min-h-screen bg-darkgray">
      <Section
        title={translations.resume.title[language]}
        subtitle={translations.resume.subtitle[language]}
        className="bg-darkgray pt-32"
      >
        <div className="max-w-4xl mx-auto">
          {/* Resume Language Selector */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex border border-primary/30">
              <button
                className={`px-6 py-3 text-sm uppercase tracking-wider transition-colors ${
                  activeResume === 'en' 
                    ? 'bg-primary text-dark' 
                    : 'bg-transparent text-primary hover:bg-primary/10'
                }`}
                onClick={() => setActiveResume('en')}
              >
                {translations.resume.english[language]}
              </button>
              <button
                className={`px-6 py-3 text-sm uppercase tracking-wider transition-colors ${
                  activeResume === 'zh' 
                    ? 'bg-primary text-dark' 
                    : 'bg-transparent text-primary hover:bg-primary/10'
                }`}
                onClick={() => setActiveResume('zh')}
              >
                {translations.resume.chinese[language]}
              </button>
            </div>
          </div>

          {/* Download Buttons */}
          <div className="flex justify-center gap-4 mb-8">
            <a
              href={resumeFiles[activeResume]}
              download={`jeremy_dong_resume_${activeResume}.pdf`}
              className="btn btn-primary flex items-center gap-2"
            >
              <FiDownload /> {translations.resume.download[language]}
            </a>
            <a
              href={resumeFiles[activeResume]}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline flex items-center gap-2"
            >
              <FiExternalLink /> {activeResume === 'en' ? 'View PDF' : '查看PDF'}
            </a>
          </div>

          {/* Resume Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative bg-dark border border-primary/20 p-1 shadow-xl"
          >
            <div className="aspect-[8.5/11] w-full">
              <iframe
                src={`${resumeFiles[activeResume]}#view=FitH`}
                title={`Jeremy Dong Resume - ${activeResume === 'en' ? 'English' : 'Chinese'}`}
                className="w-full h-full"
                style={{ minHeight: '80vh' }}
              />
            </div>
          </motion.div>
        </div>
      </Section>
    </div>
  );
};

export default Resume; 