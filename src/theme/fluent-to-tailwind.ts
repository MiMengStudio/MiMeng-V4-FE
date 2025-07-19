import { fluentLightTheme, fluentDarkTheme } from './fluent.color';

type FluentTheme = Record<string, string | number>;

interface TailwindTheme {
  borderRadius: Record<string, string>;
  colors: Record<string, string>;
  spacing: Record<string, string>;
  fontSize: Record<string, string>;
  fontWeight: Record<string, string>;
  shadows: Record<string, string>;
}

/**
 * 将 Fluent 主题转换为 CSS 变量
 * @param theme Fluent 主题对象
 * @param prefix CSS 变量前缀
 * @returns CSS 变量对象
 */
export function convertFluentThemeToCSS(theme: FluentTheme, prefix = 'fluent') {
  const cssVars: Record<string, string> = {};

  Object.entries(theme).forEach(([key, value]) => {
    // 将驼峰命名转换为 kebab-case
    const kebabKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
    cssVars[`--${prefix}-${kebabKey}`] = String(value);
  });

  return cssVars;
}

/**
 * 生成 Tailwind CSS 主题配置
 */
export function generateTailwindTheme() {
  const lightVars = convertFluentThemeToCSS(fluentLightTheme);
  const darkVars = convertFluentThemeToCSS(fluentDarkTheme);

  // 创建 Tailwind 主题配置
  const tailwindTheme: TailwindTheme = {
    borderRadius: {},
    colors: {},
    spacing: {},
    fontSize: {},
    fontWeight: {},
    shadows: {},
  };

  // 处理边框圆角
  Object.entries(fluentLightTheme).forEach(([key]) => {
    if (key.startsWith('borderRadius')) {
      const radiusKey = key.replace('borderRadius', '').toLowerCase();
      const tailwindKey =
        radiusKey === 'none'
          ? 'none'
          : radiusKey === 'small'
            ? 'sm'
            : radiusKey === 'medium'
              ? 'md'
              : radiusKey === 'large'
                ? 'lg'
                : radiusKey;

      tailwindTheme.borderRadius[tailwindKey] =
        `var(--fluent-${key.replace(/([A-Z])/g, '-$1').toLowerCase()})`;
    }

    // 处理颜色
    if (key.includes('Color') || key.includes('color')) {
      const colorKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
      tailwindTheme.colors[colorKey] = `var(--fluent-${colorKey})`;
    }

    // 处理字体大小
    if (key.startsWith('fontSize')) {
      const sizeKey = key.replace('fontSize', '').toLowerCase();
      tailwindTheme.fontSize[sizeKey] =
        `var(--fluent-${key.replace(/([A-Z])/g, '-$1').toLowerCase()})`;
    }

    // 处理字体权重
    if (key.startsWith('fontWeight')) {
      const weightKey = key.replace('fontWeight', '').toLowerCase();
      tailwindTheme.fontWeight[weightKey] =
        `var(--fluent-${key.replace(/([A-Z])/g, '-$1').toLowerCase()})`;
    }

    // 处理阴影
    if (key.includes('Shadow') || key.includes('shadow')) {
      const shadowKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
      tailwindTheme.shadows[shadowKey] = `var(--fluent-${shadowKey})`;
    }
  });

  return {
    lightVars,
    darkVars,
    tailwindTheme,
  };
}

/**
 * 生成主题 CSS 字符串
 */
export function generateThemeCSS() {
  const { lightVars, darkVars } = generateTailwindTheme();

  let css = ':root {\n';
  Object.entries(lightVars).forEach(([key, value]) => {
    css += `  ${key}: ${value};\n`;
  });
  css += '}\n\n';

  css += '[data-theme-mode="dark"] {\n';
  Object.entries(darkVars).forEach(([key, value]) => {
    css += `  ${key}: ${value};\n`;
  });
  css += '}\n';

  return css;
}
