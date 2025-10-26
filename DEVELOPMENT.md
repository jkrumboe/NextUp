# Development Guide

## Initial Setup

```bash
# Install dependencies
pnpm install

# Start Docker services
docker-compose up -d

# Setup database
cd apps/backend
pnpm db:migrate
pnpm db:seed
cd ../..

# Generate Prisma client
cd apps/backend
pnpm db:generate
cd ../..
```

## Running the App

### Full Stack Development

```bash
# Start everything (backend + mobile)
pnpm dev
```

### Backend Only

```bash
cd apps/backend
pnpm dev
```

Backend will be available at:

- API: http://localhost:3000/api
- Swagger docs: http://localhost:3000/docs
- OpenAPI JSON: http://localhost:3000/api-json

### Mobile Only

```bash
cd apps/mobile
pnpm dev
```

Then:

- Press `i` for iOS simulator
- Press `a` for Android emulator
- Scan QR code for physical device

## Database Management

```bash
# Create a new migration
cd apps/backend
pnpm prisma migrate dev --name my_migration

# Reset database (WARNING: deletes all data)
pnpm prisma migrate reset

# Prisma Studio (database GUI)
pnpm db:studio
```

## Code Generation

```bash
# Generate OpenAPI client types (backend must be running)
cd packages/types
pnpm codegen
```

## Testing

```bash
# Run all tests
pnpm test

# Backend tests only
cd apps/backend
pnpm test
pnpm test:watch
pnpm test:cov

# Mobile tests only
cd apps/mobile
pnpm test
```

## Linting & Formatting

```bash
# Lint all packages
pnpm lint

# Format all files
pnpm format

# Type check
pnpm typecheck
```

## Troubleshooting

### "Cannot find module '@prisma/client'"

```bash
cd apps/backend
pnpm db:generate
```

### Mobile app can't connect to backend

- Check `apps/mobile/app.json` → `extra.apiUrl`
- For physical devices, use your computer's local IP
- For simulators/emulators, use `localhost`

### Database connection errors

```bash
# Ensure Docker is running
docker ps

# Restart services
docker-compose restart
```

### Clear caches

```bash
# Backend
cd apps/backend
rm -rf dist node_modules
pnpm install

# Mobile
cd apps/mobile
rm -rf .expo node_modules
pnpm install

# Turbo cache
pnpm clean
```

## Environment Variables

Copy `.env.example` to `.env` in `apps/backend/` and update:

```env
DATABASE_URL="postgresql://vibelink:vibelink@localhost:5432/vibelink"
JWT_ACCESS_SECRET="change-me-in-production"
JWT_REFRESH_SECRET="change-me-in-production"
```

## Useful Commands

```bash
# Add a new npm package
pnpm add <package> --filter @vibelink/backend
pnpm add <package> --filter @vibelink/mobile

# Build all packages
pnpm build

# Clean all build artifacts
pnpm clean
```

## Docker Commands

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down

# Remove volumes (deletes data)
docker-compose down -v
```
