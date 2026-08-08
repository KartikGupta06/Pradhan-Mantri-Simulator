'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { tapAnimation } from '@/animations/motion';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Decision } from '@/types/decision';
import { ChevronRight, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PolicyCardProps {
  policy: Decision;
  onOpenPolicy: (policy: Decision) => void;
  className?: string;
}

export const PolicyCard: React.FC<PolicyCardProps> = ({
  policy,
  onOpenPolicy,
  className,
}) => {
  const getCategoryBadgeVariant = (category: string): 'gold' | 'emerald' | 'crimson' | 'slate' => {
    switch (category.toLowerCase()) {
      case 'economy':
        return 'gold';
      case 'education':
        return 'slate';
      case 'healthcare':
        return 'crimson';
      case 'agriculture':
        return 'emerald';
      case 'infrastructure':
        return 'gold';
      case 'national':
        return 'crimson';
      default:
        return 'gold';
    }
  };

  return (
    <motion.div {...tapAnimation} className={cn('w-full', className)}>
      <Card
        variant="glass"
        className="w-full flex flex-col gap-2.5 p-3.5 border-gold/20 hover:border-gold/40 transition-all cursor-pointer relative overflow-hidden group"
        onClick={() => onOpenPolicy(policy)}
      >
        {/* Top Badges Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Badge variant={getCategoryBadgeVariant(policy.category)} className="text-[9px] py-0.5 px-2">
              {policy.category.toUpperCase()}
            </Badge>
            <Badge variant="slate" className="text-[9px] py-0.5 px-1.5 text-slate-300">
              {policy.status || 'Available'}
            </Badge>
          </div>
          <span className="text-[10px] font-mono font-bold text-gold-light">
            Est. Cost: {policy.estimatedCost}
          </span>
        </div>

        {/* Policy Title & Short Description */}
        <div className="flex flex-col gap-1 text-left">
          <h3 className="font-sans text-sm font-bold text-slate-100 group-hover:text-gold transition-colors leading-snug">
            {policy.title}
          </h3>
          <p className="text-xs text-slate-300 font-sans leading-relaxed line-clamp-2">
            {policy.description}
          </p>
        </div>

        {/* Small Impact Preview Strip */}
        <div className="flex items-center justify-between pt-2 border-t border-gold/10 text-[10px] font-mono text-slate-400">
          <div className="flex items-center gap-1">
            <FileText className="w-3 h-3 text-gold" />
            <span>{policy.options.length} Cabinet Options</span>
          </div>
          <span className="text-crimson font-bold">
            {policy.urgency} Urgency
          </span>
        </div>

        {/* Bottom Action CTA */}
        <div className="pt-1">
          <Button
            variant="secondary"
            size="sm"
            fullWidth
            onClick={(e) => {
              e.stopPropagation();
              onOpenPolicy(policy);
            }}
            className="flex items-center justify-center gap-1.5 text-xs py-2 group-hover:bg-gold/20 group-hover:text-gold transition-all"
          >
            <span>Review Policy Options</span>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </Card>
    </motion.div>
  );
};
