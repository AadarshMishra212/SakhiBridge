/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Deep Burgundy Palette (Heart of the protective, editorial identity)
        burgundy: {
          50: '#FDF2F4',
          100: '#FCE4E7',
          200: '#F9CBD2',
          300: '#F4A2AF',
          400: '#EC6E83',
          500: '#DF3D5B',
          600: '#C42544',
          700: '#A41B35',
          800: '#87182D',
          900: '#5A121F',
          950: '#360911',
        },
        // Ballet Slipper core palette (#FE9179)
        primary: {
          DEFAULT: '#FE9179',
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
          800: '#842D1B',
          900: '#5A121F',
          950: '#360911',
        },
        // Lace warm ivory (#FFEDD1)
        lace: {
          DEFAULT: '#FFEDD1',
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
        // Coral & Rose accents
        accent: {
          DEFAULT: '#FF6B5E',
          light: '#FF887D',
          dark: '#E54E41',
          soft: '#FFF1EF',
          50: '#FFF5F4',
          100: '#FFE8E5',
          500: '#FF6B5E',
          600: '#E54E41',
        },
        // Semantic surfaces
        surface: {
          DEFAULT: 'var(--bg-surface, #FFFFFF)',
          alt: 'var(--bg-app, #FFF8F5)',
          muted: 'var(--bg-surface-subtle, #FFEAE2)',
          card: 'var(--bg-surface, #FFFFFF)',
          elevated: 'var(--bg-surface-elevated, #FFF1EC)',
          dark: '#150C10',
          darkCard: '#1E1217',
          darkElevated: '#281820',
        },
        // Semantic typography ink
        ink: {
          DEFAULT: 'var(--text-main, #2A1215)',
          secondary: 'var(--text-secondary, #634045)',
          muted: 'var(--text-muted, #8C6369)',
          light: '#FFEDD1',
          dark: '#FFEDD1',
          darkSecondary: '#E5D3BA',
          darkMuted: '#B8A186',
        },
        border: {
          DEFAULT: 'var(--border-subtle, rgba(110, 24, 38, 0.08))',
          input: 'var(--border-input, #FFCCBF)',
        },
        // SOS Red (Reserved STRICTLY for emergency actions)
        sos: {
          DEFAULT: '#E52E2E',
          dark: '#B91C1C',
          light: '#FEE2E2',
          glow: 'rgba(229, 46, 46, 0.28)',
        },
        safe: {
          DEFAULT: '#059669',
          soft: '#ECFDF5',
          dark: '#34D399',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Poppins', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'Cambria', 'serif'],
        display: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      borderRadius: {
        'brand': '16px',
        'xl': '12px',
        '2xl': '16px',
        '3xl': '24px',
        '4xl': '28px',
        '5xl': '32px',
      },
      boxShadow: {
        'soft': '0 2px 6px rgba(74, 14, 23, 0.03), 0 8px 20px -2px rgba(74, 14, 23, 0.06)',
        'premium': '0 2px 4px rgba(74, 14, 23, 0.04), 0 12px 28px rgba(74, 14, 23, 0.08)',
        'float': '0 4px 10px rgba(74, 14, 23, 0.05), 0 20px 40px rgba(74, 14, 23, 0.12)',
        'glow-rose': '0 0 24px rgba(254, 145, 121, 0.35)',
        'nav': '0 -4px 20px rgba(30, 18, 23, 0.06)',
        'sos': '0 0 0 8px rgba(229, 46, 46, 0.18), 0 12px 30px rgba(229, 46, 46, 0.38)',
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
