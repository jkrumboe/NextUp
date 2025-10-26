# Version Control System

## Overview

This project uses an automated version control system that manages versioning across:

- `package.json` (root)
- `apps/backend/.env` and `.env.example`
- `apps/mobile/app.json`

## How It Works

### Automatic Version Bumping

Use the following commands to bump the version:

```bash
# Bump patch version (1.0.0 -> 1.0.1)
pnpm version:bump
# or explicitly
pnpm version:patch

# Bump minor version (1.0.0 -> 1.1.0)
pnpm version:minor

# Bump major version (1.0.0 -> 2.0.0)
pnpm version:major
```

### What Gets Updated

When you run a version bump:

1. **package.json** - Updates the `version` field
2. **apps/backend/.env** - Updates or adds `APP_VERSION=x.x.x`
3. **apps/backend/.env.example** - Updates or adds `APP_VERSION=x.x.x`
4. **apps/mobile/app.json** - Updates `expo.version`

### Pre-Push Hook

A git pre-push hook ensures version is bumped before pushing to main/master:

- ✅ If version was bumped in the last commit, push proceeds
- ❌ If version wasn't bumped, push is blocked with instructions
- You can bypass with `git push --no-verify` if needed

## Workflow

### Standard Release Workflow

```bash
# 1. Make your changes
git add .
git commit -m "feat: add new feature"

# 2. Bump version
pnpm version:bump

# 3. Commit the version bump
git add .
git commit -m "chore: bump version to 1.0.1"

# 4. Tag the release
git tag v1.0.1

# 5. Push with tags
git push origin main --tags
```

### Quick Workflow

```bash
# One-liner after your changes are committed
pnpm version:bump && git add . && git commit -m "chore: bump version" && git push origin main --tags
```

## Using Version in Code

### Backend (NestJS)

```typescript
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}

  getVersion() {
    return this.configService.get('APP_VERSION');
  }
}
```

### Mobile (React Native)

The version is automatically displayed in the settings page:

```typescript
import Constants from 'expo-constants';

const appVersion = Constants.expoConfig?.version || '1.0.0';
```

## Troubleshooting

### Pre-push hook not working on Windows

If the bash hook doesn't work, use the PowerShell version:

```powershell
# Make sure execution policy allows scripts
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# Run the PowerShell hook manually
.\.husky\pre-push.ps1
```

### Bypass version check

If you need to push without bumping version:

```bash
git push --no-verify
```

## Version Format

We follow [Semantic Versioning](https://semver.org/):

- **MAJOR** version (X.0.0) - Breaking changes
- **MINOR** version (0.X.0) - New features, backwards compatible
- **PATCH** version (0.0.X) - Bug fixes, backwards compatible
