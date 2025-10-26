# VibeLink

> A community-driven suggestion platform that helps you discover similar-vibe content across all media types.

[![CI](https://github.com/jkrumboe/NextUp/actions/workflows/ci.yml/badge.svg)](https://github.com/jkrumboe/NextUp/actions/workflows/ci.yml)

## 🎯 Overview

VibeLink is a full-stack application for discovering and connecting media content (books, movies, shows, manga, comics, artists, albums, games, podcasts) based on vibe and similarity. Users can:

- **Rate & Review**: Track consumed media with 1-10 ratings and notes
- **Link Content**: Create connections between items that share similar vibes, themes, or aesthetics
- **Discover**: Get personalized recommendations based on your ratings and community links
- **Search**: Fast, faceted search across all media types

### Key Features

- 📱 **Mobile-first React Native app** (iOS, Android, Web) with Expo
- 🔐 **Secure authentication** (JWT with refresh tokens)
- ⚡ **Offline-first UX** with React Query caching & optimistic updates
- 🎨 **Beautiful UI** with Tamagui and dark mode support
- 🔍 **Powerful search** with Meilisearch integration (coming soon)
- 📊 **Smart recommendations** based on user behavior and community links
- 🐳 **Self-hostable** with Docker Compose
- 🧪 **Fully tested** with Jest, React Native Testing Library, and Supertest

## 🏗️ Architecture

This is a **Turborepo monorepo** containing:

```
vibelink/
├── apps/
│   ├── mobile/          # React Native (Expo) mobile app
│   └── backend/         # NestJS REST API
├── packages/
│   ├── types/           # Shared TypeScript types & Zod schemas
│   ├── ui/              # Shared design tokens
│   └── config/          # Shared ESLint, TypeScript configs
└── docker-compose.yml   # PostgreSQL, Redis, Meilisearch
```

### Tech Stack

**Mobile App:**

- React Native + Expo (with Expo Router for file-based routing)
- TypeScript
- TanStack Query (React Query) for server state
- Zustand for UI state
- Tamagui for UI components & theming
- React Hook Form + Zod for forms & validation
- Expo Secure Store for token storage

**Backend:**

- Node.js + NestJS
- PostgreSQL (Prisma ORM)
- Redis (BullMQ for queues, caching)
- Meilisearch (full-text search - integration pending)
- OpenAPI/Swagger documentation
- JWT authentication (access + refresh tokens)
- Pino for structured logging

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ and **pnpm** 8+
- **Docker** and **Docker Compose**
- **(Optional)** Expo Go app for mobile testing

### Installation

```bash
# Clone the repository
git clone https://github.com/jkrumboe/NextUp.git
cd NextUp

# Install dependencies
pnpm install

# Set up environment variables
cp apps/backend/.env.example apps/backend/.env
# Edit apps/backend/.env with your configuration
```

### Development

**1. Start infrastructure (PostgreSQL, Redis, Meilisearch):**

```bash
docker-compose up -d
```

**2. Setup database:**

```bash
# Generate Prisma client
pnpm db:migrate

# Seed sample data
pnpm db:seed
```

**3. Start all services:**

```bash
# Start backend + mobile in parallel
pnpm dev
```

This will:

- Start the backend API on `http://localhost:3000`
- Start Expo dev server for the mobile app
- API docs available at `http://localhost:3000/docs`

**4. Run mobile app:**

- Press `i` for iOS simulator
- Press `a` for Android emulator
- Scan QR code with Expo Go for physical device

### Testing

```bash
# Run all tests
pnpm test

# Lint & format
pnpm lint
pnpm format

# Type check
pnpm typecheck
```

## 📱 Mobile App Structure

```
apps/mobile/
├── app/                    # Expo Router screens
│   ├── (tabs)/            # Tab navigation
│   │   ├── index.tsx      # Discover/Home
│   │   ├── search.tsx     # Search screen
│   │   └── profile.tsx    # User profile
│   ├── auth/              # Auth screens
│   │   ├── login.tsx
│   │   └── register.tsx
│   └── media/[id].tsx     # Media detail modal
├── components/            # Reusable UI components
├── features/              # Feature modules
│   ├── auth/             # Auth context & hooks
│   └── media/            # Media queries & mutations
├── hooks/                # Custom hooks
├── lib/                  # API client, utilities
└── tamagui.config.ts     # UI theme configuration
```

### Key Mobile Concepts

- **Expo Router**: File-based routing (similar to Next.js)
- **React Query**: Server state caching with optimistic updates
- **Secure Storage**: Encrypted token storage with expo-secure-store
- **Form Validation**: React Hook Form + Zod schemas from `@vibelink/types`

## 🔧 Backend Structure

```
apps/backend/
├── src/
│   ├── modules/
│   │   ├── auth/          # Authentication (JWT)
│   │   ├── users/         # User management
│   │   ├── media/         # Media items CRUD
│   │   ├── ratings/       # User ratings
│   │   ├── links/         # Media-to-media links
│   │   ├── tags/          # Content tags
│   │   ├── search/        # Meilisearch integration
│   │   ├── recommendations/ # Recommendation engine
│   │   └── activity/      # Activity feed
│   ├── prisma/
│   │   └── schema.prisma  # Database schema
│   └── main.ts
└── prisma/
    └── seed.ts            # Sample data seeder
```

### API Endpoints

Full API documentation available at `http://localhost:3000/docs` (Swagger UI)

**Authentication:**

- `POST /api/auth/register` - Create account
- `POST /api/auth/login` - Login
- `POST /api/auth/refresh` - Refresh access token

**Media:**

- `GET /api/media` - Search/list media items
- `GET /api/media/:id` - Get media details
- `POST /api/media` - Create media item (admin)

**Ratings:**

- `GET /api/media/:id/ratings` - Get ratings for item
- `PUT /api/media/:id/rating` - Rate an item

**Links:**

- `GET /api/media/:id/links` - Get related items
- `POST /api/links` - Create link between items

**Recommendations:**

- `GET /api/media/:id/recommendations` - Item-based recommendations
- `GET /api/users/me/recommendations` - Personalized recommendations

## 🗄️ Database Schema

Core entities:

- **User**: email, username, password (bcrypt)
- **MediaItem**: title, type (enum), year, description, cover, external IDs
- **Creator**: name, aliases, bio
- **Rating**: user → media, score (1-10), review text
- **Link**: media → media, type (vibe/theme/tone), strength (0-1), note
- **Tag**: name, kind (genre/mood/topic/style)
- **Activity**: user activity log (rate/link/add/edit)

Relations are managed through join tables with Prisma.

## 📦 Shared Packages

### `@vibelink/types`

Shared TypeScript types and Zod validation schemas used by both frontend and backend.

```typescript
import { LoginSchema, type LoginDto } from '@vibelink/types';

// Use in React Hook Form
const form = useForm<LoginDto>({
  resolver: zodResolver(LoginSchema),
});
```

Also includes OpenAPI-generated types (run `pnpm codegen` after backend is running).

### `@vibelink/ui`

Design tokens (colors, spacing, typography) used by mobile app.

### `@vibelink/config`

Shared ESLint and TypeScript configurations.

## 🐳 Docker Deployment

### Development

```bash
docker-compose up -d
```

This starts:

- PostgreSQL on port 5432
- Redis on port 6379
- Meilisearch on port 7700

### Production

```bash
# Build and run all services including backend
docker-compose -f docker-compose.prod.yml up --build
```

Includes:

- Backend API (auto-migrates DB on startup)
- All infrastructure services

## 🧪 Testing

### Backend Tests

```bash
cd apps/backend
pnpm test              # Unit tests
pnpm test:e2e          # E2E tests with Supertest
pnpm test:cov          # Coverage report
```

### Mobile Tests

```bash
cd apps/mobile
pnpm test              # Jest with React Native Testing Library
```

## 🔐 Environment Variables

### Backend (`apps/backend/.env`)

```env
# Database
DATABASE_URL="postgresql://vibelink:vibelink@localhost:5432/vibelink?schema=public"

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379

# Meilisearch
MEILISEARCH_HOST=http://localhost:7700
MEILISEARCH_MASTER_KEY=masterKey

# JWT Secrets (CHANGE IN PRODUCTION!)
JWT_ACCESS_SECRET=your-secret-key-change-in-production
JWT_REFRESH_SECRET=your-refresh-secret-key-change-in-production
JWT_ACCESS_EXPIRATION=15m
JWT_REFRESH_EXPIRATION=7d

# Server
PORT=3000
NODE_ENV=development

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:8081
```

### Mobile (`apps/mobile/app.json`)

```json
{
  "expo": {
    "extra": {
      "apiUrl": "http://localhost:3000/api"
    }
  }
}
```

Update `apiUrl` to your backend URL (use local IP for physical devices).

## 🚢 Deployment

### Backend

1. **Build Docker image:**

   ```bash
   docker build -t vibelink-backend -f apps/backend/Dockerfile .
   ```

2. **Run migrations:**

   ```bash
   docker run --env-file apps/backend/.env vibelink-backend npx prisma migrate deploy
   ```

3. **Start server:**
   ```bash
   docker run -p 3000:3000 --env-file apps/backend/.env vibelink-backend
   ```

### Mobile

Build for iOS/Android:

```bash
cd apps/mobile
eas build --platform ios
eas build --platform android
```

See [Expo EAS Build docs](https://docs.expo.dev/build/introduction/) for setup.

## 📚 API Documentation

- **Swagger UI**: `http://localhost:3000/docs`
- **OpenAPI JSON**: `http://localhost:3000/api-json`

## 🛠️ Development Workflow

1. **Create a feature branch:**

   ```bash
   git checkout -b feature/my-feature
   ```

2. **Make changes** and test locally

3. **Run checks:**

   ```bash
   pnpm lint
   pnpm typecheck
   pnpm test
   ```

4. **Commit and push:**

   ```bash
   git add .
   git commit -m "feat: add my feature"
   git push origin feature/my-feature
   ```

5. **CI runs automatically** on push/PR

## 🗺️ Roadmap

- [x] Core MVP functionality
- [x] Mobile app with Expo Router
- [x] Backend API with NestJS
- [x] Authentication & authorization
- [x] Basic recommendations
- [ ] Meilisearch integration for fast search
- [ ] Advanced recommendation algorithms (collaborative filtering)
- [ ] Social features (follow users, activity feed)
- [ ] Image upload for covers
- [ ] OAuth providers (Google, GitHub)
- [ ] Push notifications
- [ ] Admin dashboard

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

Built with:

- [React Native](https://reactnative.dev/) + [Expo](https://expo.dev/)
- [NestJS](https://nestjs.com/)
- [Prisma](https://www.prisma.io/)
- [Tamagui](https://tamagui.dev/)
- [TanStack Query](https://tanstack.com/query)
- [Turborepo](https://turbo.build/)

---

**Happy discovering! 🚀**
A Suggestion Plattform that helps finding simular content based on individual expierences of the community
