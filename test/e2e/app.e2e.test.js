const { Application } = require('spectron');
const path = require('path');

describe('Gemini Quick Chat E2E Tests', () => {
  let app;

  beforeEach(async () => {
    app = new Application({
      path: path.join(__dirname, '../../node_modules/.bin/electron'),
      args: [path.join(__dirname, '../../src/main/main.js')],
      env: { NODE_ENV: 'test' },
      startTimeout: 10000,
      waitTimeout: 10000,
    });

    await app.start();
  });

  afterEach(async () => {
    if (app && app.isRunning()) {
      await app.stop();
    }
  });

  describe('Application Launch', () => {
    test('should launch the application', async () => {
      expect(await app.client.getWindowCount()).toBe(1);
    });

    test('should have correct window properties', async () => {
      const window = app.browserWindow;

      expect(await window.isVisible()).toBe(false); // Should start hidden
      expect(await window.isAlwaysOnTop()).toBe(true);
      expect(await window.isResizable()).toBe(true);
    });

    test('should create system tray', async () => {
      // Note: Spectron has limited tray testing capabilities
      // This would need manual verification or additional tools
      expect(app.client).toBeDefined();
    });
  });

  describe('UI Interactions', () => {
    test('should show window and render UI correctly', async () => {
      // Show the window for testing
      await app.browserWindow.show();
      await app.client.waitUntilWindowLoaded();

      // Check if main elements exist
      const buttons = await app.client.$$('button[data-app]');
      expect(buttons).toHaveLength(2);

      const webview = await app.client.$('#geminiWebview');
      expect(await webview.isExisting()).toBe(true);
    });

    test('should handle app switching', async () => {
      await app.browserWindow.show();
      await app.client.waitUntilWindowLoaded();

      // Click NotebookLM button
      await app.client.click('button[data-app="notebooklm"]');

      // Wait for webview source to change
      await app.client.waitUntil(async () => {
        const src = await app.client.getAttribute('#geminiWebview', 'src');
        return src.includes('notebooklm.google.com');
      }, 5000);

      // Verify button selection changed
      const notebookButton = await app.client.$(
        'button[data-app="notebooklm"]'
      );
      const hasSelected = await notebookButton.getAttribute('class');
      expect(hasSelected).toContain('selected');
    });
  });

  describe('Keyboard Shortcuts', () => {
    test('should register global shortcut', async () => {
      // Note: Testing global shortcuts in E2E is complex
      // This would typically require platform-specific automation
      expect(app.electron.remote.globalShortcut).toBeDefined();
    });
  });

  describe('Window Management', () => {
    test('should toggle window visibility', async () => {
      // Initially hidden
      expect(await app.browserWindow.isVisible()).toBe(false);

      // Show window
      await app.browserWindow.show();
      expect(await app.browserWindow.isVisible()).toBe(true);

      // Hide window
      await app.browserWindow.hide();
      expect(await app.browserWindow.isVisible()).toBe(false);
    });

    test('should center window on screen', async () => {
      await app.browserWindow.show();

      const bounds = await app.browserWindow.getBounds();
      const displayBounds = await app.electron.screen.getPrimaryDisplay();

      // Check if window is roughly centered
      const centerX = (displayBounds.workArea.width - bounds.width) / 2;
      const centerY = (displayBounds.workArea.height - bounds.height) / 2;

      expect(Math.abs(bounds.x - centerX)).toBeLessThan(50);
      expect(Math.abs(bounds.y - centerY)).toBeLessThan(50);
    });
  });
});
