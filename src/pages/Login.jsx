import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, Sparkles, AlertCircle, ArrowRight, ShieldCheck, Heart, Radio, Scale } from 'lucide-react';
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
      navigate(from, { replace: true });
    } catch (err) {
      setServerError(err.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface-alt dark:bg-[#150C10] transition-colors duration-200 flex flex-col justify-center px-4 py-8 sm:px-6 lg:px-8">
      <div className="w-full max-w-md lg:max-w-5xl mx-auto lg:grid lg:grid-cols-12 lg:gap-12 lg:items-center">
        {/* Left Column (Brand Showcase on Laptop/Desktop, Compact on Mobile) */}
        <div className="lg:col-span-6 mb-8 lg:mb-0 text-center lg:text-left">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-gradient-to-br from-[#8E2131] via-[#5A121F] to-[#360911] text-[#FFEDD1] shadow-float mb-4 sm:mb-6 border border-white/10">
            <span className="text-2xl sm:text-3xl font-black tracking-tight">SB</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-ink dark:text-lace leading-tight font-serif tracking-tight">
            Welcome to <span className="text-[#8E2131] dark:text-primary-light font-sans font-extrabold">SakhiBridge</span>
          </h1>
          <p className="mt-2 sm:mt-3 text-sm sm:text-base text-ink-secondary dark:text-lace/80 max-w-md mx-auto lg:mx-0 leading-relaxed font-sans">
            Your safe companion, community, and support bridge.
          </p>

          {/* Desktop Feature Highlights */}
          <div className="hidden lg:grid grid-cols-1 gap-3.5 mt-8 max-w-md">
            <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white dark:bg-[#1E1217] border border-burgundy-900/[0.08] dark:border-lace/[0.08] shadow-xs">
              <div className="w-10 h-10 rounded-2xl bg-red-500/10 dark:bg-red-950/60 text-sos flex items-center justify-center shrink-0 border border-red-500/20">
                <Radio size={20} className="animate-pulse" />
              </div>
              <div className="text-left">
                <span className="text-xs font-bold text-ink dark:text-lace block">1-Tap Emergency SOS</span>
                <span className="text-[11px] text-ink-muted dark:text-lace/70">Instant live location broadcast to 3 guardians</span>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white dark:bg-[#1E1217] border border-burgundy-900/[0.08] dark:border-lace/[0.08] shadow-xs">
              <div className="w-10 h-10 rounded-2xl bg-primary-soft dark:bg-[#281820] text-[#5A121F] dark:text-primary-light flex items-center justify-center shrink-0 border border-burgundy-900/[0.06] dark:border-lace/[0.08]">
                <Heart size={20} />
              </div>
              <div className="text-left">
                <span className="text-xs font-bold text-ink dark:text-lace block">Anonymous Sisterhood</span>
                <span className="text-[11px] text-ink-muted dark:text-lace/70">Safe peer sharing, verified commute stories & guidance</span>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white dark:bg-[#1E1217] border border-burgundy-900/[0.08] dark:border-lace/[0.08] shadow-xs">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/20">
                <Scale size={20} />
              </div>
              <div className="text-left">
                <span className="text-xs font-bold text-ink dark:text-lace block">Free Legal & Helpline Access</span>
                <span className="text-[11px] text-ink-muted dark:text-lace/70">24/7 National Women Helpline (1091) and PoSH guide</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (Form Card) */}
        <div className="lg:col-span-6 w-full">
          {/* Quick Demo Credentials Chip */}
          <div className="mb-4 bg-burgundy-900/[0.04] dark:bg-[#281820] border border-burgundy-900/[0.08] dark:border-lace/[0.10] rounded-2xl p-3.5 flex items-center justify-between gap-2 shadow-xs">
            <div className="text-xs text-ink-secondary dark:text-lace/90 flex items-center gap-2">
              <Sparkles size={16} className="text-primary shrink-0" />
              <span>
                Demo user ready: <strong className="text-ink dark:text-lace font-bold">demo@sakhibridge.org</strong>
              </span>
            </div>
            <button
              type="button"
              onClick={handleFillDemo}
              className="text-xs font-bold text-primary hover:text-primary-dark underline decoration-2 underline-offset-2 shrink-0 py-1 px-2.5 rounded-xl hover:bg-white dark:hover:bg-[#150C10] transition-colors cursor-pointer"
            >
              Auto-fill
            </button>
          </div>

          {/* Login Card */}
          <div className="bg-white dark:bg-[#1E1217] border border-burgundy-900/[0.08] dark:border-lace/[0.08] rounded-3xl p-6 sm:p-8 shadow-premium">
            {serverError && (
              <div
                className="mb-5 p-3.5 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-sm flex items-start gap-2.5 animate-in fade-in"
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
                    className="text-xs font-semibold text-primary hover:text-primary-dark hover:underline py-1 transition-colors cursor-pointer"
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
            <div className="mt-6 pt-5 border-t border-burgundy-900/[0.06] dark:border-lace/[0.08] text-center text-sm text-ink-secondary dark:text-lace/80">
              Don't have an account?{' '}
              <Link
                to="/signup"
                className="font-bold text-accent hover:text-accent-dark transition-colors inline-flex items-center gap-1 hover:underline"
              >
                Create account <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          {/* Footer help */}
          <div className="mt-5 text-center text-xs text-ink-muted dark:text-lace/70">
            Need urgent help?{' '}
            <span className="font-bold text-sos">Call 1091 (Women Helpline)</span>
          </div>
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
        <p className="text-sm text-ink-secondary dark:text-lace/80 leading-relaxed font-sans">
          In this mock front-end environment, password reset emails are not sent. You can test
          logging in with the default demo account (<strong>demo@sakhibridge.org</strong> / <strong>password123</strong>)
          or create a new account in seconds on the Sign Up page.
        </p>
      </Modal>
    </div>
  );
};
