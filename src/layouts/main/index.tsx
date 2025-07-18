import { useClipboard } from '@/hooks/useClipboard';
import { usePlatform } from '@/hooks/usePlatform';
import { useSystemTheme } from '@/hooks/useSystemTheme';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const clipboardManager = useClipboard();
  const SystemTheme = useSystemTheme();
  return (
    <div className="main">
      <header>
        <h1>My App</h1>
      </header>
      <nav>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
          <li>
            <a href="/contact">Contact</a>
          </li>
        </ul>
      </nav>
      platformInfo: <pre>{JSON.stringify(usePlatform(), null, 2)}</pre>
      UA: {typeof window !== 'undefined' ? window.navigator.userAgent : 'N/A'}
      <button onClick={() => clipboardManager.copyToClipboard('Hello MiMeng!')}>
        Copy to Clipboard
      </button>
      <button onClick={() => clipboardManager.readClipboardText()}>Read from Clipboard</button>
      <div className="clipboard-status">
        Copied Text: {clipboardManager.copiedText || 'None'}
        <br />
        Read Text: {clipboardManager.readText || 'None'}
      </div>
      <div>
        <h2>System Theme: {SystemTheme}</h2>
      </div>
      <main>{children}</main>
      <footer>
        <p>© 2025 MiMeng</p>
      </footer>
    </div>
  );
};

export default MainLayout;
