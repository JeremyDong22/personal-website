// Blog post detail page — renders full content for a single post by slug
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';
import { FiArrowLeft } from 'react-icons/fi';
import blogPosts from '../data/blogPosts';

const BlogPost = () => {
  const { slug } = useParams();
  const { language } = useLanguage();

  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen text-white flex flex-col">
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-400 text-lg">Post not found.</p>
            <Link to="/blog" className="text-primary mt-4 inline-block hover:underline">
              ← Back to Blog
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const title = post.title[language] || post.title.zh;
  const blocks = post.content[language] || post.content.zh;

  // Format date as e.g. "March 22, 2026" / "2026年3月22日"
  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    if (language === 'zh') {
      return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
    }
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="min-h-screen text-white flex flex-col">
      <main className="flex-1 px-6 py-20">
        <div className="max-w-3xl mx-auto">
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35 }}
          >
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-primary transition-colors text-sm mb-12"
            >
              <FiArrowLeft />
              {language === 'zh' ? '返回博客' : 'Back to Blog'}
            </Link>
          </motion.div>

          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            {/* Category tag + date */}
            <div className="flex items-center gap-3 mb-5">
              <span className="inline-block text-xs font-medium tracking-widest uppercase px-3 py-1 rounded-full border border-primary/50 text-primary bg-primary/10">
                {language === 'zh' ? 'AI创业' : 'AI Entrepreneurship'}
              </span>
              <time className="text-gray-500 text-sm">{formatDate(post.date)}</time>
            </div>
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-white leading-snug">
              {title}
            </h1>
          </motion.header>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{ originX: 0 }}
            className="h-px bg-white/10 mb-12"
          />

          {/* Content */}
          <motion.article
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6 text-gray-300 text-base md:text-lg leading-relaxed"
            translate="no"
          >
            {blocks.map((block, i) => {
              if (block.type === 'paragraph') {
                // Support both plain text and rich parts with inline links
                const content = block.parts
                  ? block.parts.map((part, pi) =>
                      part.href ? (
                        <a
                          key={pi}
                          href={part.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary underline underline-offset-2 hover:text-primary/80 transition-colors"
                        >
                          {part.text}
                        </a>
                      ) : (
                        <span key={pi}>{part.text}</span>
                      )
                    )
                  : block.text;
                return <p key={i} className="text-gray-300">{content}</p>;
              }
              if (block.type === 'list') {
                return (
                  <ul key={i} className="space-y-3 pl-5">
                    {block.items.map((item, j) => (
                      <li key={j} className="text-gray-300 list-disc list-outside">
                        {item}
                      </li>
                    ))}
                  </ul>
                );
              }
              if (block.type === 'image') {
                // Portrait phone screenshots get centered with max-width; landscape fills container
                const isPortrait = block.portrait;
                return (
                  <figure key={i} className="my-8">
                    {isPortrait ? (
                      <div className="flex justify-center">
                        <img
                          src={block.src}
                          alt={block.alt}
                          className="rounded-xl shadow-lg"
                          style={{ maxWidth: '360px', width: '100%' }}
                        />
                      </div>
                    ) : (
                      <img
                        src={block.src}
                        alt={block.alt}
                        className="w-full rounded-xl object-cover max-h-[520px]"
                      />
                    )}
                    {block.caption && (
                      <figcaption className="text-center text-gray-500 text-sm mt-3 italic">
                        {block.caption}
                      </figcaption>
                    )}
                  </figure>
                );
              }
              if (block.type === 'images') {
                // Portrait gallery: cap each image width based on count to avoid cramping
                const perItemMax = block.items.length >= 3 ? '180px' : '280px';
                return (
                  <figure key={i} className="my-8">
                    <div className="flex gap-4 justify-center flex-wrap">
                      {block.items.map((img, j) => (
                        <div key={j} style={{ maxWidth: perItemMax, flex: '1 1 auto', minWidth: 0 }}>
                          <img
                            src={img.src}
                            alt={img.alt}
                            className="w-full rounded-xl shadow-lg"
                          />
                        </div>
                      ))}
                    </div>
                    {block.caption && (
                      <figcaption className="text-center text-gray-500 text-sm mt-3 italic">
                        {block.caption}
                      </figcaption>
                    )}
                  </figure>
                );
              }
              return null;
            })}
          </motion.article>
        </div>
      </main>
    </div>
  );
};

export default BlogPost;
