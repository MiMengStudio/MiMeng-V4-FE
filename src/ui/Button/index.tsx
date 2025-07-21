import React, { useContext, Suspense, lazy } from 'react';
import ThemeContext from '../../theme/ThemeContext';
import { UIAdapter } from '../../types/enum';
import { ButtonProps } from './button.types';

// 动态导入适配器
const FluentButtonAdapter = lazy(() => import('./adapters/FluentButtonAdapter'));
const MduiButtonAdapter = lazy(() => import('./adapters/MduiButtonAdapter'));

const Button: React.FC<ButtonProps> = (props) => {
  const { UIAdapter: currentUIAdapter } = useContext(ThemeContext);

  // 根据当前的UI适配器选择对应的组件
  const renderAdapter = () => {
    switch (currentUIAdapter) {
      case UIAdapter.Fluent:
        return <FluentButtonAdapter props={props} />;
      case UIAdapter.Mdui:
        return <MduiButtonAdapter props={props} />;
      default:
        return <FluentButtonAdapter props={props} />;
    }
  };

  return <Suspense fallback={<div>Loading...</div>}>{renderAdapter()}</Suspense>;
};

export default Button;
