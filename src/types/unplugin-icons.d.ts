// unplugin-icons 类型声明
declare module '~icons/*' {
  import type { FunctionalComponent, SVGAttributes } from 'react';
  const component: FunctionalComponent<SVGAttributes<SVGSVGElement>>;
  export default component;
}
