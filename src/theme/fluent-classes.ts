/**
 * Fluent Design System 的 Tailwind CSS 工具类
 */

// 背景颜色类
export const fluentBackgrounds = {
  // 中性背景
  neutralBackground1: 'bg-[var(--fluent-color-neutral-background1)]',
  neutralBackground2: 'bg-[var(--fluent-color-neutral-background2)]',
  neutralBackground3: 'bg-[var(--fluent-color-neutral-background3)]',
  neutralBackground4: 'bg-[var(--fluent-color-neutral-background4)]',
  neutralBackground5: 'bg-[var(--fluent-color-neutral-background5)]',
  neutralBackground6: 'bg-[var(--fluent-color-neutral-background6)]',

  // 品牌背景
  brandBackground: 'bg-[var(--fluent-color-brand-background)]',
  brandBackground2: 'bg-[var(--fluent-color-brand-background2)]',
  brandBackgroundHover: 'bg-[var(--fluent-color-brand-background-hover)]',
  brandBackgroundPressed: 'bg-[var(--fluent-color-brand-background-pressed)]',
  brandBackgroundSelected: 'bg-[var(--fluent-color-brand-background-selected)]',
};

// 文字颜色类
export const fluentTextColors = {
  // 中性前景
  neutralForeground1: 'text-[var(--fluent-color-neutral-foreground1)]',
  neutralForeground2: 'text-[var(--fluent-color-neutral-foreground2)]',
  neutralForeground3: 'text-[var(--fluent-color-neutral-foreground3)]',
  neutralForeground4: 'text-[var(--fluent-color-neutral-foreground4)]',

  // 品牌前景
  brandForeground1: 'text-[var(--fluent-color-brand-foreground1)]',
  brandForeground2: 'text-[var(--fluent-color-brand-foreground2)]',
  brandForegroundLink: 'text-[var(--fluent-color-brand-foreground-link)]',
  brandForegroundLinkHover: 'text-[var(--fluent-color-brand-foreground-link-hover)]',
  brandForegroundLinkPressed: 'text-[var(--fluent-color-brand-foreground-link-pressed)]',
  brandForegroundLinkSelected: 'text-[var(--fluent-color-brand-foreground-link-selected)]',

  // 状态颜色
  dangerForeground1: 'text-[var(--fluent-color-palette-red-foreground1)]',
  successForeground1: 'text-[var(--fluent-color-palette-green-foreground1)]',
  warningForeground1: 'text-[var(--fluent-color-palette-yellow-foreground1)]',
};

// 边框颜色类
export const fluentBorderColors = {
  neutralStroke1: 'border-[var(--fluent-color-neutral-stroke1)]',
  neutralStroke2: 'border-[var(--fluent-color-neutral-stroke2)]',
  neutralStroke3: 'border-[var(--fluent-color-neutral-stroke3)]',
  brandStroke1: 'border-[var(--fluent-color-brand-stroke1)]',
  brandStroke2: 'border-[var(--fluent-color-brand-stroke2)]',
};

// 圆角类
export const fluentBorderRadius = {
  none: 'rounded-[var(--fluent-border-radius-none)]',
  small: 'rounded-[var(--fluent-border-radius-small)]',
  medium: 'rounded-[var(--fluent-border-radius-medium)]',
  large: 'rounded-[var(--fluent-border-radius-large)]',
  xLarge: 'rounded-[var(--fluent-border-radius-x-large)]',
  circular: 'rounded-[var(--fluent-border-radius-circular)]',
};

// 字体大小类
export const fluentFontSizes = {
  base100: 'text-[var(--fluent-font-size-base100)]',
  base200: 'text-[var(--fluent-font-size-base200)]',
  base300: 'text-[var(--fluent-font-size-base300)]',
  base400: 'text-[var(--fluent-font-size-base400)]',
  base500: 'text-[var(--fluent-font-size-base500)]',
  base600: 'text-[var(--fluent-font-size-base600)]',
  hero700: 'text-[var(--fluent-font-size-hero700)]',
  hero800: 'text-[var(--fluent-font-size-hero800)]',
  hero900: 'text-[var(--fluent-font-size-hero900)]',
  hero1000: 'text-[var(--fluent-font-size-hero1000)]',
};

