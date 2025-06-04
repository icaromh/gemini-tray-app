/**
 * Gemini Quick Chat - Main Process
 * Entry point for the Electron application
 */

const { app, globalShortcut } = require('electron');
const { SHORTCUTS } = require('../shared/constants');
const {
  createWindow,
  toggleWindowVisibility,
  getMainWindow,
} = require('./window');
const { createTray, destroyTray } = require('./tray');
const { setupIpcHandlers } = require('./ipc-handlers');
const { toggleLLM } = require('./app-state');

/**
 * Configures the application to start at system login for macOS.
 * This function uses Electron's app.setLoginItemSettings() to manage auto-launch.
 */
function setupAutoLaunch() {
  app.setLoginItemSettings({
    openAtLogin: true,
    hidden: true, // macOS specific: hides the app from the dock on launch
  });
}

// Event listener for when the Electron app is ready
app.on('ready', () => {
  createWindow();
  setupAutoLaunch();
  setupIpcHandlers();

  // Create system tray
  createTray(toggleLLM);

  // Hide dock on macOS
  if (process.platform === 'darwin') {
    app.dock.hide();
  }

  // Register global shortcut
  const registered = globalShortcut.register(SHORTCUTS.TOGGLE_WINDOW, () => {
    toggleWindowVisibility();
  });

  if (!registered) {
    console.error(
      `Failed to register global shortcut: ${SHORTCUTS.TOGGLE_WINDOW}`
    );
  }
});

app.on('window-all-closed', () => {
  // Do nothing here to keep the app running in the tray
});

app.on('activate', () => {
  const mainWindow = getMainWindow();
  if (mainWindow) {
    toggleWindowVisibility();
  }
});

app.on('will-quit', () => {
  globalShortcut.unregisterAll();
  destroyTray();
});
