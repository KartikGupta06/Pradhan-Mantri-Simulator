import { ReactNode } from 'react';

/**
 * Global UI Component Types
 */

export type ButtonVariant = 'primary' | 'secondary' | 'emerald' | 'crimson' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface BaseComponentProps {
  className?: string;
  children?: ReactNode;
}

export interface ModalProps extends BaseComponentProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

export interface StatTileProps extends BaseComponentProps {
  label: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  icon?: ReactNode;
}
