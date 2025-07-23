/**
 * 根据索引判断切换方向
 * @param previousIndex 之前激活项的索引
 * @param currentIndex 当前激活项的索引
 * @returns 'up' | 'down' | null
 */
export const getAnimationDirection = (
  previousIndex: number | null,
  currentIndex: number | null,
): 'up' | 'down' | null => {
  // 如果没有之前的索引或当前索引，返回null
  if (previousIndex === null || currentIndex === null) {
    return null;
  }

  // 如果索引相同，不需要动画
  if (previousIndex === currentIndex) {
    return null;
  }

  // 当前索引大于之前索引，向下切换
  if (currentIndex > previousIndex) {
    return 'down';
  }

  // 当前索引小于之前索引，向上切换
  return 'up';
};
