/**
 * Shared constants for Gemini Quick Chat
 */

// Application URLs
const LLM_URLS = {
  GEMINI: "https://gemini.google.com/app",
  NOTEBOOK_LLM: "https://notebooklm.google.com/",
};

// Window configuration
const WINDOW_CONFIG = {
  width: 1120,
  height: 600,
  frame: false,
  transparent: true,
  alwaysOnTop: true,
  show: false,
  skipTaskbar: true,
};

// Keyboard shortcuts
const SHORTCUTS = {
  TOGGLE_WINDOW: process.platform === "darwin" ? "Option+Space" : "Alt+Space",
};

// Asset paths
const ASSETS = {
  TRAY_ICON: "trayIcon.png",
  PRELOAD_SCRIPT: "../preload/preload.js",
  RENDERER_HTML: "../renderer/index.html",
};

module.exports = {
  LLM_URLS,
  WINDOW_CONFIG,
  SHORTCUTS,
  ASSETS,
};
