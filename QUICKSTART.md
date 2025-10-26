# Quick Start Guide - Windows

## Prerequisites

✅ **Docker Desktop** - Running with containers started
✅ **Node.js 18+** - Installed
✅ **pnpm** - Installed globally (`npm install -g pnpm`)

## 🎯 Easy Way: Using VS Code Tasks

**For first-time setup:**

1. Press `Ctrl+Shift+P` (Command Palette)
2. Type "Run Task"
3. Select **"🚀 Complete Setup (First Time)"**
4. Wait for all steps to complete (~2-5 minutes)

**For daily development:**

1. Press `Ctrl+Shift+P`
2. Type "Run Task"
3. Select **"🎯 Quick Start (After Setup)"**

Done! Your backend and mobile app will start automatically.

---

## 📋 Manual Setup Steps (Alternative)

### 1. Install Dependencies

```powershell
pnpm.cmd install
```

**Note:** On Windows with PowerShell execution policy restrictions, use `pnpm.cmd` instead of `pnpm`.

### 2. Start Infrastructure

```powershell
docker-compose up -d
```

This starts:

- PostgreSQL on port 5432
- Redis on port 6379
- Meilisearch on port 7700

### 3. Setup Backend

```powershell
# Navigate to backend
cd apps\backend

# Generate Prisma client
pnpm.cmd db:generate

# Run migrations
pnpm.cmd prisma migrate dev --name init

# Seed database with sample data
pnpm.cmd db:seed

# Return to root
cd ..\..
```

### 4. Start Development Servers

```powershell
# Start both backend and mobile app
pnpm.cmd dev
```

**Backend:** http://localhost:3000
**API Docs:** http://localhost:3000/docs
**Mobile:** Will prompt for port (use 8082 if 8081 is in use)

### 5. Access the Application

**Backend API Documentation:**

- Open browser to http://localhost:3000/docs
- Try the API endpoints directly from Swagger UI

**Mobile App:**

- The terminal will show a QR code
- Scan with Expo Go app (iOS/Android)
- Or press `w` for web, `i` for iOS simulator, `a` for Android emulator

## Sample Data

The seed script creates fresh data (cleans existing data first):

- **Test user:** email: `test@example.com`, password: `password123`
- **4 media items:**
  - Mistborn: The Final Empire (book)
  - Inception (movie)
  - Spirited Away (movie)
  - OK Computer (album)
- **4 creators:** Brandon Sanderson, Christopher Nolan, Hayao Miyazaki, Radiohead
- **10 tags:** Fantasy, Science Fiction, Mystery, etc.
- Sample ratings and links between media

**Note:** Running "Database: Seed Data" will delete all existing data and create fresh sample data. To keep your data, use "Database: Reset & Seed" only when you want a complete fresh start.

## Test the App

1. **Register a new user** (mobile or API)
2. **Login** with your credentials
3. **Browse media** on the Discover tab
4. **Search** for media items
5. **Rate** a media item (1-10)
6. **Create a link** between two media items
7. **View recommendations** based on your activity

## Troubleshooting

### PowerShell Execution Policy Error

If you see "execution of scripts is disabled on this system":

```powershell
# Use .cmd version of pnpm
pnpm.cmd install
pnpm.cmd dev

# Or set execution policy (requires admin)
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Port Already in Use

**Backend (port 3000):**

```powershell
# Find process using port 3000
netstat -ano | findstr :3000

# Kill the process (replace PID with actual process ID)
taskkill /PID <PID> /F
```

**Mobile (port 8081):**

- Expo will automatically prompt to use port 8082
- Or kill the process: `netstat -ano | findstr :8081`

### Database Connection Error

Ensure Docker containers are running:

```powershell
docker ps
```

You should see:

- `vibelink-postgres`
- `vibelink-redis`
- `vibelink-meilisearch`

If not, restart them:

```powershell
docker-compose down
docker-compose up -d
```

### Prisma Client Not Generated

```powershell
cd apps\backend
pnpm.cmd db:generate
cd ..\..
```

### Module Not Found Errors

Clear node_modules and reinstall:

```powershell
Remove-Item -Recurse -Force node_modules
pnpm.cmd install
```

## Available Commands

### VS Code Tasks (Recommended)

Press `Ctrl+Shift+P` → "Run Task" → Select from:

**Quick Actions:**

- 🚀 **Complete Setup (First Time)** - Full setup: install, docker, migrate, seed
- 🎯 **Quick Start (After Setup)** - Start docker + all dev servers
- **Start All (Dev Servers)** - Start backend + mobile simultaneously
- **Start Backend Only** - Start NestJS server only
- **Start Mobile App Only** - Start Expo dev server only

**Docker:**

- **Docker: Start Infrastructure** - Start PostgreSQL, Redis, Meilisearch
- **Docker: Stop Infrastructure** - Stop all containers
- **Docker: View Logs** - Watch container logs

**Database:**

- **Database: Generate Prisma Client** - Generate types from schema
- **Database: Run Migrations** - Create/apply migrations
- **Database: Seed Data** - Populate with sample data
- **Database: Open Prisma Studio** - GUI database browser

**Code Quality:**

- **Build All** - Compile all packages
- **Lint All** - Run ESLint
- **Type Check All** - Run TypeScript compiler
- **Test All** - Run Jest tests

### Terminal Commands (Alternative)

```powershell
# Development
pnpm.cmd dev              # Start all dev servers
pnpm.cmd build            # Build all packages
pnpm.cmd lint             # Lint all packages
pnpm.cmd typecheck        # Type-check all packages
pnpm.cmd test             # Run all tests

# Backend specific
cd apps\backend
pnpm.cmd dev              # Start backend only
pnpm.cmd db:generate      # Generate Prisma client
pnpm.cmd db:migrate       # Run migrations
pnpm.cmd db:seed          # Seed database
pnpm.cmd db:studio        # Open Prisma Studio

# Mobile specific
cd apps\mobile
pnpm.cmd dev              # Start Expo
pnpm.cmd ios              # Run on iOS simulator
pnpm.cmd android          # Run on Android emulator
```

## Next Steps

- Review the full [README.md](./README.md) for architecture details
- Check [DEVELOPMENT.md](./DEVELOPMENT.md) for detailed development guide
- Read [CONTRIBUTING.md](./CONTRIBUTING.md) for contribution guidelines
- Explore the [API documentation](http://localhost:3000/docs) when running

## Success Checklist

✅ Dependencies installed
✅ Docker containers running
✅ Database migrated and seeded
✅ Backend running on port 3000
✅ API docs accessible at /docs
✅ Mobile app running (or ready to run)
✅ Can register/login via API
✅ Can view seeded media items

**Your VibeLink development environment is ready!** 🎉
