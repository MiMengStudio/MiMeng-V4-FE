import fs from 'fs';
import path from 'path';
import { generateThemeCSS } from '../src/theme/fluent-to-tailwind';

/**
 * 生成 Fluent CSS 变量文件
 */
function generateFluentCSS() {
  const css = generateThemeCSS();

  const cssContent = `/* Fluent Design System CSS Variables */
/* 此文件由脚本自动生成，请勿手动编辑 */

${css}

/*
 * 使用示例：
 *
 * 在 Tailwind 中使用 Fluent 颜色：
 * <div className="bg-[var(--fluent-color-neutral-background1)] text-[var(--fluent-color-neutral-foreground1)]">
 *
 * 使用 Fluent 圆角：
 * <div className="rounded-[var(--fluent-border-radius-small)]">
 * <div className="rounded-[var(--fluent-border-radius-medium)]">
 * <div className="rounded-[var(--fluent-border-radius-large)]">
 *
 * 使用 Fluent 字体：
 * <div className="text-[var(--fluent-font-size-base100)]">
 * <div className="font-[var(--fluent-font-weight-regular)]">
 *
 * 或者使用预定义的 Tailwind 类（需要在 tailwind.config.ts 中配置）：
 * <div className="bg-neutral-background-1 text-neutral-foreground-1">
 * <div className="rounded-sm"> // borderRadiusSmall
 * <div className="rounded-md"> // borderRadiusMedium
 * <div className="rounded-lg"> // borderRadiusLarge
 */`;

  const outputPath = path.join(process.cwd(), 'src', 'theme', 'fluent-variables.css');
  fs.writeFileSync(outputPath, cssContent);

  console.log('✅ Fluent CSS 变量文件已生成:', outputPath);
}

// 检查是否作为主模块运行
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
if (process.argv[1] === __filename) {
  generateFluentCSS();
}

export { generateFluentCSS };
