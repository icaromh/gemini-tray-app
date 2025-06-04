/**
 * IPC Handlers Module
 * Manages Inter-Process Communication between main and renderer processes
 */

const { ipcMain } = require("electron");
const { LLM_URLS } = require("../shared/constants");
const { hideWindow, sendToRenderer } = require("./window");
const { setCurrentLLM, updateTrayMenu } = require("./tray");

/**
 * Sets up all IPC event handlers
 */
function setupIpcHandlers() {
  // Handle window close requests from renderer
  ipcMain.on("close-window", () => {
    hideWindow();
  });

  // Handle webview source change requests from renderer
  ipcMain.on("change-webview-src", handleWebviewSrcChange);
}

/**
 * Handles webview source change requests
 * @param {Electron.IpcMainEvent} event - The IPC event
 * @param {string} app - The app identifier (gemini|notebooklm)
 */
function handleWebviewSrcChange(event, app) {
  console.log(`[IPC] Received request to change to app: ${app}`);

  // Map app identifier to URL
  let newUrl;
  switch (app) {
    case "gemini":
      newUrl = LLM_URLS.GEMINI;
      break;
    case "notebooklm":
      newUrl = LLM_URLS.NOTEBOOK_LLM;
      break;
    default:
      console.error(`[IPC] Unknown app identifier: ${app}`);
      return;
  }

  // Update current LLM state
  setCurrentLLM(newUrl);

  // Send the URL to the renderer
  sendToRenderer("change-webview-src", newUrl);

  // Update tray menu to reflect current LLM
  updateTrayMenu();
}

module.exports = {
  setupIpcHandlers,
};
