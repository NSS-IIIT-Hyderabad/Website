# CAS Authentication Integration

## Overview
The frontend now uses IIIT Hyderabad's CAS (Central Authentication Service) for user authentication.

## How It Works

### 1. Login Flow
1. User clicks "Login" button in navbar
2. Redirected to backend `/login` endpoint (e.g., `http://localhost:8000/login`)
3. Backend redirects to CAS: `https://login.iiit.ac.in/cas/login`
4. User authenticates with IIIT credentials
5. CAS redirects back to backend with authentication token
6. Backend validates token and redirects to frontend callback: `/api/auth/callback?uid=...&email=...&name=...`
7. Frontend sets cookies with user data
8. User is redirected to original page or home

### 2. Logout Flow
1. User clicks "Logout" from profile dropdown
2. All cookies are cleared from browser
3. User is redirected to CAS logout: `https://login.iiit.ac.in/cas/logout`
4. CAS clears its session and user is logged out

### 3. User Data Storage
User data is stored in browser cookies:
- `uid`: User ID (roll number or email username)
- `email`: User's email address
- `name`: User's full name

Cookies expire after 7 days.

## Files Modified/Created

### Created:
- `src/components/common/ProfileDropdown.tsx` - Profile dropdown menu component
- `src/app/api/auth/callback/route.ts` - API route to handle login callback and set cookies

### Modified:
- `src/utils/loginNlogout.tsx` - Updated login/logout functions for CAS
- `src/components/common/Navbar.tsx` - Integrated ProfileDropdown component

## Features

### Profile Dropdown Menu
When logged in, users see a profile dropdown with:
- Profile image with India flag border
- User's name and email
- "View Profile" button (links to `/me/profile/[uid]`)
- "Logout" button

### Login Button
When not logged in, users see a "Login" button that initiates CAS authentication.

## Backend Requirements

The backend must implement:

### 1. `/login` Endpoint
```python
# Should redirect to CAS with service URL
# Example:
@app.get("/login")
def login():
    service_url = "http://localhost:3000/api/auth/callback"
    cas_login_url = f"https://login.iiit.ac.in/cas/login?service={service_url}"
    return RedirectResponse(cas_login_url)
```

### 2. Handle CAS Callback
After CAS authentication, validate the ticket and redirect to frontend:
```python
# Validate CAS ticket
# Extract user data (uid, email, name)
# Redirect to: http://localhost:3000/api/auth/callback?uid=...&email=...&name=...
```

## Environment Variables

Add to `.env.local`:
```bash
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
```

## Usage

### Check if User is Logged In
```typescript
import { getUserData } from '@/utils/loginNlogout';

const userData = getUserData();
if (userData) {
    console.log('User:', userData.uid, userData.email, userData.name);
}
```

### Trigger Login
```typescript
import { login } from '@/utils/loginNlogout';

// Login and return to current page
login();

// Login and redirect to specific page
login('/members');
```

### Trigger Logout
```typescript
import { logout } from '@/utils/loginNlogout';

logout(); // Clears cookies and redirects to CAS logout
```

## Security Notes

1. Cookies are set with `httpOnly: false` to allow JavaScript access for client-side rendering
2. Cookies use `secure: true` in production (HTTPS only)
3. `sameSite: 'lax'` prevents CSRF attacks
4. 7-day expiration for user convenience

## Testing

1. Start backend: `python main.py` (or your backend command)
2. Start frontend: `npm run dev`
3. Click "Login" in navbar
4. Should redirect to CAS login page
5. Enter IIIT credentials
6. Should redirect back and show profile dropdown
7. Click dropdown to see profile options
8. Click "Logout" to sign out
