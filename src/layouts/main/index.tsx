import { useClipboard } from '@/hooks/useClipboard';
import { usePlatform } from '@/hooks/usePlatform';
import { useSystemTheme } from '@/hooks/useSystemTheme';

interface MainLayoutProps {
  children: React.ReactNode;
}

const NavDesktopLayout = lazy(() => import('./nav/desktop'));
const NavMobileLayout = lazy(() => import('./nav/mobile'));

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const clipboardManager = useClipboard();
  const SystemTheme = useSystemTheme();
  const { isDesktop } = usePlatform();
  return (
    <div className="main-layout flex h-screen">
      {/* 左侧导航栏 */}
      <aside className="flex-shrink-0 h-full">
        {isDesktop ? <NavDesktopLayout /> : <NavMobileLayout />}
      </aside>
      {/* 右侧内容区 */}
      <div className="flex flex-col flex-1 h-full">
        <main className="flex-1 p-6 overflow-auto">
          {/* 调试信息区 */}
          <section>
            <h2>调试信息</h2>
            <div>
              <span>platformInfo:</span>
              <pre>{JSON.stringify(usePlatform(), null, 2)}</pre>
            </div>
            <div>
              <span>UA:</span> {typeof window !== 'undefined' ? window.navigator.userAgent : 'N/A'}
            </div>
            <div>
              <button onClick={() => clipboardManager.copyToClipboard('Hello MiMeng!')}>
                Copy to Clipboard
              </button>
              <button onClick={() => clipboardManager.readClipboardText()}>
                Read from Clipboard
              </button>
            </div>
            <div>
              <span>Copied Text:</span> {clipboardManager.copiedText || 'None'}
              <br />
              <span>Read Text:</span> {clipboardManager.readText || 'None'}
            </div>
            <div>
              <h2>System Theme: {SystemTheme}</h2>
            </div>
          </section>
          {/* 主内容区 */}
          <section>{children}</section>
        </main>
        <footer className="text-center text-xs">
          <p>© 2025 MiMeng</p>
        </footer>
      </div>
    </div>
  );
};

export default MainLayout;
