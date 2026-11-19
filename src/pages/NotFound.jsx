import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Home, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { PrimaryButton } from '../components/PrimaryButton';

export const NotFound = () => {
  const { isAuthenticated } = useAuth();
  const returnTarget = isAuthenticated ? '/home' : '/login';
  const returnLabel = isAuthenticated ? 'Back to Home' : 'Go to Log In';

  return (
    <div className="min-h-screen bg-surface-alt dark:bg-[#140C12] transition-colors duration-200 flex flex-col justify-center items-center px-4 py-12 text-center">
      <div className="max-w-sm w-full mx-auto bg-white dark:bg-[#1E121A] border border-primary-100 dark:border-[#3A1F2D] rounded-3xl p-8 shadow-soft flex flex-col items-center">
        {/* Decorative Compass / 404 icon */}
        <div className="w-20 h-20 rounded-3xl bg-primary-soft dark:bg-[#281823] text-primary dark:text-primary-light flex items-center justify-center mb-5 shadow-inner">
          <Compass size={40} className="animate-spin-slow" />
        </div>

        <span className="text-xs font-bold uppercase tracking-wider text-accent bg-accent-soft dark:bg-pink-950/40 px-3 py-1 rounded-full mb-2">
          Error 404
        </span>

        <h1 className="text-2xl font-bold text-ink dark:text-lace mb-2">
          Page Not Found
        </h1>

        <p className="text-xs text-ink-secondary dark:text-lace/70 leading-relaxed mb-6">
          The safety page or bridge link you are looking for doesn't exist or has moved. Let's get you back to safety.
        </p>

        <Link to={returnTarget} className="w-full">
          <PrimaryButton variant="primary" size="md" icon={Home} fullWidth>
            {returnLabel}
          </PrimaryButton>
        </Link>
      </div>
    </div>
  );
};

