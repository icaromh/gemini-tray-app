# Development Guide

## Project Structure

```
gemini-app/
├── src/
│   ├── main/                 # Main process modules
│   │   ├── main.js          # Application entry point
│   │   ├── window.js        # Window management
│   │   ├── tray.js          # System tray management
│   │   ├── ipc-handlers.js  # IPC communication handlers
│   │   └── app-state.js     # Application state management
│   ├── renderer/            # Renderer process files
│   │   ├── index.html       # Main HTML template
│   │   ├── styles.css       # Application styles
│   │   └── renderer.js      # Renderer process logic
│   ├── preload/             # Preload scripts
│   │   └── preload.js       # Security bridge between main and renderer
│   └── shared/              # Shared utilities and constants
│       └── constants.js     # Application constants
├── assets/                  # Static assets
│   ├── icons/
│   │   ├── app/            # Application icons
│   │   └── ui/             # UI element icons
│   └── images/             # Other images
├── docs/                   # Documentation
├── scripts/                # Build and utility scripts
└── dist/                   # Build output (generated)
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm start
```

### Building

```bash
npm run build
```

## Architecture

### Main Process (`src/main/`)

- **main.js**: Application entry point and coordination
- **window.js**: Browser window creation and management
- **tray.js**: System tray icon and menu management
- **ipc-handlers.js**: Inter-process communication handlers
- **app-state.js**: Global application state management

### Renderer Process (`src/renderer/`)

- **index.html**: Main application UI
- **styles.css**: CSS styles with glass-morphism effects
- **renderer.js**: UI interaction and webview management

### Preload (`src/preload/`)

- **preload.js**: Secure bridge between main and renderer processes

### Shared (`src/shared/`)

- **constants.js**: Application-wide constants and configuration

## Key Features

### UI Components

- Slide-out sidebar with app switcher buttons
- Glass-morphism effects with blur and transparency
- Hover animations and state management
- Responsive button interactions

### IPC Communication

- Bidirectional communication between main and renderer
- App switching via button clicks
- Window management via shortcuts

### System Integration

- Global keyboard shortcut (Option+Space on macOS, Alt+Space on Windows/Linux)
- System tray with context menu
- Auto-launch configuration
- Window hiding on blur

## Development Workflow

1. **Code Changes**: Edit files in the `src/` directory
2. **Testing**: Use `npm start` to test changes
3. **Building**: Use `npm run build` to create distributable
4. **Documentation**: Update relevant docs when adding features

## Debugging

### Main Process

Console logs appear in the terminal where you ran `npm start`.

### Renderer Process

Open Developer Tools in the Electron window to see renderer logs.

### IPC Communication

Both processes log IPC messages for debugging communication flow.

## Contributing

1. Follow the existing code structure and naming conventions
2. Add appropriate error handling and logging
3. Update documentation when adding new features
4. Test on multiple platforms when possible
