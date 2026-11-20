import React from 'react';
import { Loader2 } from 'lucide-react';

/**
 * Editorial Touch-Friendly Primary Button
 * - Micro-interactions: subtle hover brightness, active press scale
 * - Layered shadows with inner highlight
 * - WCAG 44px+ minimum touch target
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
    'relative inline-flex items-center justify-center font-bold tracking-tight rounded-2xl transition-all duration-200 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 min-h-touch disabled:opacity-50 disabled:pointer-events-none select-none cursor-pointer';

  const variants = {
    primary:
      'bg-gradient-to-r from-[#8E2131] via-[#6B1724] to-[#4A0E17] hover:brightness-110 text-lace shadow-premium hover:shadow-float border border-white/15 focus-visible:ring-primary',
    accent:
      'bg-gradient-to-r from-[#FF6B5E] to-[#FE9179] hover:brightness-105 text-white shadow-premium hover:shadow-float border border-white/20 focus-visible:ring-accent',
    danger:
      'bg-sos hover:bg-sos-dark text-white shadow-sos animate-sos-pulse border border-white/20 focus-visible:ring-red-500',
    secondary:
      'bg-burgundy-900/[0.04] dark:bg-white/[0.06] hover:bg-burgundy-900/[0.08] dark:hover:bg-white/[0.10] text-[#5A121F] dark:text-lace font-bold border border-burgundy-900/[0.10] dark:border-lace/[0.12] focus-visible:ring-primary',
    outline:
      'bg-transparent hover:bg-white/80 dark:hover:bg-[#281820] text-ink dark:text-lace border border-burgundy-900/[0.12] dark:border-lace/[0.15] hover:border-burgundy-900/[0.25] dark:hover:border-lace/[0.30] shadow-xs focus-visible:ring-primary',
    ghost:
      'bg-transparent hover:bg-burgundy-900/[0.04] dark:hover:bg-white/[0.05] text-ink-secondary dark:text-lace/80 hover:text-ink dark:hover:text-lace focus-visible:ring-primary'
  };

  const sizes = {
    sm: 'text-xs px-3.5 py-2 min-h-[40px]',
    md: 'text-xs sm:text-sm px-5 py-2.5 min-h-[46px]',
    lg: 'text-sm sm:text-base px-6 py-3 min-h-[52px]'
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
          <Loader2 className="animate-spin" size={17} />
          <span>Processing...</span>
        </span>
      ) : (
        <span className="flex items-center justify-center gap-2">
          {Icon && iconPosition === 'left' && <Icon size={17} aria-hidden="true" />}
          {children}
          {Icon && iconPosition === 'right' && <Icon size={17} aria-hidden="true" />}
        </span>
      )}
    </button>
  );
};
