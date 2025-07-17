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
    // Fallback for older browsers
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

  // 读取剪贴板
  const readClipboardText = async (): Promise<string> => {
    if (isClient) {
      try {
        const clipboardManager = await getClipboardManager();
        const text = await clipboardManager.readText();
        setReadText(text);
        return text;
      } catch (err) {
        console.error('Tauri: Failed to read clipboard text: ', err);
        return '';
      }
    }
    if (navigator.clipboard) {
      try {
        const text = await navigator.clipboard.readText();
        setReadText(text);
        return text;
      } catch (err) {
        console.error('Failed to read clipboard text: ', err);
        return '';
      }
    }
    // Fallback for older浏览器
    const textArea = document.createElement('textarea');
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    const text = textArea.value;
    document.body.removeChild(textArea);
    setReadText(text);
    return text;
  };

  return { copiedText, copyToClipboard, readText, readClipboardText };
};
