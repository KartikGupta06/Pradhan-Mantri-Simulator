'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { tapAnimation } from '@/animations/motion';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Minister, MinistryType, getRelationshipTier, formatStars } from '@/types/cabinet';
import { UserCheck, UserX, Star, Shield, Heart, Handshake, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MinisterCardProps {
  ministry: MinistryType;
  minister: Minister | null;
  onAppoint: (ministry: MinistryType) => void;
  onReplace: (ministry: MinistryType) => void;
  onDevChangeRelationship?: (ministry: MinistryType, delta: number) => void;
  className?: string;
}

export const MinisterCard: React.FC<MinisterCardProps> = ({
  ministry,
  minister,
  onAppoint,
  onReplace,
  onDevChangeRelationship,
  className,
}) => {
  if (!minister) {
    // Vacant Ministry Card
    return (
      <Card
        variant="glass"
        className={cn(
          'w-full flex flex-col gap-3 p-3.5 border-dashed border-crimson/40 bg-crimson/5 text-left',
          className
        )}
      >
        <div className="flex items-center justify-between">
          <Badge variant="crimson" className="text-[9px] py-0.5 px-2">
            {ministry.toUpperCase()}
          </Badge>
          <span className="text-[10px] font-mono font-bold text-crimson uppercase">
            POSITION VACANT
          </span>
        </div>

        <div className="flex items-center gap-3 my-1">
          <div className="w-10 h-10 rounded-full bg-crimson/15 border border-crimson/40 flex items-center justify-center text-crimson shrink-0">
            <UserX className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <h3 className="font-sans text-sm font-bold text-slate-200">
              No Minister Assigned
            </h3>
            <p className="text-[11px] font-sans text-slate-400 leading-tight">
              Select a qualified candidate to lead the {ministry} ministry portfolio.
            </p>
          </div>
        </div>

        <div className="pt-2 border-t border-crimson/20 flex justify-end">
          <Button
            variant="primary"
            size="sm"
            onClick={() => onAppoint(ministry)}
            className="flex items-center gap-1.5 text-xs py-1.5 px-3"
          >
            <UserCheck className="w-4 h-4" />
            <span>Appoint Minister</span>
          </Button>
        </div>
      </Card>
    );
  }

  // Active Assigned Minister Card
  const { label: relLabel, variant: relVariant } = getRelationshipTier(minister.relationship);

  return (
    <motion.div {...tapAnimation} className={cn('w-full', className)}>
      <Card
        variant="glass"
        className="w-full flex flex-col gap-2.5 p-3.5 border-gold/20 hover:border-gold/40 transition-all text-left relative overflow-hidden"
      >
        {/* Top Badges Strip */}
        <div className="flex items-center justify-between">
          <Badge variant="gold" className="text-[9px] py-0.5 px-2">
            {ministry.toUpperCase()}
          </Badge>
          <div className="flex items-center gap-1.5">
            <Badge variant="emerald" className="text-[9px] py-0.5 px-1.5">
              ACTIVE
            </Badge>
            <Badge variant={relVariant} className="text-[9px] py-0.5 px-1.5">
              {relLabel.toUpperCase()}
            </Badge>
          </div>
        </div>

        {/* Minister Profile Header */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-gold/15 border border-gold/40 flex items-center justify-center text-gold font-heading text-sm font-bold shrink-0">
            {minister.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div className="flex flex-col">
            <h3 className="font-sans text-sm font-bold text-slate-100 leading-tight">
              {minister.name}
            </h3>
            <span className="text-[11px] text-gold-light font-sans mt-0.5">
              {ministry} Minister • Age {minister.age}
            </span>
          </div>
        </div>

        {/* 5 Stats Grid */}
        <div className="grid grid-cols-2 gap-1.5 pt-2 border-t border-gold/10 text-[10px] font-mono">
          <div className="flex items-center justify-between px-2 py-1 bg-navy-dark/60 rounded border border-gold/10">
            <span className="text-slate-400 flex items-center gap-1">
              <Star className="w-3 h-3 text-gold" /> Experience
            </span>
            <span className="text-gold-light font-bold">
              {formatStars(minister.experience)}
            </span>
          </div>

          <div className="flex items-center justify-between px-2 py-1 bg-navy-dark/60 rounded border border-gold/10">
            <span className="text-slate-400 flex items-center gap-1">
              <Shield className="w-3 h-3 text-emerald" /> Integrity
            </span>
            <span className="text-emerald font-bold">
              {formatStars(minister.integrity)}
            </span>
          </div>

          <div className="flex items-center justify-between px-2 py-1 bg-navy-dark/60 rounded border border-gold/10">
            <span className="text-slate-400 flex items-center gap-1">
              <Heart className="w-3 h-3 text-crimson" /> Popularity
            </span>
            <span className="text-slate-200 font-bold">
              {formatStars(minister.popularity)}
            </span>
          </div>

          <div className="flex items-center justify-between px-2 py-1 bg-navy-dark/60 rounded border border-gold/10">
            <span className="text-slate-400 flex items-center gap-1">
              <Handshake className="w-3 h-3 text-cyan-400" /> Loyalty
            </span>
            <span className="text-cyan-400 font-bold">
              {minister.loyalty}/100
            </span>
          </div>
        </div>

        {/* PM Relationship Progress Indicator */}
        <div className="flex flex-col gap-1 px-2 py-1.5 bg-navy-surface rounded border border-gold/15">
          <div className="flex items-center justify-between text-[10px] font-mono">
            <span className="text-slate-300">PM Relationship:</span>
            <span className="font-bold text-gold">{minister.relationship}/100 ({relLabel})</span>
          </div>
          <div className="w-full bg-navy-dark h-1.5 rounded-full overflow-hidden border border-gold/20">
            <div
              className={cn(
                'h-full transition-all duration-300',
                minister.relationship >= 60 ? 'bg-emerald' : minister.relationship >= 40 ? 'bg-gold' : 'bg-crimson'
              )}
              style={{ width: `${minister.relationship}%` }}
            />
          </div>
        </div>

        {/* Action Buttons & Dev Control */}
        <div className="flex items-center justify-between pt-1">
          {onDevChangeRelationship && (
            <div className="flex items-center gap-1 text-[9px]">
              <button
                onClick={() => onDevChangeRelationship(ministry, 5)}
                className="px-1.5 py-0.5 rounded bg-emerald/20 text-emerald border border-emerald/30 font-mono hover:bg-emerald/30"
                title="Dev test: Praise Minister (+5 Rel)"
              >
                +5 Rel
              </button>
              <button
                onClick={() => onDevChangeRelationship(ministry, -15)}
                className="px-1.5 py-0.5 rounded bg-crimson/20 text-crimson border border-crimson/30 font-mono hover:bg-crimson/30"
                title="Dev test: Criticize Minister (-15 Rel / Trigger Resign)"
              >
                -15 Rel
              </button>
            </div>
          )}

          <Button
            variant="secondary"
            size="sm"
            onClick={() => onReplace(ministry)}
            className="flex items-center gap-1 text-xs py-1 px-2.5 ml-auto"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reshuffle / Replace</span>
          </Button>
        </div>
      </Card>
    </motion.div>
  );
};
