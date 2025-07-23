import React, { useContext, Suspense, lazy } from 'react';
import ThemeContext from '../../theme/ThemeContext';
import { UIAdapter } from '../../types/enum';
import { NavProps } from './nav.types';

// 动态导入适配器
const FluentNavAdapter = lazy(() => import('./adapters/fluent.adapter'));
const MduiNavAdapter = lazy(() => import('./adapters/mdui.adapter'));

const Nav: React.FC<NavProps> = (props) => {
  const { UIAdapter: currentUIAdapter } = useContext(ThemeContext);

  // 根据当前的UI适配器选择对应的组件
  const renderAdapter = () => {
    switch (currentUIAdapter) {
      case UIAdapter.Fluent:
        return <FluentNavAdapter props={props} />;
      case UIAdapter.Mdui:
        return <MduiNavAdapter props={props} />;
      default:
        return <FluentNavAdapter props={props} />;
    }
  };

  return <Suspense fallback={<div>Loading...</div>}>{renderAdapter()}</Suspense>;
};

export { Nav };
export * from './nav.types';
export * from './fluent/nav.utils';
