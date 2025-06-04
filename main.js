const {
  app,
  BrowserWindow,
  globalShortcut,
  ipcMain,
  Tray,
  Menu,
  nativeImage,
} = require("electron");
const path = require("path");
const fs = require("fs");

let mainWindow;
let tray;

// Define the URLs for the different LLMs
const LLM_URLS = {
  GEMINI: "https://gemini.google.com/app",
  NOTEBOOK_LLM: "https://notebooklm.google.com/", // Placeholder for Google Notebook LLM
};

let currentLLM = LLM_URLS.GEMINI; // Initial LLM is Gemini

/**
 * Creates the main application window.
 */
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1120,
    height: 600,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    show: false,
    skipTaskbar: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
      webviewTag: true,
    },
  });

  // Load the initial LLM URL
  mainWindow.loadFile("index.html");

  mainWindow.once("ready-to-show", () => {
    // No need to show it immediately, it will be shown by the shortcut
  });

  mainWindow.on("close", (event) => {
    if (app.quitting) {
      mainWindow = null;
    } else {
      event.preventDefault();
      mainWindow.hide();
    }
  });

  mainWindow.on("blur", () => {
    if (!mainWindow.webContents.isDevToolsOpened()) {
      mainWindow.hide();
    }
  });
}

/**
 * Toggles the visibility of the main window.
 * If the window is hidden, it shows it and focuses the input.
 * If the window is visible, it hides it.
 */
function toggleWindowVisibility() {
  if (mainWindow.isVisible()) {
    mainWindow.hide();
  } else {
    const { screen } = require("electron");
    const primaryDisplay = screen.getPrimaryDisplay();
    const { width, height } = primaryDisplay.workAreaSize;

    const windowWidth = mainWindow.getSize()[0];
    const windowHeight = mainWindow.getSize()[1];

    const x = Math.round((width - windowWidth) / 2);
    const y = Math.round((height - windowHeight) / 2);

    mainWindow.setPosition(x, y);
    mainWindow.show();
    mainWindow.focus();
    // Send a message to the renderer to focus the input field within the webview
    mainWindow.webContents.send("focus-webview-input");
  }
}

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

/**
 * Toggles between Gemini and Google Notebook LLM.
 * Sends an IPC message to the renderer to update the webview.
 */
function toggleLLM() {
  currentLLM =
    currentLLM === LLM_URLS.GEMINI ? LLM_URLS.NOTEBOOK_LLM : LLM_URLS.GEMINI;

  if (mainWindow) {
    mainWindow.webContents.send("change-webview-src", currentLLM);
  }
  // Update tray menu to reflect current LLM
  updateTrayMenu();
}

/**
 * Updates the tray context menu based on the current LLM.
 */
function updateTrayMenu() {
  const contextMenu = Menu.buildFromTemplate([
    { label: "Show Window", click: () => toggleWindowVisibility() },
    { label: "Hide Window", click: () => mainWindow.hide() },
    { type: "separator" },
    {
      label: `Switch to ${
        currentLLM === LLM_URLS.GEMINI ? "Notebook LLM" : "Gemini"
      }`,
      click: () => toggleLLM(),
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
  if (tray) {
    tray.setContextMenu(contextMenu);
  }
}

// Event listener for when the Electron app is ready
app.on("ready", () => {
  createWindow();

  setupAutoLaunch();

  const trayIconFileName = "trayIcon.png";
  const trayIconPath = path.join(__dirname, "build/icons", trayIconFileName);

  if (!fs.existsSync(trayIconPath)) {
    console.error(
      `[Tray Icon ERROR] Tray icon file not found at: ${trayIconPath}`
    );
  } else {
    let icon = nativeImage.createFromPath(trayIconPath);

    if (process.platform === "darwin") {
      icon.setTemplateImage(true);
    }

    tray = new Tray(icon);
    tray.setToolTip("Gemini Quick Chat");
    updateTrayMenu(); // Initial tray menu setup
  }

  if (process.platform === "darwin") {
    app.dock.hide();
  }

  const shortcut = process.platform === "darwin" ? "Option+Space" : "Alt+Space";

  const registered = globalShortcut.register(shortcut, () => {
    toggleWindowVisibility();
  });

  if (!registered) {
    console.error(`Failed to register global shortcut: ${shortcut}`);
  }

  ipcMain.on("close-window", () => {
    if (mainWindow) {
      mainWindow.hide();
    }
  });

  // NEW: Handle webview src change from renderer
  ipcMain.on("change-webview-src", (event, app) => {
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

    // Update currentLLM
    currentLLM = newUrl;

    // Send the URL to the renderer
    if (mainWindow) {
      mainWindow.webContents.send("change-webview-src", currentLLM);
    }

    // Update tray menu to reflect current LLM
    updateTrayMenu();
  });
});

app.on("window-all-closed", () => {
  // Do nothing here to keep the app running in the tray
});

app.on("activate", () => {
  if (mainWindow) {
    toggleWindowVisibility();
  }
});

app.on("will-quit", () => {
  globalShortcut.unregisterAll();
  if (tray) {
    tray.destroy();
  }
});
