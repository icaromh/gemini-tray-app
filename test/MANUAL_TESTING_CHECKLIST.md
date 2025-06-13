# Manual Testing Checklist for Gemini Quick Chat

## 🎯 Core Functionality

### Global Keyboard Shortcut

- [ ] Press `Option+Space` (macOS) / `Alt+Space` (Windows/Linux) to show window
- [ ] Press shortcut again to hide window
- [ ] Verify shortcut works from any application
- [ ] Test shortcut when app is not running (should not crash system)

### Window Behavior

- [ ] Window appears centered on screen
- [ ] Window has no frame/decorations
- [ ] Window is transparent with glass-morphism effect
- [ ] Window stays on top of other applications
- [ ] Window hides when clicking outside (losing focus)
- [ ] Window doesn't appear in taskbar/dock
- [ ] Window shows DevTools only in development mode

### App Switching

- [ ] Sidebar starts as 10px strip on the left
- [ ] Sidebar expands to 80px when hovering
- [ ] Gemini button is selected by default
- [ ] Clicking Gemini button loads Gemini interface
- [ ] Clicking NotebookLM button loads NotebookLM interface
- [ ] Button visual states update correctly (selected/unselected)
- [ ] Hover effects work on buttons
- [ ] Button selection syncs with tray menu

## 🎨 UI/UX Testing

### Visual Design

- [ ] Glass-morphism effects render correctly
- [ ] Animations are smooth (300ms transitions)
- [ ] Button hover effects work (lift, glow, scale)
- [ ] Selected button has purple glow
- [ ] Icons display correctly (Gemini PNG, NotebookLM SVG)
- [ ] Backdrop blur effects work

### Webview Functionality

- [ ] Gemini loads correctly in webview
- [ ] NotebookLM loads correctly in webview
- [ ] Webview can navigate and interact normally
- [ ] Webview maintains separate sessions
- [ ] No console errors in webview
- [ ] Focus management works correctly

## 🖱️ System Tray Testing

### Tray Icon

- [ ] Tray icon appears in system tray
- [ ] Tray icon tooltip shows "Gemini Quick Chat"
- [ ] Right-click shows context menu
- [ ] Left-click behavior (should do nothing)

### Tray Menu

- [ ] "Show Window" option works
- [ ] "Hide Window" option works
- [ ] "Switch to NotebookLM/Gemini" toggles correctly
- [ ] Menu text updates based on current app
- [ ] "Quit" option closes application completely
- [ ] Separator lines appear correctly

## ⌨️ Keyboard & Input Testing

### Focus Management

- [ ] Webview receives focus when window shows
- [ ] Keyboard shortcuts work in webview
- [ ] Tab navigation works within webview
- [ ] No focus traps or issues

### Input Handling

- [ ] Text input works in chat interfaces
- [ ] Copy/paste works normally
- [ ] Keyboard shortcuts don't conflict with system

## 🔧 Error Handling

### Network Issues

- [ ] App handles no internet connection gracefully
- [ ] Webview shows appropriate error for failed loads
- [ ] App continues working after network recovery

### Resource Issues

- [ ] App handles missing icon files gracefully
- [ ] Console shows appropriate error messages
- [ ] App doesn't crash on missing assets

## 🚀 Performance Testing

### Startup Performance

- [ ] App starts quickly (< 3 seconds)
- [ ] Window appears promptly when shortcut pressed
- [ ] No noticeable lag in UI interactions
- [ ] Memory usage is reasonable

### Runtime Performance

- [ ] Smooth animations during interactions
- [ ] No memory leaks during extended use
- [ ] CPU usage is minimal when idle
- [ ] Webview performance is good

## 🖥️ Multi-Platform Testing

### macOS Specific

- [ ] Auto-launch on login works
- [ ] App hides from dock correctly
- [ ] Template tray icon adjusts to dark/light mode
- [ ] `Option+Space` shortcut works

### Windows Specific (if applicable)

- [ ] `Alt+Space` shortcut works
- [ ] Tray icon displays correctly
- [ ] Window positioning works on multiple monitors

### Linux Specific (if applicable)

- [ ] Tray icon works with different desktop environments
- [ ] Global shortcuts work
- [ ] Window management works correctly

## 🔄 State Management Testing

### App State Persistence

- [ ] Current app selection remembered between sessions
- [ ] Window position preferences (if any)
- [ ] No state corruption issues

### State Synchronization

- [ ] Button selection matches tray menu
- [ ] Webview source matches selected app
- [ ] State updates propagate correctly

## 🛡️ Security Testing

### Webview Security

- [ ] Each webview runs in isolated partition
- [ ] No access to local files from webview
- [ ] IPC communication is secure
- [ ] No XSS vulnerabilities

## 📱 Edge Cases

### Unusual Scenarios

- [ ] Multiple monitor setups
- [ ] Very small screen resolutions
- [ ] System sleep/wake cycles
- [ ] App force-quit and restart
- [ ] Rapid clicking/keyboard shortcuts
- [ ] Long running sessions (hours)

## 🔍 Testing Tools

### Development Testing

- [ ] ESLint passes with no errors
- [ ] Prettier formatting is consistent
- [ ] All unit tests pass
- [ ] Integration tests pass
- [ ] Build process completes successfully

---

## Test Execution Notes

**Environment**:

- OS: \***\*\_\_\_\_\*\***
- Node Version: \***\*\_\_\_\_\*\***
- Electron Version: \***\*\_\_\_\_\*\***
- Date: \***\*\_\_\_\_\*\***

**Test Results Summary**:

- ✅ Passed: \_**\_/\_\_**
- ❌ Failed: \_**\_/\_\_**
- ⚠️ Issues Found: \***\*\_\_\_\_\*\***

**Critical Issues**:

- [ ] None found
- [ ] Issues listed below:

**Notes**:

---
