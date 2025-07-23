import React from 'react';
import ButtonExample from '@/pages/test/components/ButtonExample';
import Button from '@/ui/Button/index';
import IconExample from './components/IconExample';
import FluentThemeExample from './components/FluentThemeExample';
import { useNavigate } from 'react-router';

export const TestPage: React.FC = () => {
  const navigate = useNavigate();
  const [tab, setTab] = React.useState<'button' | 'icon' | 'fluent'>('button');

  return (
    <div className="min-h-screen ">
      <div className="container mx-auto py-8">
        <div className="mb-6 flex gap-2">
          <Button
            onClick={() => setTab('button')}
            variant={tab === 'button' ? 'primary' : 'outline'}
          >
            按钮
          </Button>
          <Button onClick={() => setTab('icon')} variant={tab === 'icon' ? 'primary' : 'outline'}>
            Icon
          </Button>
          <Button
            onClick={() => setTab('fluent')}
            variant={tab === 'fluent' ? 'primary' : 'outline'}
          >
            Fluent 主题
          </Button>
          <Button onClick={() => navigate('/debug')} variant="outline">
            调试页面
          </Button>
        </div>
        {tab === 'button' && <ButtonExample />}
        {tab === 'icon' && <IconExample />}
        {tab === 'fluent' && <FluentThemeExample />}
      </div>
    </div>
  );
};

export default TestPage;
