import React, { useState, useEffect } from 'react';
import { isWeChatBrowser, openInDefaultBrowser } from '../../utils/browserDetection';
import { useLanguage } from '../../context/LanguageContext';

const WeChatNotification = () => {
  const [showNotification, setShowNotification] = useState(false);
  const { language } = useLanguage();
  
  useEffect(() => {
    // Check if the user is using WeChat browser
    if (isWeChatBrowser()) {
      setShowNotification(true);
    }
  }, []);
  
  if (!showNotification) {
    return null;
  }
  
  const handleOpenInBrowser = () => {
    openInDefaultBrowser();
    setShowNotification(false);
  };
  
  const handleClose = () => {
    setShowNotification(false);
  };
  
  const text = {
    title: {
      en: "Open in Browser",
      zh: "在浏览器中打开"
    },
    message: {
      en: "For the best experience, please open this website in your default browser.",
      zh: "为了获得最佳体验，请在您的默认浏览器中打开此网站。"
    },
    openButton: {
      en: "Open in Browser",
      zh: "在浏览器中打开"
    },
    closeButton: {
      en: "Continue in WeChat",
      zh: "继续在微信中浏览"
    }
  };
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-darkgray rounded-lg shadow-xl max-w-md w-full p-6 border border-primary">
        <h3 className="text-xl font-bold text-primary mb-2">
          {text.title[language]}
        </h3>
        <p className="text-light/90 mb-6">
          {text.message[language]}
        </p>
        <div className="flex flex-col space-y-3">
          <button
            onClick={handleOpenInBrowser}
            className="bg-primary hover:bg-primary/90 text-white py-2 px-4 rounded transition-colors"
          >
            {text.openButton[language]}
          </button>
          <button
            onClick={handleClose}
            className="bg-transparent border border-light/30 hover:border-light/50 text-light/70 hover:text-light/90 py-2 px-4 rounded transition-colors"
          >
            {text.closeButton[language]}
          </button>
        </div>
      </div>
    </div>
  );
};

export default WeChatNotification; 