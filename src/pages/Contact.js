// Contact page — directly shows contact info (no toggle buttons)
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMapPin, FiMail, FiPhone, FiLinkedin, FiExternalLink } from 'react-icons/fi';
import { SiWechat } from 'react-icons/si';

// Components
import QRCodeModal from '../components/modals/QRCodeModal';

// Language Context
import { useLanguage } from '../context/LanguageContext';
import translations from '../context/translations';

const Contact = () => {
  const { language } = useLanguage();
  const t = translations.contact;

  const [showQRModal, setShowQRModal] = useState(false);

  return (
    <div className="bg-dark min-h-screen">
      {/* QR Code Modal */}
      <QRCodeModal isOpen={showQRModal} onClose={() => setShowQRModal(false)} />

      <div className="container mx-auto px-4 pt-24 md:pt-28">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-primary">{t.title[language]}</h1>
          <p className="text-lg text-light/80 max-w-2xl mx-auto">
            {t.subtitle[language]}
          </p>
        </motion.div>

        {/* Contact Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="max-w-2xl mx-auto mb-16"
        >
          <div className="bg-darkgray border border-primary/20 p-8 rounded-lg">
            {/* Location */}
            <div className="flex items-start gap-4 mb-6">
              <div className="bg-primary/20 p-3 rounded-full text-primary flex-shrink-0">
                <FiMapPin size={24} />
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-1">{t.location[language]}</h4>
                <p className="text-light/70">{language === 'en' ? 'Champaign, IL' : '深圳，广东'}</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-4 mb-6">
              <div className="bg-primary/20 p-3 rounded-full text-primary flex-shrink-0">
                <FiMail size={24} />
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-1">{t.email[language]}</h4>
                <a
                  href="mailto:hengd3@outlook.com"
                  className="text-primary underline underline-offset-2 hover:text-lightgold transition-colors font-medium flex items-center gap-1.5"
                >
                  hengd3@outlook.com
                  <FiExternalLink size={14} className="opacity-60" />
                </a>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-4 mb-8">
              <div className="bg-primary/20 p-3 rounded-full text-primary flex-shrink-0">
                <FiPhone size={24} />
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-1">{language === 'en' ? 'Phone' : '电话'}</h4>
                {language === 'en' ? (
                  <a
                    href="tel:+12179740277"
                    className="text-primary underline underline-offset-2 hover:text-lightgold transition-colors font-medium flex items-center gap-1.5"
                  >
                    +1 (217) 974-0277
                    <FiExternalLink size={14} className="opacity-60" />
                  </a>
                ) : (
                  <a
                    href="tel:+8618576644936"
                    className="text-primary underline underline-offset-2 hover:text-lightgold transition-colors font-medium flex items-center gap-1.5"
                  >
                    +86 185-7664-4936
                    <FiExternalLink size={14} className="opacity-60" />
                  </a>
                )}
              </div>
            </div>

            {/* Social Links */}
            <div className="border-t border-primary/10 pt-6 flex gap-5">
              <a
                href="https://www.linkedin.com/in/jeremy-dong-176092256"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-light/50 hover:text-primary transition-colors"
              >
                <FiLinkedin size={24} />
              </a>
              <a
                href="mailto:hengd3@outlook.com"
                className="text-light/50 hover:text-primary transition-colors"
                aria-label="Email"
              >
                <FiMail size={24} />
              </a>
              <button
                className="text-light/50 hover:text-primary transition-colors bg-transparent border-0 p-0 cursor-pointer"
                aria-label="WeChat"
                onClick={() => setShowQRModal(true)}
              >
                <SiWechat size={24} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Map Section */}
      <div className="w-full">
        <div className="h-96 w-full">
          <iframe
            title="Location Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3051.9400810376!2d-88.23093492346566!3d40.11321197779883!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880cd73e0f8deb9d%3A0x9e6eb5fd01368e1e!2s503%20E%20Stoughton%20St%2C%20Champaign%2C%20IL%2061820!5e0!3m2!1sen!2sus!4v1699998765432!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            className="grayscale"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;
