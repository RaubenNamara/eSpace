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
        // eSpace's colours are green, white and black. The app was built with Tailwind's indigo (and a
        // little violet) as its brand colour, so those names are redefined here as the brand green -
        // every button, link and highlight follows from this one place.
        primary: {
          50: '#effbf3',
          100: '#d7f5e1',
          200: '#b0eac6',
          300: '#7dd8a3',
          400: '#46bf7b',
          500: '#22a45d',
          600: '#15874a',
          700: '#126c3d',
          800: '#115633',
          900: '#0f472b',
          950: '#062a18',
        },
        indigo: {
          50: '#effbf3',
          100: '#d7f5e1',
          200: '#b0eac6',
          300: '#7dd8a3',
          400: '#46bf7b',
          500: '#22a45d',
          600: '#15874a',
          700: '#126c3d',
          800: '#115633',
          900: '#0f472b',
          950: '#062a18',
        },
        violet: {
          50: '#effbf3',
          100: '#d7f5e1',
          200: '#b0eac6',
          300: '#7dd8a3',
          400: '#46bf7b',
          500: '#22a45d',
          600: '#15874a',
          700: '#126c3d',
          800: '#115633',
          900: '#0f472b',
          950: '#062a18',
        },
        // Accent (amber) for attention and notices; success (emerald) for progress. Red (danger) is
        // only a warning signal - overdue, errors - never decoration.
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
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'system-ui', 'sans-serif'],
        jakarta: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
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
