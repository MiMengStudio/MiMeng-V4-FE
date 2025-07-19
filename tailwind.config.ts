import { HtmlDataAttribute } from './src/types/enum';
import { generateTailwindTheme } from './src/theme/fluent-to-tailwind';

const { tailwindTheme } = generateTailwindTheme();

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: ['attribute', `[${HtmlDataAttribute.ThemeMode}="dark"]`],
  theme: {
    extend: {
      colors: {
        primary: '#69F0AE',
        // Fluent Design System 颜色
        ...tailwindTheme.colors,
      },
      borderRadius: {
        // Fluent Design System 圆角
        ...tailwindTheme.borderRadius,
      },
      fontSize: {
        // Fluent Design System 字体大小
        ...tailwindTheme.fontSize,
      },
      fontWeight: {
        // Fluent Design System 字体权重
        ...tailwindTheme.fontWeight,
      },
      boxShadow: {
        // Fluent Design System 阴影
        ...tailwindTheme.shadows,
      },
      spacing: {
        // Fluent Design System 间距
        ...tailwindTheme.spacing,
      },
    },
  },
  plugins: [],
};
