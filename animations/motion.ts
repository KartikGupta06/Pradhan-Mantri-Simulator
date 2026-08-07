import { Variants, TargetAndTransition } from 'framer-motion';

/**
 * Reusable Motion Presets for Mobile Strategy Game UI
 */

export const tapAnimation = {
  whileTap: { scale: 0.96 },
  transition: { type: 'spring' as const, stiffness: 400, damping: 25 },
};

export const cardHover: TargetAndTransition = {
  scale: 1.02,
  y: -2,
  transition: { duration: 0.2, ease: 'easeOut' },
};

export const pageTransition: Variants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.25, ease: 'easeOut' } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.15, ease: 'easeIn' } },
};

export const popupAnimation: Variants = {
  initial: { opacity: 0, scale: 0.9, y: 20 },
  animate: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring' as const, stiffness: 350, damping: 25 } },
  exit: { opacity: 0, scale: 0.95, y: 10, transition: { duration: 0.15 } },
};

export const scaleIn: Variants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.2 } },
};

export const slideUp: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.2 } },
};
