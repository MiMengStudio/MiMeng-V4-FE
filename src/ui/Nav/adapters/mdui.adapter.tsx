import React, { useEffect, useRef, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { NavAdapterProps } from '../nav.types';
import Icon from '@/ui/Icon';
import ThemeContext from '@/theme/ThemeContext';

// 按需导入 MDUI 组件
import 'mdui/components/navigation-bar.js';
import 'mdui/components/navigation-bar-item.js';

// 按需导入组件的 TypeScript 类型
import type { NavigationBar } from 'mdui/components/navigation-bar.js';

/**
 * MDUI Navigation Bar 适配器
 * 将通用的NavProps映射到MDUI的mdui-navigation-bar组件
 * 参考 FluentUI Nav 的路由处理方式，支持：
 * - React Router 集成
 * - 自动路径匹配和激活状态管理
 * - 路由导航功能
 */
const MduiNavAdapter: React.FC<NavAdapterProps> = ({ props }) => {
  const { items, className, scrollTarget } = props;
  const location = useLocation();
  const navigate = useNavigate();
  const navBarRef = useRef<NavigationBar>(null);
  const { primaryColor } = useContext(ThemeContext);

  // 根据当前路径确定激活的导航项，参考 FluentUI 实现
  const currentActiveItem = items.find((item) => item.path === location.pathname);
  const currentActiveId = currentActiveItem?.id || null;

  // 处理导航项点击，参考 FluentUI 的 handleNavItemClick
  const handleNavItemClick = (itemId: string) => {
    const selectedItem = items.find((item) => item.id === itemId);
    if (selectedItem) {
      // 使用 React Router 进行导航，与 FluentUI 适配器保持一致
      navigate(selectedItem.path);
    }
  };

  // 处理 MDUI 组件的 change 事件
  const handleChange = (event: Event) => {
    console.log('MDUI Navigation Bar change event:', event);
    const newValue = navBarRef.current?.value;
    if (newValue) {
      handleNavItemClick(newValue);
    }
  };

  // 注册事件监听器
  useEffect(() => {
    const navBar = navBarRef.current;
    if (navBar) {
      navBar.addEventListener('change', handleChange);
      return () => {
        navBar.removeEventListener('change', handleChange);
      };
    }
  }, [items]); // 依赖项数组包含items，确保路由变化时重新绑定

  return (
    <mdui-navigation-bar
      ref={navBarRef}
      value={currentActiveId || ''}
      className={className}
      label-visibility="auto"
      scroll-target={scrollTarget}
      style={
        {
          // 自定义CSS变量需要使用索引签名
          ['--mdui-color-primary' as string]: 'var(--theme-primary-color, #6750a4)',
        } as React.CSSProperties
      }
    >
      {items.map((item) => (
        <mdui-navigation-bar-item key={item.id} value={item.id}>
          {item.label}
          <div slot="icon">
            <Icon icon={item.icon} />
          </div>
          <div slot="active-icon">
            <Icon icon={item.icon} color={primaryColor} />
          </div>
        </mdui-navigation-bar-item>
      ))}
    </mdui-navigation-bar>
  );
};

export default MduiNavAdapter;
