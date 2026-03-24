// Typographic cover art for blog posts — pure HTML/CSS, no images
// v1: each post gets a unique design based on slug + language-aware text

// Design config per post slug — each has a unique visual identity
const coverDesigns = {
  'symptom-driven-development': {
    // Glitch / terminal aesthetic — code breaking and fixing
    bg: 'linear-gradient(135deg, #0a0a0a 0%, #1a0a2e 50%, #0d1117 100%)',
    accent: '#D4AF37',
    textZh: 'SDD',
    subtextZh: '症状驱动开发',
    textEn: 'SDD',
    subtextEn: 'Symptom Driven Dev',
    decoration: 'terminal',
  },
  'mianyang-cursor-summer': {
    // Warm street scene vibe — heat haze / neon
    bg: 'linear-gradient(135deg, #1a0a00 0%, #2d1810 40%, #0d1117 100%)',
    accent: '#ff6b35',
    textZh: '绵阳',
    subtextZh: '35°C · Cursor · 街头',
    textEn: 'Mianyang',
    subtextEn: '35°C · Cursor · Street',
    decoration: 'heatwave',
  },
  'inventory-from-two-hours-to-ten-minutes': {
    // Numbers-forward — dramatic time reduction
    bg: 'linear-gradient(135deg, #0a1628 0%, #0d2137 50%, #0d1117 100%)',
    accent: '#4ade80',
    textZh: '2h → 10min',
    subtextZh: '进销存革命',
    textEn: '2h → 10min',
    subtextEn: 'Inventory Revolution',
    decoration: 'data',
  },
  'pos-printer-interception': {
    // Hacker / interception aesthetic — matrix-like
    bg: 'linear-gradient(135deg, #0a0d0a 0%, #0d1a0d 50%, #0d1117 100%)',
    accent: '#22d3ee',
    textZh: '截获',
    subtextZh: 'POS · 小票 · 数据流',
    textEn: 'Intercept',
    subtextEn: 'POS · Receipt · Data',
    decoration: 'matrix',
  },
};

// Decorative background elements per style
const terminalLines = [
  '$ symptom --detect',
  '  no issues found',
  '$ ship --now',
  '  deployed',
  '$ symptom --detect',
  '  ERROR: cache miss',
  '$ fix --apply swr',
  '  resolved',
];

const DecoTerminal = ({ accent }) => (
  <>
    {/* Faux terminal lines */}
    <div style={{ position: 'absolute', top: 16, left: 20, opacity: 0.15, fontFamily: 'monospace', fontSize: 11, color: accent, lineHeight: 1.8 }}>
      {terminalLines.map((line, i) => <div key={i}>{line}</div>)}
    </div>
    {/* Cursor blink */}
    <div style={{ position: 'absolute', bottom: 20, right: 24, width: 8, height: 16, background: accent, opacity: 0.6, animation: 'blink 1s step-end infinite' }} />
  </>
);

const DecoHeatwave = ({ accent }) => (
  <>
    {/* Wavy heat lines */}
    {[...Array(5)].map((_, i) => (
      <div
        key={i}
        style={{
          position: 'absolute',
          bottom: 12 + i * 14,
          left: 0,
          right: 0,
          height: 1,
          background: `linear-gradient(90deg, transparent 0%, ${accent}22 30%, ${accent}11 70%, transparent 100%)`,
        }}
      />
    ))}
  </>
);

const DecoData = ({ accent }) => (
  <>
    {/* Scattered small numbers */}
    {['120', '2:00', '0:10', '98%', '→', '42', '0.3s'].map((n, i) => (
      <span
        key={i}
        style={{
          position: 'absolute',
          fontFamily: 'monospace',
          fontSize: 10 + (i % 3) * 2,
          color: accent,
          opacity: 0.08 + (i % 4) * 0.03,
          top: `${15 + ((i * 37) % 70)}%`,
          left: `${5 + ((i * 43) % 85)}%`,
          transform: `rotate(${-10 + (i * 7) % 20}deg)`,
        }}
      >
        {n}
      </span>
    ))}
  </>
);

const DecoMatrix = ({ accent }) => (
  <>
    {/* Vertical data streams */}
    {[...Array(8)].map((_, i) => (
      <div
        key={i}
        style={{
          position: 'absolute',
          top: 0,
          left: `${8 + i * 12}%`,
          width: 1,
          height: '100%',
          background: `linear-gradient(180deg, transparent 0%, ${accent}15 40%, ${accent}08 80%, transparent 100%)`,
        }}
      />
    ))}
  </>
);

const decorationMap = {
  terminal: DecoTerminal,
  heatwave: DecoHeatwave,
  data: DecoData,
  matrix: DecoMatrix,
};

const BlogCoverArt = ({ slug, language = 'zh', compact = false }) => {
  const design = coverDesigns[slug];
  if (!design) return null;

  const mainText = language === 'zh' ? design.textZh : design.textEn;
  const subText = language === 'zh' ? design.subtextZh : design.subtextEn;
  const DecoComponent = decorationMap[design.decoration];

  // compact = true for list page (shorter height), false for detail page
  const height = compact ? '200px' : '280px';

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height,
        background: design.bg,
        borderRadius: compact ? '16px 16px 0 0' : 12,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        userSelect: 'none',
      }}
    >
      {/* Background decoration */}
      {DecoComponent && <DecoComponent accent={design.accent} />}

      {/* Gradient overlay for depth */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 50% 50%, transparent 30%, rgba(0,0,0,0.4) 100%)',
        }}
      />

      {/* Main typography */}
      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '0 24px' }}>
        <div
          style={{
            fontFamily: "'Playfair Display', 'Noto Serif SC', serif",
            fontSize: compact ? 'clamp(32px, 6vw, 48px)' : 'clamp(40px, 7vw, 64px)',
            fontWeight: 900,
            color: design.accent,
            letterSpacing: mainText.length <= 5 ? '0.08em' : '-0.01em',
            lineHeight: 1.1,
            textShadow: `0 0 40px ${design.accent}33`,
          }}
        >
          {mainText}
        </div>
        <div
          style={{
            fontFamily: "'Montserrat', 'Noto Sans SC', sans-serif",
            fontSize: compact ? 13 : 15,
            color: 'rgba(255,255,255,0.45)',
            marginTop: compact ? 8 : 12,
            letterSpacing: '0.12em',
            fontWeight: 500,
          }}
        >
          {subText}
        </div>
      </div>

      {/* Bottom edge accent line */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: '10%',
          right: '10%',
          height: 2,
          background: `linear-gradient(90deg, transparent, ${design.accent}55, transparent)`,
        }}
      />

      {/* Inline keyframes for terminal cursor blink */}
      <style>{`@keyframes blink { 50% { opacity: 0; } }`}</style>
    </div>
  );
};

export default BlogCoverArt;
