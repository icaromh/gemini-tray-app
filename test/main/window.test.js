const {
  createWindow,
  toggleWindowVisibility,
  sendToRenderer,
} = require('../../src/main/window');
const { BrowserWindow } = require('electron');

describe('Window Management', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createWindow', () => {
    test('should create a BrowserWindow with correct configuration', () => {
      createWindow();

      expect(BrowserWindow).toHaveBeenCalledWith(
        expect.objectContaining({
          width: 1120,
          height: 600,
          frame: false,
          transparent: true,
          alwaysOnTop: true,
          show: false,
          skipTaskbar: true,
        })
      );
    });

    test('should load the renderer HTML file', () => {
      const mockWindow = {
        loadFile: jest.fn(),
        once: jest.fn(),
        on: jest.fn(),
        webContents: { send: jest.fn() },
      };
      BrowserWindow.mockReturnValue(mockWindow);

      createWindow();

      expect(mockWindow.loadFile).toHaveBeenCalled();
    });
  });

  describe('toggleWindowVisibility', () => {
    test('should show window when hidden', () => {
      const mockWindow = {
        isVisible: jest.fn(() => false),
        show: jest.fn(),
        focus: jest.fn(),
        getSize: jest.fn(() => [1120, 600]),
        setPosition: jest.fn(),
      };
      BrowserWindow.mockReturnValue(mockWindow);

      createWindow();
      toggleWindowVisibility();

      expect(mockWindow.show).toHaveBeenCalled();
      expect(mockWindow.focus).toHaveBeenCalled();
    });

    test('should hide window when visible', () => {
      const mockWindow = {
        isVisible: jest.fn(() => true),
        hide: jest.fn(),
      };
      BrowserWindow.mockReturnValue(mockWindow);

      createWindow();
      toggleWindowVisibility();

      expect(mockWindow.hide).toHaveBeenCalled();
    });
  });

  describe('sendToRenderer', () => {
    test('should send message to renderer process', () => {
      const mockWindow = {
        webContents: {
          send: jest.fn(),
        },
        loadFile: jest.fn(),
        once: jest.fn(),
        on: jest.fn(),
      };
      BrowserWindow.mockReturnValue(mockWindow);

      createWindow();
      sendToRenderer('test-channel', 'test-data');

      expect(mockWindow.webContents.send).toHaveBeenCalledWith(
        'test-channel',
        'test-data'
      );
    });
  });
});
