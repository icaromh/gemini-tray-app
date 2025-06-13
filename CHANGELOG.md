# Changelog

## 1.7.0

### ✨ New Features

- **Default Language Setting**: Set default Electron language to pt-BR for localized user experience

### 🔧 Technical Improvements

- **AI Instructions Update**: Enhanced guidelines for changelog generation and release process

## 1.6.0

### 🧪 Comprehensive Testing Infrastructure

- **Jest Testing Framework**: Multi-project configuration with separate environments
  - Main process testing with comprehensive Electron API mocks
  - Renderer process testing with JSDOM environment
  - Integration testing for full app workflow validation
  - Coverage reporting and watch mode capabilities
- **Extensive Mocking System**: Complete Electron API mock suite
  - BrowserWindow, Tray, Menu, and IPC communication mocks
  - Event simulation and state management for realistic testing
  - Comprehensive test utilities and helper functions
- **Test Suite Structure**: Complete testing coverage setup
  - Unit tests for window management, tray functionality, and IPC handlers
  - Renderer process UI component testing
  - Integration tests for complete application workflows
  - E2E test structure using Spectron for end-to-end validation
- **Performance Testing**: Infrastructure for monitoring app performance
  - Startup time monitoring and memory usage tracking
  - CPU performance metrics and responsiveness testing
  - Automated performance regression detection
- **Testing Documentation**: Comprehensive guides and best practices
  - Setup instructions for different testing scenarios
  - Manual testing checklist for UI/UX and system integration
  - Platform-specific testing guidelines and workflows
- **Development Tooling**: Enhanced development experience
  - Test scripts for different testing types (`test`, `test:watch`, `test:coverage`)
  - ESLint Jest environment support for proper code validation
  - Automated test running with pre-commit hooks integration

### ⬆️ Dependency Updates

- **Electron**: Updated from v29.0.0 to v36.4.0 - Latest stable release with performance improvements and security updates
- **Electron Builder**: Updated from v24.9.1 to v26.0.12 - Enhanced build capabilities and bug fixes
- **Prettier**: Updated from v3.0.0 to v3.5.3 - Latest formatting improvements and language support
- **ESLint**: Updated from v8.45.0 to v8.57.1 - Latest linting rules and JavaScript support
- **Lint-staged**: Updated from v13.2.3 to v13.3.0 - Improved pre-commit hook performance
- **Testing Dependencies**: Added Jest v29.7.0, Playwright v1.53.0, and Spectron v15.0.0

## 1.5.0

### 🛠️ Development Health & Quality

- **Pre-commit Hooks**: Added Husky with automatic code formatting and linting
- **Code Quality Tools**: Integrated ESLint and Prettier with pre-commit validation
- **Commit Message Validation**: Enforced conventional commit format standards
- **Development Scripts**: Enhanced `scripts/dev.sh` with working implementations

### 🔧 Code Optimization

- **Dead Code Cleanup**: Removed ~50+ lines of unused functions and empty event handlers
- **Placeholder Functions**: Replaced non-functional placeholders with working npm script implementations
- **API Cleanup**: Removed unused IPC communication channels and state management functions
- **Code Standards**: Fixed ESLint violations and improved code consistency

### 📚 Documentation & User Experience

- **Comprehensive README**: Complete project documentation with installation and usage guides
- **Visual Documentation**: Added application screenshot to showcase the interface
- **Architecture Guide**: Detailed technical documentation for developers
- **Contributing Guidelines**: Clear workflow for development and contributions

### 🎨 CSS Architecture Modernization

- **Tailwind CSS Migration**: Refactored custom CSS to utility-first Tailwind classes
- **Code Reduction**: Reduced CSS from 120+ lines to 19 lines of essential styles
- **Maintainability**: Improved styling consistency and future development speed
- **Visual Preservation**: Maintained all glass-morphism effects and animations

### 🔧 Technical Improvements

- **Modular Styling**: Better separation of concerns between layout and component styles
- **Performance**: Reduced CSS bundle size and improved load times
- **Development Workflow**: Enhanced development experience with automated quality checks

## 1.4.0

### 🏗️ Repository Restructuring

- **Modular Architecture**: Completely restructured codebase into organized modules
  - `src/main/`: Main process modules (window.js, tray.js, ipc-handlers.js, app-state.js)
  - `src/renderer/`: Renderer process files (HTML, CSS, JS separated)
  - `src/preload/`: Security preload scripts
  - `src/shared/`: Shared utilities and constants
- **Asset Organization**: Moved all assets to structured `assets/` directory
  - `assets/icons/app/`: Application icons for builds
  - `assets/icons/ui/`: UI element icons
- **Documentation**: Added comprehensive development documentation
  - `docs/DEVELOPMENT.md`: Development guide and project structure
  - `docs/ARCHITECTURE.md`: Detailed architecture documentation
- **Development Tools**: Enhanced development workflow
  - `scripts/dev.sh`: Development utility script with multiple commands
  - Updated build configuration for new structure

### 🔧 Technical Improvements

- **Separated Concerns**: Extracted CSS and JavaScript from HTML into dedicated files
- **Eliminated Circular Dependencies**: Refactored module imports for better maintainability
- **Improved Error Handling**: Fixed import issues and improved module communication
- **Build Optimization**: Updated electron-builder configuration for new file structure
- **Path Management**: Centralized all asset and file paths in shared constants

### 📚 Documentation

- **Development Guide**: Complete setup and workflow documentation
- **Architecture Overview**: Detailed system design and data flow diagrams
- **Code Organization**: Clear module responsibilities and interaction patterns

## 1.3.0

### ✨ New Features

- **Interactive App Switcher UI**: Added sleek slide-out button panel for switching between Gemini and NotebookLM
- **Visual App Selection**: Buttons now show selected state with purple glow and hover effects
- **Auto-hiding Interface**: Sidebar starts as 10px strip and expands to 80px on hover with smooth animations
- **Enhanced IPC Communication**: Added bidirectional communication for app switching from UI buttons

### 🎨 UI/UX Improvements

- **Modern Button Design**: Glass-morphism effects with backdrop blur and subtle shadows
- **Smooth Animations**: 0.3s transitions for all interactions and state changes
- **Responsive Hover States**: Buttons lift and glow on hover with icon scaling
- **Visual State Sync**: Button selection automatically syncs when switching apps via tray menu
- **Overlay Layout**: Sidebar overlays webview content without affecting layout

### 🔧 Technical Improvements

- **Cleaned up JavaScript**: Removed unused scroll and focus functions
- **Enhanced Event Handling**: Better management of webview events and state updates
- **Static Assets**: Added app icons (gemini.png, notebooklm.svg) for button imagery
- **Improved Code Organization**: Better separation of concerns between main, preload, and renderer

### 🐛 Bug Fixes

- **Removed Tray Click Handler**: Eliminated redundant tray click behavior
- **Better State Management**: Fixed app switching synchronization between UI and main process

## 1.2.0

- Add ability to switch between NotebookLLM and Gemini

# 1.0.0

Release
