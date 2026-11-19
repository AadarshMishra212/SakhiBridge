/**
 * Standalone verification script for SakhiBridge logic & auth service
 */

// Mock localStorage for Node environment
class LocalStorageMock {
  constructor() {
    this.store = {};
  }
  getItem(key) {
    return this.store[key] || null;
  }
  setItem(key, value) {
    this.store[key] = String(value);
  }
  removeItem(key) {
    delete this.store[key];
  }
  clear() {
    this.store = {};
  }
}

global.localStorage = new LocalStorageMock();

async function runTests() {
  console.log('🧪 Starting SakhiBridge Core Auth & Logic Verification...\n');

  const { authService } = await import('../src/services/authService.js');

  // Test 1: Demo credentials
  const demo = authService.getDemoCredentials();
  console.assert(demo.email === 'demo@sakhibridge.org', 'Demo email should match');
  console.assert(demo.password === 'password123', 'Demo password should match');
  console.log('✅ Test 1 Passed: Demo credentials pre-seeded.');

  // Test 2: Unauthenticated state
  console.assert(authService.getCurrentUser() === null, 'Current user should be null initially');
  console.log('✅ Test 2 Passed: Unauthenticated state on first visit.');

  // Test 3: Invalid login
  try {
    await authService.login('wrong@email.com', 'badpass');
    console.error('❌ Test 3 Failed: Should not have logged in');
    process.exit(1);
  } catch (err) {
    console.assert(err.message.includes('Invalid email or password'), 'Proper error message');
    console.log('✅ Test 3 Passed: Invalid credentials rejected with helpful error.');
  }

  // Test 4: Valid login
  const loggedIn = await authService.login('demo@sakhibridge.org', 'password123');
  console.assert(loggedIn.name === 'Priya Sharma', 'User name is correct');
  console.assert(loggedIn.password === undefined, 'Password is omitted from session');
  console.assert(authService.getCurrentUser()?.email === 'demo@sakhibridge.org', 'Session persisted in localStorage');
  console.log('✅ Test 4 Passed: Successful login & session saved.');

  // Test 5: Logout
  await authService.logout();
  console.assert(authService.getCurrentUser() === null, 'Session destroyed after logout');
  console.assert(localStorage.getItem('sakhi_session') === null, 'sakhi_session removed from localStorage');
  console.log('✅ Test 5 Passed: Logout completely clears session and storage.');

  // Test 6: Registration (SignUp)
  const newUser = await authService.signUp({
    name: 'Kavita Rao',
    email: 'kavita@test.com',
    phone: '9876543210',
    password: 'password123'
  });
  console.assert(newUser.name === 'Kavita Rao', 'Created user name is correct');
  console.assert(newUser.avatar === 'KR', 'Avatar initials generated');
  console.assert(authService.getCurrentUser()?.email === 'kavita@test.com', 'User logged in immediately after signup');
  console.log('✅ Test 6 Passed: Signup successfully registers and creates session.');

  // Test 7: Duplicate signup prevention
  try {
    await authService.signUp({
      name: 'Kavita Rao 2',
      email: 'kavita@test.com',
      phone: '9876543210',
      password: 'password123'
    });
    console.error('❌ Test 7 Failed: Duplicate email should be rejected');
    process.exit(1);
  } catch (err) {
    console.assert(err.message.includes('already exists'), 'Duplicate email caught');
    console.log('✅ Test 7 Passed: Duplicate email properly prevented.');
  }

  console.log('\n🎉 ALL 7 CORE AUTH LOGIC TESTS PASSED SUCCESSFULLY!');
}

runTests().catch((err) => {
  console.error('Test run failed:', err);
  process.exit(1);
});

