/**
 * Gemini Quick Chat - Renderer Process JavaScript
 * Handles UI interactions and webview management
 */

// Initialize button event listeners
(() => {
  const buttons = document.querySelectorAll('button[data-app]');
  buttons.forEach(button => {
    button.addEventListener('click', event => {
      const app = event.currentTarget.getAttribute('data-app');
      console.log(`[Button Click] App selected: ${app}`);

      // Update selected state
      buttons.forEach(btn => btn.classList.remove('selected'));
      event.currentTarget.classList.add('selected');

      // Send message to main process to change webview src
      window.electronAPI.changeWebviewSrc(app);
    });
  });
})();

const geminiWebview = document.getElementById('geminiWebview');

// Listen for 'change-webview-src' message from the main process
window.electronAPI.onChangeWebviewSrc((event, newSrc) => {
  console.log(`[Webview SRC Change] Changing webview source to: ${newSrc}`);
  geminiWebview.src = newSrc;

  // Update button selection based on the new source
  const buttons = document.querySelectorAll('button[data-app]');
  buttons.forEach(btn => btn.classList.remove('selected'));

  if (newSrc.includes('gemini.google.com')) {
    document
      .querySelector('button[data-app="gemini"]')
      .classList.add('selected');
  } else if (newSrc.includes('notebooklm.google.com')) {
    document
      .querySelector('button[data-app="notebooklm"]')
      .classList.add('selected');
  }
});

// Handle webview's 'did-fail-load' event
geminiWebview.addEventListener('did-fail-load', event => {
  console.error(
    'Webview failed to load:',
    event.errorCode,
    event.errorDescription,
    event.validatedURL
  );
});

// Focus the webview when the window loads
geminiWebview.focus();
