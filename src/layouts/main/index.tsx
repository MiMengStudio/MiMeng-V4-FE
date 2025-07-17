import { usePlatform } from '@/hooks/usePlatform';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { platform } = usePlatform();
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
      platform: {platform}
      <main>{children}</main>
      <footer>
        <p>© 2025 MiMeng</p>
      </footer>
    </div>
  );
};

export default MainLayout;
