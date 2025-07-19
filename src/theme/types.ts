import { ThemeMode, UIAdapter } from '@/types/enum';

export type UILibraryAdapterProps = {
  mode?: ThemeMode;
  children: React.ReactNode;
};
export type UILibraryAdapter = React.FC<UILibraryAdapterProps>;

export type ThemeContextType = {
  themeMode: ThemeMode;
  themeColorPalette: string;
  UIAdapter: UIAdapter;
};
