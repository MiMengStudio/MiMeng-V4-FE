import React, { useState } from 'react';
import { Icon, isLocalIcon, getAvailableLocalIcons } from '@/ui';
import { Logo } from '@/components';

/**
 * 新的 Icon 组件使用示例 - 统一的 icon 属性用法
 */
export const IconExample: React.FC = () => {
  const [selectedIcon, setSelectedIcon] = useState('solar:user-bold-duotone');
  const availableLocalIcons = getAvailableLocalIcons();

  const handleIconClick = (iconName: string) => {
    console.log(`Clicked icon: ${iconName}`);
  };

  return (
    <div className="p-6 space-y-8">
      <h2 className="text-2xl font-bold mb-4">Icon 组件示例</h2>

      {/* 本地图标展示 */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold text-green-600">🚀 本地预定义图标</h3>
          <span className="text-sm text-gray-500">（自动使用本地打包版本）</span>
        </div>

        <div className="space-y-3">
          <h4 className="font-medium">基本使用 - 统一的 icon 属性</h4>
          <div className="flex flex-wrap gap-4">
            {availableLocalIcons.slice(0, 8).map((iconName: string) => (
              <div key={iconName} className="flex flex-col items-center space-y-1">
                <Icon icon={iconName} size={32} className="text-blue-600" />
                <span className="text-xs text-gray-500 text-center max-w-20 truncate">
                  {iconName.split(':')[1]}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="font-medium">不同大小</h4>
          <div className="flex items-center space-x-4">
            <Icon icon="solar:star-bold-duotone" size={16} />
            <Icon icon="solar:star-bold-duotone" size={24} />
            <Icon icon="solar:star-bold-duotone" size={32} />
            <Icon icon="solar:star-bold-duotone" size={48} />
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="font-medium">不同颜色</h4>
          <div className="flex items-center space-x-4">
            <Icon icon="solar:heart-bold-duotone" color="#ff6b6b" size={32} />
            <Icon icon="solar:heart-bold-duotone" color="#4ecdc4" size={32} />
            <Icon icon="solar:heart-bold-duotone" color="#45b7d1" size={32} />
            <Icon icon="solar:heart-bold-duotone" color="#96ceb4" size={32} />
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="font-medium">可点击图标</h4>
          <div className="flex items-center space-x-4">
            <Icon
              icon="solar:like-bold-duotone"
              size={32}
              className="cursor-pointer hover:scale-110 transition-transform text-red-500"
              onClick={() => handleIconClick('like')}
            />
            <Icon
              icon="solar:bookmark-bold-duotone"
              size={32}
              className="cursor-pointer hover:scale-110 transition-transform text-blue-500"
              onClick={() => handleIconClick('bookmark')}
            />
            <Icon
              icon="solar:share-bold-duotone"
              size={32}
              className="cursor-pointer hover:scale-110 transition-transform text-green-500"
              onClick={() => handleIconClick('share')}
            />
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="font-medium">变换效果</h4>
          <div className="flex items-center space-x-4">
            <Icon icon="solar:settings-bold-duotone" size={32} rotate={45} />
            <Icon icon="solar:settings-bold-duotone" size={32} hFlip />
            <Icon icon="solar:settings-bold-duotone" size={32} vFlip />
            <Icon
              icon="solar:settings-bold-duotone"
              size={32}
              rotate={90}
              hFlip
              className="text-purple-500"
            />
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="font-medium">Component 属性用法（自定义组件）</h4>
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <Icon component={Logo} size={32} className="text-blue-500" />
              <p className="text-xs text-gray-600 mt-1">Logo 组件</p>
            </div>
            <div className="text-center">
              <Icon component={Logo} size={24} className="text-red-500" />
              <p className="text-xs text-gray-600 mt-1">不同大小</p>
            </div>
            <div className="text-center">
              <Icon component={Logo} size={28} rotate={45} className="text-green-500" />
              <p className="text-xs text-gray-600 mt-1">带旋转</p>
            </div>
          </div>
          <p className="text-sm text-gray-600">
            💡 使用 component 属性可以传入自定义组件，如 Logo、本地 SVG 组件等
          </p>
        </div>
      </section>

      {/* 运行时图标展示 */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold text-orange-600">⚡ 运行时图标</h3>
          <span className="text-sm text-gray-500">（未在预定义列表中的图标）</span>
        </div>

        <div className="space-y-3">
          <h4 className="font-medium">未预定义的图标（自动使用运行时加载）</h4>
          <div className="flex items-center space-x-4">
            <Icon icon="solar:calendar-bold-duotone" size={32} />
            <Icon icon="solar:folder-bold-duotone" size={32} />
            <Icon icon="solar:camera-bold-duotone" size={32} />
            <Icon icon="solar:phone-bold-duotone" size={32} />
            <Icon icon="mdi:account-circle" size={32} />
            <Icon icon="heroicons:user-circle-20-solid" size={32} />
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="font-medium">强制使用运行时图标</h4>
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <Icon icon="solar:user-bold-duotone" size={32} />
              <p className="text-xs text-green-600 mt-1">本地版本</p>
            </div>
            <div className="text-center">
              <Icon icon="solar:user-bold-duotone" size={32} forceRuntime />
              <p className="text-xs text-orange-600 mt-1">运行时版本</p>
            </div>
          </div>
        </div>
      </section>

      {/* 图标检测工具 */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-purple-600">🔍 图标检测工具</h3>

        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <label htmlFor="icon-input" className="font-medium">
              输入图标名称：
            </label>
            <input
              id="icon-input"
              type="text"
              value={selectedIcon}
              onChange={(e) => setSelectedIcon(e.target.value)}
              className="px-3 py-1 border rounded"
              placeholder="例如：solar:user-bold-duotone"
            />
          </div>

          <div className="flex items-center space-x-4">
            <Icon icon={selectedIcon} size={32} />
            <div className="text-sm">
              <p>
                <strong>图标类型：</strong>
                <span className={isLocalIcon(selectedIcon) ? 'text-green-600' : 'text-orange-600'}>
                  {isLocalIcon(selectedIcon) ? '本地打包图标 🚀' : '运行时图标 ⚡'}
                </span>
              </p>
              <p>
                <strong>图标名称：</strong>
                {selectedIcon}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 使用说明 */}
      <section className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-3">📖 使用说明</h3>

        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-green-600 mb-2">✅ 推荐用法（统一的 icon 属性）</h4>
            <div className="bg-green-50 p-3 rounded border-l-4 border-green-500">
              <code className="text-sm">{'<Icon icon="solar:user-bold-duotone" size={24} />'}</code>
              <p className="text-xs text-green-700 mt-1">
                组件会自动判断是否使用本地图标或运行时图标
              </p>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-blue-600 mb-2">🔧 Component 属性用法（自定义组件）</h4>
            <div className="bg-blue-50 p-3 rounded border-l-4 border-blue-500">
              <div className="space-y-2">
                <code className="text-sm block">{'<Icon component={Logo} size={24} />'}</code>
                <code className="text-sm block">
                  {'<Icon component={CustomSvgComponent} size={24} />'}
                </code>
              </div>
              <p className="text-xs text-blue-700 mt-1">
                适用于自定义组件、Logo 或需要传入组件引用的场景
              </p>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-blue-600 mb-2">🔧 如何添加新的本地图标</h4>
            <div className="bg-blue-50 p-3 rounded border-l-4 border-blue-500">
              <ol className="text-sm text-blue-700 space-y-1">
                <li>
                  1. 在 <code>src/ui/Icon/icon-map.ts</code> 中导入图标
                </li>
                <li>
                  2. 在 <code>localIconMap</code> 对象中添加映射
                </li>
                <li>3. 重新构建项目</li>
              </ol>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-orange-600 mb-2">⚡ 运行时图标优势</h4>
            <div className="bg-orange-50 p-3 rounded border-l-4 border-orange-500">
              <ul className="text-sm text-orange-700 space-y-1">
                <li>• 无需预先定义，支持所有 Iconify 图标</li>
                <li>• 适合动态图标名称或条件渲染</li>
                <li>
                  • 可以使用 <code>forceRuntime</code> 强制使用
                </li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-green-600 mb-2">🚀 本地图标</h4>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• 编译时打包，体积更小</li>
                <li>• 运行时性能更好</li>
                <li>• 支持 Tree Shaking</li>
                <li>• 当前支持 {availableLocalIcons.length} 个图标</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-orange-600 mb-2">⚡ 运行时图标</h4>
              <ul className="text-sm text-orange-700 space-y-1">
                <li>• 支持所有 Iconify 图标集</li>
                <li>• 更灵活的使用方式</li>
                <li>• 无需预先配置</li>
                <li>• 按需网络加载</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default IconExample;
