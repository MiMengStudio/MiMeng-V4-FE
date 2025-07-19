import React from 'react';
import { Button as FluentButton } from '@fluentui/react-components';
import { ButtonAdapterProps, ButtonVariant, ButtonSize } from '../button.types';

const FluentButtonAdapter: React.FC<ButtonAdapterProps> = ({ props }) => {
  const {
    children,
    variant = 'primary',
    size = 'medium',
    disabled = false,
    loading = false,
    onClick,
    className,
    type = 'button',
    'data-testid': dataTestId,
  } = props;

  // 映射variant到Fluent UI的appearance
  const getFluentAppearance = (variant: ButtonVariant) => {
    switch (variant) {
      case 'primary':
        return 'primary';
      case 'secondary':
        return 'secondary';
      case 'outline':
        return 'outline';
      case 'ghost':
        return 'subtle';
      case 'danger':
        return 'primary';
      default:
        return 'primary';
    }
  };

  // 映射size到Fluent UI的size
  const getFluentSize = (size: ButtonSize) => {
    switch (size) {
      case 'small':
        return 'small';
      case 'medium':
        return 'medium';
      case 'large':
        return 'large';
      default:
        return 'medium';
    }
  };

  return (
    <FluentButton
      appearance={getFluentAppearance(variant)}
      size={getFluentSize(size)}
      disabled={disabled || loading}
      onClick={onClick}
      className={className}
      type={type}
      data-testid={dataTestId}
    >
      {loading ? 'Loading...' : children}
    </FluentButton>
  );
};

export default FluentButtonAdapter;
