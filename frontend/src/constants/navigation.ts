import type { SidebarItem } from '../types/layout';

export const SIDEBAR_ITEMS: SidebarItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: 'LayoutDashboard',
    href: '/dashboard',
  },
  {
    id: 'users',
    label: 'Users',
    icon: 'Users',
    href: '/users',
    badge: 12,
  },
  {
    id: 'reports',
    label: 'Reports',
    icon: 'BarChart3',
    href: '/reports',
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: 'Settings',
    href: '/settings',
  },
];

export const SIDEBAR_WIDTH = 260;
export const NAVBAR_HEIGHT = 64;
