import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import Icon from '@/ui/Icon';
import { NavItemComponentProps } from './nav.types';
import { getAnimationDirection } from './nav.utils';

interface NavItemComponentExtraProps {
  isSwitching: boolean;
  setIsSwitching: (v: boolean) => void;
}

const NavItemComponent: React.FC<NavItemComponentProps & NavItemComponentExtraProps> = ({
  item,
  isActive,
  isCollapsed,
  onClick,
  previousActiveId,
  currentActiveId,
  itemIndex,
  previousActiveIndex,
  items,
  isSwitching,
  setIsSwitching,
}) => {
  // 控制指示条是否显示（用于动画期间保持显示）
  const [shouldShowIndicator, setShouldShowIndicator] = useState(isActive);
  const [activeColorDelay, setActiveColorDelay] = useState(isActive);
  const controls = useAnimation();
  const animationRunning = useRef(false);

  // 判断当前项的动画情况
  const getAnimationCase = () => {
    // 如果动画正在执行，保持当前状态，不重新计算
    if (animationRunning.current) {
      console.log('动画执行中，保持当前状态');
      return null; // 返回null，useEffect将跳过处理
    }

    const direction = getAnimationDirection(previousActiveIndex, itemIndex);

    // 如果是当前激活的项
    if (isActive) {
      if (direction === 'down') {
        return 'enter-from-up'; // 向下切换进入（从上方进入）
      } else if (direction === 'up') {
        return 'enter-from-down'; // 向上切换进入（从下方进入）
      } else {
        return 'normal-active'; // 正常激活状态（无动画）
      }
    }

    // 如果是之前激活的项（需要退出）
    if (item.id === previousActiveId && previousActiveId !== currentActiveId) {
      const exitDirection = getAnimationDirection(
        itemIndex,
        items?.findIndex((navItem) => navItem.id === currentActiveId) ?? null,
      );

      if (exitDirection === 'down') {
        return 'exit-to-down'; // 向下切换退出（退出到下方）
      } else if (exitDirection === 'up') {
        return 'exit-to-up'; // 向上切换退出（退出到上方）
      }
    }

    return 'inactive'; // 非激活状态
  };

  const animationCase = getAnimationCase();

  // 计算初始状态
  const getInitialState = () => {
    switch (animationCase) {
      case 'enter-from-up':
        return { height: '0%', top: '0%', bottom: 'auto' };
      case 'enter-from-down':
        return { height: '0%', bottom: '0%', top: 'auto' };
      case 'exit-to-down':
      case 'exit-to-up':
        return { height: '50%', top: '25%', bottom: 'auto' };
      default:
        return { height: '50%', top: '25%', bottom: 'auto' };
    }
  };

  const initialState = getInitialState();

  // 控制指示条显示状态
  useEffect(() => {
    console.log('=== useEffect 触发 ===', {
      animationCase,
      itemId: item.id,
      animationRunning: animationRunning.current,
      isActive,
      previousActiveId,
      currentActiveId,
    });

    // 如果动画正在执行，跳过所有处理
    if (animationRunning.current) {
      console.log('动画执行中，跳过useEffect处理');
      return;
    }

    // 如果getAnimationCase返回null（动画锁定状态），也跳过处理
    if (animationCase === null) {
      console.log('动画状态锁定，跳过处理');
      return;
    }

    if (animationCase === 'inactive') {
      setShouldShowIndicator(false);
      animationRunning.current = false; // 确保重置动画状态
    } else {
      setShouldShowIndicator(true);

      // 根据不同的动画情况执行对应的动画
      switch (animationCase) {
        case 'enter-from-up':
          console.log('执行向下切换进入动画');
          executeEnterDownAnimation();
          break;

        case 'enter-from-down':
          console.log('执行向上切换进入动画');
          executeEnterUpAnimation();
          break;

        case 'exit-to-down':
          executeExitDownAnimation();
          break;

        case 'exit-to-up':
          executeExitUpAnimation();
          break;

        case 'normal-active':
          console.log('正常激活状态');
          // 直接显示，无动画
          animationRunning.current = false; // 确保重置动画状态
          controls.set({
            height: '50%',
            top: '25%',
            bottom: 'auto',
          });
          break;
      }
    }
  }, [animationCase, controls]);

  // 控制按钮高亮色延迟
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isActive) {
      timer = setTimeout(() => setActiveColorDelay(true), 500);
    } else {
      setActiveColorDelay(false);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isActive]);

  // 修改 onClick
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isSwitching) return;
    onClick?.(e);
  };

  // 执行向下退出动画
  const executeExitDownAnimation = async () => {
    if (animationRunning.current) {
      return;
    }
    animationRunning.current = true;
    setIsSwitching(true);
    try {
      // 第一步：height延长到75% + 宽度（0.25rem = 4px）
      await controls.start(
        {
          height: '75%',
          top: '25%',
        },
        { duration: 0.4, ease: 'easeIn' },
      );
      // 第二步：top从25%到100%，完全离开Button
      await controls.start(
        {
          top: '100%',
          height: '0%',
        },
        { duration: 0.1, ease: 'easeIn' },
      );
    } catch (error) {
      console.error('向下退出动画执行出错:', error);
    } finally {
      animationRunning.current = false;
      setShouldShowIndicator(false);
      setIsSwitching(false);
    }
  };

  // 执行向上退出动画
  const executeExitUpAnimation = async () => {
    if (animationRunning.current) {
      return;
    }
    animationRunning.current = true;
    setIsSwitching(true);
    try {
      // 第一步：height延长到75% + 宽度，使用bottom固定下部
      await controls.start(
        {
          height: '75%',
          bottom: '25%',
          top: 'auto', // 取消top定位
        },
        { duration: 0.4, ease: 'easeIn' },
      );
      // 第二步：bottom从25%到100%，完全离开Button
      await controls.start(
        {
          bottom: '100%',
          height: '0%',
        },
        { duration: 0.1, ease: 'easeIn' },
      );
    } catch (error) {
      console.error('向上退出动画执行出错:', error);
    } finally {
      animationRunning.current = false;
      setShouldShowIndicator(false);
      setIsSwitching(false);
    }
  };

  const executeEnterDownAnimation = async () => {
    console.log('executeEnterDownAnimation 被调用，animationRunning:', animationRunning.current);
    if (animationRunning.current) {
      console.log('动画正在执行中，跳过');
      return;
    }
    animationRunning.current = true;
    setIsSwitching(true);
    console.log('设置 animationRunning 为 true，开始向下进入动画');
    try {
      // 等待前一个退出动画完成
      await new Promise((resolve) => setTimeout(resolve, 500));
      // 等待下一帧，确保motion元素已经渲染完成
      await new Promise((resolve) => requestAnimationFrame(resolve));
      console.log('等待渲染完成');
      // 先强制设置初始状态，确保动画有明确的起始点
      console.log('设置初始状态');
      controls.set({
        top: '0%',
        height: '0%',
        bottom: 'auto',
      });
      // 第一步：top保持0，height从0增长到75%
      console.log('执行第一步：从顶部伸长');
      await controls.start(
        {
          height: '75%',
        },
        { duration: 0.1, ease: 'easeOut' },
      );
      // 第二步：top从0移动到25%，height从75%减少到50%（最终位置）
      console.log('执行第二步：移动到最终位置');
      await controls.start(
        {
          top: '25%',
          height: '50%',
        },
        { duration: 0.1, ease: 'easeOut' },
      );
      console.log('向下进入动画完成');
    } catch (error) {
      console.error('向下进入动画执行出错:', error);
    } finally {
      console.log('重置 animationRunning 为 false');
      animationRunning.current = false;
      setShouldShowIndicator(true);
      setIsSwitching(false);
    }
  };

  const executeEnterUpAnimation = async () => {
    console.log('executeEnterUpAnimation 被调用，animationRunning:', animationRunning.current);
    if (animationRunning.current) {
      console.log('动画正在执行中，跳过');
      return;
    }
    animationRunning.current = true;
    setIsSwitching(true);
    console.log('设置 animationRunning 为 true，开始向上进入动画');
    try {
      // 等待前一个退出动画完成
      await new Promise((resolve) => setTimeout(resolve, 500));
      // 等待下一帧，确保motion元素已经渲染完成
      await new Promise((resolve) => requestAnimationFrame(resolve));
      console.log('等待渲染完成');
      // 先强制设置初始状态，确保动画有明确的起始点
      console.log('设置初始状态');
      controls.set({
        bottom: '0%',
        height: '0%',
        top: 'auto',
      });
      // 第一步：bottom保持0，height从0增长到75%
      console.log('执行第一步：从底部伸长');
      await controls.start(
        {
          bottom: '0%',
          height: '75%',
          top: 'auto', // 确保使用bottom定位
        },
        { duration: 0.1, ease: 'easeOut' },
      );
      // 第二步：bottom从0移动到25%，height从75%减少到50%（最终位置）
      console.log('执行第二步：移动到最终位置');
      await controls.start(
        {
          bottom: '25%',
          height: '50%',
          top: 'auto',
        },
        { duration: 0.1, ease: 'easeOut' },
      );
      console.log('向上进入动画完成');
    } catch (error) {
      console.error('向上进入动画执行出错:', error);
    } finally {
      console.log('重置 animationRunning 为 false');
      animationRunning.current = false;
      setShouldShowIndicator(true);
      setIsSwitching(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`
        rounded
        relative w-full flex items-center p-2 text-left overflow-hidden
        transition-colors duration-150 ease-in-out
        justify-start
        focus:outline-none
        ${
          isActive
            ? 'bg-[var(--fluent-color-neutral-background1-selected)] text-[var(--fluent-color-brand-foreground1)] hover:bg-[var(--fluent-color-neutral-background1-hover)] active:bg-[var(--fluent-color-neutral-background1-pressed)]'
            : 'text-[var(--fluent-color-neutral-foreground1)] hover:bg-[var(--fluent-color-neutral-background1-hover)] active:bg-[var(--fluent-color-neutral-background1-pressed)]'
        }
      `}
      title={item.label}
      disabled={isSwitching}
    >
      {/* 左侧指示条 - 使用Motion动画 */}
      {shouldShowIndicator && (
        <motion.div
          className="absolute left-0 w-1 rounded-full bg-[var(--fluent-color-brand-background)]"
          initial={false}
          animate={controls}
        />
      )}

      {/* 图标容器 - 固定宽度确保位置不变 */}
      <div className="w-6 h-5 flex items-center justify-center flex-shrink-0">
        <Icon icon={item.icon} className="w-5 h-5" />
      </div>

      {/* 标签 */}
      <span className="ml-3 font-medium">{item.label}</span>
    </button>
  );
};

export default NavItemComponent;
