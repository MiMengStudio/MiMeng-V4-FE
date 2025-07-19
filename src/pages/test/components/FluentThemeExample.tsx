import {
  fluentBackgrounds,
  fluentTextColors,
  fluentBorderRadius,
  fluentComponents,
  createFluentClass,
  conditionalFluentClass,
} from '@/theme/fluent-classes';
import { useState } from 'react';

const FluentThemeExample = () => {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <div className={fluentBackgrounds.neutralBackground2 + ' min-h-screen p-8'}>
      <div className={fluentComponents.card + ' max-w-4xl mx-auto p-6 space-y-6'}>
        {/* 标题 */}
        <h1 className={fluentComponents.text.title1}>Fluent Design System 主题示例</h1>

        <p className={fluentComponents.text.body1}>
          这个组件展示了如何在 Tailwind CSS 中使用 Fluent Design System 的主题。
          主题会自动根据用户的偏好在亮色和暗色模式之间切换。
        </p>

        {/* 颜色示例 */}
        <section className="space-y-4">
          <h2 className={fluentComponents.text.title3}>背景颜色</h2>
          <div className="grid grid-cols-3 gap-4">
            <div
              className={createFluentClass(
                fluentBackgrounds.neutralBackground1,
                fluentTextColors.neutralForeground1,
                fluentBorderRadius.medium,
                'p-4 text-center',
              )}
            >
              中性背景 1
            </div>
            <div
              className={createFluentClass(
                fluentBackgrounds.neutralBackground3,
                fluentTextColors.neutralForeground1,
                fluentBorderRadius.medium,
                'p-4 text-center',
              )}
            >
              中性背景 3
            </div>
            <div
              className={createFluentClass(
                fluentBackgrounds.brandBackground,
                fluentTextColors.neutralForeground1,
                fluentBorderRadius.medium,
                'p-4 text-center',
              )}
            >
              品牌背景
            </div>
          </div>
        </section>

        {/* 按钮示例 */}
        <section className="space-y-4">
          <h2 className={fluentComponents.text.title3}>按钮样式</h2>
          <div className="flex gap-4 flex-wrap">
            <button
              className={createFluentClass(
                fluentComponents.button.primary,
                'px-6 py-3 transition-colors',
              )}
              onMouseDown={() => setIsPressed(true)}
              onMouseUp={() => setIsPressed(false)}
              onMouseLeave={() => setIsPressed(false)}
            >
              主要按钮
            </button>

            <button
              className={createFluentClass(
                fluentComponents.button.secondary,
                'px-6 py-3 transition-colors',
              )}
            >
              次要按钮
            </button>

            <button
              className={createFluentClass(
                fluentComponents.button.subtle,
                'px-6 py-3 transition-colors',
              )}
            >
              微妙按钮
            </button>
          </div>
        </section>

        {/* 文本样式 */}
        <section className="space-y-4">
          <h2 className={fluentComponents.text.title3}>文本样式</h2>
          <div className="space-y-2">
            <div className={fluentComponents.text.title1}>标题 1 - Hero 700</div>
            <div className={fluentComponents.text.title2}>标题 2 - Base 600</div>
            <div className={fluentComponents.text.title3}>标题 3 - Base 500</div>
            <div className={fluentComponents.text.subtitle1}>副标题 1 - Base 400</div>
            <div className={fluentComponents.text.subtitle2}>副标题 2 - Base 300</div>
            <div className={fluentComponents.text.body1}>正文 1 - Base 300</div>
            <div className={fluentComponents.text.body2}>正文 2 - Base 300 (次要)</div>
            <div className={fluentComponents.text.caption1}>说明文字 1 - Base 200</div>
            <div className={fluentComponents.text.caption2}>说明文字 2 - Base 100</div>
          </div>
        </section>

        {/* 输入框示例 */}
        <section className="space-y-4">
          <h2 className={fluentComponents.text.title3}>输入框</h2>
          <input
            type="text"
            placeholder="请输入内容..."
            className={createFluentClass(
              fluentComponents.input,
              'w-full px-4 py-2 outline-none transition-colors',
            )}
          />
        </section>

        {/* 圆角示例 */}
        <section className="space-y-4">
          <h2 className={fluentComponents.text.title3}>圆角样式</h2>
          <div className="flex gap-4 flex-wrap">
            <div
              className={createFluentClass(
                fluentBackgrounds.neutralBackground4,
                fluentTextColors.neutralForeground1,
                fluentBorderRadius.small,
                'p-4 text-center',
              )}
            >
              小圆角
            </div>
            <div
              className={createFluentClass(
                fluentBackgrounds.neutralBackground4,
                fluentTextColors.neutralForeground1,
                fluentBorderRadius.medium,
                'p-4 text-center',
              )}
            >
              中等圆角
            </div>
            <div
              className={createFluentClass(
                fluentBackgrounds.neutralBackground4,
                fluentTextColors.neutralForeground1,
                fluentBorderRadius.large,
                'p-4 text-center',
              )}
            >
              大圆角
            </div>
          </div>
        </section>

        {/* 状态示例 */}
        <section className="space-y-4">
          <h2 className={fluentComponents.text.title3}>状态颜色</h2>
          <div className="space-y-2">
            <div className={fluentTextColors.dangerForeground1}>❌ 错误状态文本</div>
            <div className={fluentTextColors.successForeground1}>✅ 成功状态文本</div>
            <div className={fluentTextColors.warningForeground1}>⚠️ 警告状态文本</div>
          </div>
        </section>

        {/* 条件样式示例 */}
        <section className="space-y-4">
          <h2 className={fluentComponents.text.title3}>条件样式</h2>
          <div
            className={createFluentClass(
              fluentBackgrounds.neutralBackground1,
              conditionalFluentClass(
                isPressed,
                fluentTextColors.brandForeground1,
                fluentTextColors.neutralForeground1,
              ),
              fluentBorderRadius.medium,
              'p-4 text-center cursor-pointer transition-colors',
            )}
            onClick={() => setIsPressed(!isPressed)}
          >
            点击切换状态 {isPressed ? '(已激活)' : '(未激活)'}
          </div>
        </section>
      </div>
    </div>
  );
};

export default FluentThemeExample;
