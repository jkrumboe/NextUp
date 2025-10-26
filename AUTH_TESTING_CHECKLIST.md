# Authentication System Testing Checklist

## ✅ Quick Test Guide

### Prerequisites

- [ ] Backend is running (port 3000)
- [ ] Database is running (PostgreSQL)
- [ ] Mobile app is running (Expo)

### Start Everything

```powershell
# From workspace root
cd c:\repos\NextUp

# Option 1: Use VS Code task
# Run task: "Start All (Dev Servers)"

# Option 2: Manual start
pnpm dev
```

---

## Test Cases

### 1. ✅ User Registration (Sign Up)

**Steps:**

1. Open mobile app
2. Should see login screen (if first time)
3. Click "Create Account" button
4. Fill in registration form:
   - Email: `testuser@example.com`
   - Username: `testuser`
   - Password: `Test1234!`
5. Click "Sign Up"

**Expected Results:**

- [ ] No validation errors
- [ ] Request sent to backend
- [ ] User created in database
- [ ] Tokens stored in SecureStore
- [ ] Redirected to home screen (tabs)
- [ ] User is logged in

**Verify:**

- Check terminal for `POST /api/auth/register` request
- Check database: `SELECT * FROM "User";`

---

### 2. ✅ User Login (Sign In)

**Steps:**

1. If logged in, logout first (see test #5)
2. On login screen, fill in:
   - Email: `testuser@example.com`
   - Password: `Test1234!`
3. Click "Sign In"

**Expected Results:**

- [ ] No validation errors
- [ ] Request sent to backend
- [ ] Tokens stored in SecureStore
- [ ] Redirected to home screen (tabs)
- [ ] User is logged in

**Verify:**

- Check terminal for `POST /api/auth/login` request
- Profile tab shows correct username

---

### 3. ✅ View Profile Data

**Steps:**

1. While logged in, navigate to Profile tab
2. Observe displayed information

**Expected Results:**

- [ ] Shows correct username (e.g., `@testuser`)
- [ ] Shows user avatar or placeholder
- [ ] Stats are displayed
- [ ] Favorite vibes section visible

---

### 4. ✅ View Settings with User Data

**Steps:**

1. Navigate to Profile tab
2. Click Settings icon (top right)
3. Scroll through settings

**Expected Results:**

- [ ] Account section shows actual username
- [ ] Email address displayed correctly
- [ ] All settings options visible
- [ ] Logout button at bottom

---

### 5. ✅ User Logout

**Steps:**

1. In Settings screen, scroll to bottom
2. Click "Log Out" button (red)
3. Confirm in modal

**Expected Results:**

- [ ] Confirmation modal appears
- [ ] After confirmation, tokens deleted
- [ ] Redirected to login screen
- [ ] Cannot access protected routes
- [ ] Back button doesn't go to tabs

**Verify:**

- Try manually navigating to `/(tabs)` - should redirect to login

---

### 6. ✅ Route Protection

**Steps:**

1. Make sure you're logged out
2. Try to access protected screens

**Expected Results:**

- [ ] `/(tabs)` redirects to `/auth/login`
- [ ] Cannot access Home, Search, Add, Community, Profile
- [ ] Can only access Login and Register screens

**After Login:**

- [ ] Can access all tab screens
- [ ] Can view profile
- [ ] Can access settings

---

### 7. ✅ Token Refresh (Advanced)

**Steps:**

1. Login successfully
2. Wait for access token to expire (15 minutes by default)
3. Make an API request (search for media, navigate around)

**Expected Results:**

- [ ] Request initially fails with 401
- [ ] Refresh token automatically used
- [ ] New access token obtained
- [ ] Original request retried and succeeds
- [ ] User remains logged in
- [ ] No manual re-login required

**Verify:**

- Check terminal for `POST /api/auth/refresh` request
- App continues working without interruption

**To speed up this test:**
Temporarily change in `.env`:

```bash
JWT_ACCESS_EXPIRATION=30s
```

Then restart backend.

---

### 8. ✅ Session Persistence

**Steps:**

1. Login successfully
2. Close the app completely
3. Reopen the app

**Expected Results:**

- [ ] Loading state briefly shown
- [ ] Automatically logged in
- [ ] Redirected to home screen
- [ ] Profile shows correct user data
- [ ] No need to login again

**Note:** Session persists for 7 days (refresh token expiry)

---

### 9. ✅ Invalid Login Attempts

**Steps:**

1. On login screen, try:
   - Wrong email: `wrong@example.com`
   - Correct password: `Test1234!`
2. Click "Sign In"

**Expected Results:**

- [ ] Error message: "Invalid credentials"
- [ ] No redirect
- [ ] Still on login screen

**Steps 2:**

1. Try:
   - Correct email: `testuser@example.com`
   - Wrong password: `wrongpassword`
2. Click "Sign In"

**Expected Results:**

- [ ] Error message: "Invalid credentials"
- [ ] No redirect
- [ ] Still on login screen

---

### 10. ✅ Duplicate Registration

**Steps:**

1. Logout if logged in
2. Try to register with existing credentials:
   - Email: `testuser@example.com`
   - Username: `testuser`
   - Password: `AnyPassword123`
3. Click "Sign Up"

**Expected Results:**

- [ ] Error message: "Email already in use"
- [ ] No user created
- [ ] Still on registration screen

---

### 11. ✅ Form Validation

**Registration form:**

- [ ] Email must be valid format
- [ ] Username min 3 chars, max 30 chars
- [ ] Username only letters, numbers, `-`, `_`
- [ ] Password min 8 chars
- [ ] Error messages shown for invalid inputs

**Login form:**

- [ ] Email must be valid format
- [ ] Password required
- [ ] Error messages shown

---

## Common Issues & Solutions

### Issue: "Network Error" or "Cannot connect"

**Solution:**

- Ensure backend is running on port 3000
- Check `app.json` has correct API URL
- Verify database is running
- Check firewall/antivirus settings

### Issue: "Invalid credentials" but password is correct

**Solution:**

- Ensure user exists in database
- Check password was hashed correctly
- Verify email matches exactly (case-sensitive)
- Try creating new account

### Issue: App shows login screen after refresh

**Solution:**

- Access token may have expired
- Refresh token may be invalid
- Check backend logs for errors
- Try clearing app data and re-login

### Issue: "Unable to resolve module" errors

**Solution:**

- These are eslint errors, ignore them
- App will still run correctly
- Run `pnpm install` if modules missing

---

## Backend API Testing (Optional)

### Using cURL or Postman

**Register:**

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "api@example.com",
    "username": "apiuser",
    "password": "ApiTest123"
  }'
