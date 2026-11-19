import React from 'react';
import { Loader2 } from 'lucide-react';

/**
 * Reusable, touch-friendly button component with accessible states
 * Meets 44px minimum touch target height guideline.
 */
export const PrimaryButton = ({
  children,
  type = 'button',
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  onClick,
  icon: Icon,
  iconPosition = 'left',
  fullWidth = true,
  className = '',
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-medium rounded-brand transition-all duration-200 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-offset-2 min-h-touch disabled:opacity-60 disabled:pointer-events-none select-none cursor-pointer';

  const variants = {
    primary:
      'bg-gradient-to-r from-primary via-primary-dark to-[#B8503C] hover:brightness-105 text-lace font-bold shadow-soft hover:shadow-float focus:ring-primary-400',
    accent:
      'bg-accent hover:bg-accent-dark text-white shadow-soft focus:ring-accent-500',
    danger:
      'bg-sos hover:bg-sos-dark text-white shadow-soft focus:ring-red-500',
    secondary:
      'bg-primary-soft dark:bg-[#281823] hover:bg-primary-100 dark:hover:bg-[#331F2D] text-primary-dark dark:text-lace font-semibold border border-primary-200/70 dark:border-primary-800/60 focus:ring-primary-400',
    outline:
      'bg-transparent hover:bg-surface-alt dark:hover:bg-[#281823] text-ink dark:text-lace border border-primary-200 dark:border-primary-800/60 hover:border-primary-300 dark:hover:border-primary-700 focus:ring-primary-300',
    ghost:
      'bg-transparent hover:bg-primary-soft/60 dark:hover:bg-[#281823] text-ink-secondary dark:text-lace/80 hover:text-primary dark:hover:text-lace focus:ring-primary-300'
  };

  const sizes = {
    sm: 'text-xs px-3.5 py-2 min-h-[40px]',
    md: 'text-sm px-5 py-3 min-h-[46px]',
    lg: 'text-base px-6 py-3.5 min-h-[52px]'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`
        ${baseStyles}
        ${variants[variant] || variants.primary}
        ${sizes[size] || sizes.md}
        ${fullWidth ? 'w-full' : 'w-auto'}
        ${className}
      `}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <Loader2 className="animate-spin" size={18} />
          <span>Processing...</span>
        </span>
      ) : (
        <span className="flex items-center justify-center gap-2">
          {Icon && iconPosition === 'left' && <Icon size={18} aria-hidden="true" />}
          {children}
          {Icon && iconPosition === 'right' && <Icon size={18} aria-hidden="true" />}
        </span>
      )}
    </button>
  );
};

