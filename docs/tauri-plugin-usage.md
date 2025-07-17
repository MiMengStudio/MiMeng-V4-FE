# Tauri 插件使用规范与最佳实践

本文档总结了在 MiMeng-V4-fe 项目中如何正确使用 Tauri 插件，确保代码在 Web 和 Tauri 环境下都能正常运行。

## 核心原则

经过实际测试和优化，我们确定了 Tauri 插件的最佳使用方式：

1. **动态导入 + 懒加载**：使用 `import()` 进行按需加载
2. **平台判断**：依赖 `usePlatform` Hook 进行环境检测
3. **优雅降级**：Tauri 环境使用原生插件，Web 环境使用浏览器 API
4. **保持简洁**：信任浏览器的模块缓存机制，避免过度优化

## 标准实现模式

### 基础结构

```typescript
import { useState } from 'react';
import { usePlatform } from './usePlatform';

// 懒加载获取 Tauri 插件
const getTauriPlugin = async () => {
  return await import('@tauri-apps/plugin-name');
};

export const useCustomHook = () => {
  const { isClient } = usePlatform();

  const performAction = async () => {
    if (isClient) {
      try {
        const plugin = await getTauriPlugin();
        return await plugin.someMethod();
      } catch (err) {
        console.error('Tauri plugin failed:', err);
        // 降级到 Web API
      }
    }

    // Web 环境处理
    // ...
  };

  return { performAction };
};
```

### 实际示例：剪贴板操作

```typescript
import { useState } from 'react';
import { usePlatform } from './usePlatform';

// 懒加载获取剪贴板管理器
const getClipboardManager = async () => {
  return await import('@tauri-apps/plugin-clipboard-manager');
};

export const useClipboard = () => {
  const [copiedText, setCopiedText] = useState<string>('');
  const [readText, setReadText] = useState<string>('');
  const { isClient } = usePlatform();

  // 复制到剪贴板
  const copyToClipboard = async (text: string): Promise<boolean> => {
    if (isClient) {
      try {
        const clipboardManager = await getClipboardManager();
        await clipboardManager.writeText(text);
        setCopiedText(text);
        return true;
      } catch (err) {
        console.error('Tauri: Failed to copy text: ', err);
      }
    }

    // Web 环境降级
    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(text);
        setCopiedText(text);
        return true;
      } catch (err) {
        console.error('Failed to copy text: ', err);
        return false;
      }
    }

    // 兼容旧浏览器
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopiedText(text);
      return true;
    } catch (err) {
      console.error('Fallback: Failed to copy text: ', err);
      document.body.removeChild(textArea);
      return false;
    }
  };

  return { copiedText, copyToClipboard, readText, readClipboardText };
};
```

## 关键特性说明

### 1. 懒加载的优势

- **按需加载**：只有在实际调用时才加载 Tauri 插件
- **代码分割**：Vite 会自动将插件打包成单独的 chunk
- **Web 兼容**：Web 环境不会尝试加载不存在的模块
- **自动缓存**：浏览器会自动缓存已加载的模块

### 2. 平台判断策略

```typescript
const { isClient } = usePlatform();

if (isClient) {
  // Tauri 环境：使用原生插件
  const plugin = await getTauriPlugin();
  return await plugin.method();
}

// Web 环境：使用浏览器 API 或降级方案
```

### 3. 错误处理模式

```typescript
if (isClient) {
  try {
    const plugin = await getTauriPlugin();
    return await plugin.method();
  } catch (err) {
    console.error('Tauri plugin failed:', err);
    // 继续执行 Web 降级逻辑
  }
}

// Web 环境处理
```

## 常用插件实现

### 文件系统操作

```typescript
const getFileSystem = async () => {
  return await import('@tauri-apps/plugin-fs');
};

export const useFileSystem = () => {
  const { isClient } = usePlatform();

  const readFile = async (path: string) => {
    if (isClient) {
      try {
        const fs = await getFileSystem();
        return await fs.readTextFile(path);
      } catch (err) {
        console.error('Tauri fs failed:', err);
      }
    }

    // Web 环境：使用 File System Access API
    if ('showOpenFilePicker' in window) {
      const [fileHandle] = await window.showOpenFilePicker();
      const file = await fileHandle.getFile();
      return await file.text();
    }

    throw new Error('File system access not available');
  };

  return { readFile };
};
```

### 系统通知

```typescript
const getNotification = async () => {
  return await import('@tauri-apps/plugin-notification');
};

export const useNotification = () => {
  const { isClient } = usePlatform();

  const showNotification = async (title: string, body: string) => {
    if (isClient) {
      try {
        const notification = await getNotification();
        await notification.sendNotification({ title, body });
        return;
      } catch (err) {
        console.warn('Tauri notification failed:', err);
      }
    }

    // Web 环境降级
    if ('Notification' in window) {
      if (Notification.permission === 'granted') {
        new Notification(title, { body });
      } else if (Notification.permission !== 'denied') {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
          new Notification(title, { body });
        }
      }
    }
  };

  return { showNotification };
};
```

## 权限配置

在 `src-tauri/capabilities/default.json` 中添加必要权限：

```json
{
  "permissions": [
    "core:default",
    "clipboard-manager:default",
    "clipboard-manager:allow-read-text",
    "clipboard-manager:allow-write-text",
    "fs:default",
    "fs:allow-read-file",
    "fs:allow-write-file",
    "notification:default",
    "notification:allow-notification"
  ]
}
```

### 常用插件权限映射

| 插件              | 基础权限                    | 具体权限                                                  |
| ----------------- | --------------------------- | --------------------------------------------------------- |
| clipboard-manager | `clipboard-manager:default` | `allow-read-text`, `allow-write-text`                     |
| fs                | `fs:default`                | `allow-read-file`, `allow-write-file`, `allow-create-dir` |
| notification      | `notification:default`      | `allow-notification`                                      |
| shell             | `shell:default`             | `allow-execute`, `allow-open`                             |

## 最佳实践总结

### ✅ 推荐做法

1. **使用懒加载**：`const plugin = await import('@tauri-apps/plugin-name')`
2. **依赖 usePlatform**：使用 `isClient` 判断环境
3. **提供降级方案**：Web 环境使用浏览器 API
4. **适当的错误处理**：Tauri 失败后继续 Web 逻辑
5. **保持代码简洁**：避免过度抽象和优化

### ❌ 避免的做法

1. **静态导入**：`import * as plugin from '@tauri-apps/plugin-name'`
2. **过度抽象**：复杂的通用加载器
3. **手动缓存**：浏览器已经处理了模块缓存
4. **忽略降级**：没有 Web 环境的替代方案

## 开发流程

1. **添加依赖**：`pnpm add @tauri-apps/plugin-name`
2. **配置权限**：在 `capabilities/default.json` 中添加权限
3. **实现 Hook**：按照标准模式实现功能
4. **测试环境**：分别在 Web 和 Tauri 环境下测试
5. **重启应用**：权限更改后需要重新构建

## 注意事项

- **权限修改**：修改权限配置后必须重新启动 Tauri 应用
- **平台差异**：不同平台对插件的支持程度可能不同
- **错误边界**：始终为 Tauri 调用添加错误处理
- **类型安全**：充分利用 TypeScript 的类型检查

通过遵循这些规范，可以确保项目在各种环境下都能提供稳定、可靠的用户体验。
