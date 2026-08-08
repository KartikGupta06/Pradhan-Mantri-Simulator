'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { tapAnimation } from '@/animations/motion';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Candidate, formatStars, getRelationshipTier } from '@/types/cabinet';
import { Star, Shield, Heart, Handshake, UserCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CandidateCardProps {
  candidate: Candidate;
  onSelectCandidate: (candidate: Candidate) => void;
  className?: string;
}

export const CandidateCard: React.FC<CandidateCardProps> = ({
  candidate,
  onSelectCandidate,
  className,
}) => {
  const { label: relLabel } = getRelationshipTier(candidate.relationship);

  return (
    <motion.div {...tapAnimation} className={cn('w-full', className)}>
      <Card
        variant="glass"
        className="w-full flex flex-col gap-2.5 p-3.5 border-gold/20 hover:border-gold/50 transition-all text-left relative overflow-hidden group"
      >
        {/* Candidate Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-full bg-gold/15 border border-gold/40 flex items-center justify-center text-gold font-heading text-xs font-bold shrink-0">
              {candidate.name.split(' ').map((n) => n[0]).join('')}
            </div>
            <div className="flex flex-col">
              <h4 className="font-sans text-sm font-bold text-slate-100 group-hover:text-gold transition-colors">
                {candidate.name}
              </h4>
              <span className="text-[10px] text-slate-400 font-sans">
                Age {candidate.age} • Candidate for {candidate.ministry}
              </span>
            </div>
          </div>
        </div>

        {/* Short Description */}
        <p className="text-xs text-slate-300 font-sans leading-relaxed">
          {candidate.shortDescription}
        </p>

        {/* 5 Stats Grid */}
        <div className="grid grid-cols-2 gap-1.5 pt-2 border-t border-gold/15 text-[10px] font-mono">
          <div className="flex items-center justify-between px-2 py-1 bg-navy-dark rounded border border-gold/10">
            <span className="text-slate-400 flex items-center gap-1">
              <Star className="w-3 h-3 text-gold" /> Experience
            </span>
            <span className="text-gold-light font-bold">
              {formatStars(candidate.experience)}
            </span>
          </div>

          <div className="flex items-center justify-between px-2 py-1 bg-navy-dark rounded border border-gold/10">
            <span className="text-slate-400 flex items-center gap-1">
              <Shield className="w-3 h-3 text-emerald" /> Integrity
            </span>
            <span className="text-emerald font-bold">
              {formatStars(candidate.integrity)}
            </span>
          </div>

          <div className="flex items-center justify-between px-2 py-1 bg-navy-dark rounded border border-gold/10">
            <span className="text-slate-400 flex items-center gap-1">
              <Heart className="w-3 h-3 text-crimson" /> Popularity
            </span>
            <span className="text-slate-200 font-bold">
              {formatStars(candidate.popularity)}
            </span>
          </div>

          <div className="flex items-center justify-between px-2 py-1 bg-navy-dark rounded border border-gold/10">
            <span className="text-slate-400 flex items-center gap-1">
              <Handshake className="w-3 h-3 text-cyan-400" /> Loyalty
            </span>
            <span className="text-cyan-400 font-bold">
              {candidate.loyalty}/100
            </span>
          </div>
        </div>

        {/* PM Relationship */}
        <div className="flex items-center justify-between px-2.5 py-1.5 bg-navy-surface rounded border border-gold/15 text-[10px] font-mono">
          <span className="text-slate-300">PM Relationship:</span>
          <span className="font-bold text-gold">{candidate.relationship}/100 ({relLabel})</span>
        </div>

        {/* Select CTA */}
        <div className="pt-1">
          <Button
            variant="primary"
            size="sm"
            fullWidth
            onClick={() => onSelectCandidate(candidate)}
            className="flex items-center justify-center gap-1.5 text-xs py-2"
          >
            <UserCheck className="w-4 h-4" />
            <span>Select Candidate for Appointment</span>
          </Button>
        </div>
      </Card>
    </motion.div>
  );
};
