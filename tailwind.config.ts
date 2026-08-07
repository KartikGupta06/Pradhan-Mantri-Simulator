import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './styles/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0A0F1D',
          dark: '#060913',
          light: '#0F172A',
          surface: '#121A2D',
          border: 'rgba(212, 175, 55, 0.15)',
        },
        gold: {
          DEFAULT: '#D4AF37',
          light: '#F3E5AB',
          dark: '#B8860B',
          glow: '#F59E0B',
          muted: 'rgba(212, 175, 55, 0.3)',
        },
        emerald: {
          DEFAULT: '#10B981',
          dark: '#059669',
          glow: 'rgba(16, 185, 129, 0.25)',
        },
        crimson: {
          DEFAULT: '#EF4444',
          dark: '#DC2626',
          glow: 'rgba(239, 68, 68, 0.25)',
        },
        slate: {
          DEFAULT: '#64748B',
          dark: '#334155',
          light: '#94A3B8',
        },
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'serif'],
        sans: ['var(--font-sans)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      boxShadow: {
        'gold-glow': '0 0 20px rgba(212, 175, 55, 0.25)',
        'gold-sm': '0 0 10px rgba(212, 175, 55, 0.15)',
        'emerald-glow': '0 0 20px rgba(16, 185, 129, 0.25)',
        'crimson-glow': '0 0 20px rgba(239, 68, 68, 0.25)',
        'glass-card': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      backdropBlur: {
        glass: '16px',
      },
      borderRadius: {
        game: '14px',
        'game-sm': '8px',
        'game-lg': '20px',
      },
    },
  },
  plugins: [],
};

export default config;
