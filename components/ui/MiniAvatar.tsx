'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface MiniAvatarProps {
  src?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg';
  flagIcon?: React.ReactNode;
  className?: string;
}

export const MiniAvatar: React.FC<MiniAvatarProps> = ({
  src,
  alt = 'Avatar',
  size = 'md',
  flagIcon,
  className,
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-11 h-11',
    lg: 'w-14 h-14',
  }[size];

  return (
    <div className={cn('relative inline-block shrink-0', className)}>
      <div
        className={cn(
          'rounded-full overflow-hidden border-2 border-gold shadow-gold-sm bg-navy-surface flex items-center justify-center text-gold font-heading font-bold text-xs',
          sizeClasses
        )}
      >
        {src ? (
          <img src={src} alt={alt} className="w-full h-full object-cover" />
        ) : (
          <span>PM</span>
        )}
      </div>
      {flagIcon && (
        <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-navy-dark border border-gold flex items-center justify-center text-[9px]">
          {flagIcon}
        </div>
      )}
    </div>
  );
};
