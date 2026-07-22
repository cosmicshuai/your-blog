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
      boxShadow: {
        'glow': '0 0 20px -5px rgba(0, 0, 0, 0.3)',
        'glow-green': '0 0 20px -5px rgba(74, 222, 128, 0.4)',
        'glow-cyan': '0 0 20px -5px rgba(34, 211, 238, 0.4)',
      },
      colors: {
        terminal: {
          green: '#4ade80',
          cyan: '#22d3ee',
          dim: '#6b7280',
          dark: '#0a0a0f',
          darker: '#050508',
          surface: '#111118',
          border: '#1e1e2e',
          'light-bg': '#f5f5f0',
          'light-surface': '#ffffff',
          'light-border': '#e5e5e0',
        },
      },
      fontFamily: {
        sans: ['JetBrains Mono', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'float': 'float 20s ease-in-out infinite',
        'float-delayed': 'float 20s ease-in-out 10s infinite',
        'shimmer': 'shimmer 3s linear infinite',
        'pulse-glow': 'pulse-glow 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
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
        float: {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
        },
        shimmer: {
          from: { backgroundPosition: '200% 0' },
          to: { backgroundPosition: '-200% 0' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '.5' },
        },
        gradient: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: '#6b7280',
            a: {
              color: 'var(--color-terminal-cyan)',
              textDecoration: 'none',
              '&:hover': {
                color: 'var(--color-terminal-green)',
                textDecoration: 'underline',
              },
            },
            h1: {
              color: 'var(--color-terminal-darker)',
              fontWeight: '700',
            },
            h2: {
              color: 'var(--color-terminal-darker)',
              fontWeight: '600',
            },
            h3: {
              color: 'var(--color-terminal-darker)',
              fontWeight: '600',
            },
            code: {
              color: 'var(--color-terminal-darker)',
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
              backgroundColor: 'var(--color-terminal-darker)',
              color: 'var(--color-terminal-light-bg)',
            },
            blockquote: {
              borderLeftColor: 'var(--color-terminal-cyan)',
              color: '#475569',
            },
          },
        },
        invert: {
          css: {
            color: '#cbd5e1',
            a: {
              color: 'var(--color-terminal-cyan)',
              '&:hover': {
                color: 'var(--color-terminal-green)',
              },
            },
            h1: {
              color: 'var(--color-terminal-light-bg)',
            },
            h2: {
              color: 'var(--color-terminal-light-bg)',
            },
            h3: {
              color: '#e2e8f0',
            },
            code: {
              color: 'var(--color-terminal-light-bg)',
              backgroundColor: 'var(--color-terminal-surface)',
            },
            pre: {
              backgroundColor: 'var(--color-terminal-darker)',
              color: 'var(--color-terminal-light-bg)',
            },
            blockquote: {
              borderLeftColor: 'var(--color-terminal-cyan)',
              color: '#94a3b8',
              backgroundColor: 'var(--color-terminal-surface)',
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
