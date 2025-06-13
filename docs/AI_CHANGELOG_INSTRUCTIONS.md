# 🤖 AI Changelog Generation Instructions

## Overview

Generate concise, semantic-versioned changelogs by analyzing git diffs between the latest tag and current work.

## Commands to Run

```bash
# Get the latest git tag
git describe --tags --abbrev=0 | cat

# Get diff between latest tag and current work
git diff $(git describe --tags --abbrev=0)..HEAD | cat

# Alternative: Get diff for unstaged changes
git diff | cat

# Get list of changed files
git status --porcelain | cat
```

## Version Numbering (Semantic Versioning)

### 🔥 Major Version (X.0.0)

- Breaking changes
- API changes that break compatibility
- Removed features
- Major architectural changes

### ✨ Minor Version (1.X.0)

- New features added
- New functionality
- Enhancements that don't break existing features
- New UI components or major UI changes

### 🐛 Patch Version (1.1.X)

- Bug fixes
- Small improvements
- Documentation updates
- Performance optimizations
- Security fixes

## Changelog Format Template

```markdown
## [VERSION_NUMBER]

### ✨ New Features

- **Feature Name**: Brief description of what was added

### 🎨 UI/UX Improvements

- **Visual Enhancement**: Description of UI changes
- **User Experience**: Interaction improvements

### 🔧 Technical Improvements

- **Code Quality**: Refactoring, cleanup, organization
- **Performance**: Speed or efficiency improvements
- **Dependencies**: Package updates or additions

### 🐛 Bug Fixes

- **Issue Description**: What was broken and how it was fixed

### 📚 Documentation

- **Guide Updates**: Documentation improvements
- **README Changes**: Setup or usage instruction updates

### ⚠️ Breaking Changes (Major versions only)

- **Change Description**: What breaks and migration steps
```

## Analysis Guidelines

### 📂 File Change Analysis

- **New files**: Usually indicate new features (minor version)
- **Deleted files**: May indicate breaking changes or cleanup
- **Modified core files**: Analyze the specific changes
- **Config changes**: Often technical improvements
- **UI/styling changes**: Usually UI/UX improvements

### 🔍 Code Change Patterns

- **Added functions/methods**: New features
- **Removed functions/methods**: Breaking changes
- **Modified function signatures**: Potentially breaking
- **CSS/styling changes**: UI improvements
- **Bug fix patterns**: Error handling, validation, edge cases
- **Refactoring**: Code organization without functionality change

### 📝 Writing Style

- **Be concise**: One line per item maximum
- **Use action verbs**: "Added", "Fixed", "Improved", "Removed"
- **Focus on user impact**: What the user will notice
- **Group related changes**: Combine similar modifications
- **Use emojis sparingly**: Only for section headers and major items

## Example Analysis Process

1. **Run git commands** to get the diff
2. **Identify the scope**:
   - Count new/deleted/modified files
   - Look for breaking changes
   - Assess feature additions
3. **Determine version bump**:
   - Breaking changes → Major
   - New features → Minor
   - Only fixes/improvements → Patch
4. **Categorize changes** by type
5. **Write concise descriptions** focusing on user impact
6. **Review for completeness** and accuracy

## Version Decision Tree

```
Are there breaking changes?
├── Yes → Major version (X.0.0)
└── No → Are there new features?
    ├── Yes → Minor version (1.X.0)
    └── No → Patch version (1.1.X)
```

## Final Notes

- Always compare against the **latest tag**, not just previous commits
- If no tags exist, compare against the first commit or initial version
- Keep descriptions **user-focused** rather than technical implementation details
- **Test the version bump logic** against semantic versioning principles
- **Review the diff carefully** - don't miss important changes in large diffs

# 🏷️ Git Tagging Process

## Creating Semantic Version Tags

### 📋 Pre-Tagging Checklist

1. **Ensure all changes are committed**
2. **Generate and review changelog** using the instructions above
3. **Update version in package.json** (if applicable)
4. **Test the application** to ensure stability
5. **Push all changes** to remote repository

### 🔖 Tag Creation Commands

