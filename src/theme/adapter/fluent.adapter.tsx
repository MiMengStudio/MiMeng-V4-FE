import { useSettings } from '@/store/settingStore';
import { FluentProvider, webDarkTheme, webLightTheme } from '@fluentui/react-components';
import React, { useEffect, useState } from 'react';
import { UILibraryAdapterProps } from '../types';

export const FluentUIAdapter: React.FC<UILibraryAdapterProps> = ({ mode, children }) => {
  const { resolvedThemeMode } = useSettings();
  const [theme, setTheme] = useState(webLightTheme);

  useEffect(() => {
    if (mode === 'light') {
      setTheme(webLightTheme);
    } else if (mode === 'dark') {
      setTheme(webDarkTheme);
    } else {
      setTheme(resolvedThemeMode === 'dark' ? webDarkTheme : webLightTheme);
    }
  }, [mode, resolvedThemeMode]);

  return <FluentProvider theme={theme}>{children}</FluentProvider>;
};
