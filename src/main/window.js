/**
 * Window Management Module
 * Handles creation and management of the main application window
 */

const { BrowserWindow, screen } = require('electron');
const path = require('path');
const { WINDOW_CONFIG, ASSETS } = require('../shared/constants');

let mainWindow = null;

/**
 * Creates the main application window.
 * @returns {BrowserWindow} The created window instance
 */
function createWindow() {
  mainWindow = new BrowserWindow({
    ...WINDOW_CONFIG,
    webPreferences: {
      preload: path.join(__dirname, ASSETS.PRELOAD_SCRIPT),
      contextIsolation: true,
      nodeIntegration: false,
      webviewTag: true,
    },
  });

  // Load the renderer HTML
  mainWindow.loadFile(path.join(__dirname, ASSETS.RENDERER_HTML));

  mainWindow.once('ready-to-show', () => {
    // Window will be shown by the shortcut, not immediately
  });

  setupWindowEventHandlers();

  return mainWindow;
}

/**
 * Sets up event handlers for the main window
 */
function setupWindowEventHandlers() {
  if (!mainWindow) return;

  mainWindow.on('close', event => {
    const { app } = require('electron');
    if (app.quitting) {
      mainWindow = null;
    } else {
      event.preventDefault();
      mainWindow.hide();
    }
  });

  mainWindow.on('blur', () => {
    if (!mainWindow.webContents.isDevToolsOpened()) {
      mainWindow.hide();
    }
  });
}

/**
 * Toggles the visibility of the main window.
 * Centers the window on screen when showing.
 */
function toggleWindowVisibility() {
  if (!mainWindow) return;

  if (mainWindow.isVisible()) {
    mainWindow.hide();
  } else {
    centerWindow();
    mainWindow.show();
    mainWindow.focus();
    // Send a message to the renderer to focus the input field within the webview
    mainWindow.webContents.send('focus-webview-input');
  }
}

/**
 * Centers the window on the primary display
 */
function centerWindow() {
  if (!mainWindow) return;

  const primaryDisplay = screen.getPrimaryDisplay();
  const { width, height } = primaryDisplay.workAreaSize;

  const [windowWidth, windowHeight] = mainWindow.getSize();
  const x = Math.round((width - windowWidth) / 2);
  const y = Math.round((height - windowHeight) / 2);

  mainWindow.setPosition(x, y);
}

/**
 * Gets the main window instance
 * @returns {BrowserWindow|null} The main window instance
 */
function getMainWindow() {
  return mainWindow;
}

/**
 * Hides the main window
 */
function hideWindow() {
  if (mainWindow) {
    mainWindow.hide();
  }
}

/**
 * Sends a message to the renderer process
 * @param {string} channel - The IPC channel
 * @param {any} data - The data to send
 */
function sendToRenderer(channel, data) {
  if (mainWindow) {
    mainWindow.webContents.send(channel, data);
  }
}

module.exports = {
  createWindow,
  toggleWindowVisibility,
  getMainWindow,
  hideWindow,
  sendToRenderer,
};
