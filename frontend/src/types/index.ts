/**
 * Dashboard and layout related types
 */

export interface NavItem {
  id: string;
  label: string;
  icon: string; // Icon name or component
  href?: string;
  children?: NavItem[];
  isActive?: boolean;
}

export interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: NavItem[];
}

export interface HeaderProps {
  title?: string;
  onMenuToggle: () => void;
  isSidebarOpen: boolean;
}

export interface MainLayoutProps {
  children: React.ReactNode;
}

/**
 * User related types
 */

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'admin' | 'manager' | 'user';
  status: 'active' | 'inactive' | 'pending';
  createdAt: string;
  lastLogin?: string;
}

export interface UserTableProps {
  users: User[];
  isLoading?: boolean;
  onEdit?: (user: User) => void;
  onDelete?: (userId: string) => void;
}

export interface UserTableRowProps {
  user: User;
  onEdit?: (user: User) => void;
  onDelete?: (userId: string) => void;
}

export interface UserFiltersProps {
  onRoleChange: (role: string) => void;
  onStatusChange: (status: string) => void;
  onSearch: (search: string) => void;
  selectedRole?: string;
  selectedStatus?: string;
  searchQuery?: string;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}
