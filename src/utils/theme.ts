import { ResovledThemeMode } from '@/types/enum';

/**
 * 获取当前系统主题模式（light/dark），并返回对应的 ResovledThemeMode 枚举
 */
export function getSystemThemeMode(): ResovledThemeMode {
  if (typeof window !== 'undefined') {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return isDark ? ResovledThemeMode.Dark : ResovledThemeMode.Light;
  }
  return ResovledThemeMode.Light;
}
