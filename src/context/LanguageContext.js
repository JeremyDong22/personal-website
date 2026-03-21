import React, { createContext, useState, useContext, useEffect } from 'react';

// Create language context
const LanguageContext = createContext();

// Language provider component
export const LanguageProvider = ({ children }) => {
  // Get saved language from localStorage or default to English
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem('language');
    return savedLanguage || 'en';
  });

  // Sync <html lang> attribute so browser knows the page language
  // This prevents Chrome from offering/applying auto-translation on Chinese pages
  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en';
  }, [language]);

  // Toggle language function
  const toggleLanguage = () => {
    setLanguage(prevLang => prevLang === 'en' ? 'zh' : 'en');
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}; 