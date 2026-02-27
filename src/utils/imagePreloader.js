// v1 — Background image preloader
// Preloads other pages' images while user is on Home page.
// Uses `new Image()` to trigger HTTP requests; browser cache handles the rest.
// Images are grouped into 3 priority tiers, loaded sequentially via requestIdleCallback.

// --- Tier 1: Above-the-fold hero images (~6MB) ---
import aboutHero from '../assets/images/about/background/about_hero.jpeg';
import sportsHero from '../assets/images/sports/hero/sports_hero.jpg';

// --- Tier 2: Below-the-fold About images + logos (~3MB) ---
import journeyImage from '../assets/images/about/background/journey.jpg';
import wechatQR from '../assets/images/contact/wechatQRcode.JPG';

// Logos are in public/, referenced as absolute paths
const companyLogos = [
  '/assets/images/logos/smartice.png',
  '/assets/images/logos/sourceready.png',
  '/assets/images/logos/usp.png',
  '/assets/images/logos/kaifeng.png',
  '/assets/images/logos/gyja.png',
  '/assets/images/logos/molex.png',
  '/assets/images/logos/bdo.png',
  '/assets/images/logos/uiuc.png',
];

// --- Tier 3: Sports timeline photos (~7.4MB, excluding 16MB twilight team) ---
import sportsFootballTeam from '../assets/images/sports/timeline/scie_football_team_2021.jpg';
import sportsVarsityTeam from '../assets/images/sports/timeline/donovan_varsity_team_2018.jpg';
import sportsHighschoolTeam from '../assets/images/sports/timeline/shenzhen_intl_team_2017.jpg';

const TIERS = [
  // Tier 1: hero images users see first when navigating
  [aboutHero, sportsHero],
  // Tier 2: secondary About content + WeChat QR + company logos
  [journeyImage, wechatQR, ...companyLogos],
  // Tier 3: Sports timeline (skip uiuc_twilight_team_2021.jpg — 16MB, not worth prefetching)
  [sportsFootballTeam, sportsVarsityTeam, sportsHighschoolTeam],
];

// Preload a single image, returning a promise that settles when loaded or aborted
function preloadImage(src, signal) {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(new DOMException('Aborted', 'AbortError'));
      return;
    }

    const img = new Image();

    const cleanup = () => {
      img.onload = null;
      img.onerror = null;
    };

    img.onload = () => { cleanup(); resolve(src); };
    img.onerror = () => { cleanup(); resolve(src); }; // resolve on error too — don't block the chain

    // Abort listener: cancel in-flight request
    signal?.addEventListener('abort', () => {
      cleanup();
      img.src = ''; // cancel the network request
      reject(new DOMException('Aborted', 'AbortError'));
    }, { once: true });

    img.src = src;
  });
}

// Wait for the next idle period (falls back to setTimeout if requestIdleCallback unavailable)
function waitForIdle(signal) {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(new DOMException('Aborted', 'AbortError'));
      return;
    }

    const schedule = window.requestIdleCallback || ((cb) => setTimeout(cb, 50));

    const id = schedule(() => resolve());

    signal?.addEventListener('abort', () => {
      const cancel = window.cancelIdleCallback || clearTimeout;
      cancel(id);
      reject(new DOMException('Aborted', 'AbortError'));
    }, { once: true });
  });
}

/**
 * Preload all images across tiers.
 * Tiers run sequentially (with idle pauses between), images within a tier load in parallel.
 * @param {AbortSignal} [signal] - optional abort signal to cancel preloading
 */
export async function preloadAllImages(signal) {
  for (const tier of TIERS) {
    // Yield to main thread between tiers
    await waitForIdle(signal);

    // Load all images in this tier in parallel; don't let one failure block others
    await Promise.allSettled(
      tier.map((src) => preloadImage(src, signal))
    );
  }
}
