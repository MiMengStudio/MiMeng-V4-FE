import React from 'react';
import Button from '../ui/Button';

// 使用示例
const ButtonExample: React.FC = () => {
  return (
    <div style={{ padding: '20px', display: 'flex', gap: '10px', flexDirection: 'column' }}>
      <h2>Button 组件示例</h2>

      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <Button variant="primary" size="small" onClick={() => alert('Primary Small')}>
          Primary Small
        </Button>

        <Button variant="secondary" size="medium" onClick={() => alert('Secondary Medium')}>
          Secondary Medium
        </Button>

        <Button variant="outline" size="large" onClick={() => alert('Outline Large')}>
          Outline Large
        </Button>
      </div>

      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <Button variant="ghost" onClick={() => alert('Ghost')}>
          Ghost Button
        </Button>

        <Button variant="danger" onClick={() => alert('Danger')}>
          Danger Button
        </Button>

        <Button disabled onClick={() => alert('This should not fire')}>
          Disabled Button
        </Button>
      </div>

      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <Button loading onClick={() => alert('Loading')}>
          Loading Button
        </Button>

        <Button type="submit" variant="primary">
          Submit Button
        </Button>
      </div>
    </div>
  );
};

export default ButtonExample;
