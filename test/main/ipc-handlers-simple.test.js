// Simple test for IPC handlers with inline mocks
describe('IPC Handlers', () => {
  let mockIpcMain;
  let mockHideWindow;
  let mockSendToRenderer;
  let mockSetCurrentLLM;
  let mockUpdateTrayMenu;

  beforeEach(() => {
    // Create fresh mocks for each test
    mockIpcMain = {
      on: jest.fn(),
      once: jest.fn(),
      handle: jest.fn(),
    };

    mockHideWindow = jest.fn();
    mockSendToRenderer = jest.fn();
    mockSetCurrentLLM = jest.fn();
    mockUpdateTrayMenu = jest.fn();

    // Mock modules
    jest.doMock('electron', () => ({ ipcMain: mockIpcMain }));
    jest.doMock('../../src/main/window', () => ({
      hideWindow: mockHideWindow,
      sendToRenderer: mockSendToRenderer,
    }));
    jest.doMock('../../src/main/tray', () => ({
      setCurrentLLM: mockSetCurrentLLM,
      updateTrayMenu: mockUpdateTrayMenu,
    }));
  });

  afterEach(() => {
    jest.resetModules();
  });

  test('should register IPC event handlers', () => {
    const { setupIpcHandlers } = require('../../src/main/ipc-handlers');

    setupIpcHandlers();

    expect(mockIpcMain.on).toHaveBeenCalledWith(
      'close-window',
      expect.any(Function)
    );
    expect(mockIpcMain.on).toHaveBeenCalledWith(
      'change-webview-src',
      expect.any(Function)
    );
  });

  test('should handle gemini app change request', () => {
    const { setupIpcHandlers } = require('../../src/main/ipc-handlers');
    const { LLM_URLS } = require('../../src/shared/constants');

    setupIpcHandlers();

    // Get the handler function
    const changeHandler = mockIpcMain.on.mock.calls.find(
      call => call[0] === 'change-webview-src'
    )[1];

    // Simulate IPC event
    const mockEvent = {};
    changeHandler(mockEvent, 'gemini');

    expect(mockSetCurrentLLM).toHaveBeenCalledWith(LLM_URLS.GEMINI);
    expect(mockSendToRenderer).toHaveBeenCalledWith(
      'change-webview-src',
      LLM_URLS.GEMINI
    );
    expect(mockUpdateTrayMenu).toHaveBeenCalled();
  });

  test('should handle notebooklm app change request', () => {
    const { setupIpcHandlers } = require('../../src/main/ipc-handlers');
    const { LLM_URLS } = require('../../src/shared/constants');

    setupIpcHandlers();

    const changeHandler = mockIpcMain.on.mock.calls.find(
      call => call[0] === 'change-webview-src'
    )[1];

    const mockEvent = {};
    changeHandler(mockEvent, 'notebooklm');

    expect(mockSetCurrentLLM).toHaveBeenCalledWith(LLM_URLS.NOTEBOOK_LLM);
    expect(mockSendToRenderer).toHaveBeenCalledWith(
      'change-webview-src',
      LLM_URLS.NOTEBOOK_LLM
    );
    expect(mockUpdateTrayMenu).toHaveBeenCalled();
  });
});
