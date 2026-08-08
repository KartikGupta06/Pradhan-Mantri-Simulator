'use client';

import React from 'react';
import { MiniAvatar } from './MiniAvatar';
import { Badge } from './Badge';
import { NotificationDot } from './NotificationDot';
import { Bell, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useGameStore } from '@/game/store/useGameStore';

interface PlayerProfileCardProps {
  name?: string;
  title?: string;
  party?: string;
  year?: string;
  week?: string;
  notificationsCount?: number;
  onNotificationClick?: () => void;
  onSettingsClick?: () => void;
  className?: string;
}

export const PlayerProfileCard: React.FC<PlayerProfileCardProps> = ({
  name: propName,
  title: propTitle,
  party: propParty,
  year: propYear,
  week: propWeek,
  notificationsCount = 3,
  onNotificationClick,
  onSettingsClick,
  className,
}) => {
  const gameState = useGameStore((state) => state.gameState);

  const name = propName ?? gameState.player.name;
  const title = propTitle ?? gameState.player.title;
  const party = propParty ?? gameState.player.party;
  const year = propYear ?? `${gameState.time.year}`;
  const week = propWeek ?? `${gameState.time.month}, Week ${gameState.time.week}`;

  return (
    <div className={cn('w-full flex items-center justify-between p-2 rounded-game glass-panel border-gold/20', className)}>
      {/* Left Avatar & Info */}
      <div className="flex items-center gap-2.5">
        <MiniAvatar size="md" />
        <div className="flex flex-col">
          <h3 className="font-heading text-xs font-bold gold-gradient-text tracking-wide uppercase leading-tight">
            {name}
          </h3>
          <span className="text-[10px] text-slate-400 font-sans">{title}</span>
          <div className="mt-0.5">
            <Badge variant="gold" className="text-[9px] py-0 px-1.5">
              {party}
            </Badge>
          </div>
        </div>
      </div>

      {/* Right Year Tracker & Quick Action Icons */}
      <div className="flex items-center gap-3">
        <div className="flex flex-col items-end text-right">
          <span className="text-[9px] font-mono uppercase text-slate-400">YEAR</span>
          <span className="font-mono text-base font-bold text-gold-light leading-none">
            {year}
          </span>
          <span className="text-[9px] font-sans text-slate-400 mt-0.5">{week}</span>
        </div>

        <div className="flex items-center gap-1.5 border-l border-gold/15 pl-2">
          <button
            onClick={onNotificationClick}
            className="w-8 h-8 rounded-full bg-navy-surface border border-gold/20 flex items-center justify-center text-slate-300 hover:text-gold relative"
          >
            <Bell className="w-4 h-4" />
            {notificationsCount > 0 && (
              <NotificationDot count={notificationsCount} className="absolute -top-1 -right-1" />
            )}
          </button>
          <button
            onClick={onSettingsClick}
            className="w-8 h-8 rounded-full bg-navy-surface border border-gold/20 flex items-center justify-center text-slate-300 hover:text-gold"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
