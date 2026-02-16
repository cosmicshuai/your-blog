import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./src/**/*.{html,njk,md}",
    "!./node_modules/**",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
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
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: '#334155',
            a: {
              color: '#0ea5e9',
              textDecoration: 'none',
              '&:hover': {
                color: '#0284c7',
                textDecoration: 'underline',
              },
            },
            h1: {
              color: '#0f172a',
              fontWeight: '700',
            },
            h2: {
              color: '#0f172a',
              fontWeight: '600',
            },
            h3: {
              color: '#0f172a',
              fontWeight: '600',
            },
            code: {
              color: '#0f172a',
              backgroundColor: '#f1f5f9',
              padding: '0.25rem 0.375rem',
              borderRadius: '0.25rem',
              fontWeight: '400',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            pre: {
              backgroundColor: '#1e293b',
              color: '#f8fafc',
            },
            blockquote: {
              borderLeftColor: '#0ea5e9',
              color: '#475569',
            },
          },
        },
        invert: {
          css: {
            color: '#cbd5e1',
            a: {
              color: '#38bdf8',
              '&:hover': {
                color: '#7dd3fc',
              },
            },
            h1: {
              color: '#f8fafc',
            },
            h2: {
              color: '#f1f5f9',
            },
            h3: {
              color: '#e2e8f0',
            },
            code: {
              color: '#f1f5f9',
              backgroundColor: '#1e293b',
            },
            pre: {
              backgroundColor: '#0f172a',
              color: '#f8fafc',
            },
            blockquote: {
              borderLeftColor: '#38bdf8',
              color: '#94a3b8',
              backgroundColor: '#0f172a',
            },
          },
        },
      },
    },
  },
  plugins: [
    typography,
  ],
};
