import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import { useLanguage } from '../context/LanguageContext';
import translations from '../context/translations';

// Import QR code image
import wechatQRCode from '../assets/images/contact/wechatQRcode.JPG';

const QRCodeModal = ({ isOpen, onClose }) => {
  const { language } = useLanguage();
  const t = translations.contact;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center"
            onClick={onClose}
          >
            {/* Modal Content */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-darkgray p-6 rounded-lg max-w-xs w-full relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-2 right-2 text-light/70 hover:text-primary transition-colors"
                aria-label="Close"
              >
                <FiX size={24} />
              </button>
              
              <h3 className="text-xl font-bold text-primary mb-4 text-center">
                {t.wechat[language]}
              </h3>
              
              <div className="flex justify-center">
                <img 
                  src={wechatQRCode} 
                  alt="WeChat QR Code" 
                  className="max-w-full rounded-md border-2 border-primary/30"
                  style={{ maxHeight: '300px' }}
                />
              </div>
              
              <p className="text-light/80 text-center mt-4">
                {t.scanQR[language]}
              </p>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default QRCodeModal; 