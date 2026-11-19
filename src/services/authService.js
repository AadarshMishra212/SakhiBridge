/**
 * SAKHIBRIDGE - Mock Authentication Service
 * 
 * Manages local user registration, login verification, and active sessions
 * via browser localStorage. Designed for easy swap with real backends.
 * 
 * ============================================================================
 * TODO: REPLACE WITH REAL BACKEND / FIREBASE AUTH
 * ============================================================================
 * When connecting Firebase Auth:
 * 1. Install firebase: `npm install firebase`
 * 2. Initialize Firebase config in `src/services/firebase.js`
 * 3. Replace `login()` with `signInWithEmailAndPassword(auth, email, password)`
 * 4. Replace `signUp()` with `createUserWithEmailAndPassword(auth, email, password)`
 *    and update profile (`updateProfile`) or write additional fields to Firestore.
 * 5. Replace `logout()` with `signOut(auth)`
 * 6. Replace `getCurrentUser()` with `auth.currentUser` or `onAuthStateChanged(auth, ...)`
 * 
 * If using a custom REST API (Node/Express, Django, FastAPI, Supabase):
 * - POST /api/auth/login -> return JWT token + user profile
 * - POST /api/auth/signup -> return JWT token + user profile
 * - POST /api/auth/logout -> invalidate refresh token
 * - GET /api/auth/me -> validate token & fetch current user
 * ============================================================================
 */

const STORAGE_KEY_USERS = 'sakhi_users';
const STORAGE_KEY_SESSION = 'sakhi_session';

// Pre-seeded demo account for quick testing
const DEFAULT_DEMO_USER = {
  id: 'usr_demo_101',
  name: 'Priya Sharma',
  email: 'demo@sakhibridge.org',
  phone: '9876543210',
  password: 'password123',
  createdAt: '2026-01-15T10:00:00.000Z',
  avatar: 'PS'
};

/**
 * Initialize mock users in localStorage if none exist
 */
const initUsers = () => {
  const existing = localStorage.getItem(STORAGE_KEY_USERS);
  if (!existing) {
    localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify([DEFAULT_DEMO_USER]));
  }
};

// Ensure users store is initialized
initUsers();

export const authService = {
  /**
   * Returns pre-seeded demo credentials for convenience
   */
  getDemoCredentials() {
    return {
      email: DEFAULT_DEMO_USER.email,
      password: DEFAULT_DEMO_USER.password
    };
  },

  /**
   * Retrieve all registered users from localStorage
   * @returns {Array} List of users
   */
  getUsers() {
    try {
      const usersJson = localStorage.getItem(STORAGE_KEY_USERS);
      return usersJson ? JSON.parse(usersJson) : [DEFAULT_DEMO_USER];
    } catch {
      return [DEFAULT_DEMO_USER];
    }
  },

  /**
   * Get currently authenticated session user
   * @returns {Object|null}
   */
  getCurrentUser() {
    try {
      const sessionJson = localStorage.getItem(STORAGE_KEY_SESSION);
      if (!sessionJson) return null;
      return JSON.parse(sessionJson);
    } catch {
      localStorage.removeItem(STORAGE_KEY_SESSION);
      return null;
    }
  },

  /**
   * Mock login with email and password
   * Simulates network latency (400ms)
   * 
   * @param {string} email 
   * @param {string} password 
   * @returns {Promise<Object>} Safe user object (without password)
   */
  async login(email, password) {
    // Simulate brief network latency
    await new Promise((resolve) => setTimeout(resolve, 400));

    // Normalize email
    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    const users = this.getUsers();
    const user = users.find(
      (u) => u.email.toLowerCase() === cleanEmail && u.password === cleanPassword
    );

    if (!user) {
      throw new Error('Invalid email or password. Please check your credentials.');
    }

    // Omit sensitive password from session data
    const safeUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone || '',
      createdAt: user.createdAt,
      avatar: user.name
        ? user.name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2)
        : 'SB'
    };

    // Save active session to localStorage
    localStorage.setItem(STORAGE_KEY_SESSION, JSON.stringify(safeUser));
    return safeUser;
  },

  /**
   * Mock user registration
   * Simulates network latency (500ms)
   * 
   * @param {Object} userData - { name, email, phone, password }
   * @returns {Promise<Object>} Safe created user object
   */
  async signUp({ name, email, phone, password }) {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const cleanEmail = email.trim().toLowerCase();
    const cleanName = name.trim();
    const cleanPhone = phone.trim();

    const users = this.getUsers();
    const emailExists = users.some((u) => u.email.toLowerCase() === cleanEmail);

    if (emailExists) {
      throw new Error('An account with this email address already exists.');
    }

    const newUser = {
      id: `usr_${Date.now()}`,
      name: cleanName,
      email: cleanEmail,
      phone: cleanPhone,
      password: password,
      createdAt: new Date().toISOString(),
      avatar: cleanName
        ? cleanName
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2)
        : 'SB'
    };

    // Save user to mock DB
    users.push(newUser);
    localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(users));

    // Log the user in immediately after signup
    const safeUser = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
      createdAt: newUser.createdAt,
      avatar: newUser.avatar
    };

    localStorage.setItem(STORAGE_KEY_SESSION, JSON.stringify(safeUser));
    return safeUser;
  },

  /**
   * Mock logout - destroys session and clears localStorage session key
   */
  async logout() {
    localStorage.removeItem(STORAGE_KEY_SESSION);
    return true;
  },

  /**
   * Update profile information for current session user
   * @param {Object} updates - { name, phone }
   */
  async updateProfile(updates) {
    const currentUser = this.getCurrentUser();
    if (!currentUser) throw new Error('No active session.');

    const updated = {
      ...currentUser,
      ...updates,
      avatar: updates.name
        ? updates.name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2)
        : currentUser.avatar
    };

    // Update session
    localStorage.setItem(STORAGE_KEY_SESSION, JSON.stringify(updated));

    // Update users array
    const users = this.getUsers();
    const idx = users.findIndex((u) => u.id === currentUser.id);
    if (idx !== -1) {
      users[idx] = { ...users[idx], ...updates, avatar: updated.avatar };
      localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(users));
    }

    return updated;
  }
};

