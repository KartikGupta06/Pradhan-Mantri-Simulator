import type { Metadata, Viewport } from 'next';
import '@/styles/globals.css';
import { PWAProvider } from '@/providers/PWAProvider';
import { GameStateProvider } from '@/providers/GameStateProvider';
import { MobileGameShell } from '@/components/layout/MobileGameShell';

export const metadata: Metadata = {
  title: 'Pradhan Mantri Simulator',
  description: 'Premium Indian Political Strategy Simulation Game',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'PM Simulator',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  themeColor: '#0A0F1D',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <PWAProvider>
          <GameStateProvider>
            <MobileGameShell>{children}</MobileGameShell>
          </GameStateProvider>
        </PWAProvider>
      </body>
    </html>
  );
}
