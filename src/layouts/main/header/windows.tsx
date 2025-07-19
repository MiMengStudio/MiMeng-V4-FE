import React, { useState, useEffect } from 'react';
import { getCurrentWindow } from '@tauri-apps/api/window';
import { Icon } from '@/ui';
import { Logo } from '@/components';

const dragStyle = {
  WebkitAppRegion: 'drag',
} as React.CSSProperties & { WebkitAppRegion?: string };

const noDragStyle = {
  WebkitAppRegion: 'no-drag',
} as React.CSSProperties & { WebkitAppRegion?: string };

const WindowsHeaderLayout: React.FC = () => {
  const [isMaximized, setIsMaximized] = useState(false);

  // 检查窗口状态
  const checkWindowState = async () => {
    try {
      const maximized = await getCurrentWindow().isMaximized();
      setIsMaximized(maximized);
    } catch (error) {
      console.error('检查窗口状态失败:', error);
    }
  };

  // 监听窗口状态变化
  useEffect(() => {
    checkWindowState();

    // 监听窗口大小变化事件
    const unlisten = getCurrentWindow().onResized(() => {
      checkWindowState();
    });

    return () => {
      unlisten.then((fn) => fn());
    };
  }, []);

  // 刷新网页
  const handleRefresh = () => {
    window.location.reload();
  };

  const handleMinimize = async () => {
    try {
      await getCurrentWindow().minimize();
    } catch (error) {
      console.error('最小化窗口失败:', error);
    }
  };

  const handleMaximize = async () => {
    try {
      const win = getCurrentWindow();
      if (await win.isMaximized()) {
        await win.unmaximize();
      } else {
        await win.maximize();
      }
      // 立即更新状态
      checkWindowState();
    } catch (error) {
      console.error('切换窗口最大化状态失败:', error);
    }
  };

  const handleClose = async () => {
    try {
      await getCurrentWindow().close();
    } catch (error) {
      console.error('关闭窗口失败:', error);
    }
  };

  return (
    <div
      className="flex items-start justify-between h-12 pl-4 bg-gradient-to-r from-white via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 border-b border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-100 select-none shadow-sm"
      style={dragStyle}
    >
      {/* 应用标题 */}
      <span className="text-base font-semibold tracking-wide flex items-center gap-2 self-center">
        <Icon component={Logo} size={18} className="text-blue-500" />
        迷梦
      </span>

      {/* 窗口控制按钮 */}
      <div className="flex">
        <button
          className="w-12 h-8 flex items-center justify-center transition hover:bg-gray-200 active:bg-gray-300"
          style={noDragStyle}
          title="刷新网页"
          onClick={handleRefresh}
        >
          <Icon icon="solar:refresh-linear" size={18} className="text-gray-500" />
        </button>
        <button
          className="w-12 h-8 flex items-center justify-center transition hover:bg-gray-200 active:bg-gray-300"
          style={noDragStyle}
          title="最小化"
          onClick={handleMinimize}
        >
          <Icon icon="fluent:subtract-24-regular" size={18} className="text-gray-500" />
        </button>
        <button
          className="w-12 h-8 flex items-center justify-center transition hover:bg-gray-200 active:bg-gray-300"
          style={noDragStyle}
          title={isMaximized ? '恢复窗口' : '最大化'}
          onClick={handleMaximize}
        >
          <Icon
            icon={isMaximized ? 'solar:minimize-linear' : 'solar:maximize-linear'}
            size={18}
            className="text-gray-500"
          />
        </button>
        <button
          className="w-12 h-8 flex items-center justify-center transition hover:bg-red-500 hover:text-white active:bg-red-600 group"
          style={noDragStyle}
          title="关闭"
          onClick={handleClose}
        >
          <Icon
            icon="fluent:dismiss-24-regular"
            size={18}
            className="text-gray-500 group-hover:text-gray-100"
          />
        </button>
      </div>
    </div>
  );
};

export default WindowsHeaderLayout;
