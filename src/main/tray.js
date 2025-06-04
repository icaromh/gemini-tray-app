/**
 * Tray Management Module
 * Handles system tray creation and menu management
 */

const { Tray, Menu, nativeImage, app } = require("electron");
const path = require("path");
const fs = require("fs");
const { ASSETS, LLM_URLS } = require("../shared/constants");
const { toggleWindowVisibility, hideWindow } = require("./window");

let tray = null;
let currentLLM = LLM_URLS.GEMINI;
let toggleLLMCallback = null;

/**
 * Creates and initializes the system tray
 * @param {Function} toggleLLMFn - Function to call when toggling LLM
 * @returns {Tray|null} The created tray instance
 */
function createTray(toggleLLMFn) {
  toggleLLMCallback = toggleLLMFn;
  const trayIconPath = path.join(__dirname, "../../assets/icons/app", ASSETS.TRAY_ICON);

  if (!fs.existsSync(trayIconPath)) {
    console.error(`[Tray Icon ERROR] Tray icon file not found at: ${trayIconPath}`);
    return null;
  }

  let icon = nativeImage.createFromPath(trayIconPath);

  // On macOS, use template image for better system integration
  if (process.platform === "darwin") {
    icon.setTemplateImage(true);
  }

  tray = new Tray(icon);
  tray.setToolTip("Gemini Quick Chat");
  updateTrayMenu();

  return tray;
}

/**
 * Updates the tray context menu based on the current LLM
 */
function updateTrayMenu() {
  if (!tray) return;

  const contextMenu = Menu.buildFromTemplate([
    { 
      label: "Show Window", 
      click: () => toggleWindowVisibility() 
    },
    { 
      label: "Hide Window", 
      click: () => hideWindow() 
    },
    { type: "separator" },
    {
      label: `Switch to ${currentLLM === LLM_URLS.GEMINI ? "Notebook LLM" : "Gemini"}`,
      click: () => {
        if (toggleLLMCallback) {
          toggleLLMCallback();
        }
      },
    },
    { type: "separator" },
    {
      label: "Quit",
      click: () => {
        app.quitting = true;
        app.quit();
      },
    },
  ]);

  tray.setContextMenu(contextMenu);
}

/**
 * Sets the current LLM and updates the tray menu
 * @param {string} newLLM - The new LLM URL
 */
function setCurrentLLM(newLLM) {
  currentLLM = newLLM;
  updateTrayMenu();
}

/**
 * Gets the current LLM
 * @returns {string} The current LLM URL
 */
function getCurrentLLM() {
  return currentLLM;
}

/**
 * Destroys the tray
 */
function destroyTray() {
  if (tray) {
    tray.destroy();
    tray = null;
  }
}

module.exports = {
  createTray,
  updateTrayMenu,
  setCurrentLLM,
  getCurrentLLM,
  destroyTray,
};
