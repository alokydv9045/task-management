import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type ColorMode = 'amber' | 'blue' | 'pink' | 'rose' | 'emerald' | 'black';

interface ThemeState {
  colorMode: ColorMode;
  setColorMode: (mode: ColorMode) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      colorMode: 'black', // Default based on screenshot (or Blue, but Black looks sleek)
      setColorMode: (mode) => set({ colorMode: mode }),
    }),
    {
      name: 'theme-storage',
    }
  )
);
