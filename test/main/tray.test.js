const {
  createTray,
  updateTrayMenu,
  setCurrentLLM,
  getCurrentLLM,
} = require('../../src/main/tray');
const { Tray, Menu } = require('electron');
const { LLM_URLS } = require('../../src/shared/constants');

describe('Tray Management', () => {
  let mockToggleLLM;

  beforeEach(() => {
    jest.clearAllMocks();
    mockToggleLLM = jest.fn();
  });

  describe('createTray', () => {
    test('should create a Tray instance', () => {
      const mockTray = {
        setToolTip: jest.fn(),
        setContextMenu: jest.fn(),
      };
      Tray.mockReturnValue(mockTray);

      createTray(mockToggleLLM);

      expect(Tray).toHaveBeenCalled();
      expect(mockTray.setToolTip).toHaveBeenCalledWith('Gemini Quick Chat');
    });

    test('should handle missing tray icon file gracefully', () => {
      // Test when icon file doesn't exist
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      // Import fs and temporarily mock existsSync to return false
      const fs = require('fs');
      const originalExistsSync = fs.existsSync;
      fs.existsSync = jest.fn().mockReturnValue(false);

      // Clear the module cache to force re-require
      jest.resetModules();

      // Re-require the createTray function to use the new mock
      const { createTray: freshCreateTray } = require('../../src/main/tray');
      const result = freshCreateTray(mockToggleLLM);

      expect(result).toBeNull();
      expect(consoleSpy).toHaveBeenCalled();

      // Restore original function
      fs.existsSync = originalExistsSync;
      consoleSpy.mockRestore();
    });
  });

  describe('setCurrentLLM', () => {
    test('should update current LLM and trigger menu update', () => {
      setCurrentLLM(LLM_URLS.NOTEBOOK_LLM);

      expect(getCurrentLLM()).toBe(LLM_URLS.NOTEBOOK_LLM);
    });
  });

  describe('updateTrayMenu', () => {
    test('should build context menu with correct options', () => {
      const mockMenu = {};
      Menu.buildFromTemplate.mockReturnValue(mockMenu);

      updateTrayMenu();

      expect(Menu.buildFromTemplate).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({ label: 'Show Window' }),
          expect.objectContaining({ label: 'Hide Window' }),
          expect.objectContaining({ type: 'separator' }),
          expect.objectContaining({
            label: expect.stringContaining('Switch to'),
          }),
          expect.objectContaining({ type: 'separator' }),
          expect.objectContaining({ label: 'Quit' }),
        ])
      );
    });
  });
});
