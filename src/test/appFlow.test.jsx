import React from 'react';
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from '../context/ThemeContext';
import { ThemeToggle } from '../components/ThemeToggle';
import { AuthProvider } from '../context/AuthContext';
import { AppRoutes } from '../routes/AppRoutes';
import { authService } from '../services/authService';

const renderWithRouter = (initialRoute = '/') => {
  return render(
    <MemoryRouter initialEntries={[initialRoute]} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <ThemeProvider>
        <AuthProvider>
          <ThemeToggle />
          <AppRoutes />
        </AuthProvider>
      </ThemeProvider>
    </MemoryRouter>
  );
};

describe('SakhiBridge Core Application Flow', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('1. redirects unauthenticated user from "/" to "/login" on first visit', async () => {
    renderWithRouter('/');

    await waitFor(() => {
      expect(screen.getByText(/Welcome to/i)).toBeInTheDocument();
      expect(screen.getAllByText(/SakhiBridge/i).length).toBeGreaterThan(0);
      expect(screen.getByRole('button', { name: /Log In/i })).toBeInTheDocument();
    });
  });

  it('2. redirects unauthenticated user from protected "/home" to "/login"', async () => {
    renderWithRouter('/home');

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Log In/i })).toBeInTheDocument();
    });
  });

  it('3. validates email and password fields on login', async () => {
    renderWithRouter('/login');

    const submitBtn = await screen.findByRole('button', { name: /Log In/i });
    fireEvent.click(submitBtn);

    expect(await screen.findByText(/Email is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/Password is required/i)).toBeInTheDocument();

    const emailInput = screen.getByLabelText(/Email Address/i);
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.click(submitBtn);

    expect(await screen.findByText(/Please enter a valid email address/i)).toBeInTheDocument();
  });

  it('4. logs in with demo credentials and redirects to "/home"', async () => {
    renderWithRouter('/login');

    // Auto-fill demo credentials
    const autoFillBtn = await screen.findByRole('button', { name: /Auto-fill/i });
    fireEvent.click(autoFillBtn);

    const submitBtn = screen.getByRole('button', { name: /Log In/i });
    fireEvent.click(submitBtn);

    // Should redirect to /home and display personalized welcome and feature cards
    await waitFor(
      () => {
        expect(screen.getByText(/Namaste, Priya!/i)).toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    // Check 3 core feature cards
    expect(screen.getByText(/Emergency SOS & Circles/i)).toBeInTheDocument();
    expect(screen.getByText(/Sisterhood Community/i)).toBeInTheDocument();
    expect(screen.getByText(/Wellness & Healing/i)).toBeInTheDocument();
  });

  it('5. redirects logged-in user away from "/login" to "/home"', async () => {
    // Pre-seed an active session
    const demoUser = {
      id: 'usr_demo',
      name: 'Priya Sharma',
      email: 'demo@sakhibridge.org',
      phone: '9876543210'
    };
    localStorage.setItem('sakhi_session', JSON.stringify(demoUser));

    renderWithRouter('/login');

    await waitFor(() => {
      expect(screen.getByText(/Namaste, Priya!/i)).toBeInTheDocument();
    });
  });

  it('6. navigates to "/support" and triggers SOS confirmation modal', async () => {
    const demoUser = {
      id: 'usr_demo',
      name: 'Priya Sharma',
      email: 'demo@sakhibridge.org',
      phone: '9876543210'
    };
    localStorage.setItem('sakhi_session', JSON.stringify(demoUser));

    renderWithRouter('/support');

    await waitFor(() => {
      expect(screen.getByText(/Emergency & Safety Hub/i)).toBeInTheDocument();
    });

    // Tap SOS button
    const sosBtn = screen.getByRole('button', { name: /Trigger Emergency SOS confirmation/i });
    fireEvent.click(sosBtn);

    // Modal opens
    expect(await screen.findByText(/Confirm Emergency SOS/i)).toBeInTheDocument();
    expect(screen.getByText(/Are you in an emergency or feeling unsafe\?/i)).toBeInTheDocument();

    // Dismiss with Cancel
    const cancelBtn = screen.getByRole('button', { name: /Cancel \/ False Alarm/i });
    fireEvent.click(cancelBtn);
  });

  it('7. logs out, redirects to "/login", and blocks back-navigation to protected pages', async () => {
    const demoUser = {
      id: 'usr_demo',
      name: 'Priya Sharma',
      email: 'demo@sakhibridge.org',
      phone: '9876543210'
    };
    localStorage.setItem('sakhi_session', JSON.stringify(demoUser));

    renderWithRouter('/profile');

    await waitFor(() => {
      expect(screen.getAllByText(/Priya Sharma/i).length).toBeGreaterThan(0);
    });

    // Click Log Out button
    const logoutBtn = screen.getByRole('button', { name: /Log Out/i });
    fireEvent.click(logoutBtn);

    // Modal opens
    const confirmLogout = await screen.findByRole('button', { name: /Log Out Now/i });
    fireEvent.click(confirmLogout);

    // Session must be cleared in localStorage
    await waitFor(() => {
      expect(localStorage.getItem('sakhi_session')).toBeNull();
      expect(screen.getByRole('button', { name: /Log In/i })).toBeInTheDocument();
    });
  });

  it('8. registers a new user via "/signup" and redirects to "/home"', async () => {
    renderWithRouter('/signup');

    await waitFor(() => {
      expect(screen.getByText(/Create Your/i)).toBeInTheDocument();
    });

    fireEvent.change(screen.getByLabelText(/Full Name/i), { target: { value: 'Kavita Rao' } });
    fireEvent.change(screen.getByLabelText(/Email Address/i), { target: { value: 'kavita@test.com' } });
    fireEvent.change(screen.getByLabelText(/Phone Number/i), { target: { value: '9876543210' } });
    fireEvent.change(screen.getByLabelText(/Create Password/i), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText(/Confirm Password/i), { target: { value: 'password123' } });

    const submitBtn = screen.getByRole('button', { name: /Create Account/i });
    fireEvent.click(submitBtn);

    await waitFor(
      () => {
        expect(screen.getByText(/Namaste, Kavita!/i)).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });

  it('9. shows 404 page for unknown routes with a link to safety', async () => {
    renderWithRouter('/random-unknown-route');

    await waitFor(() => {
      expect(screen.getByText(/Error 404/i)).toBeInTheDocument();
      expect(screen.getByText(/Page Not Found/i)).toBeInTheDocument();
    });
  });

  it('10. toggles between dark and light mode via the corner button', async () => {
    renderWithRouter('/login');

    const toggleBtn = await screen.findByRole('switch', { name: /switch to dark mode/i });
    expect(toggleBtn).toBeInTheDocument();
    expect(toggleBtn).toHaveAttribute('aria-checked', 'false');

    // Switch to dark mode
    fireEvent.click(toggleBtn);
    expect(localStorage.getItem('theme')).toBe('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    expect(toggleBtn).toHaveAttribute('aria-checked', 'true');

    // Switch back to light mode
    fireEvent.click(toggleBtn);
    expect(localStorage.getItem('theme')).toBe('light');
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    expect(toggleBtn).toHaveAttribute('aria-checked', 'false');
  });
});
