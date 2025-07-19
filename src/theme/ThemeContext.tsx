import { createContext } from 'react';
import { ThemeContextType } from './types';
import { ThemeColorPalette, ThemeMode, UIAdapter } from '@/types/enum';

const ThemeContext = createContext<ThemeContextType>({
  themeMode: ThemeMode.Light,
  themeColorPalette: ThemeColorPalette.Default,
  UIAdapter: UIAdapter.Fluent,
});

export default ThemeContext;
