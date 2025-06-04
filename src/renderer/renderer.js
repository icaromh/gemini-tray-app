/**
 * Gemini Quick Chat - Renderer Process JavaScript
 * Handles UI interactions and webview management
 */

// Initialize button event listeners
(() => {
  const buttons = document.querySelectorAll("button[data-app]");
  buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const app = event.currentTarget.getAttribute("data-app");
      console.log(`[Button Click] App selected: ${app}`);

      // Update selected state
      buttons.forEach((btn) => btn.classList.remove("selected"));
      event.currentTarget.classList.add("selected");

      // Send message to main process to change webview src
      window.electronAPI.changeWebviewSrc(app);
    });
  });
})();

const geminiWebview = document.getElementById("geminiWebview");

/**
 * Function to be triggered when the webview's page changes (in-page navigation).
 * @param {string} newUrl - The new URL after the navigation.
 */
function onGeminiPageChange(newUrl) {
  console.log(`[Webview Navigation] Page changed to: ${newUrl}`);
  // Trigger scroll to bottom after a short delay to allow content to render
  // Only attempt to scroll if the current URL is Gemini's chat interface
  if (newUrl.startsWith("https://gemini.google.com/app")) {
    setTimeout(scrollGeminiChatToBottom, 500); // 500ms delay
  }
}

// Listen for 'change-webview-src' message from the main process
window.electronAPI.onChangeWebviewSrc((event, newSrc) => {
  console.log(
    `[Webview SRC Change] Changing webview source to: ${newSrc}`
  );
  geminiWebview.src = newSrc;

  // Update button selection based on the new source
  const buttons = document.querySelectorAll("button[data-app]");
  buttons.forEach((btn) => btn.classList.remove("selected"));

  if (newSrc.includes("gemini.google.com")) {
    document
      .querySelector('button[data-app="gemini"]')
      .classList.add("selected");
  } else if (newSrc.includes("notebooklm.google.com")) {
    document
      .querySelector('button[data-app="notebooklm"]')
      .classList.add("selected");
  }

  // After changing src, you might want to re-focus or re-scroll after it loads
  geminiWebview.addEventListener("did-finish-load", function handler() {
    console.log(
      `[Webview SRC Change] New source finished loading: ${newSrc}`
    );

    // Remove the listener to prevent multiple calls
    geminiWebview.removeEventListener("did-finish-load", handler);
  });
});

// Handle webview's 'did-fail-load' event
geminiWebview.addEventListener("did-fail-load", (event) => {
  console.error(
    "Webview failed to load:",
    event.errorCode,
    event.errorDescription,
    event.validatedURL
  );
});

// Listen for 'did-navigate-in-page' event (for SPA internal navigation)
geminiWebview.addEventListener("did-navigate-in-page", (event) => {
  onGeminiPageChange(event.url);
});

// Focus the webview when the window loads
geminiWebview.focus();
