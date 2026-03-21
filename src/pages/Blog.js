// Blog list page — shows all posts as clickable cards
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import blogPosts from '../data/blogPosts';

const Blog = () => {
  const { language } = useLanguage();

  const t = {
    title: { en: 'Blog', zh: '博客' },
    subtitle: {
      en: 'Thoughts on tech, business, and the journey in between.',
      zh: '关于技术、商业，以及这一路上的思考。',
    },
    read: { en: 'Read more', zh: '阅读全文' },
  };

  // Format date as e.g. "March 22, 2026" / "2026年3月22日"
  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    if (language === 'zh') {
      return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
    }
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-darkest text-white flex flex-col">
      <Navbar />

      <main className="flex-1 px-6 py-24">
        <div className="max-w-2xl mx-auto">
          {/* Page header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <h1 className="text-4xl font-heading font-bold text-white mb-3">
              {t.title[language]}
            </h1>
            <p className="text-gray-400 text-lg">{t.subtitle[language]}</p>
          </motion.div>

          {/* Post list */}
          <div className="space-y-8">
            {blogPosts.map((post, i) => {
              const title = post.title[language] || post.title.zh;
              const excerpt = post.excerpt[language] || post.excerpt.zh;

              return (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: i * 0.1 }}
                >
                  <Link to={`/blog/${post.slug}`} className="block group">
                    <div className="border border-white/10 rounded-2xl p-8 bg-dark/40 hover:bg-dark/70 hover:border-primary/30 transition-all duration-300">
                      <time className="text-primary text-sm tracking-wide block mb-3">
                        {formatDate(post.date)}
                      </time>
                      <h2 className="font-heading text-xl md:text-2xl font-semibold text-white group-hover:text-primary transition-colors leading-snug mb-3">
                        {title}
                      </h2>
                      <p className="text-gray-400 text-sm leading-relaxed mb-5">{excerpt}</p>
                      <span className="inline-flex items-center gap-2 text-primary text-sm font-medium group-hover:gap-3 transition-all">
                        {t.read[language]}
                        <FiArrowRight />
                      </span>
                    </div>
                  </Link>
                </motion.article>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
