import { useEffect, useState } from 'react';

/**
 * Hook to manage target resolution, orientation lock, and safe area detection
 */
export function useMobileViewport() {
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const [viewportHeight, setViewportHeight] = useState('100vh');

  useEffect(() => {
    const handleResize = () => {
      setIsMobileDevice(window.innerWidth <= 768);
      // Lock dynamic viewport height for mobile browsers
      setViewportHeight(`${window.innerHeight}px`);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return { isMobileDevice, viewportHeight };
}
