# Contributing to VibeLink

Thank you for your interest in contributing to VibeLink! This guide will help you get started.

## Development Setup

1. **Fork and clone the repository**
2. **Install dependencies**: `pnpm install`
3. **Start infrastructure**: `docker-compose up -d`
4. **Setup database**: `pnpm db:migrate && pnpm db:seed`
5. **Start dev servers**: `pnpm dev`

## Coding Standards

- **TypeScript**: All code must be fully typed
- **Linting**: Run `pnpm lint` before committing
- **Formatting**: Use Prettier (`pnpm format`)
- **Testing**: Add tests for new features

## Commit Convention

We use [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc.)
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Build process or auxiliary tool changes

Example: `feat(mobile): add media detail screen`

## Pull Request Process

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make your changes and commit with conventional commits
3. Ensure all checks pass: `pnpm lint && pnpm typecheck && pnpm test`
4. Push and create a pull request
5. Wait for review

## Project Structure

- `apps/mobile/` - React Native mobile app
- `apps/backend/` - NestJS backend API
- `packages/types/` - Shared types and schemas
- `packages/ui/` - Design tokens
- `packages/config/` - Shared configurations

## Adding New Features

### Backend (API Endpoint)

1. Create a new module in `apps/backend/src/modules/`
2. Add DTOs with class-validator decorators
3. Implement service logic
4. Add controller endpoints with Swagger decorators
5. Register module in `app.module.ts`
6. Write tests in `*.spec.ts` files

### Mobile (Screen)

1. Create screen in `apps/mobile/app/` (Expo Router)
2. Create feature hooks in `features/`
3. Add components to `components/`
4. Use React Query for server state
5. Use Zustand for UI state (if needed)
6. Add tests in `__tests__/` directories

## Need Help?

- Check existing issues
- Read the [README](README.md)
- Ask questions in discussions

Thank you for contributing! 🎉
