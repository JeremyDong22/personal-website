/**
 * Utility functions for browser detection
 */

/**
 * Detects if the current browser is WeChat's built-in browser
 * @returns {boolean} True if the browser is WeChat
 */
export const isWeChatBrowser = () => {
  const userAgent = navigator.userAgent.toLowerCase();
  return userAgent.indexOf('micromessenger') !== -1;
};

/**
 * Opens the current URL in the default browser
 */
export const openInDefaultBrowser = () => {
  // Get the current URL
  const currentUrl = window.location.href;
  
  // For iOS devices
  if (/iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase())) {
    window.location.href = `https://x-web-search://${currentUrl}`;
    return;
  }
  
  // For Android devices
  if (/android/.test(navigator.userAgent.toLowerCase())) {
    window.location.href = `intent://${window.location.host}${window.location.pathname}${window.location.search}#Intent;scheme=https;package=com.android.chrome;end`;
    return;
  }
  
  // Fallback - just try to open in a new tab
  window.open(currentUrl, '_system');
}; 