/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Tusome's colours are royal blue and gold, with cream behind the work. The app was built with
        // Tailwind's indigo (and a little violet) as its brand colour, so those names are redefined
        // here as the brand blue - every button, link and highlight follows from this one place.
        primary: {
          50: '#eef2fc',
          100: '#dce4f8',
          200: '#bbcbf1',
          300: '#8fa8e6',
          400: '#5f80d8',
          500: '#3a5fc4',
          600: '#1b3fa0',
          700: '#18398f',
          800: '#14307d',
          900: '#0f2563',
          950: '#09163f',
        },
        indigo: {
          50: '#eef2fc',
          100: '#dce4f8',
          200: '#bbcbf1',
          300: '#8fa8e6',
          400: '#5f80d8',
          500: '#3a5fc4',
          600: '#1b3fa0',
          700: '#18398f',
          800: '#14307d',
          900: '#0f2563',
          950: '#09163f',
        },
        violet: {
          50: '#eef2fc',
          100: '#dce4f8',
          200: '#bbcbf1',
          300: '#8fa8e6',
          400: '#5f80d8',
          500: '#3a5fc4',
          600: '#1b3fa0',
          700: '#18398f',
          800: '#14307d',
          900: '#0f2563',
          950: '#09163f',
        },
        // The brand's gold: on blue, or as a filled badge with dark words - too faint as text on white
        gold: {
          50: '#fdf8e8',
          100: '#faeec6',
          200: '#f4dc8d',
          300: '#edc95a',
          400: '#e5b836',
          500: '#d9a520',
          600: '#b8871a',
          700: '#8a6200',
          800: '#6b4c00',
          900: '#4a3705',
        },
        // Warm paper behind the white cards and on the public site's alternating sections
        cream: {
          50: '#fdfaf3',
          100: '#faf5e8',
          200: '#f3e9cf',
          300: '#e8d9b3',
        },
        // Accent (amber) for attention and notices; success (emerald) means right or done, and is
        // the only green left in Tusome. Red (danger) is only a warning signal - overdue, errors.
        accent: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        success: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
        },
        warning: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        danger: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
        },
      },
      // One plain, readable font everywhere (Inter). Pages that asked for a display font get Inter
      // too; only the eSpace word logo keeps its own face (font-brand).
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
        jakarta: ['Inter', 'system-ui', 'sans-serif'],
        brand: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        // the sidebar and the hub tabs: the logo's own face, at reading weights
        nav: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        // page titles and the public site's headings: a book serif, academic in feel
        heading: ['"Source Serif 4"', 'Georgia', 'Cambria', '"Times New Roman"', 'serif'],
      },
      // Light, calm type: nothing heavier than semi-bold, and "semibold" labels read as medium
      fontWeight: {
        semibold: '500',
        bold: '600',
        extrabold: '600',
        black: '600',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
        'glass-lg': '0 16px 48px 0 rgba(31, 38, 135, 0.2)',
      },
      backdropBlur: {
        'glass': '12px',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'slide-down': 'slideDown 0.4s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'bounce-subtle': 'bounceSubtle 0.5s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
      },
    },
  },
  plugins: [],
}
