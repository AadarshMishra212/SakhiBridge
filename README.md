# SakhiBridge 🌸

A clean, modern, **mobile-first base web application** designed for women's safety, solidarity, and peer support. Built with **React 18 + Vite + Tailwind CSS + React Router v6**.

This repository is structured as a plug-and-play frontend base that you can customize and connect to any backend (Firebase, Supabase, Express, Django, etc.).

---

## 🚀 Quick Start

### 1. Install dependencies
```bash
npm install
```

### 2. Start local development server
```bash
npm run dev
```
Open **[http://localhost:5173](http://localhost:5173)** in your browser (use Mobile device emulation mode in DevTools for the ideal 360–430px experience).

### 3. Build for production
```bash
npm run build
npm run preview
```

---

## 🔑 Demo Account Credentials

A pre-seeded mock account is available in `localStorage` for testing:
- **Email:** `demo@sakhibridge.org`
- **Password:** `password123`
- *(Or click the **"Auto-fill"** chip on the login screen to populate these credentials in one click).*

You can also create any new account on `/signup`.

---

## 📱 Core Architecture & Flow

1. **First-visit Session Check:** When the site opens at `/`, it checks `localStorage` for an active session (`sakhi_session`).
   - If not logged in &rarr; Automatically redirects to `/login`.
   - If logged in &rarr; Automatically redirects to `/home`.
2. **Route Guards:**
   - **`ProtectedRoute`:** Guards `/home`, `/community`, `/support`, and `/profile`. Unauthenticated visitors are immediately bounced to `/login`.
   - **`PublicOnlyRoute`:** Prevents authenticated users from seeing `/login` or `/signup` by redirecting them to `/home`.
3. **Logout & Back-Button Protection:**
   - Logging out clears `sakhi_session` and calls `navigate('/login', { replace: true })`.
   - If the user taps the browser back button after logout, `ProtectedRoute` re-evaluates the authentication state, detects `user === null`, and immediately redirects to `/login`. Protected screens cannot be reopened.

---

## 📁 Project Structure

```
SAKHIBRIDGE/
├── public/
│   └── favicon.svg              # SakhiBridge logo mark favicon
├── src/
│   ├── components/
│   │   ├── AppLayout.jsx        # Mobile shell wrapper (Header + Content + BottomNav)
│   │   ├── BottomNav.jsx        # Fixed bottom navigation bar (4 tabs)
│   │   ├── FeatureCard.jsx      # Rounded 16px interactive feature card
│   │   ├── Header.jsx           # Top branding bar with Safe status indicator
│   │   ├── InputField.jsx       # 44px+ touch-friendly input with eye password toggle
│   │   ├── Modal.jsx            # Modern accessible <dialog> modal (with overscroll contain)
│   │   └── PrimaryButton.jsx    # 44px+ touch button with loading spinner & variants
│   ├── context/
│   │   └── AuthContext.jsx      # React Context providing user, login, signUp, logout
│   ├── pages/
│   │   ├── Community.jsx        # Feed of stories, advice, and post creation
│   │   ├── Home.jsx             # Personalized greeting + 4 feature cards
│   │   ├── Login.jsx            # Email + password validation, forgot password modal
│   │   ├── NotFound.jsx         # Friendly 404 page with return link
│   │   ├── Profile.jsx          # Profile details, safety toggles, and Logout
│   │   ├── Signup.jsx           # Name, email, phone, password registration
│   │   └── Support.jsx          # Large pulse SOS button, modal, and 24/7 helplines
│   ├── routes/
│   │   ├── AppRoutes.jsx        # Central route definitions
│   │   ├── ProtectedRoute.jsx   # Route guard for private pages
│   │   └── PublicOnlyRoute.jsx  # Route guard for login & signup
│   ├── services/
│   │   └── authService.js       # Mock auth service (localStorage-based with TODOs)
│   ├── styles/
│   │   └── index.css            # Tailwind directives + <dialog> overscroll styles
│   ├── App.jsx                  # Root router & context wrapper
│   └── main.jsx                 # Entry point
├── index.html                   # HTML template with Poppins font & viewport meta
├── tailwind.config.js           # Theme configuration (colors, font, border radius)
├── vite.config.js               # Vite build configuration
└── package.json                 # Project dependencies
```

---

## 🎨 Where to Customize

### 1. Theme (Colors, Fonts, Spacing) &rarr; `tailwind.config.js`
All colors and fonts are centralized here. Changing them updates the entire application:
```js
// tailwind.config.js
theme: {
  extend: {
    colors: {
      primary: {
        DEFAULT: '#FE9179', // Ballet Slipper coral-pink
        light: '#FFA693',
        dark: '#E27660',
        soft: '#FFF0EC',
      },
      lace: {
        DEFAULT: '#FFEDD1', // Lace warm ivory cream
        light: '#FFF8EC',
        dark: '#F5DCB5',
      },
      accent: {
        DEFAULT: '#FF6B8B', // Warm ballet rose accent
        light: '#FF8DA6',
        dark: '#E24C6F',
      },
      // ...
    },
    fontFamily: {
      sans: ['Poppins', 'sans-serif'], // Change font here
    },
    borderRadius: {
      'brand': '16px', // Change global corner radius here
    }
  }
}
```

### 2. Authentication & Real Backend &rarr; `src/services/authService.js`
Search for `TODO: REPLACE WITH REAL BACKEND / FIREBASE AUTH` in `src/services/authService.js`.
- **Firebase Auth:** Replace `authService.login()` with `signInWithEmailAndPassword`, `authService.signUp()` with `createUserWithEmailAndPassword`, and `authService.logout()` with `signOut`.
- **REST / GraphQL API:** Replace `localStorage` operations with your `fetch()` or `axios` API calls returning JWT tokens.

### 3. Bottom Navigation Tabs &rarr; `src/components/BottomNav.jsx`
The bottom navigation bar tabs are defined in the `navItems` array:
```jsx
const navItems = [
  { to: '/home', label: 'Home', icon: Home },
  { to: '/community', label: 'Community', icon: Users },
  { to: '/support', label: 'Support', icon: ShieldAlert, isSpecial: true },
  { to: '/profile', label: 'Profile', icon: User }
];
```
Add, remove, or reorder entries to adjust the bottom bar.

### 4. Home Feature Cards &rarr; `src/pages/Home.jsx`
The 4 pillars are defined in the `featureCards` array in `src/pages/Home.jsx`. You can easily add more cards, change icons, or update navigation targets.

---

## 🛡️ Modern Web Guidance & Accessibility
- **Native `<dialog>` Modal:** The confirmation modal uses the standard HTML `<dialog>` element with `overscroll-behavior: contain` and `showModal()`.
- **Touch-Friendly Standards:** All buttons and interactive touch targets strictly meet the &ge; 44px height accessibility guideline (`min-h-touch`).
- **Mobile Keyboards:** Form inputs specify appropriate `inputMode` (`email`, `tel`, `text`) to prompt the correct soft keyboard on mobile devices.

