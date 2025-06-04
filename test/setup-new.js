// Simple test setup with basic mocks
// Mock Electron module
jest.mock(
  'electron',
  () => ({
    BrowserWindow: jest.fn(() => ({
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
    })),

    ipcMain: {
      on: jest.fn(),
      once: jest.fn(),
      handle: jest.fn(),
      removeAllListeners: jest.fn(),
      removeHandler: jest.fn(),
      removeListener: jest.fn(),
    },

    Tray: jest.fn(() => ({
      setToolTip: jest.fn(),
      setContextMenu: jest.fn(),
      on: jest.fn(),
      destroy: jest.fn(),
      isDestroyed: jest.fn(() => false),
    })),

    Menu: {
      buildFromTemplate: jest.fn(() => ({
        append: jest.fn(),
        popup: jest.fn(),
      })),
      setApplicationMenu: jest.fn(),
    },

    nativeImage: {
      createFromPath: jest.fn(() => ({
        setTemplateImage: jest.fn(),
        isEmpty: jest.fn(() => false),
        getSize: jest.fn(() => ({ width: 16, height: 16 })),
      })),
      createFromDataURL: jest.fn(() => ({
        setTemplateImage: jest.fn(),
      })),
      createEmpty: jest.fn(() => ({
        setTemplateImage: jest.fn(),
      })),
    },

    app: {
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
    },

    globalShortcut: {
      register: jest.fn(() => true),
      unregister: jest.fn(),
      unregisterAll: jest.fn(),
      isRegistered: jest.fn(() => false),
    },

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
