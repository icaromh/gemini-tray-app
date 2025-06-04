# Development Health Guide

This project includes several development tools to maintain code quality and consistency.

## 🛠️ Available Scripts

### Code Quality

- `npm run format` - Format all code with Prettier
- `npm run format:check` - Check if code is formatted correctly
- `npm run lint` - Run ESLint to check for code issues
- `npm run lint:fix` - Run ESLint and automatically fix issues

### Development

- `npm start` - Start the Electron app
- `npm run dev` - Start the app in development mode
- `npm run build` - Build the app for distribution

## 🔧 Pre-commit Hooks

Pre-commit hooks are automatically set up using Husky and will run:

1. **Code Formatting**: Prettier will format staged files
2. **Linting**: ESLint will check and fix JavaScript issues
3. **Commit Message Validation**: Ensures consistent commit message format

### Commit Message Format

```
type(scope): description

Examples:
feat(ui): add new chat interface
fix(window): resolve window positioning bug
docs(readme): update installation instructions
chore(deps): update electron version
```

Valid types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

## 📝 Configuration Files

### Prettier (`.prettierrc`)

- Semi-colons: enabled
- Single quotes: enabled
- Tab width: 2 spaces
- Print width: 80 characters
- Trailing commas: ES5 style

### ESLint (`.eslintrc.json`)

- Extends: `eslint:recommended`
- Environment: Browser, Node.js, ES2021
- Enforces: 2-space indentation, single quotes, semicolons
- Warns on: console statements, unused variables

## 🚀 Getting Started

1. Install dependencies: `npm install`
2. Set up git hooks: `npm run prepare` (runs automatically)
3. Format existing code: `npm run format`
4. Check for issues: `npm run lint`

## 🔍 Troubleshooting

### Pre-commit Hook Issues

If pre-commit hooks fail:

1. Fix the reported issues manually
2. Re-stage your files: `git add .`
3. Try committing again

### Bypassing Hooks (Emergency Only)

```bash
git commit --no-verify -m "emergency fix"
```

### Console Warnings

Console statements trigger warnings in ESLint. This is intentional to encourage proper logging practices in production code.

## 📋 Best Practices

1. **Always run `npm run format` before committing**
2. **Fix linting errors before submitting PRs**
3. **Use meaningful commit messages**
4. **Test the app after making changes**: `npm start`
5. **Keep dependencies updated**

## 🔄 Workflow

1. Make your changes
2. Run `npm run format` to format code
3. Run `npm run lint:fix` to fix auto-fixable issues
4. Stage your changes: `git add .`
5. Commit: `git commit -m "feat: your changes"`
   - Pre-commit hooks will run automatically
6. Push your changes

The pre-commit hooks ensure that only properly formatted and linted code reaches the repository!
