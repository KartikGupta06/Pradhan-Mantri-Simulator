/**
 * Centralized Design System Tokens for Pradhan Mantri Simulator
 */

export const THEME_COLORS = {
  background: {
    primary: '#0A0F1D',
    dark: '#060913',
    surface: '#121A2D',
  },
  accent: {
    gold: '#D4AF37',
    goldLight: '#F3E5AB',
    goldDark: '#B8860B',
    goldGlow: '#F59E0B',
  },
  status: {
    emerald: '#10B981',
    crimson: '#EF4444',
    slate: '#64748B',
  },
  glass: {
    cardBg: 'rgba(18, 26, 45, 0.75)',
    cardBorder: 'rgba(212, 175, 55, 0.15)',
    cardBorderActive: 'rgba(212, 175, 55, 0.4)',
  },
} as const;

export const TYPOGRAPHY = {
  heading: 'font-heading tracking-wide uppercase font-bold',
  section: 'font-sans font-semibold tracking-normal',
  body: 'font-sans text-sm font-normal text-slate-300',
  caption: 'font-sans text-xs text-slate-400',
  numbers: 'font-mono font-bold tracking-tight',
  button: 'font-sans font-bold uppercase tracking-wider text-sm',
} as const;

export const RESOLUTION = {
  targetWidth: 390,
  targetHeight: 844,
  aspectRatio: '390/844',
} as const;
