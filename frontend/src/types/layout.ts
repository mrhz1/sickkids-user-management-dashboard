export interface SidebarItem {
  id: string;
  label: string;
  icon: string;
  href: string;
  badge?: number;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: string;
}

export interface LayoutContextType {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  closeSidebar: () => void;
  openSidebar: () => void;
}
