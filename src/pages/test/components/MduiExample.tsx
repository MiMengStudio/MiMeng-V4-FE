import React from 'react';
import { MduiAdapter } from '@/theme/adapter';
import './mdui-example.css';

// 示例：使用 MDUI 组件构建的示例页面
const MduiExample: React.FC = () => {
  return (
    <MduiAdapter>
      <div className="mdui-example-container">
        <h1>MDUI Adapter 示例</h1>

        {/* MDUI 按钮示例 */}
        <div className="example-section">
          <h2>按钮组件</h2>
          <mdui-button variant="filled">填充按钮</mdui-button>
          <mdui-button variant="outlined">轮廓按钮</mdui-button>
          <mdui-button variant="text">文本按钮</mdui-button>
          <mdui-button variant="elevated">悬浮按钮</mdui-button>
          <mdui-button variant="tonal">色调按钮</mdui-button>
        </div>

        {/* MDUI 卡片示例 */}
        <div className="example-section">
          <h2>卡片组件</h2>
          <mdui-card variant="elevated" style={{ width: '300px', padding: '16px' }}>
            <h3>示例卡片</h3>
            <p>这是一个使用 MDUI 卡片组件的示例。主题会根据当前的配色方案自动调整。</p>
            <div style={{ marginTop: '16px' }}>
              <mdui-button variant="text">操作</mdui-button>
              <mdui-button variant="text">了解更多</mdui-button>
            </div>
          </mdui-card>
        </div>

        {/* MDUI 表单示例 */}
        <div className="example-section">
          <h2>表单组件</h2>
          <div className="form-group">
            <mdui-text-field
              label="用户名"
              helper="请输入您的用户名"
              style={{ width: '100%', marginBottom: '16px' }}
            />
            <mdui-text-field
              label="密码"
              type="password"
              style={{ width: '100%', marginBottom: '16px' }}
            />
            <mdui-checkbox>记住我</mdui-checkbox>
          </div>
        </div>

        {/* MDUI 开关示例 */}
        <div className="example-section">
          <h2>开关组件</h2>
          <div className="switch-group">
            <label>
              <mdui-switch />
              <span style={{ marginLeft: '8px' }}>启用通知</span>
            </label>
            <label>
              <mdui-switch checked />
              <span style={{ marginLeft: '8px' }}>自动保存</span>
            </label>
          </div>
        </div>

        {/* MDUI 进度条示例 */}
        <div className="example-section">
          <h2>进度条组件</h2>
          <mdui-linear-progress value={0.7} style={{ width: '100%', marginBottom: '16px' }} />
          <mdui-circular-progress value={0.6} />
        </div>

        {/* 主题说明 */}
        <div className="example-section">
          <h2>主题说明</h2>
          <mdui-card variant="outlined" style={{ padding: '16px' }}>
            <p>此示例页面使用了 MDUI Adapter，所有组件的主题会自动跟随应用的全局主题设置：</p>
            <ul>
              <li>支持亮色/暗色模式自动切换</li>
              <li>支持多种配色方案（默认、绿色、蓝色等）</li>
              <li>所有 MDUI 组件都会应用统一的主题样式</li>
              <li>主题变化时无需手动更新组件</li>
            </ul>
          </mdui-card>
        </div>
      </div>
    </MduiAdapter>
  );
};

export default MduiExample;
