// v1 — Hook that triggers background image preloading on the Home page.
// Waits 3 seconds after mount (so Home's own images/animations finish first),
// then silently preloads other pages' images. Runs only once per session.

import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { preloadAllImages } from '../utils/imagePreloader';

// Module-level flag — preload only once per session, even if Home re-mounts
let hasPreloaded = false;

export default function useBackgroundPreloader() {
  const { pathname } = useLocation();
  const abortRef = useRef(null);

  useEffect(() => {
    // Only trigger on Home page, and only once
    if (pathname !== '/' || hasPreloaded) return;

    hasPreloaded = true;
    const controller = new AbortController();
    abortRef.current = controller;

    const timer = setTimeout(() => {
      preloadAllImages(controller.signal).catch(() => {
        // Silently ignore — either aborted or images failed (not critical)
      });
    }, 3000);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [pathname]);
}
