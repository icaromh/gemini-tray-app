// Mock Electron APIs for testing environment

// Create more comprehensive mocks for Electron APIs
const createMockBrowserWindow = () => ({
  loadFile: jest.fn().mockResolvedValue(undefined),
  on: jest.fn(),
  once: jest.fn(),
  show: jest.fn(),
  hide: jest.fn(),
  isVisible: jest.fn(() => false),
  setPosition: jest.fn(),
  focus: jest.fn(),
  center: jest.fn(),
  close: jest.fn(),
  destroy: jest.fn(),
  isDestroyed: jest.fn(() => false),
  webContents: {
    send: jest.fn(),
    on: jest.fn(),
    once: jest.fn(),
    executeJavaScript: jest.fn().mockResolvedValue(undefined),
    openDevTools: jest.fn(),
    closeDevTools: jest.fn(),
  },
});

const createMockTray = () => ({
  setToolTip: jest.fn(),
  setContextMenu: jest.fn(),
  on: jest.fn(),
  destroy: jest.fn(),
  isDestroyed: jest.fn(() => false),
});

const createMockMenu = () => ({
  append: jest.fn(),
  popup: jest.fn(),
});

const createMockNativeImage = () => ({
  setTemplateImage: jest.fn(),
  isEmpty: jest.fn(() => false),
  getSize: jest.fn(() => ({ width: 16, height: 16 })),
});

// Mock Electron main process APIs
const mockBrowserWindow = jest
  .fn()
  .mockImplementation(() => createMockBrowserWindow());
mockBrowserWindow.mockReturnValue = jest.fn(returnValue => {
  mockBrowserWindow.mockImplementation(() => returnValue);
});

const mockTray = jest.fn().mockImplementation(() => createMockTray());
mockTray.mockReturnValue = jest.fn(returnValue => {
  mockTray.mockImplementation(() => returnValue);
});

const mockMenu = {
  buildFromTemplate: jest.fn(() => createMockMenu()),
  setApplicationMenu: jest.fn(),
};

const mockNativeImage = {
  createFromPath: jest.fn(() => createMockNativeImage()),
  createFromDataURL: jest.fn(() => createMockNativeImage()),
  createEmpty: jest.fn(() => createMockNativeImage()),
};

const mockIpcMain = {
  on: jest.fn(),
  once: jest.fn(),
  handle: jest.fn(),
  removeAllListeners: jest.fn(),
  removeHandler: jest.fn(),
  removeListener: jest.fn(),
};

const mockApp = {
  getName: jest.fn(() => 'Gemini Quick Chat'),
  getVersion: jest.fn(() => '1.5.0'),
  whenReady: jest.fn(() => Promise.resolve()),
  quit: jest.fn(),
  exit: jest.fn(),
  on: jest.fn(),
  once: jest.fn(),
  removeAllListeners: jest.fn(),
  dock: {
    hide: jest.fn(),
    show: jest.fn(),
  },
  isReady: jest.fn(() => true),
  getPath: jest.fn(name => `/mock/path/${name}`),
};

const mockGlobalShortcut = {
  register: jest.fn(() => true),
  unregister: jest.fn(),
  unregisterAll: jest.fn(),
  isRegistered: jest.fn(() => false),
};

// Set up global mocks for Node.js environment (main process)
global.BrowserWindow = mockBrowserWindow;
global.ipcMain = mockIpcMain;
global.Tray = mockTray;
global.Menu = mockMenu;
global.nativeImage = mockNativeImage;
global.app = mockApp;
global.globalShortcut = mockGlobalShortcut;

// Mock Electron module for requires
jest.mock(
  'electron',
  () => ({
    BrowserWindow: mockBrowserWindow,
    ipcMain: mockIpcMain,
    Tray: mockTray,
    Menu: mockMenu,
    nativeImage: mockNativeImage,
    app: mockApp,
    globalShortcut: mockGlobalShortcut,
    // For renderer process mocks
    ipcRenderer: {
      invoke: jest.fn(),
      send: jest.fn(),
      on: jest.fn(),
      once: jest.fn(),
      removeAllListeners: jest.fn(),
    },
  }),
  { virtual: true }
);

// Mock Node.js modules
global.path = require('path');
global.fs = require('fs');

// Mock process.platform for cross-platform testing
Object.defineProperty(process, 'platform', {
  value: 'darwin', // Default to macOS for testing
  writable: true,
});

// For renderer environment, set up window.electronAPI
if (typeof window !== 'undefined') {
  window.electronAPI = {
    changeWebviewSrc: jest.fn(),
    closeWindow: jest.fn(),
    onWindowShow: jest.fn(),
    onWindowHide: jest.fn(),
  };
}

// Suppress console output during tests unless CI environment
if (!process.env.CI) {
  global.console = {
    ...console,
    log: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
  };
}

// Export mocks for test files to use if needed
module.exports = {
  mockBrowserWindow,
  mockIpcMain,
  mockTray,
  mockMenu,
  mockNativeImage,
  mockApp,
  mockGlobalShortcut,
};
