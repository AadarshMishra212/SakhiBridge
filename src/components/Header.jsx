import React from 'react';
import { Bell, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

/**
 * Mobile-first Top Header
 * Features brand logo mark, name "SakhiBridge", and status indicator.
 */
export const Header = ({ title, subtitle, showActions = true }) => {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-30 w-full bg-white/95 dark:bg-[#191426]/95 backdrop-blur-md border-b border-purple-100/70 dark:border-purple-900/40 transition-colors duration-200">
      <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
        {/* Brand identity */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-brand bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white shadow-soft">
            <span className="text-sm font-bold tracking-tight">SB</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-bold tracking-tight text-ink dark:text-white">
                Sakhi<span className="text-primary dark:text-primary-light">Bridge</span>
              </span>
              <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[10px] font-medium bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60">
                <ShieldCheck size={11} /> Safe
              </span>
            </div>
            {subtitle ? (
              <p className="text-[11px] text-ink-muted dark:text-purple-300/70 leading-tight">{subtitle}</p>
            ) : (
              <p className="text-[11px] text-ink-muted dark:text-purple-300/70 leading-tight">Together, for every woman</p>
            )}
          </div>
        </div>

        {/* Action icons / User preview */}
        {showActions && (
          <div className="flex items-center gap-2 pr-36 sm:pr-0">
            <button
              type="button"
              className="w-9 h-9 rounded-full flex items-center justify-center text-ink-muted dark:text-purple-300 hover:text-ink dark:hover:text-white hover:bg-surface-alt dark:hover:bg-purple-900/30 transition-colors relative min-h-touch min-w-touch"
              aria-label="Notifications"
              onClick={() => alert('Notifications: All safety systems are operational.')}
            >
              <Bell size={18} />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-accent ring-2 ring-white dark:ring-[#191426]" />
            </button>

            {user && (
              <div
                className="w-8 h-8 rounded-full bg-primary-soft dark:bg-[#2A2242] text-primary-dark dark:text-purple-200 font-semibold text-xs flex items-center justify-center border border-primary-200 dark:border-purple-700/60"
                title={user.name}
              >
                {user.avatar || 'SB'}
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

