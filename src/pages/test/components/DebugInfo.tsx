import React from 'react';

interface DebugInfoProps {
  platformInfo: unknown;
  clipboardManager: {
    copyToClipboard: (text: string) => void;
    readClipboardText: () => void;
    copiedText?: string;
    readText?: string;
  };
  systemTheme: string;
}

const DebugInfo: React.FC<DebugInfoProps> = ({ platformInfo, clipboardManager, systemTheme }) => {
  return (
    <section>
      <h2>调试信息</h2>
      <div>
        <span>platformInfo:</span>
        <pre>{JSON.stringify(platformInfo, null, 2)}</pre>
      </div>
      <div>
        <span>UA:</span> {typeof window !== 'undefined' ? window.navigator.userAgent : 'N/A'}
      </div>
      <div>
        <button onClick={() => clipboardManager.copyToClipboard('Hello MiMeng!')}>
          Copy to Clipboard
        </button>
        <button onClick={() => clipboardManager.readClipboardText()}>Read from Clipboard</button>
      </div>
      <div>
        <span>Copied Text:</span> {clipboardManager.copiedText || 'None'}
        <br />
        <span>Read Text:</span> {clipboardManager.readText || 'None'}
      </div>
      <div>
        <h2>System Theme: {systemTheme}</h2>
      </div>
    </section>
  );
};

export default DebugInfo;
