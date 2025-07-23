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

const NavDesktopLayout = () => {
  return (
    <div className="h-full">
      <Nav items={navItems} />
    </div>
  );
};

export default NavDesktopLayout;
