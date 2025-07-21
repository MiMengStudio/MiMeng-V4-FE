import {
  ResovledThemeMode,
  StorageEnum,
  ThemeColorPalette,
  ThemeMode,
  UIAdapter,
} from '@/types/enum';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { getSystemThemeMode } from '@/utils/theme';

export type SettingsType = {
  themeMode: ThemeMode;
  resolvedThemeMode: ResovledThemeMode;
  themeColorPalette: ThemeColorPalette;
  UIAdapter: UIAdapter;
  // 平台覆盖设置，用于调试
  platformOverride?: 'mobile' | 'desktop' | null;
};

type SettingStore = {
  settings: SettingsType;
  actions: {
    setSettings: (settings: Partial<SettingsType>) => void;
    clearSettings: () => void;
  };
};

const useSettingStore = create<SettingStore>()(
  persist(
    (set) => ({
      settings: {
        themeMode: ThemeMode.System,
        resolvedThemeMode: getSystemThemeMode(),
        themeColorPalette: ThemeColorPalette.Default,
        UIAdapter: UIAdapter.Fluent,
        platformOverride: null,
      },
      actions: {
        // 只需传入部分设置项即可更新
        setSettings: (settings: Partial<SettingsType>) =>
          set((state) => ({
            settings: { ...state.settings, ...settings },
          })),
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

  // 切换主题时，支持传入 systemTheme（仅在切到 System 时需要）
  return (systemTheme?: 'light' | 'dark') => {
    let newThemeMode: ThemeMode;
    let resolvedThemeMode: ResovledThemeMode = ResovledThemeMode.Light;
    if (themeMode === ThemeMode.Light) {
      newThemeMode = ThemeMode.Dark;
      resolvedThemeMode = ResovledThemeMode.Dark;
    } else if (themeMode === ThemeMode.Dark) {
      newThemeMode = ThemeMode.System;
      resolvedThemeMode = systemTheme === 'dark' ? ResovledThemeMode.Dark : ResovledThemeMode.Light;
    } else {
      newThemeMode = ThemeMode.Light;
      resolvedThemeMode = ResovledThemeMode.Light;
    }
    setSettings({ themeMode: newThemeMode, resolvedThemeMode });
  };
};
