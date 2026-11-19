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
        // Ballet Slipper brand palette (#FE9179)
        primary: {
          DEFAULT: '#FE9179', // Core Ballet Slipper coral-pink
          light: '#FFA693',
          dark: '#E27660',
          soft: '#FFF0EC',
          50: '#FFF7F4',
          100: '#FFEBE5',
          200: '#FFD6CC',
          300: '#FFB8A7',
          400: '#FFA693',
          500: '#FE9179',
          600: '#E27660',
          700: '#C55A44',
          800: '#A4422D',
          900: '#842D1B',
        },
        // Lace palette (#FFEDD1) for text, light highlights and warm ivory accents
        lace: {
          DEFAULT: '#FFEDD1', // Lace warm ivory cream
          light: '#FFF8EC',
          dark: '#F5DCB5',
          muted: '#E6CAA0',
          50: '#FFFAF2',
          100: '#FFF4E2',
          200: '#FFEDD1',
          300: '#F5DCB5',
          400: '#E6CAA0',
          500: '#D5B486',
        },
        // Complementary ballet rose accent
        accent: {
          DEFAULT: '#FF6B8B',
          light: '#FF8DA6',
          dark: '#E24C6F',
          soft: '#FFF0F3',
          50: '#FFF5F7',
          100: '#FFE8ED',
          500: '#FF6B8B',
          600: '#E24C6F',
        },
        // Warm ballet-toned aliases for border and background utility compatibility
        purple: {
          50: '#FFF6F3',
          100: '#FFEBE5',
          200: '#FFD7CC',
          300: '#FFAEA0',
          400: '#FF8F7E',
          500: '#FE9179',
          600: '#E27660',
          700: '#B8503C',
          800: '#3D1D23',
          900: '#2A141A',
          950: '#1D0E13',
        },
        // Base backgrounds & surfaces (backed by CSS theme variables with fallback)
        surface: {
          DEFAULT: 'var(--bg-surface, #FFFFFF)',
          alt: 'var(--bg-app, #FFF7F4)',
          muted: 'var(--bg-surface-subtle, #FFEAE2)',
          card: 'var(--bg-surface, #FFFFFF)',
          elevated: 'var(--bg-surface-elevated, #FFF1EC)',
          dark: '#1E121A',
          darkCard: '#281823',
        },
        ink: {
          DEFAULT: 'var(--text-main, #2D1914)', // Deep warm espresso in light mode, Lace #FFEDD1 in dark mode
          secondary: 'var(--text-secondary, #6E493F)',
          muted: 'var(--text-muted, #966E63)',
          light: '#FFEDD1', // Lace
          dark: '#FFEDD1',  // Lace text in dark mode!
          darkSecondary: '#F0DDC5', // Soft lace
          darkMuted: '#C9B299',    // Muted lace
        },
        border: {
          DEFAULT: 'var(--border-subtle, #FFE0D6)',
          input: 'var(--border-input, #FFCCBF)',
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
        sans: ['Poppins', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      borderRadius: {
        'brand': '16px',
        '16': '16px',
        '2xl': '16px',
        '3xl': '24px',
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(254, 145, 121, 0.12)',
        'float': '0 8px 30px -4px rgba(254, 145, 121, 0.22)',
        'nav': '0 -4px 20px rgba(30, 18, 26, 0.08)',
        'sos': '0 0 0 10px rgba(229, 57, 53, 0.15), 0 10px 30px rgba(229, 57, 53, 0.35)',
      },
      minHeight: {
        'touch': '44px',
      },
      minWidth: {
        'touch': '44px',
      }
    },
  },
  plugins: [],
}
