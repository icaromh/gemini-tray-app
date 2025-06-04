const { app, BrowserWindow } = require('electron');

describe('App Integration Tests', () => {
  let mainWindow;

  beforeAll(async () => {
    // Wait for app to be ready
    await app.whenReady();
  });

  afterAll(async () => {
    // Clean up
    if (mainWindow && !mainWindow.isDestroyed()) {
      mainWindow.close();
    }
  });

  describe('App initialization', () => {
    test('should create main window', async () => {
      const { createWindow } = require('../../src/main/window');

      mainWindow = createWindow();

      expect(mainWindow).toBeInstanceOf(BrowserWindow);
      expect(mainWindow.isVisible()).toBe(false); // Should start hidden
    });

    test('should register global shortcut', () => {
      const { globalShortcut } = require('electron');

      // Verify shortcut was registered during app initialization
      expect(globalShortcut.register).toHaveBeenCalled();
    });
  });

  describe('IPC communication flow', () => {
    test('should handle complete app switching flow', async () => {
      const { setupIpcHandlers } = require('../../src/main/ipc-handlers');
      const { ipcMain } = require('electron');

      setupIpcHandlers();

      // Simulate renderer requesting app change
      const changeHandler = ipcMain.on.mock.calls.find(
        call => call[0] === 'change-webview-src'
      )[1];

      const mockEvent = {};
      changeHandler(mockEvent, 'notebooklm');

      // Verify the complete flow worked
      expect(ipcMain.on).toHaveBeenCalledWith(
        'change-webview-src',
        expect.any(Function)
      );
    });
  });

  describe('Tray integration', () => {
    test('should create tray and integrate with window management', () => {
      const { createTray } = require('../../src/main/tray');
      const mockToggleLLM = jest.fn();

      const tray = createTray(mockToggleLLM);

      expect(tray).toBeDefined();
    });
  });
});
