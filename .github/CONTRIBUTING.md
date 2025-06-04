# Contributing to Gemini App

## 📋 Development Workflow

### Making Changes

1. Create a feature branch from `main`
2. Make your changes
3. Test thoroughly
4. Commit changes with descriptive messages

### 🤖 AI-Assisted Changelog Generation

**For AI assistants**: Please read and follow the instructions in [`AI_CHANGELOG_INSTRUCTIONS.md`](../AI_CHANGELOG_INSTRUCTIONS.md) when generating changelogs or creating releases.

### Release Process

1. **Generate Changelog**: Use the AI changelog instructions to analyze git diff and create changelog entries
2. **Update Version**: Follow semantic versioning in `package.json` and `CHANGELOG.md`
3. **Create Git Tag**: Use the tagging process documented in the AI changelog instructions
4. **Test Release**: Verify the application works correctly

## 🔧 Development Setup

```bash
# Clone the repository
git clone <repository-url>
cd gemini-app

# Install dependencies (if any)
npm install

# Run the application
npm start
```

## 📝 Commit Message Format

Use conventional commits format:

- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation
- `style:` for UI/styling changes
- `refactor:` for code refactoring
- `test:` for adding tests

## 🏷️ Versioning

This project follows [Semantic Versioning](https://semver.org/):

- **Major** (X.0.0): Breaking changes
- **Minor** (1.X.0): New features
- **Patch** (1.1.X): Bug fixes

## 📖 Documentation

- [`AI_CHANGELOG_INSTRUCTIONS.md`](../AI_CHANGELOG_INSTRUCTIONS.md) - Complete guide for AI-assisted changelog generation and git tagging
- [`CHANGELOG.md`](../CHANGELOG.md) - Version history and release notes
