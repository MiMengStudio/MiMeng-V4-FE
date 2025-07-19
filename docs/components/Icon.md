# Icon 组件功能说明

Icon 组件用于统一管理和显示图标，支持本地预定义图标和运行时加载图标，具备高性能和灵活性。

## 主要功能

- 统一语法：支持 `<Icon icon="prefix:icon-name" />` 和 `<Icon component={Component} />` 两种使用方式。
- 自动优化：自动选择本地图标或运行时图标，无需手动区分。
- 性能优先：常用图标采用本地打包，极快渲染；未预定义图标自动运行时加载。
- 灵活扩展：支持自定义大小、颜色、旋转、翻转、禁用、样式等属性。
- 组件支持：支持传入自定义组件，如 Logo、SVG 组件等。
- 图标类型检测：可通过 `isLocalIcon` 判断图标类型，`getAvailableLocalIcons` 获取所有本地图标。
- 新图标添加：通过在 `icon.map.ts` 中注册即可扩展本地图标。

## 用法示例

```tsx
import { Icon } from '@/ui';
import { Logo } from '@/components';

// 基本用法（推荐）
<Icon icon="solar:user-bold-duotone" size={24} />
<Icon icon="solar:heart-bold-duotone" color="#ff6b6b" />

// 本地图标（推荐，性能最佳）
<Icon icon="solar:home-bold-duotone" />

// 运行时图标（自动加载）
<Icon icon="mdi:account-circle" />

// Component 属性用法（自定义组件）
<Icon component={Logo} size={24} className="text-blue-500" />

// 使用自定义 SVG 组件
import CustomIcon from '~icons/solar/custom-icon'
<Icon component={CustomIcon} size={32} />

// 高级用法
<Icon icon="solar:settings-bold-duotone" rotate={45} />
<Icon icon="solar:arrow-left-bold-duotone" hFlip />
<Icon icon="solar:arrow-up-bold-duotone" vFlip />
<Icon icon="solar:heart-bold-duotone" disabled />
<Icon icon="solar:like-bold-duotone" size={32} className="cursor-pointer hover:scale-110 transition-transform text-red-500" />

// 检查图标类型
import { isLocalIcon, getAvailableLocalIcons } from '@/ui';
const isLocal = isLocalIcon('solar:user-bold-duotone');
const localIcons = getAvailableLocalIcons();
```

## 性能建议

## 性能对比

| 图标类型   | 包体积  | 运行时性能  | 灵活性      | Tree Shaking |
| ---------- | ------- | ----------- | ----------- | ------------ |
| 本地图标   | ✅ 小   | ✅ 快       | ⚠️ 需预定义 | ✅ 支持      |
| 运行时图标 | ⚠️ 按需 | ⚠️ 网络请求 | ✅ 完全灵活 | ❌ 不适用    |

## Component 属性详解

Component 属性为 Icon 组件提供了自定义组件支持能力：

### 适用场景

- **Logo 组件**：`<Icon component={Logo} size={24} />`
- **自定义 SVG 组件**：使用 unplugin-icons 导入的组件
- **复用现有组件**：直接使用已有的图标组件
- **特殊组件需求**：需要传入组件引用而非字符串的场景

### 使用方式

```tsx
// Logo 组件示例
import { Logo } from '@/components';
<Icon component={Logo} size={32} className="text-blue-500" />

// 自定义 SVG 组件示例
import IconCustom from '~icons/solar/custom-icon'
<Icon component={IconCustom} size={24} rotate={45} />

// 与其他属性组合使用
<Icon
  component={Logo}
  size={28}
  rotate={45}
  className="text-green-500 hover:scale-110 transition-transform"
  onClick={() => console.log('Logo clicked')}
/>
```

### 注意事项

- Component 属性优先级高于 icon 属性
- 传入的组件需要接受 SVG 相关的 props
- 支持所有 Icon 组件的通用属性（size、color、rotate 等）

## 性能建议

- 常用图标建议添加到本地映射表，提升渲染速度。
- 临时或不常用图标可直接运行时加载。
- 保持图标集命名规范，建议统一视觉风格。

## 相关资源

- [Iconify 图标库](https://iconify.design/)
- [unplugin-icons 文档](https://github.com/antfu/unplugin-icons)
- [Solar 图标集](https://iconify.design/icon-sets/solar/)
