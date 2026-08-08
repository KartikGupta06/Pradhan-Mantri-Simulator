'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { tapAnimation } from '@/animations/motion';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { NewsItem } from '@/types/news';
import { Newspaper, ChevronRight, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NewsCardProps {
  news: NewsItem;
  onClick: (news: NewsItem) => void;
  className?: string;
}

export const NewsCard: React.FC<NewsCardProps> = ({ news, onClick, className }) => {
  const getSentimentIcon = () => {
    switch (news.sentiment) {
      case 'Positive':
        return <TrendingUp className="w-3.5 h-3.5 text-emerald" />;
      case 'Negative':
        return <TrendingDown className="w-3.5 h-3.5 text-crimson" />;
      default:
        return <Minus className="w-3.5 h-3.5 text-gold" />;
    }
  };

  const getImportanceBadge = () => {
    if (news.importance === 'Breaking') {
      return <Badge variant="crimson" className="text-[9px] py-0.5 px-1.5 animate-pulse">BREAKING</Badge>;
    }
    if (news.importance === 'Important') {
      return <Badge variant="gold" className="text-[9px] py-0.5 px-1.5">IMPORTANT</Badge>;
    }
    return <Badge variant="slate" className="text-[9px] py-0.5 px-1.5">NEWS</Badge>;
  };

  return (
    <motion.div {...tapAnimation} className={cn('w-full', className)}>
      <Card
        variant="glass"
        className="w-full flex flex-col gap-2 p-3 border-gold/15 hover:border-gold/40 transition-all cursor-pointer text-left relative overflow-hidden group"
        onClick={() => onClick(news)}
      >
        {/* Top Badges & Sentiment */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Badge variant="gold" className="text-[9px] py-0.5 px-2">
              {news.category.toUpperCase()}
            </Badge>
            {getImportanceBadge()}
          </div>
          <div className="flex items-center gap-1 text-[10px] font-mono text-slate-400">
            {getSentimentIcon()}
            <span>{news.timestamp}</span>
          </div>
        </div>

        {/* Headline & Summary */}
        <div className="flex flex-col gap-1 mt-0.5">
          <h4 className="font-heading text-xs sm:text-sm font-bold text-slate-100 group-hover:text-gold transition-colors leading-snug">
            {news.headline}
          </h4>
          <p className="text-[11px] text-slate-300 font-sans leading-relaxed line-clamp-2">
            {news.summary}
          </p>
        </div>

        {/* Bottom Read Chevron */}
        <div className="flex items-center justify-between pt-1 border-t border-gold/10 text-[9px] font-mono text-slate-400">
          <span className="flex items-center gap-1 text-slate-400">
            <Newspaper className="w-3 h-3 text-gold" /> Press Release
          </span>
          <span className="text-gold flex items-center gap-0.5 font-bold group-hover:translate-x-0.5 transition-transform">
            Read Coverage <ChevronRight className="w-3 h-3" />
          </span>
        </div>
      </Card>
    </motion.div>
  );
};
