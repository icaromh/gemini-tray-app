# Changelog

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
