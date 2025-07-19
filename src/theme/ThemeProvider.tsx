import { useSettingActions, useSettings } from '@/store/settingStore';
import { HtmlDataAttribute, ResovledThemeMode, ThemeMode, UIAdapter } from '@/types/enum';
import { useEffect } from 'react';
import { UILibraryAdapter } from './types';
import ThemeContext from './ThemeContext';
import { useSystemTheme } from '@/hooks/useSystemTheme';
import { usePlatform } from '@/hooks/usePlatform';
import { convertFluentThemeToCSS } from './fluent-to-tailwind';
import { fluentLightTheme, fluentDarkTheme } from './fluent.color';

interface ThemeProviderProps {
  children: React.ReactNode;
  adapters?: UILibraryAdapter[];
}

const ThemeProvider = ({ children, adapters = [] }: ThemeProviderProps) => {
  const { themeMode, resolvedThemeMode, themeColorPalette } = useSettings();
  const { setSettings } = useSettingActions();
  const systemThemeMode = useSystemTheme();
  const { isMobile } = usePlatform();

  const root = document.documentElement;

  // 注入 Fluent CSS 变量
  useEffect(() => {
    const lightVars = convertFluentThemeToCSS(fluentLightTheme);
    const darkVars = convertFluentThemeToCSS(fluentDarkTheme);

    // 移除现有的 Fluent CSS 变量
    Object.keys(lightVars).forEach((key) => {
      root.style.removeProperty(key);
    });

    // 根据当前主题模式注入相应的 CSS 变量
    const currentTheme = resolvedThemeMode === ResovledThemeMode.Dark ? darkVars : lightVars;
    Object.entries(currentTheme).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  }, [resolvedThemeMode]);

  useEffect(() => {
    console.log('ThemeProvider: themeMode changed', themeMode, resolvedThemeMode, systemThemeMode);
    switch (themeMode) {
      case ThemeMode.Light:
        root.setAttribute(HtmlDataAttribute.ThemeMode, ThemeMode.Light);
        break;
      case ThemeMode.Dark:
        root.setAttribute(HtmlDataAttribute.ThemeMode, ThemeMode.Dark);
        break;
      case ThemeMode.System:
        setSettings({ resolvedThemeMode: systemThemeMode as ResovledThemeMode });
        root.setAttribute(HtmlDataAttribute.ThemeMode, systemThemeMode);
        break;
    }
  }, [themeMode, resolvedThemeMode, systemThemeMode]);

  useEffect(() => {
    root.setAttribute(HtmlDataAttribute.ThemeColorPalette, themeColorPalette);
  }, [themeColorPalette]);

  // 设置平台相关的样式类
  useEffect(() => {
    if (isMobile) {
      root.classList.add('mobile-platform');
      root.classList.remove('desktop-platform');
    } else {
      root.classList.add('desktop-platform');
      root.classList.remove('mobile-platform');
    }
  }, [isMobile]);

  const wrappedWithAdapters = adapters.reduce(
    (children, Adapter) => (
      <Adapter key={Adapter.name} mode={resolvedThemeMode as unknown as ThemeMode}>
        <ThemeContext.Provider
          value={{
            themeMode: resolvedThemeMode as unknown as ThemeMode,
            themeColorPalette,
            UIAdapter: UIAdapter.Fluent,
          }}
        >
          {children}
        </ThemeContext.Provider>
      </Adapter>
    ),
    children,
  );

  return wrappedWithAdapters;
};

export default ThemeProvider;
