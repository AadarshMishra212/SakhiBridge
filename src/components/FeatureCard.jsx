import React from 'react';
import { ChevronRight } from 'lucide-react';

/**
 * Reusable Feature Card for dashboard and discovery areas
 * Adheres to 16px border-radius, generous spacing, and touch-friendly interactions.
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
  className = ''
}) => {
  const badgeColors = {
    primary: 'bg-primary-100 text-primary-dark',
    accent: 'bg-accent-100 text-accent-dark',
    success: 'bg-emerald-100 text-emerald-800',
    warning: 'bg-amber-100 text-amber-800'
  };

  return (
    <div
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => e.key === 'Enter' && onClick() : undefined}
      className={`group relative bg-white dark:bg-[#191426] border border-purple-100/80 dark:border-purple-900/50 rounded-brand p-5 shadow-soft transition-all duration-200 hover:shadow-float hover:border-purple-200 dark:hover:border-purple-700 active:scale-[0.99] text-left ${
        onClick ? 'cursor-pointer' : ''
      } ${className}`}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className={`w-12 h-12 rounded-brand ${bgColor} flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105`}>
          {Icon && <Icon className={accentColor} size={24} aria-hidden="true" />}
        </div>
        
        {badge && (
          <span className={`text-[11px] font-semibold tracking-wide uppercase px-2.5 py-1 rounded-full ${badgeColors[badgeVariant] || badgeColors.primary}`}>
            {badge}
          </span>
        )}
      </div>

      <h3 className="text-base font-semibold text-ink dark:text-white group-hover:text-primary dark:group-hover:text-primary-light transition-colors">
        {title}
      </h3>
      
      <p className="mt-1 text-sm text-ink-secondary dark:text-purple-200/70 leading-relaxed line-clamp-2">
        {description}
      </p>

      <div className="mt-4 pt-3 border-t border-purple-50 dark:border-purple-900/40 flex items-center justify-between text-xs font-semibold text-primary dark:text-primary-light">
        <span>{actionText}</span>
        <ChevronRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
      </div>
    </div>
  );
};

