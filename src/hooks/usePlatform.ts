import { platform } from '@tauri-apps/plugin-os';

export const usePlatform = () => {
  let currentPlatform: string;

  try {
    currentPlatform = platform();
  } catch {
    currentPlatform = 'web';
  }

  return {
    platform: currentPlatform,
  };
};
