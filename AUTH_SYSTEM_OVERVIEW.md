# NextUp Authentication System - Complete Overview

## ✅ System Status

**The authentication system is fully functional and includes:**

- User Registration (Sign Up)
- User Login (Sign In)
- Token-based Authentication (JWT)
- Automatic Token Refresh
- User Logout
- Route Protection
- Persistent Sessions

---

## 🏗️ Architecture

### Backend (NestJS)

**Location:** `apps/backend/src/modules/auth/`

#### Key Components:

1. **Auth Controller** (`auth.controller.ts`)
   - `POST /api/auth/register` - Register new user
   - `POST /api/auth/login` - Login existing user
   - `POST /api/auth/refresh` - Refresh access token

2. **Auth Service** (`auth.service.ts`)
   - Password hashing with bcrypt
   - JWT token generation (access + refresh tokens)
   - Token validation and refresh logic
   - User creation and validation

3. **JWT Strategy** (`strategies/jwt.strategy.ts`)
   - Passport JWT authentication strategy
   - Validates access tokens on protected routes
   - Extracts user payload from tokens

4. **JWT Auth Guard** (`guards/jwt-auth.guard.ts`)
   - Protects routes requiring authentication
   - Used with `@UseGuards(JwtAuthGuard)` decorator

5. **Environment Configuration** (`.env`)
   ```bash
   JWT_ACCESS_SECRET=your-secret-key-change-in-production
   JWT_REFRESH_SECRET=your-refresh-secret-key-change-in-production
   JWT_ACCESS_EXPIRATION=15m
   JWT_REFRESH_EXPIRATION=7d
   ```

### Frontend (React Native + Expo)

**Location:** `apps/mobile/features/auth/`

#### Key Components:

1. **AuthProvider** (`AuthProvider.tsx`)
   - React Context for global auth state
   - Manages user session
   - Provides auth methods: `login()`, `register()`, `logout()`
   - Auto-checks authentication on app load
   - Stores tokens in secure storage

2. **API Client** (`lib/api.ts`)
   - Axios instance with interceptors
   - Automatically attaches access token to requests
   - Handles 401 errors and token refresh
   - Falls back to login on refresh failure

3. **Auth Screens**
   - `app/auth/login.tsx` - Login form with validation
   - `app/auth/register.tsx` - Registration form with validation
   - Form validation using React Hook Form + Zod schemas

4. **Route Protection**
   - `app/index.tsx` - Redirects unauthenticated users to login
   - `app/(tabs)/_layout.tsx` - Protects all tab screens
   - Loading states prevent flash of wrong screen

---

## 🔐 Authentication Flow

### Registration Flow

1. User fills registration form (email, username, password)
2. Form validation via Zod schema
3. `POST /api/auth/register` with credentials
4. Backend validates and creates user (hashed password)
5. Backend returns access token, refresh token, and user data
6. Tokens stored in Expo SecureStore
7. User state updated in AuthProvider
8. Automatic redirect to main app

### Login Flow

1. User fills login form (email, password)
2. Form validation via Zod schema
3. `POST /api/auth/login` with credentials
4. Backend validates credentials
5. Backend returns access token, refresh token, and user data
6. Tokens stored in Expo SecureStore
7. User state updated in AuthProvider
8. Automatic redirect to main app

### Token Refresh Flow

1. API request receives 401 Unauthorized
2. Request interceptor catches error
3. Retrieves refresh token from SecureStore
4. `POST /api/auth/refresh` with refresh token
5. Backend validates refresh token
6. Backend returns new access token
7. New token stored in SecureStore
8. Original request retried with new token
9. If refresh fails, user logged out and redirected to login

### Logout Flow

1. User clicks logout in Settings screen
2. Confirmation modal shown
3. `logout()` method called from AuthProvider
4. Access and refresh tokens deleted from SecureStore
5. User state cleared (set to null)
6. Automatic redirect to login screen

---

## 📁 File Structure

### Backend Files

```
apps/backend/src/modules/auth/
├── auth.controller.ts      # REST endpoints
├── auth.service.ts         # Business logic
├── auth.module.ts          # Module configuration
├── dto/
│   └── auth.dto.ts        # Data transfer objects & validation
├── guards/
│   └── jwt-auth.guard.ts  # Route protection
└── strategies/
    └── jwt.strategy.ts    # JWT validation strategy

apps/backend/src/modules/users/
├── users.controller.ts     # User endpoints
├── users.service.ts        # User management
└── dto/
    └── update-user.dto.ts # User update validation
```

### Frontend Files

```
apps/mobile/
├── features/auth/
│   ├── AuthProvider.tsx   # Auth context & state
│   └── useAuth.ts         # Auth hook export
├── app/
│   ├── index.tsx          # Root with auth redirect
│   ├── auth/
│   │   ├── _layout.tsx   # Auth screens layout
│   │   ├── login.tsx     # Login screen
│   │   └── register.tsx  # Registration screen
│   ├── (tabs)/
│   │   ├── _layout.tsx   # Protected tabs layout
│   │   └── profile.tsx   # User profile display
│   └── settings.tsx       # Settings with logout
└── lib/
    └── api.ts             # API client with interceptors
```

---

## 🔑 Key Features

### Security Features

