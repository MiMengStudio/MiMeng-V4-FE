import React from 'react';
import { ButtonAdapterProps, ButtonVariant, ButtonSize } from '../button.types';

const MduiButtonAdapter: React.FC<ButtonAdapterProps> = ({ props }) => {
  const {
    children,
    variant = 'primary',
    size = 'medium',
    disabled = false,
    loading = false,
    icon,
    iconPosition = 'start',
    onClick,
    className,
    type = 'button',
    'data-testid': dataTestId,
  } = props;

  // 映射 variant 到 MDUI 的 variant
  const getMduiVariant = (variant: ButtonVariant) => {
    switch (variant) {
      case 'primary':
        return 'filled';
      case 'secondary':
        return 'tonal';
      case 'outline':
        return 'outlined';
      case 'ghost':
        return 'text';
      case 'danger':
        return 'filled'; // 可以通过 CSS 自定义危险按钮的颜色
      default:
        return 'filled';
    }
  };

  // MDUI 没有直接的 size 属性，我们可以通过 CSS 类来控制大小
  const getSizeClass = (size: ButtonSize) => {
    switch (size) {
      case 'small':
        return 'mdui-button-small';
      case 'medium':
        return 'mdui-button-medium';
      case 'large':
        return 'mdui-button-large';
      default:
        return 'mdui-button-medium';
    }
  };

  // 组合 className
  const combinedClassName = [
    getSizeClass(size),
    variant === 'danger' ? 'mdui-button-danger' : '',
    className || '',
  ]
    .filter(Boolean)
    .join(' ');

  // 处理点击事件
  const handleClick = (event: React.MouseEvent) => {
    if (onClick) {
      onClick(event as React.MouseEvent<HTMLButtonElement>);
    }
  };

  // 渲染图标
  const renderIcon = (position: 'start' | 'end') => {
    if (!icon || iconPosition !== position) return null;

    if (typeof icon === 'string') {
      return <mdui-icon name={icon} slot={position === 'start' ? 'icon' : 'end-icon'} />;
    }

    // 如果 icon 是 React 元素，需要包装在一个 div 中
    return <div slot={position === 'start' ? 'icon' : 'end-icon'}>{icon}</div>;
  };

  return (
    <mdui-button
      variant={getMduiVariant(variant)}
      disabled={disabled}
      loading={loading}
      onClick={handleClick}
      className={combinedClassName}
      type={type}
      data-testid={dataTestId}
    >
      {renderIcon('start')}
      {children}
      {renderIcon('end')}
    </mdui-button>
  );
};

export default MduiButtonAdapter;
