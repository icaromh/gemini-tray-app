/**
 * Jest setup for Integration tests
 * Configures the testing environment for full application integration tests
 */

// Mock electron module first - copy the same mock as main process
jest.mock(
  'electron',
  () => {
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
      getBounds: jest
        .fn()
        .mockReturnValue({ x: 0, y: 0, width: 800, height: 600 }),
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

    // Make BrowserWindow constructor function with proper prototype
    function BrowserWindow(options) {
      const instance = Object.create(BrowserWindow.prototype);
      Object.assign(instance, mockBrowserWindow);
      instance._options = options;
      return instance;
    }

    // Mock static methods
    BrowserWindow.getAllWindows = jest.fn().mockReturnValue([]);
    BrowserWindow.getFocusedWindow = jest.fn().mockReturnValue(null);

    // Make Tray constructor function with proper prototype
    function Tray(icon) {
      const instance = Object.create(Tray.prototype);
      Object.assign(instance, mockTray);
      instance._icon = icon;
      return instance;
    }

    return {
      app: {
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
      },
      BrowserWindow,
      Tray,
      Menu: {
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
      },
      MenuItem: jest.fn().mockImplementation(options => ({
        ...options,
        enabled: options.enabled !== false,
        visible: options.visible !== false,
        click: options.click || jest.fn(),
        submenu: options.submenu || null,
      })),
      ipcMain: {
        on: jest.fn(),
        off: jest.fn(),
        once: jest.fn(),
        removeListener: jest.fn(),
        removeAllListeners: jest.fn(),
        handle: jest.fn(),
        handleOnce: jest.fn(),
        removeHandler: jest.fn(),
        emit: jest.fn(),
      },
      globalShortcut: {
        register: jest.fn().mockReturnValue(true),
        registerAll: jest.fn(),
        unregister: jest.fn(),
        unregisterAll: jest.fn(),
        isRegistered: jest.fn().mockReturnValue(false),
      },
      nativeImage: {
        createEmpty: jest.fn().mockReturnValue({}),
        createFromPath: jest
          .fn()
          .mockReturnValue({ setTemplateImage: jest.fn() }),
        createFromBuffer: jest.fn().mockReturnValue({}),
        createFromDataURL: jest.fn().mockReturnValue({}),
        createFromNamedImage: jest.fn().mockReturnValue({}),
      },
      screen: {
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
      },
      shell: {
        openExternal: jest.fn().mockResolvedValue(undefined),
        openPath: jest.fn().mockResolvedValue(''),
        showItemInFolder: jest.fn(),
        moveItemToTrash: jest.fn().mockReturnValue(true),
        beep: jest.fn(),
        writeShortcutLink: jest.fn().mockReturnValue(true),
        readShortcutLink: jest.fn().mockReturnValue({}),
      },
    };
  },
  { virtual: true }
);
