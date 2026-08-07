'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { tapAnimation } from '@/animations/motion';
import { LayoutDashboard, Users, Gavel, Radio, Globe, Settings } from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Cabinet', href: '/cabinet', icon: Users },
  { label: 'Decisions', href: '/decisions', icon: Gavel },
  { label: 'Events', href: '/events', icon: Radio },
  { label: 'Diplomacy', href: '/diplomacy', icon: Globe },
  { label: 'Settings', href: '/settings', icon: Settings },
];

export const BottomNavigation: React.FC = () => {
  const pathname = usePathname();

  return (
    <nav className="glass-panel border-t border-gold/20 bg-navy-dark/90 px-2 py-2 flex items-center justify-around z-40 shrink-0">
      {NAV_ITEMS.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href || (pathname === '/' && item.href === '/dashboard');

        return (
          <Link key={item.href} href={item.href} className="flex-1">
            <motion.div
              {...tapAnimation}
              className={cn(
                'flex flex-col items-center justify-center gap-1 py-1 px-1 rounded-game-sm transition-colors',
                isActive
                  ? 'text-gold-light bg-gold/10 border border-gold/30 shadow-gold-sm'
                  : 'text-slate-400 hover:text-slate-200'
              )}
            >
              <Icon className={cn('w-5 h-5', isActive ? 'text-gold' : 'text-slate-400')} />
              <span className="text-[10px] font-sans tracking-tight truncate max-w-full">
                {item.label}
              </span>
            </motion.div>
          </Link>
        );
      })}
    </nav>
  );
};
