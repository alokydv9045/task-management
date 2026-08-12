import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface PreferencesState {
  visibleFields: Record<string, boolean>;
  setVisibleFields: (updater: (prev: Record<string, boolean>) => Record<string, boolean>) => void;
}

export const usePreferencesStore = create<PreferencesState>()(
  persist(
    (set) => ({
      visibleFields: {
        Priority: true,
        Members: true,
        'Due Date': true,
        Labels: true,
      },
      setVisibleFields: (updater) => set((state) => ({ visibleFields: updater(state.visibleFields) })),
    }),
    {
      name: 'task-preferences-storage', // key in localStorage
    }
  )
);
