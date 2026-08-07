/**
 * Centralized Game Design System Tokens for Pradhan Mantri Simulator
 */

export const THEME_COLORS = {
  background: {
    primary: '#0A0F1D',
    dark: '#060913',
    surface: '#121A2D',
    elevated: '#182238',
  },
  accent: {
    gold: '#D4AF37',
    goldLight: '#F3E5AB',
    goldDark: '#B8860B',
    goldGlow: '#F59E0B',
    goldMuted: 'rgba(212, 175, 55, 0.3)',
  },
  status: {
    emerald: '#10B981',
    emeraldDark: '#059669',
    emeraldGlow: 'rgba(16, 185, 129, 0.25)',
    crimson: '#EF4444',
    crimsonDark: '#DC2626',
    crimsonGlow: 'rgba(239, 68, 68, 0.25)',
    orange: '#F97316',
    orangeDark: '#EA580C',
    slate: '#64748B',
    slateLight: '#94A3B8',
  },
  glass: {
    cardBg: 'rgba(18, 26, 45, 0.75)',
    cardBorder: 'rgba(212, 175, 55, 0.15)',
    cardBorderActive: 'rgba(212, 175, 55, 0.4)',
    cardGlow: '0 0 20px rgba(212, 175, 55, 0.2)',
  },
  overlay: {
    dark: 'rgba(6, 9, 19, 0.85)',
    mapGrid: 'rgba(212, 175, 55, 0.08)',
  },
} as const;

export const TYPOGRAPHY = {
  hero: 'font-heading text-2xl sm:text-3xl font-extrabold gold-gradient-text tracking-wide',
  largeHeading: 'font-heading text-xl font-bold gold-gradient-text tracking-wide',
  sectionHeading: 'font-heading text-sm font-semibold uppercase tracking-widest text-gold-light',
  cardTitle: 'font-sans text-sm font-bold text-slate-100',
  statNumber: 'font-mono text-xl sm:text-2xl font-bold tracking-tight text-gold-light',
  statLabel: 'font-sans text-[11px] font-medium uppercase tracking-wider text-slate-400',
  body: 'font-sans text-sm font-normal text-slate-300 leading-relaxed',
  caption: 'font-sans text-xs text-slate-400',
  tiny: 'font-sans text-[10px] text-slate-500',
  button: 'font-sans text-xs sm:text-sm font-bold uppercase tracking-wider',
  chip: 'font-mono text-[10px] font-semibold uppercase tracking-wider',
  badge: 'font-mono text-[10px] font-bold tracking-widest uppercase',
} as const;

export const SPACING = {
  xs: '4px',
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '24px',
  xxl: '32px',
} as const;

export const BORDER_RADIUS = {
  sm: '8px',
  md: '14px',
  lg: '20px',
  full: '9999px',
} as const;

export const SIZES = {
  buttonHeight: {
    sm: '32px',
    md: '42px',
    lg: '54px',
  },
  avatarSize: {
    sm: '32px',
    md: '44px',
    lg: '60px',
  },
  iconSize: {
    xs: '14px',
    sm: '18px',
    md: '22px',
    lg: '28px',
  },
  cardHeight: {
    compact: '90px',
    standard: '140px',
    tall: '200px',
  },
} as const;

export const Z_INDEX = {
  base: 0,
  card: 10,
  stickyHeader: 20,
  navigation: 40,
  modal: 50,
  toast: 60,
} as const;

export const RESOLUTION = {
  targetWidth: 390,
  targetHeight: 844,
  aspectRatio: '390/844',
} as const;
