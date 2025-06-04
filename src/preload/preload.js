const { contextBridge, ipcRenderer } = require('electron');

// Expose a limited set of IPC methods and webview interaction methods to the renderer process
contextBridge.exposeInMainWorld('electronAPI', {
  /**
   * Sends a message to the main process to close the window.
   */
  closeWindow: () => ipcRenderer.send('close-window'),
  /**
   * Listens for a message from the main process to change the webview's src.
   * @param {function} callback - The function to call with the new URL.
   */
  onChangeWebviewSrc: callback =>
    ipcRenderer.on('change-webview-src', callback),

  /**
   * Sends a message to the main process to change the webview's src.
   * @param {string} app - The app identifier (gemini or notebooklm).
   */
  changeWebviewSrc: app => ipcRenderer.send('change-webview-src', app),
});
