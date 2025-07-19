import ButtonExample from '@/components/ButtonExample';
import { useSettings, useToggleThemeMode } from '@/store/settingStore';
import Button from '@/ui/Button/index';

const HomePage = () => {
  const toggleTheme = useToggleThemeMode();
  const { themeMode, resolvedThemeMode } = useSettings();
  return (
    <div>
      <h1>Home Page</h1>
      <p>Welcome to the home page!</p>
      <p>Current Theme: {themeMode}</p>
      <p>Resolved Theme: {resolvedThemeMode}</p>
      <Button onClick={() => toggleTheme()}>Toggle Theme</Button>
      <ButtonExample />
    </div>
  );
};

export default HomePage;
