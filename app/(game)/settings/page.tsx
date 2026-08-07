'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { pageTransition } from '@/animations/motion';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { usePWAContext } from '@/providers/PWAProvider';
import { Settings, Download, ShieldCheck } from 'lucide-react';

export default function SettingsPage() {
  const { isInstallable, promptInstall } = usePWAContext();

  return (
    <motion.div {...pageTransition} className="flex flex-col gap-4 flex-1">
      <div className="flex items-center justify-between border-b border-gold/15 pb-3">
        <h1 className="font-heading text-lg gold-gradient-text">Game Settings</h1>
        <Badge variant="gold">System</Badge>
      </div>

      <Card variant="glass" className="flex flex-col gap-3">
        <div className="flex items-center gap-2 text-gold">
          <Settings className="w-4 h-4" />
          <h3 className="font-heading text-xs uppercase tracking-wide">PWA & Platform</h3>
        </div>
        <p className="text-xs text-slate-300">
          Standalone PWA display and mobile optimization settings.
        </p>

        {isInstallable && (
          <Button variant="primary" size="sm" onClick={promptInstall} className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Install App to Device
          </Button>
        )}
      </Card>

      <Card variant="solid" className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-emerald">
          <ShieldCheck className="w-4 h-4" />
          <span className="font-heading text-xs uppercase tracking-wide">Foundation Status</span>
        </div>
        <p className="text-[11px] text-slate-400 font-mono">
          Mobile Resolution: 390 x 844 target<br />
          Design System: Deep Navy + Gold<br />
          State Architecture: Zustand Skeleton
        </p>
      </Card>
    </motion.div>
  );
}
