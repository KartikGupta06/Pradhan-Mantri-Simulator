'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { pageTransition } from '@/animations/motion';
import { PageHeader } from '@/components/ui/PageHeader';
import { PolicyCard } from '@/components/game/policy/PolicyCard';
import { EmptyState } from '@/components/ui/EmptyState';
import { DecisionFlowContainer } from '@/components/game/decision/DecisionFlowContainer';
import { POLICIES_CATALOG } from '@/constants/policies';
import { PolicyCategory, Decision } from '@/types/decision';
import { useGameStore } from '@/game/store/useGameStore';
import { cn } from '@/lib/utils';

const CATEGORIES: PolicyCategory[] = [
  'All',
  'Economy',
  'Education',
  'Healthcare',
  'Agriculture',
  'Infrastructure',
  'National',
];

export default function DecisionsPage() {
  const [selectedCategory, setSelectedCategory] = useState<PolicyCategory>('All');
  const [activePolicyModal, setActivePolicyModal] = useState<Decision | null>(null);

  const setActiveDecision = useGameStore((state) => state.setActiveDecision);

  const filteredPolicies = POLICIES_CATALOG.filter((policy) => {
    if (selectedCategory === 'All') return true;
    return policy.category.toLowerCase() === selectedCategory.toLowerCase();
  });

  const handleOpenPolicy = (policy: Decision) => {
    setActiveDecision(policy);
    setActivePolicyModal(policy);
  };

  const handleCompleteFlow = () => {
    setActivePolicyModal(null);
  };

  // If Decision Flow active for selected policy, render Decision Flow experience
  if (activePolicyModal) {
    return (
      <div className="w-full flex-1 flex flex-col p-2 sm:p-2.5">
        <DecisionFlowContainer onCompleteFlow={handleCompleteFlow} />
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
        title="Policies"
        subtitle="Shape the future of India"
        badgeText="National Directives"
      />

      {/* Category Filter Chips (Horizontal Scrollable Strip) */}
      <div className="w-full overflow-x-auto no-scrollbar py-1 flex items-center gap-1.5 shrink-0">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={cn(
                'px-3 py-1.5 rounded-full text-xs font-sans font-bold whitespace-nowrap transition-all border shrink-0',
                isSelected
                  ? 'bg-gold text-navy-dark border-gold shadow-gold-glow'
                  : 'bg-navy-surface text-slate-300 border-gold/15 hover:border-gold/40'
              )}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Policy Cards List or Empty State */}
      {filteredPolicies.length > 0 ? (
        <div className="flex flex-col gap-3">
          {filteredPolicies.map((policy) => (
            <PolicyCard
              key={policy.id}
              policy={policy}
              onOpenPolicy={handleOpenPolicy}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No policies available"
          description="Check back later."
        />
      )}
    </motion.div>
  );
}
