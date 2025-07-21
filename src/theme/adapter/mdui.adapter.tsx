import { useSettings } from '@/store/settingStore';
import { setColorScheme } from 'mdui';
import React, { useEffect, useRef } from 'react';
import { UILibraryAdapterProps } from '../types';
import 'mdui/mdui.css';

// MDUI 主题配色方案
const mduiColorSchemes = {
  default: '#157736', // Material Design 3 默认紫色
  green: '#157736', // 绿色主题
};

export const MduiAdapter: React.FC<UILibraryAdapterProps> = ({ mode, children }) => {
  const { resolvedThemeMode, themeColorPalette } = useSettings();
  const containerRef = useRef<HTMLDivElement>(null);

  // 处理主题模式切换
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 清除之前的主题类
    container.classList.remove('mdui-theme-light', 'mdui-theme-dark', 'mdui-theme-auto');

    let themeClass: string;

    if (mode === 'light') {
      themeClass = 'mdui-theme-light';
    } else if (mode === 'dark') {
      themeClass = 'mdui-theme-dark';
    } else if (mode === 'system') {
      themeClass = 'mdui-theme-auto';
    } else {
      // 如果没有传入 mode，则根据 resolvedThemeMode 来确定
      themeClass = resolvedThemeMode === 'dark' ? 'mdui-theme-dark' : 'mdui-theme-light';
    }

    // 添加对应的主题类
    container.classList.add(themeClass);
  }, [mode, resolvedThemeMode]);

  // 处理配色方案切换
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 获取对应的配色
    const colorValue =
      mduiColorSchemes[themeColorPalette as keyof typeof mduiColorSchemes] ||
      mduiColorSchemes.default;

    try {
      // 使用 MDUI 的 setColorScheme 函数设置动态配色
      setColorScheme(colorValue, {
        target: container,
      });
    } catch (error) {
      console.warn('MDUI setColorScheme error:', error);
    }
  }, [themeColorPalette]);

  return (
    <div ref={containerRef} className="mdui-adapter-container" style={{ height: '100%' }}>
      {children}
    </div>
  );
};
