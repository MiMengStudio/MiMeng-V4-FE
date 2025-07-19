import { useSettings } from '@/store/settingStore';
import {
  FluentProvider,
  createLightTheme,
  createDarkTheme,
  BrandVariants,
  Theme,
} from '@fluentui/react-components';
import React, { useEffect, useState } from 'react';
import { UILibraryAdapterProps } from '../types';

const myTheme: BrandVariants = {
  10: '#000000',
  20: '#0B160C',
  30: '#122415',
  40: '#15341B',
  50: '#174422',
  60: '#185428',
  70: '#17652F',
  80: '#157736',
  90: '#10893C',
  100: '#2D9A4C',
  110: '#48AA5F',
  120: '#62BA74',
  130: '#7ECA8B',
  140: '#9CD8A4',
  150: '#BBE6C0',
  160: '#DCF4DF',
};

const lightTheme: Theme = {
  ...createLightTheme(myTheme),
};

const darkTheme: Theme = {
  ...createDarkTheme(myTheme),
};

export const FluentUIAdapter: React.FC<UILibraryAdapterProps> = ({ mode, children }) => {
  const { resolvedThemeMode } = useSettings();
  const [theme, setTheme] = useState(lightTheme);

  useEffect(() => {
    if (mode === 'light') {
      setTheme(lightTheme);
    } else if (mode === 'dark') {
      setTheme(darkTheme);
    } else {
      setTheme(resolvedThemeMode === 'dark' ? darkTheme : lightTheme);
    }
  }, [mode, resolvedThemeMode]);

  return <FluentProvider theme={theme}>{children}</FluentProvider>;
};
