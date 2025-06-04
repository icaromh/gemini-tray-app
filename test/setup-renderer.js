/**
 * Jest setup for Renderer Process tests
 * Configures the testing environment for Electron renderer process modules
 */

// Mock electron module first - inline to avoid circular dependency
jest.mock(
  'electron',
  () => ({
    ipcRenderer: {
      on: jest.fn(),
      off: jest.fn(),
      once: jest.fn(),
      removeListener: jest.fn(),
      removeAllListeners: jest.fn(),
      send: jest.fn(),
      sendSync: jest.fn().mockReturnValue(undefined),
      invoke: jest.fn().mockResolvedValue(undefined),
      emit: jest.fn(),
      sendTo: jest.fn(),
      sendToHost: jest.fn(),
    },
    contextBridge: {
      exposeInMainWorld: jest.fn(),
    },
  }),
  { virtual: true }
);

// Mock the electronAPI that would be exposed by the preload script
Object.defineProperty(window, 'electronAPI', {
  value: {
    changeWebviewSrc: jest.fn(),
    closeWindow: jest.fn(),
    onWebviewChange: jest.fn(),
    removeAllListeners: jest.fn(),
  },
  writable: true,
  configurable: true,
});
