import React, { lazy } from 'react';
import { usePlatform } from '@/hooks/usePlatform';

interface MainLayoutProps {
  children: React.ReactNode;
}

const WindowsHeaderLayout = lazy(() => import('./header/windows'));
const NavDesktopLayout = lazy(() => import('./nav/desktop'));
const NavMobileLayout = lazy(() => import('./nav/mobile'));

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { isDesktop, isClient } = usePlatform();

  // 判断是否为桌面客户端（非网页版）
  const isDesktopClient = isDesktop && isClient;

  return (
    <div className="main-layout flex flex-col h-screen bg-[var(--fluent-color-neutral-background2)]">
      {/* 桌面端 Header，仅桌面客户端显示，固定在最顶部 */}
      {isDesktopClient && <WindowsHeaderLayout />}

      {/* 主体内容区域 */}
      <div className="flex flex-1 h-full overflow-hidden">
        {/* 左侧导航栏 */}
        <aside className="flex-shrink-0 h-full">
          {isDesktop ? <NavDesktopLayout /> : <NavMobileLayout />}
        </aside>

        {/* 右侧内容区 */}
        <div className="flex flex-col flex-1 h-full rounded-tl-md border-1 border-[var(--fluent-color-neutral-stroke1)] overflow-hidden bg-[var(--fluent-color-neutral-background1)]">
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
