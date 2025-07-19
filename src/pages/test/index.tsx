import React from 'react';
import ButtonExample from '@/pages/test/components/ButtonExample';
import { useSettings, useToggleThemeMode } from '@/store/settingStore';
import Button from '@/ui/Button/index';
import { useClipboard } from '@/hooks/useClipboard';
import { usePlatform } from '@/hooks/usePlatform';
import { useSystemTheme } from '@/hooks/useSystemTheme';
import IconExample from './components/IconExample';
import DebugInfo from './components/DebugInfo';

export const TestPage: React.FC = () => {
  const toggleTheme = useToggleThemeMode();
  const { themeMode, resolvedThemeMode } = useSettings();
  const clipboardManager = useClipboard();
  const systemTheme = useSystemTheme();
  const platformInfo = usePlatform();

  const [tab, setTab] = React.useState<'debug' | 'button' | 'icon'>('debug');

  return (
    <div className="min-h-screen ">
      <div className="container mx-auto py-8">
        <div className="mb-6 flex gap-2">
          <Button onClick={() => setTab('debug')} variant={tab === 'debug' ? 'primary' : 'outline'}>
            调试
          </Button>
          <Button
            onClick={() => setTab('button')}
            variant={tab === 'button' ? 'primary' : 'outline'}
          >
            按钮
          </Button>
          <Button onClick={() => setTab('icon')} variant={tab === 'icon' ? 'primary' : 'outline'}>
            Icon
          </Button>
        </div>
        {tab === 'debug' && (
          <>
            <DebugInfo
              platformInfo={platformInfo}
              clipboardManager={clipboardManager}
              systemTheme={systemTheme}
            />
            <p>Current Theme: {themeMode}</p>
            <p>Resolved Theme: {resolvedThemeMode}</p>
            <Button onClick={() => toggleTheme()}>Toggle Theme</Button>
          </>
        )}
        {tab === 'button' && <ButtonExample />}
        {tab === 'icon' && <IconExample />}
      </div>
    </div>
  );
};

export default TestPage;
