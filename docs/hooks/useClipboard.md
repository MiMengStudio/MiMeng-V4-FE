# useClipboard

`useClipboard` 是一个自定义 React Hook，用于跨平台（Web/Tauri）便捷地读写剪贴板内容。

## 用法

```tsx
import { useClipboard } from '@/hooks/useClipboard';

const Demo = () => {
  const { copiedText, copyToClipboard, readText, readClipboardText } = useClipboard();

  return (
    <div>
      <button onClick={() => copyToClipboard('Hello World!')}>复制文本</button>
      <button onClick={readClipboardText}>读取剪贴板</button>
      <div>已复制内容：{copiedText}</div>
      <div>读取内容：{readText}</div>
    </div>
  );
};
```

## API

- `copiedText: string`  
  最近一次复制到剪贴板的内容。
- `copyToClipboard(text: string): Promise<boolean>`  
  复制指定文本到剪贴板，成功返回 `true`。
- `readText: string`  
  最近一次读取到的剪贴板内容。
- `readClipboardText(): Promise<string>`  
  读取剪贴板文本内容。

## 兼容性

- 在 Tauri 环境下，优先使用 `@tauri-apps/plugin-clipboard-manager`。
- 在现代浏览器下，优先使用 `navigator.clipboard`。
- 对于老旧浏览器，自动降级为 `document.execCommand('copy')`。

## 注意事项

- 某些浏览器环境下，剪贴板 API 需要 HTTPS 或用户手势触发。
- Tauri 环境需安装 `@tauri-apps/plugin-clipboard-manager` 插件。

---

如需更多平台兼容性判断，可参考 [`usePlatform`](usePlatform.md)。
