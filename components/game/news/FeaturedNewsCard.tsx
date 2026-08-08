'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { tapAnimation } from '@/animations/motion';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { NewsItem } from '@/types/news';
import { Newspaper, ChevronRight, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FeaturedNewsCardProps {
  news: NewsItem;
  onClick: (news: NewsItem) => void;
  className?: string;
}

export const FeaturedNewsCard: React.FC<FeaturedNewsCardProps> = ({ news, onClick, className }) => {
  return (
    <motion.div {...tapAnimation} className={cn('w-full', className)}>
      <Card
        variant="gold"
        className="w-full flex flex-col gap-2.5 p-4 border-gold/40 shadow-gold-glow cursor-pointer text-left relative overflow-hidden group"
        onClick={() => onClick(news)}
      >
        {/* Top Featured Strip */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Badge variant="crimson" className="text-[9px] py-0.5 px-2 flex items-center gap-1">
              <Zap className="w-3 h-3 animate-pulse" />
              {news.importance.toUpperCase()}
            </Badge>
            <Badge variant="gold" className="text-[9px] py-0.5 px-2">
              {news.category.toUpperCase()}
            </Badge>
          </div>
          <span className="text-[10px] font-mono font-bold text-gold-light">{news.timestamp}</span>
        </div>

        {/* Newspaper Brand & Headline */}
        <div className="flex flex-col gap-1.5 mt-1">
          <div className="flex items-center gap-1.5 text-gold text-[10px] font-heading font-bold uppercase tracking-widest">
            <Newspaper className="w-3.5 h-3.5" />
            <span>THE TIMES OF INDIA • FEATURED</span>
          </div>
          <h2 className="font-heading text-base sm:text-lg font-bold text-slate-100 group-hover:text-gold transition-colors leading-snug">
            {news.headline}
          </h2>
          <p className="text-xs text-slate-200 font-sans leading-relaxed line-clamp-3">
            {news.summary}
          </p>
        </div>

        {/* Read Full Coverage CTA */}
        <div className="pt-2 border-t border-gold/20 flex items-center justify-between text-xs font-bold text-gold">
          <span className="text-[10px] font-mono text-slate-300">National Reaction Feed</span>
          <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
            View Full Bulletin <ChevronRight className="w-4 h-4" />
          </span>
        </div>
      </Card>
    </motion.div>
  );
};
