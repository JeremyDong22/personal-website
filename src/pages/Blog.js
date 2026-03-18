// Blog page — placeholder layout for future posts
import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { motion } from 'framer-motion';
import { FiEdit3 } from 'react-icons/fi';

const Blog = () => {
  const { language } = useLanguage();

  const t = {
    title: { en: "Blog", zh: "博客" },
    subtitle: {
      en: "Thoughts on tech, business, and the journey in between.",
      zh: "关于技术、商业，以及这一路上的思考。"
    },
    empty: {
      en: "Posts coming soon.",
      zh: "文章即将发布。"
    },
    emptySub: {
      en: "Stay tuned — I'm working on it.",
      zh: "敬请期待。"
    }
  };

  return (
    <div className="min-h-screen bg-darkest text-white flex flex-col">
      <Navbar />

      <main className="flex-1 flex flex-col items-center justify-center px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-xl"
        >
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <FiEdit3 className="text-primary text-2xl" />
            </div>
          </div>
          <h1 className="text-4xl font-heading font-bold text-white mb-3">
            {t.title[language]}
          </h1>
          <p className="text-gray-400 text-lg mb-10">
            {t.subtitle[language]}
          </p>

          <div className="border border-white/10 rounded-2xl p-10 bg-dark/50">
            <p className="text-white text-xl font-medium mb-2">
              {t.empty[language]}
            </p>
            <p className="text-gray-500 text-sm">
              {t.emptySub[language]}
            </p>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
