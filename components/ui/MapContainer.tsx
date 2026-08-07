'use client';

import React from 'react';
import { Card } from './Card';
import { MapPin } from 'lucide-react';

export const MapContainer: React.FC = () => {
  return (
    <Card variant="glass" className="w-full h-48 flex flex-col items-center justify-center relative overflow-hidden border-gold/20">
      {/* Decorative India Map Viewport Grid Shell */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:16px_16px]" />
      <div className="z-10 flex flex-col items-center gap-2 text-center p-4">
        <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/40 flex items-center justify-center text-gold shadow-gold-sm">
          <MapPin className="w-5 h-5 animate-pulse" />
        </div>
        <h4 className="font-heading text-sm text-gold-light tracking-wide">
          Interactive Map Viewport
        </h4>
        <p className="text-xs text-slate-400 max-w-[240px]">
          Strategic map renderer placeholder (Target resolution 390x844 optimized)
        </p>
      </div>
    </Card>
  );
};
