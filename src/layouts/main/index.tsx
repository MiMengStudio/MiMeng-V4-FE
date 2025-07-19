import React, { lazy } from 'react';
import WindowsHeaderLayout from './header/windows';
import { usePlatform } from '@/hooks/usePlatform';

interface MainLayoutProps {
  children: React.ReactNode;
}

const NavDesktopLayout = lazy(() => import('./nav/desktop'));
const NavMobileLayout = lazy(() => import('./nav/mobile'));

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { isDesktop } = usePlatform();

  return (
    <div className="main-layout flex flex-col h-screen">
      {/* 桌面端 Header，仅桌面显示，固定在最顶部 */}
      {isDesktop && <WindowsHeaderLayout />}

      {/* 主体内容区域 */}
      <div className="flex flex-1 h-full overflow-hidden">
        {/* 左侧导航栏 */}
        <aside className="flex-shrink-0 h-full">
          {isDesktop ? <NavDesktopLayout /> : <NavMobileLayout />}
        </aside>

        {/* 右侧内容区 */}
        <div className="flex flex-col flex-1 h-full">
          <main className="flex-1 p-6 overflow-auto">
            {/* 主内容区 */}
            <section>{children}</section>
          </main>
          <footer className="text-center text-xs">
            <p>© 2025 MiMeng</p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
