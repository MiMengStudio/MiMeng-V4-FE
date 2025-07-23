import React from 'react';
import { useSettings, useToggleThemeMode, useSettingActions } from '@/store/settingStore';
import Button from '@/ui/Button/index';
import { useClipboard } from '@/hooks/useClipboard';
import { usePlatform } from '@/hooks/usePlatform';
import { useSystemTheme } from '@/hooks/useSystemTheme';
import DebugInfo from '@/pages/test/components/DebugInfo';
import { useNavigate } from 'react-router';

export const DebugPage: React.FC = () => {
  const navigate = useNavigate();
  const toggleTheme = useToggleThemeMode();
  const { themeMode, resolvedThemeMode } = useSettings();
  const { setSettings } = useSettingActions();
  const clipboardManager = useClipboard();
  const systemTheme = useSystemTheme();
  const platformInfo = usePlatform();

  // 路由跳转相关状态
  const [customPath, setCustomPath] = React.useState('/');
  const [navigationHistory, setNavigationHistory] = React.useState<string[]>([]);

  const handlePlatformOverride = (override: 'mobile' | 'desktop' | null) => {
    setSettings({ platformOverride: override });
  };

  const handleCustomNavigation = () => {
    if (customPath.trim()) {
      navigate(customPath);
      setNavigationHistory((prev) => [customPath, ...prev.slice(0, 9)]); // 保留最近10条记录
    }
  };

  const handleQuickNavigation = (path: string) => {
    navigate(path);
    setNavigationHistory((prev) => [path, ...prev.slice(0, 9)]);
  };

  const clearNavigationHistory = () => {
    setNavigationHistory([]);
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold mb-6">调试页面</h1>

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

        {/* 主题控制 */}
        <div className="my-4 p-4 border rounded">
          <h3 className="text-lg font-semibold mb-2">主题控制</h3>
          <div className="mb-2">
            <span className="font-medium">当前主题模式: </span>
            <span className="text-blue-600">{themeMode}</span>
          </div>
          <div className="mb-2">
            <span className="font-medium">解析后主题: </span>
            <span className="text-blue-600">{resolvedThemeMode}</span>
          </div>
          <Button onClick={() => toggleTheme()}>切换主题</Button>
        </div>

        {/* 路由跳转控制 */}
        <div className="my-4 p-4 border rounded">
          <h3 className="text-lg font-semibold mb-2">路由跳转控制</h3>

          {/* 自定义路径输入 */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">自定义路径:</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={customPath}
                onChange={(e) => setCustomPath(e.target.value)}
                placeholder="输入路径，如: /home, /about, /test"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onKeyPress={(e) => e.key === 'Enter' && handleCustomNavigation()}
              />
              <Button onClick={handleCustomNavigation} size="small">
                跳转
              </Button>
            </div>
          </div>

          {/* 快速跳转按钮 */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">快速跳转:</label>
            <div className="flex flex-wrap gap-2">
              <Button onClick={() => handleQuickNavigation('/')} variant="outline" size="small">
                首页
              </Button>
              <Button onClick={() => handleQuickNavigation('/home')} variant="outline" size="small">
                Home
              </Button>
              <Button
                onClick={() => handleQuickNavigation('/about')}
                variant="outline"
                size="small"
              >
                About
              </Button>
              <Button onClick={() => handleQuickNavigation('/test')} variant="outline" size="small">
                Test
              </Button>
              <Button onClick={() => handleQuickNavigation('/404')} variant="outline" size="small">
                404页面
              </Button>
              <Button onClick={() => handleQuickNavigation('/500')} variant="outline" size="small">
                500页面
              </Button>
            </div>
          </div>

          {/* 导航历史 */}
          {navigationHistory.length > 0 && (
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium">导航历史:</label>
                <Button onClick={clearNavigationHistory} variant="outline" size="small">
                  清空历史
                </Button>
              </div>
              <div className="bg-gray-50 p-2 rounded max-h-32 overflow-y-auto">
                {navigationHistory.map((path, index) => (
                  <div key={index} className="flex justify-between items-center py-1">
                    <span className="text-sm text-gray-600">{path}</span>
                    <Button
                      onClick={() => navigate(path)}
                      variant="outline"
                      size="small"
                      className="ml-2"
                    >
                      重新访问
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DebugPage;
