import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiDownload, FiExternalLink } from 'react-icons/fi';
import Section from '../components/common/Section';
import { useLanguage } from '../context/LanguageContext';
import translations from '../context/translations';

const Resume = () => {
  const { language } = useLanguage();
  const [activeResume, setActiveResume] = useState('en'); // Default to English resume

  // Resume file paths - use process.env.PUBLIC_URL to ensure correct paths in GitHub Pages
  const resumeFiles = {
    en: `${process.env.PUBLIC_URL}/assets/documents/Resume_English.pdf`,
    zh: `${process.env.PUBLIC_URL}/assets/documents/Resume_Chinese.pdf`
  };

  return (
    <div className="min-h-screen bg-darkgray">
      <Section
        title={translations.resume.title[language]}
        subtitle={translations.resume.subtitle[language]}
        className="bg-darkgray pt-24 md:pt-32 px-4 sm:px-6"
      >
        <div className="max-w-4xl mx-auto">
          {/* Resume Language Selector */}
          <div className="flex justify-center mb-6 md:mb-8">
            <div className="inline-flex border border-primary/30">
              <button
                className={`px-3 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm uppercase tracking-wider transition-colors ${
                  activeResume === 'en' 
                    ? 'bg-primary text-dark' 
                    : 'bg-transparent text-primary hover:bg-primary/10'
                }`}
                onClick={() => setActiveResume('en')}
              >
                {translations.resume.english[language]}
              </button>
              <button
                className={`px-3 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm uppercase tracking-wider transition-colors ${
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
          <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4 mb-6 md:mb-8">
            <a
              href={resumeFiles[activeResume]}
              download={`jeremy_dong_resume_${activeResume}.pdf`}
              className="btn btn-primary flex items-center justify-center gap-2 text-xs sm:text-sm"
            >
              <FiDownload /> {translations.resume.download[language]}
            </a>
            <a
              href={resumeFiles[activeResume]}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline flex items-center justify-center gap-2 text-xs sm:text-sm"
            >
              <FiExternalLink /> {activeResume === 'en' ? 'View PDF' : '查看PDF'}
            </a>
          </div>

          {/* Resume Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative bg-white border border-primary/20 p-1 shadow-xl"
          >
            <div className="aspect-[8.5/11] w-full max-h-[800px]">
              {/* Mobile download prompt - shown above the PDF */}
              <div className="p-4 text-center bg-white sm:hidden">
                <p className="text-dark font-medium mb-4">
                  {language === 'en' 
                    ? 'For the best experience, you can also download the resume using the button above.' 
                    : '为了获得最佳体验，您可以使用上方的按钮下载简历。'}
                </p>
              </div>
              
              {/* PDF viewer for all devices */}
              <object
                data={resumeFiles[activeResume]}
                type="application/pdf"
                title={`Jeremy Dong Resume - ${activeResume === 'en' ? 'English' : 'Chinese'}`}
                className="w-full h-full"
                style={{ minHeight: '70vh', maxHeight: '800px', backgroundColor: 'white' }}
              >
                <p className="text-center p-4 text-dark">
                  {language === 'en' 
                    ? 'Your browser does not support PDF viewing. Please download the resume instead.' 
                    : '您的浏览器不支持PDF预览。请下载简历查看。'}
                </p>
              </object>
            </div>
          </motion.div>
        </div>
      </Section>
    </div>
  );
};

export default Resume; 