```bash
# 1. Get current latest tag (to determine next version)
git describe --tags --abbrev=0 | cat

# 2. Create annotated tag with changelog message
git tag -a v[VERSION] -m "[VERSION] - Brief release description"

# Examples:
git tag -a v1.3.0 -m "v1.3.0 - Interactive app switcher with slide-out UI"
git tag -a v2.0.0 -m "v2.0.0 - Major UI overhaul with breaking API changes"
git tag -a v1.2.1 -m "v1.2.1 - Fix webview focus issue"

# 3. Push the tag to remote
git push origin v[VERSION]

# 4. Push all tags (if multiple created)
git push --tags
```

### 🎯 Tag Naming Convention

**Format**: `v[MAJOR].[MINOR].[PATCH]`

**Examples**:

- `v1.0.0` - Initial major release
- `v1.1.0` - New features added
- `v1.1.1` - Bug fixes
- `v2.0.0` - Breaking changes

### 📝 Tag Message Guidelines

**Structure**: `v[VERSION] - [Brief Description]`

**Good Examples**:

- `v1.3.0 - Interactive app switcher with modern UI`
- `v1.2.1 - Fix memory leak in webview component`
- `v2.0.0 - Complete rewrite with new architecture`

**Bad Examples**:

- `v1.3.0 - Updates` ❌ (too vague)
- `Version 1.3.0` ❌ (inconsistent format)
- `v1.3.0 - Fixed some bugs and added features` ❌ (too generic)

### 🔄 Complete Release Process

```bash
# Step 1: Prepare release
git status | cat  # Ensure working directory is clean
git pull    # Get latest changes

# Step 2: Determine version bump
git diff $(git describe --tags --abbrev=0)..HEAD | cat  # Review changes

# Step 3: Update files (if needed)
# - Update package.json version
# - Update CHANGELOG.md
# - Commit these changes

# Step 4: Create and push tag
NEXT_VERSION="1.3.0"  # Replace with actual version
git tag -a v$NEXT_VERSION -m "v$NEXT_VERSION - Brief description"
git push origin v$NEXT_VERSION

# Step 5: Verify tag creation
git tag -l | cat  # List all tags
git show v$NEXT_VERSION | cat  # Show tag details
```

### 🛠️ Tag Management Commands

```bash
# List all tags
git tag -l | cat

# List tags with messages
git tag -l -n1 | cat

# Show specific tag details
git show v1.3.0 | cat

# Delete local tag (if mistake)
git tag -d v1.3.0

# Delete remote tag (if mistake)
git push origin --delete v1.3.0

# Checkout specific tag
git checkout v1.3.0
```

### ⚠️ Common Mistakes to Avoid

1. **Lightweight tags**: Always use `-a` flag for annotated tags
2. **Missing push**: Don't forget `git push origin v[VERSION]`
3. **Wrong version format**: Use `v1.2.3` not `1.2.3` or `version-1.2.3`
4. **Uncommitted changes**: Tag only committed, stable code
5. **Skipping changelog**: Always update changelog before tagging

### 🎛️ Advanced Tagging

```bash
# Tag a specific commit (not HEAD)
git tag -a v1.2.1 9fceb02 -m "v1.2.1 - Hotfix for critical bug"

# Create tag from another branch
git checkout feature-branch
git tag -a v1.3.0-beta -m "v1.3.0-beta - Pre-release testing"

# List tags by pattern
git tag -l "v1.*"  # Show all v1.x.x tags
git tag -l "v*.*.*"  # Show all semantic version tags
```

### 📊 Version Bump Examples

| Current  | Change Type     | Next Version | Example                   |
| -------- | --------------- | ------------ | ------------------------- |
| `v1.2.3` | Bug fix         | `v1.2.4`     | Fixed crash on startup    |
| `v1.2.3` | New feature     | `v1.3.0`     | Added dark mode           |
| `v1.2.3` | Breaking change | `v2.0.0`     | Removed deprecated API    |
| `v1.2.3` | Security fix    | `v1.2.4`     | Patched XSS vulnerability |
| `v1.2.3` | Major rewrite   | `v2.0.0`     | Complete UI overhaul      |

---
