import React from 'react';
import { motion } from 'framer-motion';
import { FiMapPin, FiMail, FiPhone, FiGithub, FiLinkedin } from 'react-icons/fi';

// Components
import Section from '../components/Section';
import ContactForm from '../components/ContactForm';

const Contact = () => {
  return (
    <>
      {/* Header Section */}
      <Section
        id="contact-header"
        title="Get in Touch"
        subtitle="Have a question or want to work together? Feel free to reach out!"
        className="pt-32"
      >
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-lg mb-8">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
            Use the form below or reach out through any of the provided contact methods.
          </p>
        </div>
      </Section>
      
      {/* Contact Section */}
      <Section id="contact-details" className="pt-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold mb-6">Send a Message</h3>
            <ContactForm />
          </motion.div>
          
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
            
            <div className="bg-white p-8 rounded-lg shadow-md">
              {/* Location */}
              <div className="flex items-start gap-4 mb-6">
                <div className="bg-primary bg-opacity-10 p-3 rounded-full text-primary">
                  <FiMapPin size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-1">Location</h4>
                  <p className="text-gray-600">San Francisco, CA</p>
                </div>
              </div>
              
              {/* Email */}
              <div className="flex items-start gap-4 mb-6">
                <div className="bg-primary bg-opacity-10 p-3 rounded-full text-primary">
                  <FiMail size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-1">Email</h4>
                  <a 
                    href="mailto:hengd3@outlook.com" 
                    className="text-gray-600 hover:text-primary transition-colors"
                  >
                    hengd3@outlook.com
                  </a>
                </div>
              </div>
              
              {/* Phone */}
              <div className="flex items-start gap-4 mb-8">
                <div className="bg-primary bg-opacity-10 p-3 rounded-full text-primary">
                  <FiPhone size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-1">Phone</h4>
                  <a 
                    href="tel:+11234567890" 
                    className="text-gray-600 hover:text-primary transition-colors"
                  >
                    +1 (123) 456-7890
                  </a>
                </div>
              </div>
              
              {/* Social Links */}
              <div className="flex gap-4 mt-6">
                <a
                  href="https://github.com/yourusername"
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
              </div>
            </div>
            
            {/* Availability */}
            <div className="mt-8 bg-primary text-white p-6 rounded-lg">
              <h4 className="text-xl font-semibold mb-2">Current Availability</h4>
              <p>
                I'm currently available for freelance work and open to discussing new opportunities.
                My typical response time is within 24 hours.
              </p>
            </div>
          </motion.div>
        </div>
      </Section>
      
      {/* Map Section */}
      <Section id="map" fullWidth className="pt-0 mt-12">
        <div className="h-96 w-full">
          <iframe
            title="Location Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d100939.98555098464!2d-122.50764017948533!3d37.75781499602367!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80859a6d00690021%3A0x4a501367f076adff!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1636587330873!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            className="grayscale"
          ></iframe>
        </div>
      </Section>
    </>
  );
};

export default Contact; 