import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,njk,md}",
    "!./node_modules/**",
  ],
  theme: {
    extend: {
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
      },
    },
  },
  plugins: [
    typography,
  ],
};
