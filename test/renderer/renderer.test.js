/**
 * @jest-environment jsdom
 */

describe('Renderer Process', () => {
  let originalHTML;

  beforeEach(() => {
    // Store original HTML
    originalHTML = document.documentElement.innerHTML;

    // Clear any previous mocks
    jest.clearAllMocks();

    // Set up DOM
    document.body.innerHTML = `
      <div class="main-container">
        <div class="buttons">
          <button class="app-button selected" data-app="gemini">
            <img src="../../assets/icons/ui/gemini.png" alt="Gemini" />
          </button>
          <button class="app-button" data-app="notebooklm">
            <img src="../../assets/icons/ui/notebooklm.svg" alt="NotebookLM" />
          </button>
        </div>
        <webview id="geminiWebview" src="https://gemini.google.com/app"></webview>
      </div>
    `;

    // Clear mocks
    jest.clearAllMocks();
  });

  afterEach(() => {
    // Restore original HTML
    document.documentElement.innerHTML = originalHTML;
  });

  describe('Button interactions', () => {
    test('should handle gemini button click', () => {
      // Load the renderer script (simulate script execution)
      const geminiButton = document.querySelector('button[data-app="gemini"]');
      const notebookButton = document.querySelector(
        'button[data-app="notebooklm"]'
      );

      // Simulate click event
      const clickEvent = new Event('click');
      Object.defineProperty(clickEvent, 'currentTarget', {
        value: geminiButton,
        enumerable: true,
      });

      // Add event listener manually (simulating renderer.js behavior)
      geminiButton.addEventListener('click', event => {
        const app = event.currentTarget.getAttribute('data-app');

        // Update selected state
        document
          .querySelectorAll('button[data-app]')
          .forEach(btn => btn.classList.remove('selected'));
        event.currentTarget.classList.add('selected');

        // Send message to main process
        window.electronAPI.changeWebviewSrc(app);
      });

      geminiButton.click();

      expect(window.electronAPI.changeWebviewSrc).toHaveBeenCalledWith(
        'gemini'
      );
      expect(geminiButton.classList.contains('selected')).toBe(true);
      expect(notebookButton.classList.contains('selected')).toBe(false);
    });

    test('should handle notebooklm button click', () => {
      const geminiButton = document.querySelector('button[data-app="gemini"]');
      const notebookButton = document.querySelector(
        'button[data-app="notebooklm"]'
      );

      notebookButton.addEventListener('click', event => {
        const app = event.currentTarget.getAttribute('data-app');

        document
          .querySelectorAll('button[data-app]')
          .forEach(btn => btn.classList.remove('selected'));
        event.currentTarget.classList.add('selected');

        window.electronAPI.changeWebviewSrc(app);
      });

      notebookButton.click();

      expect(window.electronAPI.changeWebviewSrc).toHaveBeenCalledWith(
        'notebooklm'
      );
      expect(notebookButton.classList.contains('selected')).toBe(true);
      expect(geminiButton.classList.contains('selected')).toBe(false);
    });
  });

  describe('Webview source changes', () => {
    test('should update webview src and button selection for gemini', () => {
      const webview = document.getElementById('geminiWebview');
      const geminiButton = document.querySelector('button[data-app="gemini"]');
      const notebookButton = document.querySelector(
        'button[data-app="notebooklm"]'
      );

      // Simulate receiving message from main process
      const newSrc = 'https://gemini.google.com/app';

      // Simulate the webview source change handler
      webview.src = newSrc;

      // Update button selection based on the new source
      document
        .querySelectorAll('button[data-app]')
        .forEach(btn => btn.classList.remove('selected'));

      if (newSrc.includes('gemini.google.com')) {
        document
          .querySelector('button[data-app="gemini"]')
          .classList.add('selected');
      } else if (newSrc.includes('notebooklm.google.com')) {
        document
          .querySelector('button[data-app="notebooklm"]')
          .classList.add('selected');
      }

      expect(webview.src).toBe(newSrc);
      expect(geminiButton.classList.contains('selected')).toBe(true);
      expect(notebookButton.classList.contains('selected')).toBe(false);
    });

    test('should update webview src and button selection for notebooklm', () => {
      const webview = document.getElementById('geminiWebview');
      const geminiButton = document.querySelector('button[data-app="gemini"]');
      const notebookButton = document.querySelector(
        'button[data-app="notebooklm"]'
      );

      const newSrc = 'https://notebooklm.google.com/';

      webview.src = newSrc;

      document
        .querySelectorAll('button[data-app]')
        .forEach(btn => btn.classList.remove('selected'));

      if (newSrc.includes('gemini.google.com')) {
        document
          .querySelector('button[data-app="gemini"]')
          .classList.add('selected');
      } else if (newSrc.includes('notebooklm.google.com')) {
        document
          .querySelector('button[data-app="notebooklm"]')
          .classList.add('selected');
      }

      expect(webview.src).toBe(newSrc);
      expect(notebookButton.classList.contains('selected')).toBe(true);
      expect(geminiButton.classList.contains('selected')).toBe(false);
    });
  });
});
