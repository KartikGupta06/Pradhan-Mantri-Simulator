'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { tapAnimation } from '@/animations/motion';
import { Home, FileText, Users, Globe, User } from 'lucide-react';

const NAV_ITEMS = [
  { label: 'HOME', href: '/dashboard', icon: Home },
  { label: 'POLICIES', href: '/decisions', icon: FileText },
  { label: 'CABINET', href: '/cabinet', icon: Users },
  { label: 'WORLD', href: '/diplomacy', icon: Globe },
  { label: 'PM OFFICE', href: '/settings', icon: User },
];

export const BottomNavigation: React.FC = () => {
  const pathname = usePathname();

  return (
    <nav className="glass-panel border-t border-gold/25 bg-[#060913]/95 px-1 pt-1.5 pb-[max(0.5rem,env(safe-area-inset-bottom))] flex items-center justify-around z-40 shrink-0 shadow-2xl">
      {NAV_ITEMS.map((item) => {
        const Icon = item.icon;
        const isActive =
          pathname === item.href || (pathname === '/' && item.href === '/dashboard');

        return (
          <Link key={item.href} href={item.href} className="flex-1">
            <motion.div
              {...tapAnimation}
              className={cn(
                'flex flex-col items-center justify-center gap-0.5 py-1 px-1 rounded-game-sm transition-all',
                isActive
                  ? 'text-gold-light bg-gold/15 border border-gold/40 shadow-gold-sm'
                  : 'text-slate-400 hover:text-slate-200'
              )}
            >
              <Icon className={cn('w-4 h-4 sm:w-5 sm:h-5', isActive ? 'text-gold' : 'text-slate-400')} />
              <span className="text-[9px] font-sans font-bold tracking-tight truncate max-w-full uppercase">
                {item.label}
              </span>
            </motion.div>
          </Link>
        );
      })}
    </nav>
  );
};
