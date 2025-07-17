# usePlatform Hook 使用文档

`usePlatform` 是一个用于获取当前运行平台和相关信息的 React Hook。

## 返回值

返回一个对象，包含以下字段：

```
{
  platform: string;      // 平台标识，如 'web'、'windows'、'macos' 等
  osType: string;        // 操作系统类型，如 'Windows'、'Mac'、'Linux'、'Android'、'iOS' 等
  isClient: boolean;     // 是否为 Tauri 客户端环境
  isWeb: boolean;        // 是否为 Web 浏览器环境
  isWebview: boolean;    // 是否为 MiMeng Webview 环境
  version: string;       // 客户端版本号，Web 环境下为 'unknown'
}
```

## 字段说明

- `platform`：平台标识。Web 环境下为 `web`，Tauri 客户端下为对应操作系统（如 `windows`、`macos` 等）。
- `osType`：操作系统类型。常见值有 `Windows`、`Mac`、`Linux`、`Android`、`iOS`、`HarmonyOS`，Web 环境下根据 UA 判断。
- `isClient`：是否为 Tauri 客户端（非 Web 环境）。
- `isWeb`：是否为 Web 浏览器环境。
- `isWebview`：是否为 MiMeng Webview 环境（通过 UA 判断）。
- `version`：客户端版本号，Web 环境下为 'unknown'。

## platform 可能的取值

- `web`：在浏览器环境下返回。
- 其余值均为 Tauri 客户端环境下返回，可能为：
  - `linux`
  - `macos`
  - `ios`
  - `freebsd`
  - `dragonfly`
  - `netbsd`
  - `openbsd`
  - `solaris`
  - `android`
  - `windows`

## 示例

```typescript
import { usePlatform } from 'src/hooks/usePlatform';

const { platform, osType, isClient, isWeb, isWebview, version } = usePlatform();
console.log('platform:', platform); // 可能输出 'web'、'windows'、'macos' 等
console.log('osType:', osType); // 可能输出 'Windows'、'Mac'、'Linux' 等
console.log('isClient:', isClient); // true 或 false
console.log('isWeb:', isWeb); // true 或 false
console.log('isWebview:', isWebview); // true 或 false
console.log('version:', version); // 客户端版本号或 'unknown'
```

## 说明

- 在 Tauri 客户端下，`platform` 会返回对应的操作系统名称。
- 在 Web 浏览器环境下，`platform` 始终为 `web`。
- 其他字段可用于区分不同运行环境和平台特性。
