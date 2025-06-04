// Test utilities for mocking and helpers

/**
 * Creates a mock Electron BrowserWindow
 */
function createMockBrowserWindow() {
  return {
    loadFile: jest.fn(),
    on: jest.fn(),
    once: jest.fn(),
    show: jest.fn(),
    hide: jest.fn(),
    focus: jest.fn(),
    isVisible: jest.fn(() => false),
    getSize: jest.fn(() => [1120, 600]),
    setPosition: jest.fn(),
    close: jest.fn(),
    isDestroyed: jest.fn(() => false),
    webContents: {
      send: jest.fn(),
      isDevToolsOpened: jest.fn(() => false),
    },
  };
}

/**
 * Creates a mock Electron Tray
 */
function createMockTray() {
  return {
    setToolTip: jest.fn(),
    setContextMenu: jest.fn(),
    destroy: jest.fn(),
  };
}

/**
 * Creates mock IPC event object
 */
function createMockIpcEvent() {
  return {
    preventDefault: jest.fn(),
    reply: jest.fn(),
    sender: {
      send: jest.fn(),
    },
  };
}

/**
 * Waits for a condition to be true
 */
async function waitFor(condition, timeout = 5000) {
  const startTime = Date.now();

  while (Date.now() - startTime < timeout) {
    if (await condition()) {
      return true;
    }
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  throw new Error(`Condition not met within ${timeout}ms`);
}

/**
 * Simulates DOM events
 */
function simulateEvent(element, eventType, options = {}) {
  const event = new Event(eventType, { bubbles: true, ...options });
  Object.assign(event, options);
  element.dispatchEvent(event);
  return event;
}

/**
 * Mock file system operations
 */
function mockFileSystem() {
  const fs = require('fs');

  return {
    existsSync: jest.spyOn(fs, 'existsSync').mockReturnValue(true),
    readFileSync: jest
      .spyOn(fs, 'readFileSync')
      .mockReturnValue('mock file content'),
    writeFileSync: jest.spyOn(fs, 'writeFileSync').mockImplementation(),
  };
}

/**
 * Creates a test environment setup
 */
function setupTestEnvironment() {
  // Suppress console output during tests
  const originalConsole = global.console;
  global.console = {
    ...originalConsole,
    log: jest.fn(),
    debug: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
  };

  return {
    cleanup: () => {
      global.console = originalConsole;
    },
  };
}

/**
 * Generates test data
 */
const testData = {
  urls: {
    gemini: 'https://gemini.google.com/app',
    notebooklm: 'https://notebooklm.google.com/',
  },
  windowConfig: {
    width: 1120,
    height: 600,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    show: false,
    skipTaskbar: true,
  },
  shortcuts: {
    toggle: process.platform === 'darwin' ? 'Option+Space' : 'Alt+Space',
  },
};

module.exports = {
  createMockBrowserWindow,
  createMockTray,
  createMockIpcEvent,
  waitFor,
  simulateEvent,
  mockFileSystem,
  setupTestEnvironment,
  testData,
};
