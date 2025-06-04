# 🤖 AI Assistant Instructions

## Primary Directive

When working on this repository, **ALWAYS** reference and follow the comprehensive instructions in [`AI_CHANGELOG_INSTRUCTIONS.md`](../AI_CHANGELOG_INSTRUCTIONS.md) for:

- 📊 **Changelog Generation**: Analyzing git diffs and creating semantic-versioned changelogs
- 🏷️ **Git Tagging**: Creating proper semantic version tags
- 📝 **Release Process**: Complete workflow from development to release

## Quick Reference Commands

```bash
# Get latest tag
git describe --tags --abbrev=0

# Get diff for changelog analysis
git diff $(git describe --tags --abbrev=0)..HEAD

# Check current status
git status --porcelain
```

## Key Files to Update During Releases

1. [`CHANGELOG.md`](../CHANGELOG.md) - Add new version entry
2. [`package.json`](../package.json) - Update version field (if applicable)
3. Create git tag following semantic versioning

## Version Determination

- 🔥 **Major (X.0.0)**: Breaking changes, removed features
- ✨ **Minor (1.X.0)**: New features, UI enhancements
- 🐛 **Patch (1.1.X)**: Bug fixes, small improvements

## Changelog Format

Use emojis and concise descriptions focusing on user impact, not technical implementation details.

---

**Remember**: Always read the full instructions in `AI_CHANGELOG_INSTRUCTIONS.md` before generating changelogs or creating releases.
