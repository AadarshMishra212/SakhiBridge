/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Enable class-based dark mode
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Core brand colors - customize here to change the whole app's palette
        primary: {
          DEFAULT: '#7B4FD6', // Core primary purple
          light: '#966DE8',
          dark: '#6339B8',
          soft: '#F4EFFE',
          50: '#FAF7FF',
          100: '#EFE7FF',
          200: '#DECFFF',
          500: '#7B4FD6',
          600: '#693CC4',
          700: '#582EAB',
        },
        accent: {
          DEFAULT: '#F06292', // Core accent pink
          light: '#F48FB1',
          dark: '#D81B60',
          soft: '#FDF0F5',
          50: '#FDF2F7',
          100: '#FCE4EE',
          500: '#F06292',
          600: '#E91E63',
        },
        // Base backgrounds & surfaces (backed by CSS theme variables with fallback)
        surface: {
          DEFAULT: 'var(--bg-surface, #FFFFFF)',
          alt: 'var(--bg-app, #FAF8FD)',
          muted: 'var(--bg-surface-subtle, #F4EFFE)',
          card: 'var(--bg-surface, #FFFFFF)',
          elevated: 'var(--bg-surface-elevated, #FFFFFF)',
          dark: '#161126',
          darkCard: '#211A36',
        },
        ink: {
          DEFAULT: 'var(--text-main, #1A1526)', // Crisp dark in light mode, pure white in dark mode
          secondary: 'var(--text-secondary, #544D66)',
          muted: 'var(--text-muted, #7E7594)',
          light: '#C4BFD3',
          dark: '#FFFFFF',
          darkSecondary: '#D8CFEB',
          darkMuted: '#9E93B8',
        },
        border: {
          DEFAULT: 'var(--border-subtle, #E6DCF5)',
          input: 'var(--border-input, #DECFFF)',
        },
        // SOS & status indicators
        sos: {
          DEFAULT: '#E53935',
          dark: '#C62828',
          glow: 'rgba(229, 57, 53, 0.35)',
        },
        safe: {
          DEFAULT: '#10B981',
          soft: '#ECFDF5',
        }
      },
      fontFamily: {
        // Poppins font configured as the primary font family
        sans: ['Poppins', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      borderRadius: {
        'brand': '16px', // 16px soft friendly radius requested
        '16': '16px',
        '2xl': '16px',
        '3xl': '24px',
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(123, 79, 214, 0.08)',
        'float': '0 8px 30px -4px rgba(123, 79, 214, 0.16)',
        'nav': '0 -4px 20px rgba(30, 27, 41, 0.05)',
        'sos': '0 0 0 10px rgba(229, 57, 53, 0.15), 0 10px 30px rgba(229, 57, 53, 0.35)',
      },
      minHeight: {
        'touch': '44px', // 44px touch targets minimum
      },
      minWidth: {
        'touch': '44px',
      }
    },
  },
  plugins: [],
}

