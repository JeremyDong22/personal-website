// Blog post detail page — v4: typographic cover art, heading blocks, author card,
// reading time, share buttons (Twitter/WeChat/copy), prev/next navigation, OG meta,
// dev-only inline blog editor (import.meta.env.DEV)
import { useEffect, useMemo, useState, lazy, Suspense } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowLeft, FiArrowRight, FiClock, FiTwitter, FiLink2, FiX, FiCheck, FiEdit3 } from 'react-icons/fi';
import blogPosts from '../data/blogPosts';
import BlogCoverArt from '../components/BlogCoverArt';

// Dev-only: lazy-load blog editor so it's excluded from production bundle
const BlogEditorComponent = import.meta.env.DEV
  ? lazy(() => import('../components/BlogEditor'))
  : () => null;

// Estimate reading time (Chinese ~350 chars/min, English ~200 words/min)
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
  if (lang === 'zh') return Math.max(1, Math.round(totalChars / 350));
  return Math.max(1, Math.round(totalChars / 5 / 200));
};

// WeChat icon SVG
const WeChatIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 01.213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.295.295a.328.328 0 00.186-.059l1.866-1.079a.728.728 0 01.392-.115c.072 0 .143.01.213.03 1.062.3 2.175.46 3.312.46.195 0 .388-.008.579-.02-.246-.707-.388-1.46-.388-2.24 0-3.735 3.528-6.767 7.88-6.767.236 0 .47.013.7.031C17.257 4.864 13.371 2.188 8.691 2.188zm9.197 5.96c-3.85 0-6.973 2.662-6.973 5.946 0 3.285 3.123 5.946 6.973 5.946.87 0 1.712-.138 2.491-.39a.63.63 0 01.175-.025.571.571 0 01.31.093l1.413.822a.26.26 0 00.143.045.222.222 0 00.223-.223c0-.055-.022-.108-.036-.161l-.296-1.121a.485.485 0 01.166-.522c1.383-1.02 2.272-2.528 2.272-4.209 0-3.54-3.373-6.201-6.861-6.201z"/>
  </svg>
);

