import React from 'react';

export interface LogoProps extends React.SVGProps<SVGSVGElement> {
  /** Logo 大小，默认为 18 */
  size?: number | string;
}

/**
 * Logo 组件 - 用于显示应用 Logo
 *
 * @example
 * ```tsx
 * // 基本用法
 * <Logo size={18} />
 *
 * // 通过 Icon 组件使用
 * <Icon component={Logo} size={20} className="text-blue-500" />
 * ```
 */
export const Logo: React.FC<LogoProps> = ({ className, style, size = 18, ...props }) => {
  // 将 SVG props 转换为适合 img 元素的 props
  const { width, height, ...restProps } = props;

  const finalSize = width || height || size;

  return (
    <img
      src="/images/logo.png"
      alt="迷梦 Logo"
      className={className}
      style={{
        width: finalSize,
        height: finalSize,
        objectFit: 'contain',
        display: 'inline-block',
        verticalAlign: 'middle',
        ...style,
      }}
      {...(restProps as React.ImgHTMLAttributes<HTMLImageElement>)}
    />
  );
};

export default Logo;
