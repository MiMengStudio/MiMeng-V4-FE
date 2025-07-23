import React, { lazy } from 'react';
import { usePlatform } from '@/hooks/usePlatform';

interface MainLayoutProps {
  children: React.ReactNode;
}

const DesktopLayout = lazy(() => import('./DesktopLayout'));
const MobileLayout = lazy(() => import('./MobileLayout'));

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { isDesktop, isClient } = usePlatform();

  // 判断是否为桌面客户端（非网页版）
  const isDesktopClient = isDesktop && isClient;

  return (
    <>
      {isDesktop ? (
        <DesktopLayout showHeader={isDesktopClient}>{children}</DesktopLayout>
      ) : (
        <MobileLayout>{children}</MobileLayout>
      )}
    </>
  );
};

export default MainLayout;
