import React, { lazy } from 'react';

interface DesktopLayoutProps {
  children: React.ReactNode;
  showHeader?: boolean; // 是否显示桌面端 Header
}

const WindowsHeaderLayout = lazy(() => import('./header/windows'));
const NavDesktopLayout = lazy(() => import('./nav/desktop'));

const DesktopLayout: React.FC<DesktopLayoutProps> = ({ children, showHeader = true }) => {
  return (
    <div className="desktop-layout flex flex-col h-screen bg-[var(--fluent-color-neutral-background2)]">
      {/* 桌面端 Header，可选显示 */}
      {showHeader && <WindowsHeaderLayout />}

      {/* 主体内容区域 */}
      <div className="flex flex-1 h-full overflow-hidden">
        {/* 左侧导航栏 */}
        <aside className="flex-shrink-0 h-full">
          <NavDesktopLayout />
        </aside>

        {/* 右侧内容区 */}
        <div className="flex flex-col flex-1 h-full rounded-tl-md border-1 border-[var(--fluent-color-neutral-stroke1)] overflow-hidden bg-[var(--fluent-color-neutral-background1)]">
          <main className="flex-1 p-6 overflow-auto">
            {/* 主内容区 */}
            <section>{children}</section>
          </main>
        </div>
      </div>
    </div>
  );
};

export default DesktopLayout;