// 字体权重类
export const fluentFontWeights = {
  regular: 'font-[var(--fluent-font-weight-regular)]',
  medium: 'font-[var(--fluent-font-weight-medium)]',
  semibold: 'font-[var(--fluent-font-weight-semibold)]',
  bold: 'font-[var(--fluent-font-weight-bold)]',
};

// 阴影类
export const fluentShadows = {
  shadow2: 'shadow-[var(--fluent-shadow2)]',
  shadow4: 'shadow-[var(--fluent-shadow4)]',
  shadow8: 'shadow-[var(--fluent-shadow8)]',
  shadow16: 'shadow-[var(--fluent-shadow16)]',
  shadow28: 'shadow-[var(--fluent-shadow28)]',
  shadow64: 'shadow-[var(--fluent-shadow64)]',
};

// 组合工具类
export const fluentComponents = {
  // 卡片样式
  card: `${fluentBackgrounds.neutralBackground1} ${fluentBorderColors.neutralStroke2} ${fluentBorderRadius.medium} ${fluentShadows.shadow4} border`,

  // 按钮样式
  button: {
    primary: `${fluentBackgrounds.brandBackground} ${fluentTextColors.neutralForeground1} ${fluentBorderRadius.medium} hover:${fluentBackgrounds.brandBackgroundHover}`,
    secondary: `${fluentBackgrounds.neutralBackground1} ${fluentTextColors.neutralForeground1} ${fluentBorderColors.neutralStroke1} ${fluentBorderRadius.medium} border hover:${fluentBackgrounds.neutralBackground2}`,
    subtle: `${fluentBackgrounds.neutralBackground1} ${fluentTextColors.brandForeground1} ${fluentBorderRadius.medium} hover:${fluentBackgrounds.neutralBackground2}`,
  },

  // 输入框样式
  input: `${fluentBackgrounds.neutralBackground1} ${fluentTextColors.neutralForeground1} ${fluentBorderColors.neutralStroke1} ${fluentBorderRadius.medium} border focus:${fluentBorderColors.brandStroke1}`,

  // 文本样式
  text: {
    title1: `${fluentTextColors.neutralForeground1} ${fluentFontSizes.hero700} ${fluentFontWeights.semibold}`,
    title2: `${fluentTextColors.neutralForeground1} ${fluentFontSizes.base600} ${fluentFontWeights.semibold}`,
    title3: `${fluentTextColors.neutralForeground1} ${fluentFontSizes.base500} ${fluentFontWeights.semibold}`,
    subtitle1: `${fluentTextColors.neutralForeground1} ${fluentFontSizes.base400} ${fluentFontWeights.medium}`,
    subtitle2: `${fluentTextColors.neutralForeground2} ${fluentFontSizes.base300} ${fluentFontWeights.medium}`,
    body1: `${fluentTextColors.neutralForeground1} ${fluentFontSizes.base300} ${fluentFontWeights.regular}`,
    body2: `${fluentTextColors.neutralForeground2} ${fluentFontSizes.base300} ${fluentFontWeights.regular}`,
    caption1: `${fluentTextColors.neutralForeground2} ${fluentFontSizes.base200} ${fluentFontWeights.regular}`,
    caption2: `${fluentTextColors.neutralForeground3} ${fluentFontSizes.base100} ${fluentFontWeights.regular}`,
  },
};

/**
 * 创建 Fluent 主题的 className 组合工具
 */
export function createFluentClass(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

/**
 * 条件性应用 Fluent 类
 */
export function conditionalFluentClass(condition: boolean, trueClass: string, falseClass?: string) {
  return condition ? trueClass : falseClass || '';
}
