'use client';

import React from 'react';
import { AlertTriangle, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EmergencyBannerProps {
  title?: string;
  description?: string;
  urgentCount?: number;
  onRespondClick?: () => void;
  className?: string;
}

export const EmergencyBanner: React.FC<EmergencyBannerProps> = ({
  title = 'Flood in Assam',
  description = 'Lives and infrastructure at risk. People are looking for your response.',
  urgentCount = 3,
  onRespondClick,
  className,
}) => {
  return (
    <div
      onClick={onRespondClick}
      className={cn(
        'w-full glass-panel-crimson rounded-game p-3 flex items-center justify-between cursor-pointer group transition-all duration-200 border-crimson/50',
        className
      )}
    >
      {/* Left Hazard Icon & Content */}
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-full bg-crimson/20 border border-crimson flex items-center justify-center text-crimson shrink-0 animate-pulse">
          <AlertTriangle className="w-5 h-5" />
        </div>
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-2">
            <span className="font-heading text-xs font-bold text-crimson uppercase tracking-wider">
              CURRENT CRISIS
            </span>
            {urgentCount > 0 && (
              <span className="text-[10px] font-mono font-bold text-slate-300">
                • {urgentCount} URGENT EVENTS
              </span>
            )}
          </div>
          <h4 className="font-sans text-sm font-bold text-slate-100 mt-0.5">{title}</h4>
          <p className="text-xs text-slate-300 font-sans line-clamp-1 max-w-[220px]">
            {description}
          </p>
        </div>
      </div>

      {/* Right Action Chevron */}
      <div className="w-7 h-7 rounded-full bg-crimson/20 flex items-center justify-center text-crimson group-hover:translate-x-0.5 transition-transform shrink-0">
        <ChevronRight className="w-4 h-4" />
      </div>
    </div>
  );
};
