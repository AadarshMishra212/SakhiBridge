import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Phone, Lock, AlertCircle, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { InputField } from '../components/InputField';
import { PrimaryButton } from '../components/PrimaryButton';

export const Signup = () => {
  const navigate = useNavigate();
  const { signUp } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneClean = formData.phone.replace(/[^0-9]/g, '');

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required for emergency alerts';
    } else if (phoneClean.length < 10) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    setServerError('');

    try {
      await signUp({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password
      });
      // Redirect to /home after registration with replace: true
      navigate('/home', { replace: true });
    } catch (err) {
      setServerError(err.message || 'Signup failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface-alt dark:bg-[#0F0C1B] transition-colors duration-200 flex flex-col justify-center px-4 py-8 sm:px-6">
      <div className="max-w-md w-full mx-auto">
        {/* Back to Login link */}
        <div className="mb-4">
          <Link
            to="/login"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary dark:text-primary-light hover:text-primary-dark dark:hover:text-white transition-colors py-1.5 px-2.5 rounded-lg hover:bg-primary-soft/60 dark:hover:bg-purple-900/40"
          >
            <ArrowLeft size={16} /> Back to Log In
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-ink dark:text-white">
            Create Your <span className="text-primary dark:text-primary-light">Sakhi</span> Account
          </h1>
          <p className="mt-1.5 text-sm text-ink-secondary dark:text-purple-200/80">
            Join thousands of women in a secure, supportive circle.
          </p>
        </div>

        {/* Card */}
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
              id="signup-name"
              name="name"
              type="text"
              label="Full Name"
              placeholder="e.g. Priya Sharma"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
              autoComplete="name"
              icon={User}
              required
            />

            <InputField
              id="signup-email"
              name="email"
              type="email"
              label="Email Address"
              placeholder="priya@example.com"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              autoComplete="email"
              inputMode="email"
              icon={Mail}
              required
            />

            <InputField
              id="signup-phone"
              name="phone"
              type="tel"
              label="Phone Number"
              placeholder="e.g. 98765 43210"
              value={formData.phone}
              onChange={handleChange}
              error={errors.phone}
              autoComplete="tel"
              inputMode="tel"
              icon={Phone}
              helperText="Used only for emergency SOS alert verification"
              required
            />

            <InputField
              id="signup-password"
              name="password"
              type="password"
              label="Create Password"
              placeholder="At least 6 characters"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              autoComplete="new-password"
              icon={Lock}
              required
            />

            <InputField
              id="signup-confirm-password"
              name="confirmPassword"
              type="password"
              label="Confirm Password"
              placeholder="Re-enter your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
              autoComplete="new-password"
              icon={Lock}
              required
            />

            <div className="pt-2">
              <PrimaryButton
                type="submit"
                variant="accent"
                size="lg"
                isLoading={isLoading}
                fullWidth
              >
                Create Account
              </PrimaryButton>
            </div>
          </form>

          <div className="mt-6 pt-5 border-t border-purple-50 dark:border-purple-900/40 text-center text-sm text-ink-secondary dark:text-purple-200/80">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-semibold text-primary dark:text-primary-light hover:text-primary-dark dark:hover:text-white transition-colors inline-flex items-center gap-1 hover:underline"
            >
              Log In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