- ✅ Password hashing with bcrypt (salt rounds: 10)
- ✅ JWT tokens with expiration
- ✅ Separate access and refresh tokens
- ✅ Secure token storage (Expo SecureStore)
- ✅ Automatic token refresh on expiration
- ✅ Protected API routes with guards
- ✅ CORS configuration for mobile app

### User Experience Features

- ✅ Persistent login sessions
- ✅ Automatic authentication check on app load
- ✅ Loading states during auth operations
- ✅ Form validation with helpful error messages
- ✅ Logout confirmation modal
- ✅ Automatic redirects based on auth state
- ✅ Display real user data in profile/settings

---

## 🧪 Testing the Auth System

### 1. Start the Backend

```powershell
cd c:\repos\NextUp
pnpm dev
```

Or use VS Code task: **"Start All (Dev Servers)"**

### 2. Start the Mobile App

The mobile app should start automatically with the dev server.
If not:

```powershell
cd c:\repos\NextUp\apps\mobile
pnpm dev
```

### 3. Test Registration

1. Open app (should show login screen if not authenticated)
2. Click "Create Account"
3. Fill in:
   - Email: `test@example.com`
   - Username: `testuser`
   - Password: `password123`
4. Click "Sign Up"
5. Should redirect to home screen

### 4. Test Logout

1. Navigate to Profile tab
2. Click Settings icon (top right)
3. Scroll to bottom
4. Click "Log Out"
5. Confirm in modal
6. Should redirect to login screen

### 5. Test Login

1. On login screen, enter:
   - Email: `test@example.com`
   - Password: `password123`
2. Click "Sign In"
3. Should redirect to home screen
4. Profile should show correct username/email

### 6. Test Token Refresh

1. Login and stay logged in
2. Wait 15+ minutes (or modify JWT_ACCESS_EXPIRATION to shorter time)
3. Make an API request (search, add media, etc.)
4. Should work seamlessly (token auto-refreshed)

### 7. Test Protected Routes

1. Logout
2. Try to manually navigate to `/(tabs)` route
3. Should redirect to login
4. Login
5. Should now access tabs

---

## 🔧 Configuration

### Backend Configuration (`.env`)

```bash
# JWT Settings
JWT_ACCESS_SECRET=your-secret-key-change-in-production
JWT_REFRESH_SECRET=your-refresh-secret-key-change-in-production
JWT_ACCESS_EXPIRATION=15m
JWT_REFRESH_EXPIRATION=7d

# Database
DATABASE_URL="postgresql://vibelink:vibelink@localhost:5432/vibelink?schema=public"

# Server
PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:8081
```

### Mobile Configuration (`app.json`)

```json
{
  "extra": {
    "apiUrl": "http://localhost:3000/api"
  }
}
```

---

## 📝 API Endpoints

### Public Endpoints (No Auth Required)

- `POST /api/auth/register` - Create new account
- `POST /api/auth/login` - Login to existing account
- `POST /api/auth/refresh` - Refresh access token

### Protected Endpoints (Auth Required)

- `GET /api/users/me` - Get current user profile
- `PATCH /api/users/me` - Update current user profile
- All media, link, rating, recommendation endpoints

---

## 🐛 Troubleshooting

### "Invalid credentials" on login

- Check password is correct
- Verify email matches registered email
- Ensure backend is running
- Check database has user record

### "401 Unauthorized" errors

- Access token may be expired
- Check if refresh token is valid
- Try logging out and back in
- Verify JWT secrets match in backend .env

### App stuck on loading screen

- Check if backend is running on port 3000
- Verify API URL in `app.json` is correct
- Check network connectivity
- Look for errors in terminal/console

### Tokens not persisting

- Expo SecureStore may not be available
- Check app permissions
- Try clearing app data and re-login
- Verify SecureStore is properly configured

### Auto-logout after app restart

- This is expected if tokens expired
- Refresh token valid for 7 days
- After 7 days, must login again

---

## 🚀 Next Steps / Enhancements

### Potential Improvements

1. **Email Verification**
   - Send verification email on registration
   - Require email confirmation before full access

2. **Password Reset**
   - Forgot password flow
   - Password reset via email link

3. **Social Auth**
   - Google OAuth
   - Apple Sign In
   - GitHub OAuth

4. **Multi-Factor Authentication**
   - SMS verification
   - Authenticator app (TOTP)

5. **Session Management**
   - View active sessions
   - Remote logout from other devices
   - Device fingerprinting

6. **Enhanced Security**
   - Rate limiting on auth endpoints
   - Account lockout after failed attempts
   - IP-based restrictions
   - Password strength requirements

7. **User Profiles**
   - Avatar upload
   - Bio editing
   - Privacy settings
   - Account deletion

---

## 📚 Related Documentation

- [NestJS Authentication](https://docs.nestjs.com/security/authentication)
- [Passport JWT Strategy](https://www.passportjs.org/packages/passport-jwt/)
- [Expo SecureStore](https://docs.expo.dev/versions/latest/sdk/securestore/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod Validation](https://zod.dev/)

---

## ✨ Summary

The NextUp authentication system is **fully functional** with:

- ✅ Complete registration and login flows
- ✅ Secure JWT-based authentication
- ✅ Automatic token refresh
- ✅ Proper logout functionality
- ✅ Route protection on frontend
- ✅ Protected API endpoints on backend
- ✅ Persistent sessions with secure storage
- ✅ User profile display with real data

**Everything works end-to-end!** Users can sign up, log in, use the app, and log out seamlessly.