```

**Login:**

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "api@example.com",
    "password": "ApiTest123"
  }'
```

**Get Profile (with token):**

```bash
curl -X GET http://localhost:3000/api/users/me \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

**Refresh Token:**

```bash
curl -X POST http://localhost:3000/api/auth/refresh \
  -H "Content-Type: application/json" \
  -d '{
    "refreshToken": "YOUR_REFRESH_TOKEN"
  }'
```

---

## Database Verification

### Check Users

```sql
-- Connect to PostgreSQL
psql -U vibelink -d vibelink

-- View all users
SELECT id, email, username, "createdAt" FROM "User";

-- Check specific user
SELECT * FROM "User" WHERE email = 'testuser@example.com';
```

---

## Success Criteria

All tests pass when:

- ✅ Users can register with valid credentials
- ✅ Users can login with correct credentials
- ✅ Invalid credentials are rejected
- ✅ Duplicate registrations are prevented
- ✅ Form validation works correctly
- ✅ Tokens are stored and used automatically
- ✅ Protected routes redirect when not logged in
- ✅ User data displays correctly in profile/settings
- ✅ Logout works and clears session
- ✅ Sessions persist across app restarts
- ✅ Token refresh happens automatically

---

## Next Steps After Testing

If all tests pass:

1. ✅ Auth system is fully functional
2. Consider adding additional features:
   - Email verification
   - Password reset
   - Social authentication
   - Profile editing
   - Avatar upload

If tests fail:

1. Check backend logs for errors
2. Verify database is running and accessible
3. Ensure .env file has correct configuration
4. Check mobile app can reach backend (network)
5. Review error messages for specific issues
6. Refer to AUTH_SYSTEM_OVERVIEW.md for troubleshooting
