# VibeLink

> A community-driven suggestion platform that helps you discover similar-vibe content across all media types.

[![CI](https://github.com/jkrumboe/NextUp/actions/workflows/ci.yml/badge.svg)](https://github.com/jkrumboe/NextUp/actions/workflows/ci.yml)

## Overview

VibeLink helps you discover media (books, movies, shows, games, music, etc.) through community connections and recommendations.

**Tech Stack:**

- React Native + Expo (Mobile)
- NestJS + PostgreSQL (Backend)
- TypeScript (Monorepo with Turborepo)

## Quick Start

### Prerequisites

- Node.js 18+ and pnpm 8+
- Docker and Docker Compose

### Setup

```bash
# Install dependencies
pnpm install

# Start infrastructure
docker-compose up -d

# Setup database
pnpm db:migrate
pnpm db:seed

# Start development
pnpm dev
```

### Development

- **Backend**: `http://localhost:3000`
- **API Docs**: `http://localhost:3000/docs`
- **Mobile**: Use Expo Go app or press `i`/`a` for simulators

## Project Structure

```
apps/
├── mobile/          # React Native app
└── backend/         # NestJS API
packages/
├── types/           # Shared types & schemas
├── ui/              # Design tokens
└── config/          # Shared configs
```

## Version Control

Version bumping is automated. Before pushing to main:

```bash
# Bump version (patch/minor/major)
pnpm version:bump

# Commit and push
git add . && git commit -m "chore: bump version" && git push origin main --tags
```

See [VERSION_CONTROL.md](docs/VERSION_CONTROL.md) for details.

## License

MIT
