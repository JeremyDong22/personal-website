// Vercel Edge Middleware — serves correct OG meta tags for social crawlers
// v1: intercepts /blog/* paths, returns OG HTML for crawlers, 302 redirect for users

const SITE_URL = 'https://jeremydong.blog';

// Blog post metadata for OG tags (keep in sync with src/data/blogPosts.js)
const posts = {
  'symptom-driven-development': {
    title: 'SDD 症状驱动开发宣言 | Jeremy Dong',
    description: '有 bug 再说，大不了学。症状出现之前没人能说服我要怎么做。',
    image: '/assets/images/og/symptom-driven-development.png',
  },
  'mianyang-cursor-summer': {
    title: '从全美第一院校流落到四川绵阳街头 | Jeremy Dong',
    description: '有时候我觉得，人生的路径规划就是个伪命题。',
    image: '/assets/images/og/mianyang-cursor-summer.png',
  },
  'inventory-from-two-hours-to-ten-minutes': {
    title: '读完Anthropic的"圣经"，我把餐厅进销存从2小时砍到10分钟 | Jeremy Dong',
    description: '既然试图用系统去规范"人性"的To-Do List行不通，那就去管最实在的东西：钱和货。',
    image: '/assets/images/og/inventory-from-two-hours-to-ten-minutes.png',
  },
  'pos-printer-interception': {
    title: '半夜复盘会上的灵光一现：我把电脑伪装成POS打印机截获了出餐数据 | Jeremy Dong',
    description: '我们费很大劲拿到了库存和成本数据，但唯独缺了最核心的——实时的销售数据。',
    image: '/assets/images/og/pos-printer-interception.png',
  },
};

// Crawler user-agent patterns (WeChat, Twitter, Facebook, Telegram, Slack, etc.)
const CRAWLER_RE = /facebookexternalhit|Twitterbot|LinkedInBot|Slackbot|TelegramBot|WhatsApp|Discordbot|MicroMessenger|WeChat|Googlebot|bingbot|Baiduspider/i;

export const config = {
  matcher: '/blog/:slug*',
};

export default function middleware(request) {
  const url = new URL(request.url);
  const slug = url.pathname.replace('/blog/', '').replace(/\/$/, '');

  // Only handle known blog slugs
  const post = posts[slug];
  if (!post) {
    // Unknown slug — redirect to blog list
    return Response.redirect(`${SITE_URL}/#/blog`, 302);
  }

  const ua = request.headers.get('user-agent') || '';
  const isCrawler = CRAWLER_RE.test(ua);

  if (isCrawler) {
    // Return minimal HTML with OG meta tags for the crawler
    const ogUrl = `${SITE_URL}/blog/${slug}`;
    const ogImage = `${SITE_URL}${post.image}`;

    const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>${post.title}</title>
  <meta property="og:type" content="article" />
  <meta property="og:title" content="${post.title}" />
  <meta property="og:description" content="${post.description}" />
  <meta property="og:url" content="${ogUrl}" />
  <meta property="og:image" content="${ogImage}" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:site_name" content="Jeremy Dong" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${post.title}" />
  <meta name="twitter:description" content="${post.description}" />
  <meta name="twitter:image" content="${ogImage}" />
  <link rel="canonical" href="${ogUrl}" />
</head>
<body>
  <p>${post.description}</p>
  <a href="${SITE_URL}/#/blog/${slug}">Read full article</a>
</body>
</html>`;

    return new Response(html, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  }

  // Regular user — redirect to hash route
  return Response.redirect(`${SITE_URL}/#/blog/${slug}`, 302);
}
