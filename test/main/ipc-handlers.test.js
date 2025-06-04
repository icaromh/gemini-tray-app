const { setupIpcHandlers } = require('../../src/main/ipc-handlers');
const { ipcMain } = require('electron');
const { LLM_URLS } = require('../../src/shared/constants');

// Mock the dependencies
jest.mock('../../src/main/window', () => ({
  hideWindow: jest.fn(),
  sendToRenderer: jest.fn(),
}));

jest.mock('../../src/main/tray', () => ({
  setCurrentLLM: jest.fn(),
  updateTrayMenu: jest.fn(),
}));

describe('IPC Handlers', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('setupIpcHandlers', () => {
    test('should register IPC event handlers', () => {
      setupIpcHandlers();

      expect(ipcMain.on).toHaveBeenCalledWith(
        'close-window',
        expect.any(Function)
      );
      expect(ipcMain.on).toHaveBeenCalledWith(
        'change-webview-src',
        expect.any(Function)
      );
    });
  });

  describe('change-webview-src handler', () => {
    test('should handle gemini app change request', () => {
      const { setCurrentLLM, updateTrayMenu } = require('../../src/main/tray');
      const { sendToRenderer } = require('../../src/main/window');

      setupIpcHandlers();

      // Get the handler function
      const changeHandler = ipcMain.on.mock.calls.find(
        call => call[0] === 'change-webview-src'
      )[1];

      // Simulate IPC event
      const mockEvent = {};
      changeHandler(mockEvent, 'gemini');

      expect(setCurrentLLM).toHaveBeenCalledWith(LLM_URLS.GEMINI);
      expect(sendToRenderer).toHaveBeenCalledWith(
        'change-webview-src',
        LLM_URLS.GEMINI
      );
      expect(updateTrayMenu).toHaveBeenCalled();
    });

    test('should handle notebooklm app change request', () => {
      const { setCurrentLLM, updateTrayMenu } = require('../../src/main/tray');
      const { sendToRenderer } = require('../../src/main/window');

      setupIpcHandlers();

      const changeHandler = ipcMain.on.mock.calls.find(
        call => call[0] === 'change-webview-src'
      )[1];

      const mockEvent = {};
      changeHandler(mockEvent, 'notebooklm');

      expect(setCurrentLLM).toHaveBeenCalledWith(LLM_URLS.NOTEBOOK_LLM);
      expect(sendToRenderer).toHaveBeenCalledWith(
        'change-webview-src',
        LLM_URLS.NOTEBOOK_LLM
      );
      expect(updateTrayMenu).toHaveBeenCalled();
    });

    test('should handle unknown app identifier gracefully', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      setupIpcHandlers();

      const changeHandler = ipcMain.on.mock.calls.find(
        call => call[0] === 'change-webview-src'
      )[1];

      const mockEvent = {};
      changeHandler(mockEvent, 'unknown-app');

      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('Unknown app identifier: unknown-app')
      );

      consoleSpy.mockRestore();
    });
  });
});
