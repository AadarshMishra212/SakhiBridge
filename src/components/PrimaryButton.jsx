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
      'bg-primary hover:bg-primary-dark text-white shadow-soft hover:shadow-float focus:ring-primary-500',
    accent:
      'bg-accent hover:bg-accent-dark text-white shadow-soft focus:ring-accent-500',
    danger:
      'bg-sos hover:bg-sos-dark text-white shadow-soft focus:ring-red-500',
    secondary:
      'bg-primary-soft hover:bg-primary-100 text-primary-dark font-semibold border border-primary-200/60 focus:ring-primary-400',
    outline:
      'bg-transparent hover:bg-surface-alt dark:hover:bg-purple-950/40 text-ink dark:text-purple-100 border border-purple-200 dark:border-purple-800/60 hover:border-purple-300 dark:hover:border-purple-700 focus:ring-primary-300',
    ghost:
      'bg-transparent hover:bg-primary-soft/60 dark:hover:bg-purple-900/40 text-ink-secondary dark:text-purple-200 hover:text-primary dark:hover:text-white focus:ring-primary-300'
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

