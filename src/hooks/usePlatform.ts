import { platform, type } from '@tauri-apps/plugin-os';
import { getVersion } from '@tauri-apps/api/app';
import { cache } from 'react';
import { useSettings } from '@/store/settingStore';

// 缓存平台信息，确保只获取一次
let cachedPlatform: string = 'web';
try {
  cachedPlatform = platform();
} catch {
  cachedPlatform = 'web';
}

const isClient = cachedPlatform != 'web';

const isWeb = cachedPlatform === 'web';

const isWebview = /MiMeng/i.test(navigator.userAgent);

const cachedVersion = await getVersion().catch(() => 'unknown');

let cachedOsType: string = 'unknown';
try {
  cachedOsType = type();
} catch {
  if (typeof window !== 'undefined' && window.navigator) {
    const userAgent = window.navigator.userAgent;
    if (/Windows/i.test(userAgent)) {
      cachedOsType = 'windows';
    } else if (/Macintosh|Mac OS X/i.test(userAgent)) {
      cachedOsType = 'mac';
    } else if (/Linux/i.test(userAgent)) {
      // 检查是否为 Android 或 HarmonyOS
      if (/Android/i.test(userAgent)) {
        cachedOsType = 'android';
      } else if (/HarmonyOS/i.test(userAgent)) {
        cachedOsType = 'harmonyos';
      } else {
        cachedOsType = 'linux';
      }
    } else if (/iPhone|iPad|iPod/i.test(userAgent)) {
      cachedOsType = 'ios';
    } else {
      cachedOsType = 'unknown';
    }
  } else {
    cachedOsType = 'unknown';
  }
}

const originalIsDesktop =
  cachedOsType === 'windows' || cachedOsType === 'mac' || cachedOsType === 'linux';

const isMobile =
  cachedOsType === 'android' || cachedOsType === 'ios' || cachedOsType === 'harmonyos';

export const usePlatform = () => {
  const { platformOverride } = useSettings();

  // 如果有平台覆盖设置，使用覆盖值
  const effectiveIsMobile =
    platformOverride === 'mobile' ? true : platformOverride === 'desktop' ? false : isMobile;
  const effectiveIsDesktop = !effectiveIsMobile;

  return {
    platform: cachedPlatform,
    osType: cachedOsType,
    isClient,
    isWeb,
    isWebview,
    isDesktop: effectiveIsDesktop,
    isMobile: effectiveIsMobile,
    version: cachedVersion,
    platformOverride, // 返回当前的平台覆盖设置
    // 添加原始检测结果用于调试
    originalIsDesktop,
    originalIsMobile: isMobile,
  };
};
