import React from 'react';
import { Icon as IconifyIcon } from '@iconify/react';
import { isLocalIcon, getLocalIcon } from './icon.map';

export interface UnplugIconProps {
  /** unplugin-icons 组件 */
  component: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  /** 图标大小，默认为 24 */
  size?: number | string;
  /** 图标颜色 */
  color?: string;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 点击事件处理器 */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  /** 是否禁用 */
  disabled?: boolean;
  /** 旋转角度 */
  rotate?: number;
  /** 水平翻转 */
  hFlip?: boolean;
  /** 垂直翻转 */
  vFlip?: boolean;
}

export interface IconProps {
  /** 图标名称，格式为 "prefix:icon-name"，例如 "solar:user-bold-duotone" */
  icon: string;
  /** 图标大小，默认为 24 */
  size?: number | string;
  /** 图标颜色 */
  color?: string;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 点击事件处理器 */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  /** 是否禁用 */
  disabled?: boolean;
  /** 旋转角度 */
  rotate?: number;
  /** 水平翻转 */
  hFlip?: boolean;
  /** 垂直翻转 */
  vFlip?: boolean;
  /** 内联样式 */
  inline?: boolean;
  /** 强制使用运行时图标，即使本地有对应图标 */
  forceRuntime?: boolean;
}

/**
 * Icon 组件 - 自动选择本地图标或运行时图标
 *
 * 对于在 icon-map.ts 中定义的图标，会自动使用本地打包版本（性能更好）
 * 对于未定义的图标，会使用运行时图标（更灵活）
 *
 * @example
 * ```tsx
 * // 自动选择最佳图标类型
 * <Icon icon="solar:user-bold-duotone" size={24} />
 *
 * // 强制使用运行时图标
 * <Icon icon="solar:user-bold-duotone" size={24} forceRuntime />
 *
 * // 自定义大小和颜色
 * <Icon icon="solar:heart-bold-duotone" size={32} color="#ff6b6b" />
 *
 * // 可点击图标
 * <Icon
 *   icon="solar:settings-bold-duotone"
 *   onClick={() => console.log('Settings clicked')}
 *   className="cursor-pointer hover:scale-110 transition-transform"
 * />
 *
 * // 兼容旧的 component 方式
 * import IconSolarUser from '~icons/solar/user-bold-duotone'
 * <Icon component={IconSolarUser} size={24} />
 * ```
 */
export const Icon: React.FC<IconProps | UnplugIconProps> = (props) => {
  // 检查是否是旧的 component 方式
  if ('component' in props) {
    // 使用 unplugin-icons 组件（兼容旧用法）
    const {
      component: IconComponent,
      size = 24,
      color,
      className = '',
      style = {},
      onClick,
      disabled = false,
      rotate,
      hFlip,
      vFlip,
      ...restProps
    } = props;

    const handleClick = (event: React.MouseEvent<SVGSVGElement>) => {
      if (disabled) {
        event.preventDefault();
        return;
      }
      onClick?.(event);
    };

    const combinedStyle = {
      ...style,
      fontSize: size,
      color,
      display: 'inline-block',
      verticalAlign: 'middle',
      transform:
        [rotate ? `rotate(${rotate}deg)` : '', hFlip ? 'scaleX(-1)' : '', vFlip ? 'scaleY(-1)' : '']
          .filter(Boolean)
          .join(' ') || undefined,
      cursor: onClick && !disabled ? 'pointer' : undefined,
    };

    return (
      <IconComponent
        className={`${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`.trim()}
        style={combinedStyle}
        onClick={onClick ? handleClick : undefined}
        {...restProps}
      />
    );
  } else {
    // 新的统一 icon 方式
    const {
      icon,
      size = 24,
      color,
      className = '',
      style = {},
      onClick,
      disabled = false,
      rotate,
      hFlip,
      vFlip,
      inline = false,
      forceRuntime = false,
      ...restProps
    } = props;

    // 检查是否应该使用本地图标
    const shouldUseLocal = !forceRuntime && isLocalIcon(icon);

    if (shouldUseLocal) {
      // 使用本地打包图标
      const LocalIconComponent = getLocalIcon(icon)!;

      const handleClick = (event: React.MouseEvent<SVGSVGElement>) => {
        if (disabled) {
          event.preventDefault();
          return;
        }
        onClick?.(event);
      };

      const combinedStyle = {
        ...style,
        fontSize: size,
        color,
        display: 'inline-block',
        verticalAlign: 'middle',
        transform:
          [
            rotate ? `rotate(${rotate}deg)` : '',
            hFlip ? 'scaleX(-1)' : '',
            vFlip ? 'scaleY(-1)' : '',
          ]
            .filter(Boolean)
            .join(' ') || undefined,
        cursor: onClick && !disabled ? 'pointer' : undefined,
      };

      return (
        <LocalIconComponent
          className={`${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`.trim()}
          style={combinedStyle}
          onClick={onClick ? handleClick : undefined}
          {...restProps}
        />
      );
    } else {
      // 使用运行时图标
      const handleClick = (event: React.MouseEvent<SVGSVGElement>) => {
        if (disabled) {
          event.preventDefault();
          return;
        }
        onClick?.(event);
      };

      const iconProps = {
        icon,
        width: size,
        height: size,
        color,
        rotate,
        hFlip,
        vFlip,
        inline,
        className: `${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`.trim(),
        style: {
          display: 'inline-block',
          verticalAlign: 'middle',
          ...style,
          ...(onClick && !disabled ? { cursor: 'pointer' } : {}),
        },
        onClick: onClick ? handleClick : undefined,
        ...restProps,
      };

      return <IconifyIcon {...iconProps} />;
    }
  }
};

export default Icon;

// 导出图标映射表相关函数，方便外部使用
export { isLocalIcon, getLocalIcon, getAvailableLocalIcons, localIconMap } from './icon.map';
