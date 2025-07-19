import {
  Hamburger,
  NavDrawer,
  NavDrawerBody,
  NavDrawerHeader,
  NavItem,
  Tooltip,
} from '@fluentui/react-components';
import { useLocation, useNavigate } from 'react-router';
import { useState } from 'react';
import Icon from '@/ui/Icon';

const navMap: Record<string, string> = {
  '/home': '1',
  '/about': '2',
  '/test': '3',
};

const NavDesktopLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // Hamburger 仅显示图标，不控制 open 状态
  const open = true;

  // 取当前 pathname 匹配 value
  const selectedValue = navMap[location.pathname] || '1';

  const handleNavItemClick = (path: string) => {
    navigate(path);
  };

  return (
    <NavDrawer
      className="h-full!"
      selectedValue={selectedValue}
      open={open}
      type={'inline'}
      density="medium"
    >
      <NavDrawerHeader>
        <Tooltip content="Navigation" relationship="label">
          <Hamburger />
        </Tooltip>
      </NavDrawerHeader>
      <NavDrawerBody>
        <NavItem
          value="1"
          icon={<Icon icon="solar:home-bold-duotone" />}
          onClick={() => handleNavItemClick('/home')}
        >
          Home
        </NavItem>
        <NavItem
          value="2"
          icon={<Icon icon="solar:info-square-bold-duotone" />}
          onClick={() => handleNavItemClick('/about')}
        >
          About
        </NavItem>
        <NavItem
          value="3"
          icon={<Icon icon="solar:command-line-duotone" />}
          onClick={() => handleNavItemClick('/test')}
        >
          Test
        </NavItem>
      </NavDrawerBody>
    </NavDrawer>
  );
};

export default NavDesktopLayout;
