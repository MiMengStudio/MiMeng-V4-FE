import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import Icon from '@/ui/Icon';
import NavItemComponent from './NavItem';
import { NavProps, NavItem } from './nav.types';

const Nav: React.FC<NavProps> = ({ items, className = '' }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [previousActiveId, setPreviousActiveId] = useState<string | null>(null);
  const [isSwitching, setIsSwitching] = useState(false);

  const currentActiveItem = items.find((item) => item.path === location.pathname);
  const currentActiveId = currentActiveItem?.id || null;
  const currentActiveIndex = currentActiveItem
    ? items.findIndex((item) => item.id === currentActiveItem.id)
    : null;
  const previousActiveIndex = previousActiveId
    ? items.findIndex((item) => item.id === previousActiveId)
    : null;

  useEffect(() => {
    if (currentActiveId !== previousActiveId) {
      setPreviousActiveId(currentActiveId);
    }
  }, [currentActiveId, previousActiveId]);

  const handleNavItemClick = (item: NavItem) => {
    setPreviousActiveId(currentActiveId);
    navigate(item.path);
  };

  return (
    <nav
      className={`
        h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700
        transition-all duration-200 ease-in-out
        ${isCollapsed ? 'w-14' : 'w-64'}
        ${className}
      `}
    >
      {/* Header */}
      <div className="flex items-center p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="w-6 h-5 flex items-center justify-center">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors -m-2"
            aria-label={isCollapsed ? '展开导航' : '折叠导航'}
          >
            <Icon icon="solar:hamburger-menu-linear" className="w-6 h-5" />
          </button>
        </div>
      </div>

      {/* Navigation Items */}
      <div className="p-2 space-y-1">
        {items.map((item, index) => (
          <NavItemComponent
            key={item.id}
            item={item}
            isActive={currentActiveId === item.id}
            isCollapsed={isCollapsed}
            onClick={() => handleNavItemClick(item)}
            previousActiveId={previousActiveId}
            currentActiveId={currentActiveId}
            itemIndex={index}
            previousActiveIndex={previousActiveIndex}
            items={items}
            isSwitching={isSwitching}
            setIsSwitching={setIsSwitching}
          />
        ))}
      </div>
    </nav>
  );
};

export default Nav;
