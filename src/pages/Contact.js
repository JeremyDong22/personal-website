import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMapPin, FiMail, FiPhone, FiGithub, FiLinkedin, FiMessageSquare, FiInfo } from 'react-icons/fi';
import { SiWechat } from 'react-icons/si';

// Components
import Section from '../components/Section';
import ContactForm from '../components/ContactForm';
import QRCodeModal from '../components/QRCodeModal';
import TestGithub from '../components/TestGithub';

const Contact = () => {
  const [showContactForm, setShowContactForm] = useState(false);
  const [showContactInfo, setShowContactInfo] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);
  
  const toggleContactForm = () => {
    setShowContactForm(!showContactForm);
    if (showContactInfo) setShowContactInfo(false);
  };
  
  const toggleContactInfo = () => {
    setShowContactInfo(!showContactInfo);
    if (showContactForm) setShowContactForm(false);
  };
  
  return (
    <div className="bg-dark min-h-screen">
      {/* QR Code Modal */}
      <QRCodeModal isOpen={showQRModal} onClose={() => setShowQRModal(false)} />
      
      {/* Test GitHub Component */}
      <div className="container mx-auto px-4 pt-4">
        <TestGithub />
      </div>
      
      {/* Header and Buttons Combined Section */}
      <div className="container mx-auto px-4 pt-24 md:pt-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-primary">Get in Touch</h1>
          <p className="text-lg text-light/80 max-w-2xl mx-auto mb-8">
            Have a question or want to work together? I'm always open to discussing new projects, 
            creative ideas, or opportunities to be part of your vision.
          </p>
        </motion.div>
        
        {/* Contact Buttons */}
        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {/* Send Message Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              <button
                onClick={toggleContactForm}
                className="w-full bg-darkgray border-2 border-primary hover:bg-primary/10 transition-colors duration-300 p-6 rounded-lg text-center flex flex-col items-center justify-center gap-3 h-full"
              >
                <div className="bg-primary/20 p-3 rounded-full">
                  <FiMessageSquare size={28} className="text-primary" />
                </div>
                <h3 className="text-lg md:text-xl font-bold">Send a Message</h3>
                <p className="text-light/80 text-sm md:text-base">
                  Fill out a quick form to send me an email directly
                </p>
              </button>
            </motion.div>
            
            {/* Contact Info Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-full"
            >
              <button
                onClick={toggleContactInfo}
                className="w-full bg-darkgray border-2 border-primary hover:bg-primary/10 transition-colors duration-300 p-6 rounded-lg text-center flex flex-col items-center justify-center gap-3 h-full"
              >
                <div className="bg-primary/20 p-3 rounded-full">
                  <FiInfo size={28} className="text-primary" />
                </div>
                <h3 className="text-lg md:text-xl font-bold">Contact Information</h3>
                <p className="text-light/80 text-sm md:text-base">
                  View my contact details and availability
                </p>
              </button>
            </motion.div>
          </div>
          
          {/* Conditional Content */}
          {showContactForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-16"
            >
              <h3 className="text-2xl font-bold mb-6">Send a Message</h3>
              <ContactForm />
            </motion.div>
          )}
          
          {showContactInfo && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-16"
            >
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              
              <div className="bg-darkgray border border-primary/20 p-8 rounded-lg">
                {/* Location */}
                <div className="flex items-start gap-4 mb-6">
                  <div className="bg-primary/20 p-3 rounded-full text-primary">
                    <FiMapPin size={24} />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-1">Location</h4>
                    <p className="text-light/80">Champaign, IL</p>
                  </div>
                </div>
                
                {/* Email */}
                <div className="flex items-start gap-4 mb-6">
                  <div className="bg-primary/20 p-3 rounded-full text-primary">
                    <FiMail size={24} />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-1">Email</h4>
                    <a 
                      href="mailto:hengd3@outlook.com" 
                      className="text-light/80 hover:text-primary transition-colors"
                    >
                      hengd3@outlook.com
                    </a>
                  </div>
                </div>
                
                {/* Phone */}
                <div className="flex items-start gap-4 mb-8">
                  <div className="bg-primary/20 p-3 rounded-full text-primary">
                    <FiPhone size={24} />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-1">Phone</h4>
                    <a 
                      href="tel:+12179740277" 
                      className="text-light/80 hover:text-primary transition-colors"
                    >
                      +1 (217) 974-0277
                    </a>
                  </div>
                </div>
                
                {/* Social Links */}
                <div className="flex gap-4 mt-6">
                  <a
                    href="https://github.com/JeremyDong22"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-light hover:text-primary transition-colors"
                    aria-label="GitHub"
                  >
                    <FiGithub size={24} />
                  </a>
                  <a
                    href="https://linkedin.com/in/yourusername"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-light hover:text-primary transition-colors"
                    aria-label="LinkedIn"
                  >
                    <FiLinkedin size={24} />
                  </a>
                  <a
                    href="mailto:hengd3@outlook.com"
                    className="text-light hover:text-primary transition-colors"
                    aria-label="Email"
                  >
                    <FiMail size={24} />
                  </a>
                  <a
                    href="#"
                    className="text-light hover:text-primary transition-colors"
                    aria-label="WeChat"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowQRModal(true);
                    }}
                  >
                    <SiWechat size={24} />
                  </a>
                </div>
              </div>
              
              {/* Availability */}
              <div className="mt-8 bg-primary text-dark p-6 rounded-lg">
                <h4 className="text-xl font-semibold mb-2">Current Availability</h4>
                <p>
                  I'm currently available for freelance work and open to discussing new opportunities.
                  My typical response time is within 24 hours.
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
      
      {/* Map Section */}
      <div className="w-full mt-12">
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