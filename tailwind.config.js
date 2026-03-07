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
        sans: ['JetBrains Mono', 'ui-monospace', 'monospace'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: theme('colors.terminal.dim'),
            a: {
              color: theme('colors.terminal.cyan'),
              textDecoration: 'none',
              '&:hover': {
                color: theme('colors.terminal.cyan'),
                textDecoration: 'underline',
              },
            },
            h1: {
              color: theme('colors.terminal.dark'),
              fontWeight: '700',
            },
            h2: {
              color: theme('colors.terminal.dark'),
              fontWeight: '600',
            },
            h3: {
              color: theme('colors.terminal.dark'),
              fontWeight: '600',
            },
            code: {
              color: theme('colors.terminal.dark'),
              backgroundColor: theme('colors.terminal.light-bg'),
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
              backgroundColor: theme('colors.terminal.surface'),
              color: theme('colors.terminal.light-surface'),
            },
            blockquote: {
              borderLeftColor: theme('colors.terminal.cyan'),
              color: theme('colors.terminal.dim'),
            },
          },
        },
        invert: {
          css: {
            color: theme('colors.terminal.light-bg'),
            a: {
              color: theme('colors.terminal.cyan'),
              '&:hover': {
                color: theme('colors.terminal.green'),
              },
            },
            h1: {
              color: theme('colors.terminal.light-surface'),
            },
            h2: {
              color: theme('colors.terminal.light-surface'),
            },
            h3: {
              color: theme('colors.terminal.light-bg'),
            },
            code: {
              color: theme('colors.terminal.light-surface'),
              backgroundColor: theme('colors.terminal.surface'),
            },
            pre: {
              backgroundColor: theme('colors.terminal.darker'),
              color: theme('colors.terminal.light-surface'),
            },
            blockquote: {
              borderLeftColor: theme('colors.terminal.cyan'),
              color: theme('colors.terminal.dim'),
              backgroundColor: theme('colors.terminal.dark'),
            },
          },
        },
      }),
    },
  },
  plugins: [
    typography,
  ],
};
