'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { pageTransition } from '@/animations/motion';
import { PageHeader } from '@/components/ui/PageHeader';
import { Button } from '@/components/ui/Button';
import { FeaturedNewsCard } from '@/components/game/news/FeaturedNewsCard';
import { NewsCard } from '@/components/game/news/NewsCard';
import { NewsDetailModal } from '@/components/game/news/NewsDetailModal';
import { EventAlertModal } from '@/components/game/events/EventAlertModal';
import { DecisionResultView } from '@/components/game/decision/DecisionResultView';
import { NewsItem } from '@/types/news';
import { DecisionOption, DecisionResult } from '@/types/decision';
import { useGameStore } from '@/game/store/useGameStore';
import { Radio, RefreshCw, AlertTriangle } from 'lucide-react';

export default function EventsPage() {
  const gameState = useGameStore((state) => state.gameState);
  const triggerRandomEventAction = useGameStore((state) => state.triggerRandomEventAction);
  const resolveActiveEventAction = useGameStore((state) => state.resolveActiveEventAction);
  const dismissActiveEventAction = useGameStore((state) => state.dismissActiveEventAction);

  const newsList = gameState.news || [];
  const activeEvent = gameState.activeEvent;

  // Selection & View States
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [eventResult, setEventResult] = useState<DecisionResult | null>(null);
  const [devDevNotice, setDevNotice] = useState<string | null>(null);

  const featuredNews = newsList.find((n) => n.importance === 'Breaking' || n.importance === 'Important') || newsList[0];
  const feedNews = newsList.filter((n) => n.id !== featuredNews?.id);

  const handleDevTriggerEvent = () => {
    // Attempt triggering a random event enforcing anti-repetition
    const triggered = triggerRandomEventAction();
    if (!triggered) {
      setDevNotice('Event anti-repetition active (5-decision cooldown) or roll skipped.');
      setTimeout(() => setDevNotice(null), 3000);
    }
  };

  const handleResolveEventOption = (option: DecisionOption) => {
    const result = resolveActiveEventAction(option);
    if (result) {
      setEventResult(result);
    }
    return result;
  };

  const handleCompleteResultView = () => {
    setEventResult(null);
  };

  // If Event Result view is active, display Decision Result screen
  if (eventResult) {
    return (
      <div className="w-full flex-1 flex flex-col p-2 sm:p-2.5">
        <DecisionResultView
          result={eventResult}
          onReturnHome={handleCompleteResultView}
        />
      </div>
    );
  }

  return (
    <motion.div
      {...pageTransition}
      className="w-full flex flex-col gap-3.5 pb-8 max-w-full select-none"
    >
      {/* Top Page Header */}
      <PageHeader
        title="News"
        subtitle="What's happening across India"
        badgeText="National Feed"
      />

      {/* Developer Controls / Testing Trigger */}
      <div className="flex items-center justify-between p-2 rounded-game bg-navy-dark border border-gold/15 text-[10px] font-mono">
        <div className="flex items-center gap-1.5 text-gold">
          <Radio className="w-3.5 h-3.5 animate-pulse text-gold" />
          <span>NEWS & EVENT ENGINE</span>
        </div>
        <Button
          variant="secondary"
          size="sm"
          onClick={handleDevTriggerEvent}
          className="flex items-center gap-1 text-[10px] py-1 px-2"
        >
          <AlertTriangle className="w-3 h-3 text-gold" />
          <span>Trigger Random Event (Dev Test)</span>
        </Button>
      </div>

      {devDevNotice && (
        <div className="p-2 rounded bg-crimson/15 text-crimson border border-crimson/30 text-xs font-mono text-center">
          {devDevNotice}
        </div>
      )}

      {/* Featured Breaking News Card */}
      {featuredNews && (
        <FeaturedNewsCard
          news={featuredNews}
          onClick={(n) => setSelectedNews(n)}
        />
      )}

      {/* Scrollable News Feed List */}
      <div className="flex flex-col gap-2.5">
        <span className="font-heading text-[10px] font-bold uppercase tracking-widest text-gold-light text-left pl-1">
          RECENT DISPATCHES & PRESS RELEASES ({newsList.length}/50)
        </span>

        {feedNews.map((news) => (
          <NewsCard
            key={news.id}
            news={news}
            onClick={(n) => setSelectedNews(n)}
          />
        ))}
      </div>

      {/* News Detail Modal */}
      <NewsDetailModal
        isOpen={!!selectedNews}
        onClose={() => setSelectedNews(null)}
        news={selectedNews}
      />

      {/* Active Random Event Alert Modal */}
      <EventAlertModal
        isOpen={!!activeEvent}
        onClose={dismissActiveEventAction}
        event={activeEvent}
        onResolveOption={handleResolveEventOption}
      />
    </motion.div>
  );
}
