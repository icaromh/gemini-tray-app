/**
 * Electron module mock for Jest testing
 * This file provides comprehensive mocks for all Electron APIs used in the application
 */

const mockBrowserWindow = {
  loadFile: jest.fn().mockResolvedValue(undefined),
  loadURL: jest.fn().mockResolvedValue(undefined),
  show: jest.fn(),
  hide: jest.fn(),
  close: jest.fn(),
  destroy: jest.fn(),
  focus: jest.fn(),
  blur: jest.fn(),
  isVisible: jest.fn().mockReturnValue(false),
  isMinimized: jest.fn().mockReturnValue(false),
  isMaximized: jest.fn().mockReturnValue(false),
  setPosition: jest.fn(),
  getPosition: jest.fn().mockReturnValue([0, 0]),
  setSize: jest.fn(),
  getSize: jest.fn().mockReturnValue([800, 600]),
  center: jest.fn(),
  setResizable: jest.fn(),
  setMovable: jest.fn(),
  setMinimizable: jest.fn(),
  setMaximizable: jest.fn(),
  setClosable: jest.fn(),
  setAlwaysOnTop: jest.fn(),
  setSkipTaskbar: jest.fn(),
  setVibrancy: jest.fn(),
  setOpacity: jest.fn(),
  on: jest.fn(),
  off: jest.fn(),
  once: jest.fn(),
  removeListener: jest.fn(),
  removeAllListeners: jest.fn(),
  emit: jest.fn(),
  webContents: {
    send: jest.fn(),
    on: jest.fn(),
    off: jest.fn(),
    once: jest.fn(),
    removeListener: jest.fn(),
    removeAllListeners: jest.fn(),
    executeJavaScript: jest.fn().mockResolvedValue(undefined),
    insertCSS: jest.fn().mockResolvedValue(undefined),
    openDevTools: jest.fn(),
    closeDevTools: jest.fn(),
    isDevToolsOpened: jest.fn().mockReturnValue(false),
    setUserAgent: jest.fn(),
    getUserAgent: jest.fn().mockReturnValue('test-user-agent'),
    session: {
      clearCache: jest.fn().mockResolvedValue(undefined),
      clearStorageData: jest.fn().mockResolvedValue(undefined),
    },
  },
  getBounds: jest.fn().mockReturnValue({ x: 0, y: 0, width: 800, height: 600 }),
  setBounds: jest.fn(),
  isDestroyed: jest.fn().mockReturnValue(false),
};

const mockTray = {
  setToolTip: jest.fn(),
  setTitle: jest.fn(),
  setImage: jest.fn(),
  setContextMenu: jest.fn(),
  destroy: jest.fn(),
  on: jest.fn(),
  off: jest.fn(),
  once: jest.fn(),
  removeListener: jest.fn(),
  removeAllListeners: jest.fn(),
  emit: jest.fn(),
  isDestroyed: jest.fn().mockReturnValue(false),
};

const mockMenu = {
  buildFromTemplate: jest.fn().mockReturnValue({
    popup: jest.fn(),
    closePopup: jest.fn(),
    getMenuItemById: jest.fn(),
    insert: jest.fn(),
    append: jest.fn(),
    items: [],
  }),
  setApplicationMenu: jest.fn(),
  getApplicationMenu: jest.fn().mockReturnValue(null),
};

const mockMenuItem = jest.fn().mockImplementation(options => ({
  ...options,
  enabled: options.enabled !== false,
  visible: options.visible !== false,
  click: options.click || jest.fn(),
  submenu: options.submenu || null,
}));

const mockNativeImage = {
  createEmpty: jest.fn().mockReturnValue({}),
  createFromPath: jest.fn().mockReturnValue({ setTemplateImage: jest.fn() }),
  createFromBuffer: jest.fn().mockReturnValue({}),
  createFromDataURL: jest.fn().mockReturnValue({}),
  createFromNamedImage: jest.fn().mockReturnValue({}),
};

const mockIpcMain = {
  on: jest.fn(),
  off: jest.fn(),
  once: jest.fn(),
  removeListener: jest.fn(),
  removeAllListeners: jest.fn(),
  handle: jest.fn(),
  handleOnce: jest.fn(),
  removeHandler: jest.fn(),
  emit: jest.fn(),
};

const mockIpcRenderer = {
  on: jest.fn(),
  off: jest.fn(),
  once: jest.fn(),
  removeListener: jest.fn(),
  removeAllListeners: jest.fn(),
  send: jest.fn(),
  sendSync: jest.fn().mockReturnValue(undefined),
  invoke: jest.fn().mockResolvedValue(undefined),
  emit: jest.fn(),
  sendTo: jest.fn(),
  sendToHost: jest.fn(),
};

const mockGlobalShortcut = {
  register: jest.fn().mockReturnValue(true),
  registerAll: jest.fn(),
  unregister: jest.fn(),
  unregisterAll: jest.fn(),
  isRegistered: jest.fn().mockReturnValue(false),
};

