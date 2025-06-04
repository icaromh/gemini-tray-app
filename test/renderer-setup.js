// Renderer-specific test setup
// This extends the main setup.js with renderer-specific mocks

require('./setup.js');

// Use jest from the context
const { jest } = require('@jest/globals');

// Setup electronAPI for renderer tests BEFORE any tests run
const setupElectronAPI = () => {
  // Mock electronAPI that would be exposed by preload script
  const electronAPI = {
    changeWebviewSrc: jest.fn(),
    closeWindow: jest.fn(),
    onWindowShow: jest.fn(),
    onWindowHide: jest.fn(),
  };

  // Ensure window object exists and set electronAPI
  if (typeof window !== 'undefined') {
    window.electronAPI = electronAPI;
  }

  // Also set on global for consistency
  global.window = global.window || {};
  global.window.electronAPI = electronAPI;

  return electronAPI;
};

// Set up the electronAPI immediately
const electronAPI = setupElectronAPI();

// Mock webview element behavior
if (typeof window !== 'undefined') {
  // Mock HTMLElement src property for webview elements
  Object.defineProperty(HTMLElement.prototype, 'src', {
    get() {
      return this._src || '';
    },
    set(value) {
      this._src = value;
    },
    configurable: true,
  });
}

module.exports = {
  setupElectronAPI,
  electronAPI,
};
