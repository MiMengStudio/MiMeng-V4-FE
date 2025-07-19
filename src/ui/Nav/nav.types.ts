export interface NavItem {
  id: string;
  path: string;
  icon: string;
  label: string;
}

export interface NavItemComponentProps {
  item: NavItem;
  isActive: boolean;
  isCollapsed: boolean;
  onClick: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  previousActiveId: string | null;
  currentActiveId: string | null;
  itemIndex: number;
  currentActiveIndex: number | null;
  previousActiveIndex: number | null;
  items: NavItem[];
}

export interface NavProps {
  items: NavItem[];
  className?: string;
}
