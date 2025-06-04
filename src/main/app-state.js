/**
 * Application State Management Module
 * Manages global application state and LLM switching
 */

const { LLM_URLS } = require("../shared/constants");
const { sendToRenderer } = require("./window");
const { setCurrentLLM, updateTrayMenu } = require("./tray");

let currentLLM = LLM_URLS.GEMINI; // Initial LLM is Gemini

/**
 * Toggles between Gemini and Google Notebook LLM
 * Sends an IPC message to the renderer to update the webview
 */
function toggleLLM() {
  currentLLM = currentLLM === LLM_URLS.GEMINI ? LLM_URLS.NOTEBOOK_LLM : LLM_URLS.GEMINI;

  // Update tray state
  setCurrentLLM(currentLLM);

  // Send message to renderer
  sendToRenderer("change-webview-src", currentLLM);

  // Update tray menu to reflect current LLM
  updateTrayMenu();
}

/**
 * Gets the current LLM URL
 * @returns {string} The current LLM URL
 */
function getCurrentLLM() {
  return currentLLM;
}

/**
 * Sets the current LLM URL
 * @param {string} newLLM - The new LLM URL
 */
function setCurrentLLMState(newLLM) {
  currentLLM = newLLM;
  setCurrentLLM(newLLM);
}

module.exports = {
  toggleLLM,
  getCurrentLLM,
  setCurrentLLMState,
};
