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
    <div className="min-h-screen bg-surface-alt dark:bg-[#150C10] transition-colors duration-200 flex flex-col justify-center items-center px-4 py-12 text-center">
      <div className="max-w-md w-full mx-auto bg-white dark:bg-[#1E1217] border border-burgundy-900/[0.08] dark:border-lace/[0.08] rounded-3xl p-8 shadow-premium flex flex-col items-center">
        {/* Decorative Compass icon */}
        <div className="w-20 h-20 rounded-3xl bg-burgundy-900/[0.04] dark:bg-white/[0.06] text-primary flex items-center justify-center mb-5 shadow-xs border border-burgundy-900/[0.06] dark:border-lace/[0.08]">
          <Compass size={40} className="animate-spin-slow" />
        </div>

        <span className="text-xs font-bold uppercase tracking-wider text-accent bg-accent/10 px-3 py-1 rounded-full mb-2">
          Error 404
        </span>

        <h1 className="text-2xl sm:text-3xl font-bold text-ink dark:text-lace mb-2 font-serif">
          Page Not Found
        </h1>

        <p className="text-xs sm:text-sm text-ink-secondary dark:text-lace/80 leading-relaxed mb-6 font-sans">
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
