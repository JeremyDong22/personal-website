import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiCheckCircle } from 'react-icons/fi';
import emailjs from '@emailjs/browser';
import { useLanguage } from '../context/LanguageContext';

/*
 * IMPORTANT: EmailJS Configuration
 * 
 * This form uses EmailJS to send two emails when submitted:
 * 
 * 1. NOTIFICATION EMAIL (to you):
 *    - Uses template_kawpou6
 *    - Sends a notification to your email (dongheng@illinois.edu)
 *    - Contains the sender's name, email, subject, and message
 * 
 * 2. AUTO-REPLY EMAIL (to the sender):
 *    - Uses template_r968gel
 *    - Sends an auto-reply to the person who submitted the form
 *    - Contains a thank you message with their name and subject
 * 
 * Both templates use these parameters:
 * - name: The sender's name
 * - email: The sender's email
 * - title: The subject of the message
 * - message: The content of the message
 */

const ContactForm = () => {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    title: '', // Using title instead of subject to match EmailJS template
    message: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');
    
    try {
      // Prepare parameters for EmailJS
      // Using the exact parameter names expected by your template
      const templateParams = {
        name: formData.name,
        email: formData.email,
        title: formData.title,
        message: formData.message,
        to_email: 'dongheng@illinois.edu' // Your email address
      };
      
      console.log("Sending emails with params:", templateParams);
      
      // Send notification email to you using your notification template
      const notificationResult = await emailjs.send(
        'service_04evzx9',
        'template_kawpou6', // Your notification template ID
        templateParams,
        'dRxiSt_PPpbKcydT6'
      );
      
      console.log('Notification email sent successfully:', notificationResult.text);
      
      // Send auto-reply email to the sender
      const autoReplyResult = await emailjs.send(
        'service_04evzx9',
        'template_r968gel', // Your auto-reply template ID
        templateParams,
        'dRxiSt_PPpbKcydT6'
      );
      
      console.log('Auto-reply email sent successfully:', autoReplyResult.text);
      
      setSubmitStatus('success');
      setFormData({ name: '', email: '', title: '', message: '' });
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitStatus('error');
      setErrorMessage(error.text || 'There was an error sending your message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // If submission was successful, show only the success message
  if (submitStatus === 'success') {
    return (
      <motion.div 
        className="bg-green-100 text-green-800 p-8 rounded-lg shadow-md flex flex-col items-center justify-center text-center min-h-[400px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <FiCheckCircle size={64} className="text-green-600 mb-4" />
        <h3 className="text-2xl font-bold mb-2 text-green-700">
          {language === 'en' ? 'Message Sent!' : '消息已发送！'}
        </h3>
        <p className="text-lg mb-4 text-green-700">
          {language === 'en' 
            ? 'Thank you for your message! I\'ll get back to you as soon as possible.' 
            : '感谢您的留言！我会尽快回复您。'}
        </p>
        <p className="text-md mb-6 text-green-700">
          {language === 'en'
            ? 'Please check your inbox or junk/spam folder for a confirmation email.'
            : '请检查您的收件箱或垃圾邮件文件夹以获取确认邮件。'}
        </p>
        <p className="text-sm text-green-600 border-t border-green-200 pt-4 w-3/4">
          {language === 'en'
            ? 'Refresh the page to send another message.'
            : '刷新页面以发送另一条消息。'}
        </p>
      </motion.div>
    );
  }
  
  return (
    <motion.form 
      onSubmit={handleSubmit}
      className="bg-darkgray border border-primary/20 p-8 rounded-lg shadow-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Error Message */}
      {submitStatus === 'error' && (
        <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-md">
          {language === 'en'
            ? (errorMessage || 'There was an error sending your message. Please try again later.')
            : '发送消息时出错。请稍后再试。'}
        </div>
      )}
      
      {/* Name Field */}
      <div className="mb-6">
        <label htmlFor="name" className="block mb-2 font-medium text-primary">
          {language === 'en' ? 'Name' : '姓名'}
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 bg-dark border border-primary/30 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-light placeholder-light/50"
          placeholder={language === 'en' ? 'Your name' : '您的姓名'}
        />
      </div>
      
      {/* Email Field */}
      <div className="mb-6">
        <label htmlFor="email" className="block mb-2 font-medium text-primary">
          {language === 'en' ? 'Email' : '邮箱'}
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 bg-dark border border-primary/30 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-light placeholder-light/50"
          placeholder={language === 'en' ? 'your.email@example.com' : '您的邮箱地址'}
        />
      </div>
      
      {/* Subject Field (renamed to title in state) */}
      <div className="mb-6">
        <label htmlFor="title" className="block mb-2 font-medium text-primary">
          {language === 'en' ? 'Subject' : '主题'}
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 bg-dark border border-primary/30 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-light placeholder-light/50"
          placeholder={language === 'en' ? 'What is this regarding?' : '关于什么事情？'}
        />
      </div>
      
      {/* Message Field */}
      <div className="mb-6">
        <label htmlFor="message" className="block mb-2 font-medium text-primary">
          {language === 'en' ? 'Message' : '消息'}
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows="5"
          className="w-full px-4 py-2 bg-dark border border-primary/30 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-light placeholder-light/50"
          placeholder={language === 'en' ? 'Your message here...' : '在这里输入您的消息...'}
        ></textarea>
      </div>
      
      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full py-3 px-6 rounded-md text-white font-medium transition-colors ${
          isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary hover:bg-primary/80'
        }`}
      >
        {isSubmitting 
          ? (language === 'en' ? 'Sending...' : '发送中...')
          : (language === 'en' ? 'Send Message' : '发送消息')}
      </button>
    </motion.form>
  );
};

export default ContactForm; 