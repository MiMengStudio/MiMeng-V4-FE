import React from 'react';
import { Nav, NavItem } from '@/ui/Nav';

interface MobileLayoutProps {
  children: React.ReactNode;
}

const navItems: NavItem[] = [
  {
    id: '1',
    path: '/home',
    icon: 'solar:home-bold-duotone',
    label: 'Home',
  },
  {
    id: '2',
    path: '/about',
    icon: 'solar:info-square-bold-duotone',
    label: 'About',
  },
  {
    id: '3',
    path: '/test',
    icon: 'solar:command-line-duotone',
    label: 'Test',
  },
  {
    id: '4',
    path: '/debug',
    icon: 'solar:bug-minimalistic-bold-duotone',
    label: 'Debug',
  },
];

const MobileLayout: React.FC<MobileLayoutProps> = ({ children }) => {
  return (
    <div className="mobile-layout h-screen bg-[var(--fluent-color-neutral-background2)]">
      {/* 移动端：导航栏和内容在同一个容器中 */}
      <div className="h-full relative overflow-hidden">
        <Nav items={navItems} scrollTarget=".mobile-content-scroll" />
        <div className="mobile-content-scroll h-full overflow-auto pb-16">
          <main className="p-4">
            <section>{children}</section>
          </main>
        </div>
      </div>
    </div>
  );
};

export default MobileLayout;
