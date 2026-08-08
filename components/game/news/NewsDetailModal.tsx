'use client';

import React from 'react';
import { Modal } from '@/components/ui/Modal';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { NewsItem } from '@/types/news';
import { Newspaper, Calendar, ShieldCheck } from 'lucide-react';

interface NewsDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  news: NewsItem | null;
}

export const NewsDetailModal: React.FC<NewsDetailModalProps> = ({ isOpen, onClose, news }) => {
  if (!news) return null;

  const getSentimentBadgeVariant = () => {
    switch (news.sentiment) {
      case 'Positive':
        return 'emerald';
      case 'Negative':
        return 'crimson';
      default:
        return 'gold';
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="NATIONAL NEWS BULLETIN">
      <div className="flex flex-col gap-3.5 select-none text-left">
        {/* Header Metadata */}
        <div className="flex items-center justify-between border-b border-gold/15 pb-2">
          <div className="flex items-center gap-1.5">
            <Badge variant="gold" className="text-[9px]">
              {news.category.toUpperCase()}
            </Badge>
            <Badge variant={getSentimentBadgeVariant()} className="text-[9px]">
              {news.sentiment.toUpperCase()} SENTIMENT
            </Badge>
          </div>
          <div className="flex items-center gap-1 text-[10px] font-mono text-slate-400">
            <Calendar className="w-3 h-3 text-gold" />
            <span>{news.timestamp}</span>
          </div>
        </div>

        {/* Newspaper Brand & Headline */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-1.5 text-gold text-[10px] font-heading font-bold uppercase tracking-widest">
            <Newspaper className="w-3.5 h-3.5" />
            <span>THE TIMES OF INDIA • OFFICIAL BULLETIN</span>
          </div>
          <h2 className="font-heading text-sm sm:text-base font-bold text-slate-100 leading-snug">
            {news.headline}
          </h2>
        </div>

        {/* Full Summary */}
        <div className="p-3 bg-navy-dark rounded-game border border-gold/15">
          <p className="text-xs text-slate-200 font-sans leading-relaxed">
            {news.summary}
          </p>
        </div>

        {/* Official PMO Stamp */}
        <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pt-1">
          <span className="flex items-center gap-1 text-emerald">
            <ShieldCheck className="w-3.5 h-3.5" /> Verified PMO Press Dispatch
          </span>
          <span>Ref ID: {news.id.slice(0, 12)}</span>
        </div>

        <div className="flex justify-end pt-2 border-t border-gold/15">
          <Button variant="secondary" size="sm" onClick={onClose}>
            Close Bulletin
          </Button>
        </div>
      </div>
    </Modal>
  );
};
