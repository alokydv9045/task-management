'use client';

import { useEffect, useState } from 'react';
import { useThemeStore } from '@/store/useThemeStore';

export function ThemeClassProvider({ children }: { children: React.ReactNode }) {
  const { colorMode } = useThemeStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const body = document.body;
    
    // Remove existing theme classes
    body.classList.forEach((className) => {
      if (className.startsWith('theme-')) {
        body.classList.remove(className);
      }
    });

    // Add new theme class
    body.classList.add(`theme-${colorMode}`);
  }, [colorMode, mounted]);

  if (!mounted) {
    return <>{children}</>;
  }

  return <>{children}</>;
}
