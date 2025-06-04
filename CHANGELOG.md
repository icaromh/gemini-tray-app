# Changelog

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
