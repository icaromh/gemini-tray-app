// Renderer-specific test setup
require('./setup-new.js');

// Setup window.electronAPI for renderer tests
Object.defineProperty(window, 'electronAPI', {
  value: {
    changeWebviewSrc: jest.fn(),
    closeWindow: jest.fn(),
    onWindowShow: jest.fn(),
    onWindowHide: jest.fn(),
  },
  writable: true,
  configurable: true,
});

// Mock webview element behavior
Object.defineProperty(HTMLElement.prototype, 'src', {
  get() {
    return this._src || '';
  },
  set(value) {
    this._src = value;
  },
  configurable: true,
});
