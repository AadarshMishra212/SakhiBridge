import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, Sparkles, AlertCircle, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { InputField } from '../components/InputField';
import { PrimaryButton } from '../components/PrimaryButton';
import { Modal } from '../components/Modal';

export const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, getDemoCredentials } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);

  // Determine redirect target after login
  const from = location.state?.from?.pathname || '/home';

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    if (serverError) setServerError('');
  };

  const handleFillDemo = () => {
    const demo = getDemoCredentials();
    setFormData({
      email: demo.email,
      password: demo.password
    });
    setErrors({});
    setServerError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    setServerError('');

    try {
      await login(formData.email, formData.password);
      // Navigate to /home with replace: true to prevent back-navigation into login
      navigate(from, { replace: true });
    } catch (err) {
      setServerError(err.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface-alt dark:bg-[#0F0C1B] transition-colors duration-200 flex flex-col justify-center px-4 py-8 sm:px-6">
      <div className="max-w-md w-full mx-auto">
        {/* App Branding & Welcome */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-gradient-to-tr from-primary to-accent text-white shadow-float mb-4">
            <span className="text-2xl font-black tracking-tight">SB</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-ink dark:text-white">
            Welcome to <span className="text-primary dark:text-primary-light">SakhiBridge</span>
          </h1>
          <p className="mt-2 text-sm text-ink-secondary dark:text-purple-200/80">
            Your safe companion, community, and support bridge.
          </p>
        </div>

        {/* Quick Demo Credentials Chip */}
        <div className="mb-4 bg-primary-soft/80 dark:bg-[#1C172E] border border-primary-200/80 dark:border-purple-800/60 rounded-brand p-3.5 flex items-center justify-between gap-2 shadow-sm">
          <div className="text-xs text-ink-secondary dark:text-purple-200 flex items-center gap-1.5">
            <Sparkles size={16} className="text-primary dark:text-primary-light shrink-0" />
            <span>
              Demo user ready: <strong className="text-primary-dark dark:text-white font-medium">demo@sakhibridge.org</strong>
            </span>
          </div>
          <button
            type="button"
            onClick={handleFillDemo}
            className="text-xs font-semibold text-primary dark:text-primary-light hover:text-primary-dark dark:hover:text-white underline decoration-2 underline-offset-2 shrink-0 py-1 px-2 rounded-lg hover:bg-white/60 dark:hover:bg-purple-900/40 transition-colors"
          >
            Auto-fill
          </button>
        </div>

        {/* Login Card */}
        <div className="bg-white dark:bg-[#191426] border border-purple-100 dark:border-purple-900/50 rounded-3xl p-6 sm:p-8 shadow-soft">
          {serverError && (
            <div
              className="mb-5 p-3.5 rounded-brand bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-sm flex items-start gap-2.5 animate-in fade-in"
              role="alert"
            >
              <AlertCircle size={18} className="shrink-0 mt-0.5 text-red-600 dark:text-red-400" />
              <span>{serverError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <InputField
              id="login-email"
              name="email"
              type="email"
              label="Email Address"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              autoComplete="email"
              inputMode="email"
              icon={Mail}
              required
            />

            <div>
              <InputField
                id="login-password"
                name="password"
                type="password"
                label="Password"
                placeholder="At least 6 characters"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
                autoComplete="current-password"
                icon={Lock}
                required
              />
              <div className="flex justify-end mt-1.5">
                <button
                  type="button"
                  onClick={() => setShowForgotModal(true)}
                  className="text-xs font-medium text-primary dark:text-primary-light hover:text-primary-dark dark:hover:text-white hover:underline py-1 transition-colors"
                >
                  Forgot password?
                </button>
              </div>
            </div>

            <div className="pt-2">
              <PrimaryButton
                type="submit"
                variant="primary"
                size="lg"
                isLoading={isLoading}
                fullWidth
              >
                Log In
              </PrimaryButton>
            </div>
          </form>

          {/* Create Account link */}
          <div className="mt-6 pt-5 border-t border-purple-50 dark:border-purple-900/40 text-center text-sm text-ink-secondary dark:text-purple-200/80">
            Don't have an account?{' '}
            <Link
              to="/signup"
              className="font-semibold text-accent hover:text-accent-dark transition-colors inline-flex items-center gap-1 hover:underline"
            >
              Create account <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* Footer help */}
        <div className="mt-6 text-center text-xs text-ink-muted dark:text-purple-300/60">
          Need urgent help?{' '}
          <span className="font-semibold text-sos">Call 1091 (Women Helpline)</span>
        </div>
      </div>

      {/* Forgot Password Modal */}
      <Modal
        isOpen={showForgotModal}
        onClose={() => setShowForgotModal(false)}
        title="Reset Password"
        description="Password reset simulation for mock mode."
        confirmText="Got it"
        onConfirm={() => setShowForgotModal(false)}
        icon={Mail}
      >
        <p className="text-sm text-ink-secondary leading-relaxed">
          In this mock front-end environment, password reset emails are not sent. You can test
          logging in with the default demo account (<strong>demo@sakhibridge.org</strong> / <strong>password123</strong>)
          or create a new account in seconds on the Sign Up page.
        </p>
      </Modal>
    </div>
  );
};

