import { Nav, NavItem } from '@/ui/Nav';

const navItems: NavItem[] = [
  {
    id: '1',
    path: '/home',
    icon: 'solar:home-bold-duotone',
    label: 'Home',
  },
  {
    id: '2',
    path: '/about',
    icon: 'solar:info-square-bold-duotone',
    label: 'About',
  },
  {
    id: '3',
    path: '/test',
    icon: 'solar:command-line-duotone',
    label: 'Test',
  },
  {
    id: '4',
    path: '/debug',
    icon: 'solar:bug-minimalistic-bold-duotone',
    label: 'Debug',
  },
];

interface NavMobileLayoutProps {
  children: React.ReactNode;
}

const NavMobileLayout: React.FC<NavMobileLayoutProps> = ({ children }) => {
  return (
    <div className="h-full relative overflow-hidden">
      <Nav items={navItems} scrollTarget=".mobile-content-scroll" />
      <div className="mobile-content-scroll h-full overflow-auto pb-16">{children}</div>
    </div>
  );
};

export default NavMobileLayout;
