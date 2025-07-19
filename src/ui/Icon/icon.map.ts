import React from 'react';

// 导入预定义的本地图标
import IconSolarArrowDownBoldDuotone from '~icons/solar/arrow-down-bold-duotone';
import IconSolarArrowLeftBoldDuotone from '~icons/solar/arrow-left-bold-duotone';
import IconSolarArrowRightBoldDuotone from '~icons/solar/arrow-right-bold-duotone';
import IconSolarArrowUpBoldDuotone from '~icons/solar/arrow-up-bold-duotone';
import IconSolarBellBoldDuotone from '~icons/solar/bell-bold-duotone';
import IconSolarBookmarkBoldDuotone from '~icons/solar/bookmark-bold-duotone';
import IconSolarDownloadBoldDuotone from '~icons/solar/download-bold-duotone';
import IconSolarEyeBoldDuotone from '~icons/solar/eye-bold-duotone';
import IconSolarEyeClosedBoldDuotone from '~icons/solar/eye-closed-bold-duotone';
import IconSolarHeartBoldDuotone from '~icons/solar/heart-bold-duotone';
import IconSolarHomeBoldDuotone from '~icons/solar/home-bold-duotone';
import IconSolarLikeBoldDuotone from '~icons/solar/like-bold-duotone';
import IconSolarSettingsBoldDuotone from '~icons/solar/settings-bold-duotone';
import IconSolarShareBoldDuotone from '~icons/solar/share-bold-duotone';
import IconSolarStarBoldDuotone from '~icons/solar/star-bold-duotone';
import IconSolarUploadBoldDuotone from '~icons/solar/upload-bold-duotone';
import IconSolarUserBoldDuotone from '~icons/solar/user-bold-duotone';
import IconSolarInfoSquareBoldDuotone from '~icons/solar/info-square-bold-duotone';
import IconSolarCommandLineDuotone from '~icons/solar/command-line-duotone';
import IconSolarRefreshLinear from '~icons/solar/refresh-linear';
import IconSolarMinimizeLinear from '~icons/solar/minimize-linear';
import IconSolarMaximizeLinear from '~icons/solar/maximize-linear';
import IconFluentDismiss24Regular from '~icons/fluent/dismiss-24-regular';
import IconFluentSubtract24Regular from '~icons/fluent/subtract-24-regular';
// 图标映射表 - 只有在这里定义的图标才会使用本地打包版本
export const localIconMap: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  // Solar 图标集
  'solar:user-bold-duotone': IconSolarUserBoldDuotone,
  'solar:home-bold-duotone': IconSolarHomeBoldDuotone,
  'solar:settings-bold-duotone': IconSolarSettingsBoldDuotone,
  'solar:heart-bold-duotone': IconSolarHeartBoldDuotone,
  'solar:star-bold-duotone': IconSolarStarBoldDuotone,
  'solar:like-bold-duotone': IconSolarLikeBoldDuotone,
  'solar:bookmark-bold-duotone': IconSolarBookmarkBoldDuotone,
  'solar:share-bold-duotone': IconSolarShareBoldDuotone,
  'solar:bell-bold-duotone': IconSolarBellBoldDuotone,
  'solar:arrow-left-bold-duotone': IconSolarArrowLeftBoldDuotone,
  'solar:arrow-right-bold-duotone': IconSolarArrowRightBoldDuotone,
  'solar:arrow-up-bold-duotone': IconSolarArrowUpBoldDuotone,
  'solar:arrow-down-bold-duotone': IconSolarArrowDownBoldDuotone,
  'solar:eye-bold-duotone': IconSolarEyeBoldDuotone,
  'solar:eye-closed-bold-duotone': IconSolarEyeClosedBoldDuotone,
  'solar:download-bold-duotone': IconSolarDownloadBoldDuotone,
  'solar:upload-bold-duotone': IconSolarUploadBoldDuotone,
  'solar:info-square-bold-duotone': IconSolarInfoSquareBoldDuotone,
  'solar:command-line-duotone': IconSolarCommandLineDuotone,
  'solar:refresh-linear': IconSolarRefreshLinear,
  'solar:minimize-linear': IconSolarMinimizeLinear,
  'solar:maximize-linear': IconSolarMaximizeLinear,
  'fluent:dismiss-24-regular': IconFluentDismiss24Regular,
  'fluent:subtract-24-regular': IconFluentSubtract24Regular,
};

/**
 * 检查图标是否在本地映射表中
 */
export function isLocalIcon(iconName: string): boolean {
  return iconName in localIconMap;
}

/**
 * 获取本地图标组件
 */
export function getLocalIcon(
  iconName: string,
): React.ComponentType<React.SVGProps<SVGSVGElement>> | null {
  return localIconMap[iconName] || null;
}

/**
 * 获取所有可用的本地图标名称列表
 */
export function getAvailableLocalIcons(): string[] {
  return Object.keys(localIconMap);
}
