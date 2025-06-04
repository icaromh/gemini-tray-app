# Testing Guide for Gemini Quick Chat

## 🧪 Test Suite Overview

This Electron application has a comprehensive testing strategy covering multiple levels:

- **Unit Tests**: Individual module testing (Jest)
- **Integration Tests**: Module interaction testing (Jest)
- **E2E Tests**: Full application testing (Spectron)
- **Manual Tests**: UI/UX and system integration (Checklist)
- **Performance Tests**: Startup, memory, and responsiveness

## 🚀 Quick Start

### Install Dependencies

```bash
npm install
```

### Run All Tests

```bash
npm test
```

### Run Specific Test Types

```bash
# Unit tests only
npm run test:main        # Main process tests
npm run test:renderer    # Renderer process tests

# Watch mode for development
npm run test:watch

# Coverage report
npm run test:coverage

# E2E tests
npm run test:e2e

# Performance tests
node test/performance.js
```

## 📁 Test Structure

```
test/
├── setup.js                    # Jest configuration and mocks
├── utils.js                    # Test utilities and helpers
├── MANUAL_TESTING_CHECKLIST.md # Manual testing checklist
├── performance.js              # Performance testing script
├── main/                       # Main process unit tests
│   ├── window.test.js
│   ├── tray.test.js
│   └── ipc-handlers.test.js
├── renderer/                   # Renderer process unit tests
│   └── renderer.test.js
├── integration/                # Integration tests
│   └── app.test.js
├── e2e/                       # End-to-end tests
│   └── app.e2e.test.js
└── fixtures/                  # Test data and mocks
```

## 🔧 Test Categories

### Unit Tests

**Main Process Tests** (`test/main/`)

- Window management functionality
- System tray behavior
- IPC communication handlers
- Application state management

**Renderer Process Tests** (`test/renderer/`)

- UI interactions and events
- Button click handling
- Webview management
- DOM manipulation

### Integration Tests

**App Integration** (`test/integration/`)

- Complete IPC communication flow
- Main process ↔ Renderer process interaction
- State synchronization between modules
- Tray ↔ Window integration

### E2E Tests

**Full Application Testing** (`test/e2e/`)

- Application launch and initialization
- Global keyboard shortcuts
- Window visibility toggling
- App switching functionality
- System tray integration

### Performance Tests

**Performance Metrics** (`test/performance.js`)

- Application startup time
- Memory usage monitoring
- CPU usage analysis
- UI responsiveness

### Manual Tests

**Manual Testing Checklist** (`test/MANUAL_TESTING_CHECKLIST.md`)

- Complete UI/UX testing checklist
- Platform-specific testing
- Edge cases and error handling
- Security and stability testing

## 🧩 Mock Setup

### Electron API Mocking

All Electron APIs are mocked in `test/setup.js`:

```javascript
// Automatically mocked:
- app (lifecycle events)
- BrowserWindow (window management)
- Tray (system tray)
- globalShortcut (keyboard shortcuts)
- ipcMain/ipcRenderer (IPC communication)
- Menu (context menus)
```

### Test Utilities

Common utilities available in `test/utils.js`:

```javascript
-createMockBrowserWindow() -
  createMockTray() -
  createMockIpcEvent() -
  waitFor(condition, timeout) -
  simulateEvent(element, type) -
  mockFileSystem() -
  setupTestEnvironment();
```

## 📊 Coverage Goals

| Component        | Target Coverage |
| ---------------- | --------------- |
| Main Process     | > 80%           |
| Renderer Process | > 75%           |
| Shared Modules   | > 90%           |
| Integration      | > 70%           |

## 🐛 Testing Best Practices

### Writing Tests

1. **Arrange, Act, Assert** pattern
2. **Descriptive test names** that explain what's being tested
3. **One assertion per test** when possible
4. **Mock external dependencies** appropriately
5. **Clean up after tests** (restore mocks, close windows)

### Example Test Structure

```javascript
describe('Component Name', () => {
  beforeEach(() => {
    // Setup mocks and test environment
  });

  afterEach(() => {
    // Cleanup
  });

  describe('specific functionality', () => {
    test('should do expected behavior when condition', () => {
      // Arrange
      const mockData = createTestData();

      // Act
      const result = functionUnderTest(mockData);

      // Assert
      expect(result).toBe(expectedValue);
    });
  });
});
```

## ⚡ Development Workflow

### TDD Workflow

1. **Write failing test** for new feature
2. **Implement minimum code** to make test pass
3. **Refactor** while keeping tests green
4. **Add more test cases** for edge cases

### Running Tests During Development

```bash
# Watch mode - runs tests automatically on file changes
npm run test:watch

# Focus on specific test file
npm test -- --testNamePattern="Window Management"

# Update snapshots (if using)
npm test -- --updateSnapshot
```

## 🔍 Debugging Tests

### Debug Jest Tests

```bash
# Run with debugger
node --inspect-brk node_modules/.bin/jest --runInBand

# Debug specific test
node --inspect-brk node_modules/.bin/jest --runInBand test/main/window.test.js
```

### Debug E2E Tests

```bash
# Run E2E tests with visible windows
SPECTRON_DEBUG=true npm run test:e2e
```

## 📈 Continuous Integration

### Pre-commit Hooks

Tests run automatically before commits via Husky:

```bash
# Runs automatically on git commit
- npm run lint
- npm run format:check
- npm test
```

### CI Pipeline Recommendations

```yaml
# Example GitHub Actions workflow
- Install dependencies
- Run linting
- Run unit tests
- Run integration tests
- Generate coverage report
- Run E2E tests (headless)
- Build application
```

## 🛠️ Platform-Specific Testing

### macOS Testing

- Global shortcuts (`Option+Space`)
- Dock hiding behavior
- System tray integration
- Auto-launch functionality

### Windows Testing

- Global shortcuts (`Alt+Space`)
- System tray behavior
- Window positioning

### Linux Testing

- Desktop environment compatibility
- System tray support
- Window management

## 📝 Writing New Tests

### Adding Unit Tests

1. Create test file in appropriate directory (`test/main/` or `test/renderer/`)
2. Import module under test
3. Mock dependencies using `test/setup.js` patterns
4. Write descriptive test cases

### Adding Integration Tests

1. Create test in `test/integration/`
2. Test interaction between multiple modules
3. Use real implementations where possible
4. Mock only external dependencies

### Adding E2E Tests

1. Create test in `test/e2e/`
2. Use Spectron for Electron app automation
3. Test user workflows end-to-end
4. Keep tests stable and reliable

## 🚨 Common Issues

### Test Flakiness

- **Use proper async/await** patterns
- **Add appropriate timeouts** for asynchronous operations
- **Mock time-dependent operations**
- **Avoid hardcoded delays**

### Memory Leaks in Tests

- **Clean up event listeners** in afterEach
- **Close windows and processes** properly
- **Reset global state** between tests

### Platform Differences

- **Use platform-specific conditionals** when needed
- **Mock platform-dependent APIs** appropriately
- **Test on target platforms** regularly

---

## 📞 Need Help?

- Check the `MANUAL_TESTING_CHECKLIST.md` for comprehensive testing scenarios
- Review existing tests for patterns and examples
- Use `test/utils.js` for common testing utilities
- Run `npm run test:coverage` to identify untested code
