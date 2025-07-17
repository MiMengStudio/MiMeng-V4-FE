# usePlatform Hook 使用文档

`usePlatform` 是一个用于获取当前运行平台的 React Hook。

## 返回值

返回一个对象：

```
{
  platform: string;
}
```

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

const { platform } = usePlatform();
console.log(platform); // 可能输出 'web'、'windows'、'macos' 等
```

## 说明

- 在 Tauri 客户端下，`platform` 会返回对应的操作系统名称。
- 在 Web 浏览器环境下，`platform` 始终为 `web`。