// WeChat share modal — shows a QR code via public QR API + copy link hint
const WeChatShareModal = ({ url, onClose, language }) => (
  <AnimatePresence>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: 'spring', duration: 0.4 }}
        className="bg-darker border border-white/10 rounded-2xl p-8 max-w-sm w-full mx-4 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2 text-green-400">
            <WeChatIcon />
            <span className="text-sm font-medium">
              {language === 'zh' ? '微信分享' : 'WeChat Share'}
            </span>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
            <FiX className="w-5 h-5" />
          </button>
        </div>

        {/* QR Code via public API */}
        <div className="bg-white rounded-xl p-4 inline-block mb-5">
          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(url)}`}
            alt="QR Code"
            className="w-48 h-48"
          />
        </div>

        <p className="text-gray-400 text-sm mb-2">
          {language === 'zh'
            ? '打开微信扫一扫，分享给好友'
            : 'Scan with WeChat to share'}
        </p>
        <p className="text-gray-500 text-xs">
          {language === 'zh' ? '或长按复制链接发送' : 'Or copy the link below to send'}
        </p>

        {/* Copy URL bar */}
        <div className="mt-4 flex items-center gap-2 bg-dark/60 rounded-lg px-3 py-2 border border-white/10">
          <input
            type="text"
            readOnly
            value={url}
            className="flex-1 bg-transparent text-gray-400 text-xs outline-none truncate"
          />
          <button
            onClick={() => navigator.clipboard.writeText(url)}
            className="text-primary hover:text-primary/80 transition-colors text-xs font-medium whitespace-nowrap"
          >
            {language === 'zh' ? '复制' : 'Copy'}
          </button>
        </div>
      </motion.div>
    </motion.div>
  </AnimatePresence>
);

const BlogPost = () => {
  const { slug } = useParams();
  const { language } = useLanguage();
  const [showWeChatModal, setShowWeChatModal] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [editing, setEditing] = useState(false);

  const post = blogPosts.find((p) => p.slug === slug);

  // Compute prev/next posts (sorted by date)
  const { prevPost, nextPost } = useMemo(() => {
    const sorted = [...blogPosts].sort((a, b) => new Date(b.date) - new Date(a.date));
    const idx = sorted.findIndex((p) => p.slug === slug);
    return {
      prevPost: idx < sorted.length - 1 ? sorted[idx + 1] : null,
      nextPost: idx > 0 ? sorted[idx - 1] : null,
    };
  }, [slug]);

  // Dynamic OG meta tags for social sharing
  useEffect(() => {
    if (!post) return;
    const postTitle = post.title[language] || post.title.zh;
    const description = post.excerpt[language] || post.excerpt.zh;
    // Use clean path URL (not hash) for OG tags so crawlers can reach the middleware
    const cleanUrl = `${window.location.origin}/blog/${post.slug}`;
    const ogImage = `${window.location.origin}/assets/images/og/${post.slug}.png`;

    document.title = `${postTitle} | Jeremy Dong`;

    const setMeta = (property, content) => {
      let el = document.querySelector(`meta[property="${property}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute('property', property);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMeta('og:title', postTitle);
    setMeta('og:description', description);
    setMeta('og:url', cleanUrl);
    setMeta('og:type', 'article');
    setMeta('og:image', ogImage);
    setMeta('og:image:width', '1200');
    setMeta('og:image:height', '630');
    setMeta('twitter:title', postTitle);
    setMeta('twitter:description', description);
    setMeta('twitter:image', ogImage);
    setMeta('twitter:url', cleanUrl);

    return () => {
      document.title = 'Jeremy Dong | Web Developer';
    };
  }, [post, language]);

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
  const readMin = estimateReadingTime(blocks, language);

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    if (language === 'zh') {
      return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
    }
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  // Use clean path URL for sharing (not hash URL) so crawlers can reach the middleware
  const shareUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/blog/${slug}`
    : '';

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  const handleTwitterShare = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl)}`,
      '_blank'
    );
  };

  const t = {
    minRead: { en: 'min read', zh: '分钟阅读' },
    share: { en: 'Share', zh: '分享' },
    copyLink: { en: 'Copy link', zh: '复制链接' },
    copied: { en: 'Copied!', zh: '已复制' },
    prev: { en: 'Previous', zh: '上一篇' },
    next: { en: 'Next', zh: '下一篇' },
    back: { en: 'Back to Blog', zh: '返回博客' },
    authorBio: {
      en: 'Builder, writer. Using AI to build things from scratch.',
      zh: '用 AI 从零造东西的人。',
    },
  };

  return (
    <div className="min-h-screen text-white flex flex-col">
      {/* WeChat share modal */}
      {showWeChatModal && (
        <WeChatShareModal
          url={shareUrl}
          onClose={() => setShowWeChatModal(false)}
          language={language}
        />
      )}

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
              {t.back[language]}
            </Link>
          </motion.div>

          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            {/* Category + date + reading time */}
            <div className="flex items-center gap-3 mb-5 flex-wrap">
              <span className="inline-block text-xs font-medium tracking-widest uppercase px-3 py-1 rounded-full border border-primary/50 text-primary bg-primary/10">
                {language === 'zh' ? 'AI创业' : 'AI Entrepreneurship'}
              </span>
              <time className="text-gray-500 text-sm">{formatDate(post.date)}</time>
              <span className="flex items-center gap-1 text-gray-500 text-sm">
                <FiClock className="w-3.5 h-3.5" />
                {readMin} {t.minRead[language]}
              </span>
            </div>
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-white leading-snug mb-6">
              {title}
            </h1>

            {/* Author card */}
            <div className="flex items-center gap-4">
              <img
                src="/assets/images/profile.jpeg"
                alt="Jeremy Dong"
                className="w-11 h-11 rounded-full object-cover border-2 border-white/20"
              />
              <div>
                <p className="text-white font-medium text-sm">Jeremy Dong</p>
                <p className="text-gray-500 text-xs">{t.authorBio[language]}</p>
              </div>
            </div>
          </motion.header>

          {/* Typographic cover art */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mb-10"
          >
            <BlogCoverArt slug={post.slug} language={language} />
          </motion.div>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{ originX: 0 }}
            className="h-px bg-white/10 mb-12"
          />

          {/* Dev-only edit button */}
          {import.meta.env.DEV && !editing && (
            <div className="mb-6">
              <button
                onClick={() => setEditing(true)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-primary/40 text-primary hover:bg-primary/10 transition-colors text-sm font-medium"
              >
                <FiEdit3 className="w-4 h-4" />
                Edit Post
              </button>
            </div>
          )}

          {/* Editor or read-only content */}
          {import.meta.env.DEV && editing ? (
            <Suspense fallback={<div className="text-gray-500 py-8">Loading editor...</div>}>
              <BlogEditorComponent
                post={post}
                language={language}
                onSave={() => setEditing(false)}
                onCancel={() => setEditing(false)}
              />
            </Suspense>
          ) : (
          <motion.article
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6 text-gray-300 text-base md:text-lg leading-relaxed"
            translate="no"
          >
            {blocks.map((block, i) => {
              if (block.type === 'heading') {
                const level = block.level || 2;
                const Tag = level === 3 ? 'h3' : 'h2';
                const sizeClass =
                  level === 3
                    ? 'text-lg md:text-xl font-semibold mt-8 mb-3'
                    : 'text-xl md:text-2xl font-bold mt-10 mb-4';
                return (
                  <Tag key={i} className={`font-heading text-white ${sizeClass}`}>
                    {block.text}
                  </Tag>
                );
              }
              if (block.type === 'paragraph') {
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
                        className="w-full rounded-xl"
                        style={{ maxHeight: '640px', objectFit: 'contain', background: 'transparent' }}
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
              if (block.type === 'iframe') {
                return (
                  <figure key={i} className="my-8">
                    <iframe
                      src={block.src}
                      title={block.alt || ''}
                      className="w-full rounded-xl border border-white/10"
                      style={{ height: block.height || '500px', background: '#0f1117' }}
                      sandbox="allow-scripts"
                    />
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
          )}

          {/* Share buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-14 pt-8 border-t border-white/10"
          >
            <p className="text-gray-500 text-sm mb-4">{t.share[language]}</p>
            <div className="flex items-center gap-3 flex-wrap">
              <button
                onClick={handleTwitterShare}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 text-gray-400 hover:text-primary hover:border-primary/30 transition-all text-sm"
              >
                <FiTwitter className="w-4 h-4" />
                Twitter
              </button>
              <button
                onClick={() => setShowWeChatModal(true)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 text-gray-400 hover:text-green-400 hover:border-green-400/30 transition-all text-sm"
              >
                <WeChatIcon />
                {language === 'zh' ? '微信' : 'WeChat'}
              </button>
              <button
                onClick={handleCopyLink}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 text-gray-400 hover:text-white hover:border-white/30 transition-all text-sm"
              >
                {linkCopied ? (
                  <>
                    <FiCheck className="w-4 h-4 text-green-400" />
                    <span className="text-green-400">{t.copied[language]}</span>
                  </>
                ) : (
                  <>
                    <FiLink2 className="w-4 h-4" />
                    {t.copyLink[language]}
                  </>
                )}
              </button>
            </div>
          </motion.div>

          {/* Prev / Next navigation */}
          <nav className="mt-12 pt-8 border-t border-white/10 grid grid-cols-2 gap-6">
            {prevPost ? (
              <Link
                to={`/blog/${prevPost.slug}`}
                className="group flex flex-col items-start gap-2 p-5 rounded-xl border border-white/10 hover:border-primary/30 hover:bg-dark/60 transition-all"
              >
                <span className="text-gray-500 text-xs flex items-center gap-1">
                  <FiArrowLeft className="w-3 h-3" />
                  {t.prev[language]}
                </span>
                <span className="text-white text-sm font-medium group-hover:text-primary transition-colors line-clamp-2">
                  {prevPost.title[language] || prevPost.title.zh}
                </span>
              </Link>
            ) : (
              <div />
            )}
            {nextPost ? (
              <Link
                to={`/blog/${nextPost.slug}`}
                className="group flex flex-col items-end gap-2 p-5 rounded-xl border border-white/10 hover:border-primary/30 hover:bg-dark/60 transition-all text-right"
              >
                <span className="text-gray-500 text-xs flex items-center gap-1">
                  {t.next[language]}
                  <FiArrowRight className="w-3 h-3" />
                </span>
                <span className="text-white text-sm font-medium group-hover:text-primary transition-colors line-clamp-2">
                  {nextPost.title[language] || nextPost.title.zh}
                </span>
              </Link>
            ) : (
              <div />
            )}
          </nav>
        </div>
      </main>
    </div>
  );
};

export default BlogPost;
