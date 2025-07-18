import { StorageEnum, ThemeMode } from '@/types/enum';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type SettingsType = {
  themeMode: ThemeMode;
};

type SettingStore = {
  settings: SettingsType;
  actions: {
    setSettings: (settings: SettingsType) => void;
    clearSettings: () => void;
  };
};

const useSettingStore = create<SettingStore>()(
  persist(
    (set) => ({
      settings: {
        themeMode: ThemeMode.System,
      },
      actions: {
        setSettings: (settings) => set({ settings }),
        clearSettings: () => {
          useSettingStore.persist.clearStorage();
        },
      },
    }),
    {
      name: StorageEnum.Settings,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        [StorageEnum.Settings]: state.settings,
      }),
    },
  ),
);

export const useSettings = () => useSettingStore((state) => state.settings);
export const useSettingActions = () => useSettingStore((state) => state.actions);

export const useToggleThemeMode = () => {
  const { themeMode } = useSettings();
  const { setSettings } = useSettingActions();

  return () => {
    let newThemeMode: ThemeMode;
    if (themeMode === ThemeMode.Light) {
      newThemeMode = ThemeMode.Dark;
    } else if (themeMode === ThemeMode.Dark) {
      newThemeMode = ThemeMode.System;
    } else {
      newThemeMode = ThemeMode.Light;
    }
    setSettings({ themeMode: newThemeMode });
  };
};
