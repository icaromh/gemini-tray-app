# Architecture Documentation

## Overview

Gemini Quick Chat is an Electron application that provides quick access to AI chat interfaces through a global keyboard shortcut. The application follows a modular architecture with clear separation of concerns.

## Technology Stack

- **Electron**: Cross-platform desktop application framework
- **Node.js**: Runtime environment for main process
- **HTML/CSS/JavaScript**: Frontend technologies for renderer process
- **Tailwind CSS**: Utility-first CSS framework (via CDN)

## Application Architecture

### Process Model

```
┌─────────────────┐    IPC     ┌──────────────────┐
│   Main Process  │ ◄────────► │ Renderer Process │
│                 │            │                  │
│ ├── Window Mgmt │            │ ├── UI Logic     │
│ ├── Tray        │            │ ├── Webview Mgmt │
│ ├── IPC         │            │ └── User Input   │
│ ├── State       │            │                  │
│ └── Shortcuts   │            └──────────────────┘
└─────────────────┘                     ▲
         ▲                               │
         │                    ┌─────────────────┐
         │                    │ Preload Script  │
         │                    │                 │
         │                    │ ├── API Bridge  │
         │                    │ └── Security    │
         │                    └─────────────────┘
         ▲
┌─────────────────┐
│ System Services │
│                 │
│ ├── Global Keys │
│ ├── Tray Icon   │
│ └── Auto Launch │
└─────────────────┘
```

## Module Breakdown

### Main Process Modules

#### 1. main.js (Entry Point)
- **Purpose**: Application initialization and coordination
- **Responsibilities**:
  - Set up Electron app lifecycle events
  - Initialize all other modules
  - Register global shortcuts
  - Configure auto-launch

#### 2. window.js (Window Management)
- **Purpose**: Browser window creation and management
- **Responsibilities**:
  - Create and configure main window
  - Handle window events (close, blur, focus)
  - Manage window visibility and positioning
  - Send messages to renderer process

#### 3. tray.js (System Tray)
- **Purpose**: System tray icon and menu management
- **Responsibilities**:
  - Create system tray icon
  - Build context menu dynamically
  - Handle tray interactions
  - Update menu based on app state

#### 4. ipc-handlers.js (IPC Communication)
- **Purpose**: Inter-process communication handling
- **Responsibilities**:
  - Set up IPC event listeners
  - Handle messages from renderer process
  - Coordinate between different modules
  - Validate and process IPC data

#### 5. app-state.js (State Management)
- **Purpose**: Global application state
- **Responsibilities**:
  - Manage current LLM selection
  - Handle state transitions
  - Coordinate state updates across modules
  - Provide state query methods

### Renderer Process

#### 1. index.html (UI Structure)
- **Purpose**: Application user interface
- **Features**:
  - Webview container for AI chat interfaces
  - Slide-out sidebar with app switcher
  - Clean, minimal design

#### 2. styles.css (Styling)
- **Purpose**: Visual design and animations
- **Features**:
  - Glass-morphism effects
  - Smooth transitions and animations
  - Responsive hover states
  - Modern UI design patterns

#### 3. renderer.js (UI Logic)
- **Purpose**: User interaction handling
- **Responsibilities**:
  - Button click handling
  - Webview management
  - IPC communication with main process
  - UI state management

### Shared Modules

#### 1. constants.js (Configuration)
- **Purpose**: Application-wide constants
- **Contains**:
  - LLM URLs
  - Window configuration
  - Keyboard shortcuts
  - Asset paths

### Preload Script

#### 1. preload.js (Security Bridge)
- **Purpose**: Secure communication bridge
- **Responsibilities**:
  - Expose safe APIs to renderer
  - Validate communication
  - Maintain security boundaries

## Data Flow

### App Switching Flow

```
1. User clicks app button (renderer)
   ↓
2. Button click handler (renderer.js)
   ↓
3. IPC message to main process
   ↓
4. IPC handler processes request (ipc-handlers.js)
   ↓
5. Update app state (app-state.js)
   ↓
6. Update tray menu (tray.js)
   ↓
7. Send new URL to renderer
   ↓
8. Update webview source (renderer.js)
```

### Window Toggle Flow

```
1. Global shortcut pressed
   ↓
2. Shortcut handler (main.js)
   ↓
3. Toggle window visibility (window.js)
   ↓
4. Show/hide window with positioning
   ↓
5. Focus webview if showing
```

## Security Considerations

- **Context Isolation**: Renderer process runs in isolated context
- **Preload Script**: Only exposed APIs available to renderer
- **No Node Integration**: Renderer cannot directly access Node.js
- **Webview Isolation**: Each webview runs in separate partition

## Performance Optimizations

- **Lazy Loading**: Modules loaded only when needed
- **Event Delegation**: Efficient event handling for UI
- **State Caching**: Minimize state recalculations
- **Asset Optimization**: Optimized icon and image assets

## Error Handling

- **IPC Validation**: All IPC messages validated before processing
- **Graceful Degradation**: App continues functioning with partial failures
- **Logging**: Comprehensive logging for debugging
- **Recovery**: Automatic recovery from common error states

## Future Extensibility

The modular architecture allows for easy extension:

- **New LLMs**: Add entries to constants and update handlers
- **UI Themes**: Extend styles.css with theme system
- **Additional Features**: Create new modules following existing patterns
- **Platform Support**: Add platform-specific modules as needed
