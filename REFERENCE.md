# VibeLink - Quick Reference Card

## 🚀 Getting Started (First Time)

1. **Open VS Code Command Palette**: `Ctrl+Shift+P`
2. **Run Task** → Select: **🚀 Complete Setup (First Time)**
3. Wait 2-5 minutes for setup to complete
4. **Done!** Backend will be running on http://localhost:3000

## ⚡ Daily Workflow

1. **Open Command Palette**: `Ctrl+Shift+P`
2. **Run Task** → Select: **🎯 Quick Start (After Setup)**
3. Start coding!

## 🔗 Important URLs

| Service           | URL                        | Notes                            |
| ----------------- | -------------------------- | -------------------------------- |
| Backend API       | http://localhost:3000      | NestJS server                    |
| API Documentation | http://localhost:3000/docs | Swagger UI                       |
| Prisma Studio     | http://localhost:5555      | Database GUI (run task to start) |
| Mobile App        | Expo DevTools              | Press `w` for web preview        |

## 📝 Sample Login

**Test User:**

- Email: `test@example.com`
- Password: `password123`

## 🎯 Common Tasks

| Task              | Shortcut                    |
| ----------------- | --------------------------- |
| Run Any Task      | `Ctrl+Shift+P` → "Run Task" |
| Start Debugging   | `F5`                        |
| Stop Current Task | `Ctrl+C` in terminal        |
| Toggle Terminal   | `` Ctrl+` ``                |
| Command Palette   | `Ctrl+Shift+P`              |

## 🐳 Docker Commands

All managed via tasks, or use terminal:

```powershell
# Start containers
docker-compose up -d

# Stop containers
docker-compose down

# View logs
docker-compose logs -f

# Check status
docker ps
```

## 📦 Database Management

Via tasks or terminal:

```powershell
cd apps\backend

# Open visual editor
pnpm.cmd db:studio

# Reset database
pnpm.cmd prisma migrate reset

# Create new migration
pnpm.cmd prisma migrate dev --name my_migration
```

## 🧪 Testing

```powershell
# Run all tests
pnpm.cmd test

# Test with coverage
pnpm.cmd test:cov

# Watch mode
pnpm.cmd test:watch
```

## 📱 Mobile App Controls

Once Expo is running:

| Key | Action                |
| --- | --------------------- |
| `a` | Open Android emulator |
| `i` | Open iOS simulator    |
| `w` | Open web browser      |
| `r` | Reload app            |
| `m` | Toggle menu           |
| `j` | Open debugger         |

## 🔧 Troubleshooting

| Issue                | Solution                                       |
| -------------------- | ---------------------------------------------- |
| Port 3000 in use     | Run task: **Docker: Stop Infrastructure**      |
| TypeScript errors    | Run task: **Type Check All**                   |
| Dependencies missing | Run task: **Install Dependencies**             |
| Database out of sync | Run task: **Database: Run Migrations**         |
| Prisma errors        | Run task: **Database: Generate Prisma Client** |

## 📂 Project Structure

```
NextUp/
├── apps/
│   ├── backend/        # NestJS API
│   └── mobile/         # Expo React Native app
├── packages/
│   ├── config/         # Shared configs (ESLint, TS)
│   ├── types/          # Shared Zod schemas
│   └── ui/             # Design tokens
└── .vscode/            # Tasks & settings
```

## 🎨 Sample Data Included

- 4 Media Items (Mistborn, Inception, Spirited Away, OK Computer)
- 4 Creators (Sanderson, Nolan, Miyazaki, Radiohead)
- 10 Tags (Fantasy, Sci-Fi, Mystery, etc.)
- Sample ratings & links

## 📚 More Documentation

- [QUICKSTART.md](./QUICKSTART.md) - Detailed setup guide
- [README.md](./README.md) - Full project documentation
- [ARCHITECTURE.md](./ARCHITECTURE.md) - System architecture
- [DEVELOPMENT.md](./DEVELOPMENT.md) - Development guide
- [.vscode/README.md](./.vscode/README.md) - VS Code tasks reference
