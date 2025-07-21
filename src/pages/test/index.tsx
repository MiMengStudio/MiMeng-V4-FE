import React from 'react';
import ButtonExample from '@/pages/test/components/ButtonExample';
import { useSettings, useToggleThemeMode, useSettingActions } from '@/store/settingStore';
import Button from '@/ui/Button/index';
import { useClipboard } from '@/hooks/useClipboard';
import { usePlatform } from '@/hooks/usePlatform';
import { useSystemTheme } from '@/hooks/useSystemTheme';
import IconExample from './components/IconExample';
import DebugInfo from './components/DebugInfo';
import FluentThemeExample from './components/FluentThemeExample';

export const TestPage: React.FC = () => {
  const toggleTheme = useToggleThemeMode();
  const { themeMode, resolvedThemeMode } = useSettings();
  const { setSettings } = useSettingActions();
  const clipboardManager = useClipboard();
  const systemTheme = useSystemTheme();
  const platformInfo = usePlatform();

  const [tab, setTab] = React.useState<'debug' | 'button' | 'icon' | 'fluent'>('debug');

  const handlePlatformOverride = (override: 'mobile' | 'desktop' | null) => {
    setSettings({ platformOverride: override });
  };

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
          <Button
            onClick={() => setTab('fluent')}
            variant={tab === 'fluent' ? 'primary' : 'outline'}
          >
            Fluent 主题
          </Button>
        </div>
        {tab === 'debug' && (
          <>
            <DebugInfo
              platformInfo={platformInfo}
              clipboardManager={clipboardManager}
              systemTheme={systemTheme}
            />

            {/* 平台切换控制 */}
            <div className="my-4 p-4 border rounded">
              <h3 className="text-lg font-semibold mb-2">平台控制</h3>
              <div className="mb-2">
                <span className="font-medium">当前平台: </span>
                <span className="text-blue-600">
                  {platformInfo.isMobile ? 'Mobile' : 'Desktop'}
                  {platformInfo.platformOverride && (
                    <span className="ml-2 text-orange-500">
                      (覆盖: {platformInfo.platformOverride})
                    </span>
                  )}
                </span>
              </div>
              <div className="mb-2">
                <span className="text-sm text-gray-600">
                  原始检测: {platformInfo.originalIsMobile ? 'Mobile' : 'Desktop'}
                  (OS: {platformInfo.osType})
                </span>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => handlePlatformOverride('mobile')}
                  variant={platformInfo.platformOverride === 'mobile' ? 'primary' : 'outline'}
                  size="small"
                >
                  强制 Mobile
                </Button>
                <Button
                  onClick={() => handlePlatformOverride('desktop')}
                  variant={platformInfo.platformOverride === 'desktop' ? 'primary' : 'outline'}
                  size="small"
                >
                  强制 Desktop
                </Button>
                <Button
                  onClick={() => handlePlatformOverride(null)}
                  variant={platformInfo.platformOverride === null ? 'primary' : 'outline'}
                  size="small"
                >
                  自动检测
                </Button>
              </div>
            </div>

            <p>Current Theme: {themeMode}</p>
            <p>Resolved Theme: {resolvedThemeMode}</p>
            <Button onClick={() => toggleTheme()}>Toggle Theme</Button>
          </>
        )}
        {tab === 'button' && <ButtonExample />}
        {tab === 'icon' && <IconExample />}
        {tab === 'fluent' && <FluentThemeExample />}
      </div>
    </div>
  );
};

export default TestPage;
