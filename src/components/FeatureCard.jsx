import React from 'react';
import { ArrowUpRight, ChevronRight } from 'lucide-react';

/**
 * Editorial Bento Feature Card
 * - Layered card with subtle hairline border and inner highlight
 * - Duotone icon inside a refined gradient badge
 * - Tag chip with category styling
 * - Smooth 6-8px hover lift with layered tinted shadow bloom
 * - Animated arrow reveal on hover
 * - Full un-truncated description with generous line height
 */
export const FeatureCard = ({
  title,
  description,
  icon: Icon,
  badge,
  badgeVariant = 'primary',
  accentColor = 'text-primary',
  bgColor = 'bg-primary-soft',
  onClick,
  actionText = 'Explore',
  isFeatured = false,
  className = ''
}) => {
  const badgeColors = {
    warning:
      'bg-red-500/10 text-sos dark:text-red-400 border border-red-500/20',
    primary:
      'bg-primary-500/10 text-[#8E2131] dark:text-primary-light border border-primary-500/20',
    accent:
      'bg-accent/10 text-accent-dark dark:text-accent-light border border-accent/20',
    success:
      'bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border border-emerald-500/20'
  };

  return (
    <div
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => e.key === 'Enter' && onClick() : undefined}
      className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl p-6 sm:p-7 bg-white dark:bg-[#1E1217] border border-burgundy-900/[0.08] dark:border-lace/[0.08] shadow-premium hover:shadow-float transition-all duration-300 ease-out hover:-translate-y-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
        isFeatured
          ? 'lg:col-span-2 bg-gradient-to-br from-white via-[#FFF8F5] to-[#FFF1EC] dark:from-[#1E1217] dark:via-[#24141C] dark:to-[#2A1521] border-primary/20 dark:border-primary/25'
          : ''
      } ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {/* Subtle background ambient glow on hover */}
      <div className="absolute -top-12 -right-12 w-36 h-36 rounded-full bg-primary/10 dark:bg-primary/5 blur-2xl pointer-events-none group-hover:scale-150 transition-transform duration-500" />

      <div>
        {/* Top meta row: Duotone Icon badge & Category Chip */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div
            className={`w-12 h-12 rounded-2xl ${bgColor} flex items-center justify-center shrink-0 shadow-xs border border-black/[0.04] dark:border-white/[0.06] group-hover:scale-110 group-hover:rotate-1 transition-all duration-300`}
          >
            {Icon && <Icon className={accentColor} size={22} aria-hidden="true" />}
          </div>

          {badge && (
            <span
              className={`text-[10px] sm:text-[11px] font-bold tracking-wider uppercase px-3 py-1 rounded-full shadow-xs ${
                badgeColors[badgeVariant] || badgeColors.primary
              }`}
            >
              {badge}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-lg sm:text-xl font-bold tracking-tight text-ink dark:text-lace font-serif group-hover:text-primary-800 dark:group-hover:text-primary-light transition-colors duration-200">
          {title}
        </h3>

        {/* Description: generously spaced, readable, no abrupt truncation */}
        <p className="mt-2 text-xs sm:text-sm text-ink-secondary dark:text-lace/80 leading-relaxed">
          {description}
        </p>
      </div>

      {/* Action Footer with animated arrow */}
      <div className="mt-6 pt-4 border-t border-burgundy-900/[0.06] dark:border-lace/[0.08] flex items-center justify-between text-xs sm:text-sm font-bold text-primary-800 dark:text-primary-light">
        <span className="group-hover:underline underline-offset-4">{actionText}</span>
        <div className="w-7 h-7 rounded-full bg-primary-soft dark:bg-[#281820] flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1 group-hover:scale-105">
          <ArrowUpRight size={15} />
        </div>
      </div>
    </div>
  );
};
