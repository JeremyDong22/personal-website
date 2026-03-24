// Blog list page — v3: typographic cover art, reading time, author info
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';
import { FiArrowRight, FiClock } from 'react-icons/fi';
import blogPosts from '../data/blogPosts';
import BlogCoverArt from '../components/BlogCoverArt';

// Estimate reading time from content blocks (Chinese ~350 chars/min, English ~200 words/min)
const estimateReadingTime = (blocks, lang) => {
  let totalChars = 0;
  for (const block of blocks) {
    if (block.type === 'paragraph') {
      const text = block.parts ? block.parts.map((p) => p.text).join('') : block.text || '';
      totalChars += text.length;
    } else if (block.type === 'list') {
      totalChars += (block.items || []).join('').length;
    }
  }
  if (lang === 'zh') {
    return Math.max(1, Math.round(totalChars / 350));
  }
  return Math.max(1, Math.round(totalChars / 5 / 200));
};

const Blog = () => {
  const { language } = useLanguage();

  const t = {
    title: { en: 'Blog', zh: '博客' },
    subtitle: {
      en: 'Thoughts on tech, business, and the journey in between.',
      zh: '关于技术、商业，以及这一路上的思考。',
    },
    read: { en: 'Read more', zh: '阅读全文' },
    minRead: { en: 'min read', zh: '分钟阅读' },
  };

  const sortedPosts = [...blogPosts].sort((a, b) => new Date(b.date) - new Date(a.date));

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    if (language === 'zh') {
      return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
    }
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="min-h-screen text-white flex flex-col">
      <main className="flex-1 px-6 py-24">
        <div className="max-w-4xl mx-auto">
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
            {sortedPosts.map((post, i) => {
              const title = post.title[language] || post.title.zh;
              const excerpt = post.excerpt[language] || post.excerpt.zh;
              const category = language === 'zh' ? 'AI创业' : 'AI Entrepreneurship';
              const content = post.content[language] || post.content.zh;
              const readMin = estimateReadingTime(content, language);

              return (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: i * 0.1 }}
                >
                  <Link to={`/blog/${post.slug}`} className="block group">
                    <div className="border border-white/10 rounded-2xl overflow-hidden bg-dark/40 hover:bg-dark/70 hover:border-primary/30 transition-all duration-300">
                      {/* Typographic cover art */}
                      <BlogCoverArt slug={post.slug} language={language} compact />

                      <div className="p-8">
                        {/* Category + date + reading time row */}
                        <div className="flex items-center gap-3 mb-4 flex-wrap">
                          <span className="inline-block text-xs font-medium tracking-widest uppercase px-3 py-1 rounded-full border border-primary/50 text-primary bg-primary/10">
                            {category}
                          </span>
                          <time className="text-gray-500 text-sm">{formatDate(post.date)}</time>
                          <span className="flex items-center gap-1 text-gray-500 text-sm">
                            <FiClock className="w-3.5 h-3.5" />
                            {readMin} {t.minRead[language]}
                          </span>
                        </div>

                        <h2 className="font-heading text-xl md:text-2xl font-semibold text-white group-hover:text-primary transition-colors leading-snug mb-3">
                          {title}
                        </h2>
                        <p className="text-gray-400 text-sm leading-relaxed mb-5">{excerpt}</p>

                        {/* Author + read more row */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <img
                              src="/assets/images/profile.jpeg"
                              alt="Jeremy Dong"
                              className="w-8 h-8 rounded-full object-cover border border-white/20"
                            />
                            <span className="text-gray-400 text-sm">Jeremy Dong</span>
                          </div>
                          <span className="inline-flex items-center gap-2 text-primary text-sm font-medium group-hover:gap-3 transition-all">
                            {t.read[language]}
                            <FiArrowRight />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Blog;
