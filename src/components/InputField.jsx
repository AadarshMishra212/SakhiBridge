import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

/**
 * Accessible, touch-friendly mobile input component
 * Features 44px+ touch height, proper keyboard inputMode, clear labels, and password toggling.
 */
export const InputField = ({
  id,
  name,
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  helperText,
  required = false,
  autoComplete,
  inputMode,
  icon: Icon,
  disabled = false,
  className = '',
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;
  const inputId = id || name;
  const errorId = `${inputId}-error`;
  const helperId = `${inputId}-helper`;

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-ink dark:text-lace mb-1.5"
        >
          {label} {required && <span className="text-accent font-bold" aria-hidden="true">*</span>}
        </label>
      )}

      <div className="relative flex items-center">
        {Icon && (
          <div className="absolute left-3.5 pointer-events-none text-ink-muted dark:text-lace/60">
            <Icon size={18} />
          </div>
        )}

        <input
          id={inputId}
          name={name}
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          autoComplete={autoComplete}
          inputMode={inputMode}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : helperText ? helperId : undefined}
          className={`w-full min-h-[46px] px-3.5 py-2.5 text-base text-ink dark:text-lace placeholder:text-ink-muted/70 dark:placeholder:text-lace/40 bg-white dark:bg-[#24151F] border rounded-brand transition-all duration-150 focus:outline-none focus:ring-2 disabled:bg-surface-muted dark:disabled:bg-[#1E121A] disabled:text-ink-muted dark:disabled:text-lace/40 disabled:cursor-not-allowed ${
            Icon ? 'pl-10' : 'pl-3.5'
          } ${isPassword ? 'pr-11' : 'pr-3.5'} ${
            error
              ? 'border-red-400 dark:border-red-500 focus:border-red-500 focus:ring-red-200 dark:focus:ring-red-950/50'
              : 'border-primary-100 dark:border-[#4C293C] hover:border-primary-200 dark:hover:border-primary-600 focus:border-primary focus:ring-primary-100 dark:focus:ring-primary-900/40'
          }`}
          {...props}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 p-2 text-ink-muted dark:text-lace/70 hover:text-ink dark:hover:text-lace transition-colors rounded-full focus:outline-none focus:ring-2 focus:ring-primary-300 min-h-[40px] min-w-[40px] flex items-center justify-center"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            tabIndex={0}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>

      {error ? (
        <p id={errorId} className="mt-1.5 text-xs text-red-500 dark:text-red-400 font-medium flex items-center gap-1" role="alert">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-500" />
          {error}
        </p>
      ) : helperText ? (
        <p id={helperId} className="mt-1 text-xs text-ink-muted dark:text-lace/70">
          {helperText}
        </p>
      ) : null}
    </div>
  );
};