const mockApp = {
  whenReady: jest.fn().mockResolvedValue(undefined),
  quit: jest.fn(),
  exit: jest.fn(),
  focus: jest.fn(),
  hide: jest.fn(),
  show: jest.fn(),
  setAppUserModelId: jest.fn(),
  setLoginItemSettings: jest.fn(),
  getLoginItemSettings: jest.fn().mockReturnValue({ openAtLogin: false }),
  isReady: jest.fn().mockReturnValue(true),
  dock: {
    hide: jest.fn(),
    show: jest.fn(),
    setIcon: jest.fn(),
    setMenu: jest.fn(),
    setBadge: jest.fn(),
    getBadge: jest.fn().mockReturnValue(''),
  },
  on: jest.fn(),
  off: jest.fn(),
  once: jest.fn(),
  removeListener: jest.fn(),
  removeAllListeners: jest.fn(),
  emit: jest.fn(),
  getPath: jest.fn().mockImplementation(name => {
    const paths = {
      home: '/home/test',
      appData: '/home/test/.config',
      userData: '/home/test/.config/test-app',
      cache: '/home/test/.cache',
      temp: '/tmp',
      exe: '/path/to/exe',
      module: '/path/to/module',
      desktop: '/home/test/Desktop',
      documents: '/home/test/Documents',
      downloads: '/home/test/Downloads',
      music: '/home/test/Music',
      pictures: '/home/test/Pictures',
      videos: '/home/test/Videos',
    };
    return paths[name] || '/home/test';
  }),
  getName: jest.fn().mockReturnValue('test-app'),
  getVersion: jest.fn().mockReturnValue('1.0.0'),
  isPackaged: false,
  getAppPath: jest.fn().mockReturnValue('/path/to/app'),
};

const mockScreen = {
  getPrimaryDisplay: jest.fn().mockReturnValue({
    bounds: { x: 0, y: 0, width: 1920, height: 1080 },
    workArea: { x: 0, y: 0, width: 1920, height: 1040 },
    scaleFactor: 1,
    rotation: 0,
  }),
  getAllDisplays: jest.fn().mockReturnValue([]),
  getDisplayNearestPoint: jest.fn(),
  getDisplayMatching: jest.fn(),
  getCursorScreenPoint: jest.fn().mockReturnValue({ x: 0, y: 0 }),
  on: jest.fn(),
  off: jest.fn(),
  once: jest.fn(),
  removeListener: jest.fn(),
  removeAllListeners: jest.fn(),
};

const mockShell = {
  openExternal: jest.fn().mockResolvedValue(undefined),
  openPath: jest.fn().mockResolvedValue(''),
  showItemInFolder: jest.fn(),
  moveItemToTrash: jest.fn().mockReturnValue(true),
  beep: jest.fn(),
  writeShortcutLink: jest.fn().mockReturnValue(true),
  readShortcutLink: jest.fn().mockReturnValue({}),
};

const mockDialog = {
  showOpenDialog: jest
    .fn()
    .mockResolvedValue({ canceled: false, filePaths: [] }),
  showSaveDialog: jest
    .fn()
    .mockResolvedValue({ canceled: false, filePath: '' }),
  showMessageBox: jest.fn().mockResolvedValue({ response: 0 }),
  showErrorBox: jest.fn(),
  showCertificateTrustDialog: jest.fn().mockResolvedValue(undefined),
};

const mockClipboard = {
  writeText: jest.fn(),
  readText: jest.fn().mockReturnValue(''),
  writeHTML: jest.fn(),
  readHTML: jest.fn().mockReturnValue(''),
  writeImage: jest.fn(),
  readImage: jest.fn().mockReturnValue(mockNativeImage.createEmpty()),
  clear: jest.fn(),
};

// Mock constructor functions
const BrowserWindow = jest.fn().mockImplementation(options => {
  const instance = { ...mockBrowserWindow };
  // Store options for testing
  instance._options = options;
  return instance;
});

const Tray = jest.fn().mockImplementation(icon => {
  const instance = { ...mockTray };
  instance._icon = icon;
  return instance;
});

// Add static methods to constructors
BrowserWindow.getAllWindows = jest.fn().mockReturnValue([]);
BrowserWindow.getFocusedWindow = jest.fn().mockReturnValue(null);
BrowserWindow.fromWebContents = jest.fn().mockReturnValue(null);
BrowserWindow.fromBrowserView = jest.fn().mockReturnValue(null);
BrowserWindow.fromId = jest.fn().mockReturnValue(null);

// Main mock export
module.exports = {
  app: mockApp,
  BrowserWindow,
  Tray,
  Menu: mockMenu,
  MenuItem: mockMenuItem,
  ipcMain: mockIpcMain,
  ipcRenderer: mockIpcRenderer,
  globalShortcut: mockGlobalShortcut,
  screen: mockScreen,
  shell: mockShell,
  dialog: mockDialog,
  clipboard: mockClipboard,
  nativeImage: mockNativeImage,

  // Additional commonly used APIs
  contextBridge: {
    exposeInMainWorld: jest.fn(),
  },

  // Process info
  process: {
    platform: 'test',
    arch: 'x64',
    versions: {
      electron: '20.0.0',
      chrome: '100.0.0',
      node: '16.0.0',
    },
  },

  // Export mock instances for direct access in tests
  __mocks: {
    mockBrowserWindow,
    mockTray,
    mockMenu,
    mockMenuItem,
    mockNativeImage,
    mockIpcMain,
    mockIpcRenderer,
    mockGlobalShortcut,
    mockApp,
    mockScreen,
    mockShell,
    mockDialog,
    mockClipboard,
  },
};
