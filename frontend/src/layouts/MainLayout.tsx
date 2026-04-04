/**
 * MainLayout Component
 *
 * Main layout wrapper combining header and sidebar with responsive design
 */

import React, { useState } from 'react';
import type { MainLayoutProps, NavItem } from '../types/index';
import { Header } from '../components/Header/index';
import { Sidebar } from '../components/Sidebar/index';

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Navigation items - can be expanded for additional sections
  const navItems: NavItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: 'dashboard',
      href: '/dashboard',
      isActive: true,
    },
    {
      id: 'users',
      label: 'Users',
      icon: 'users',
      href: '/users',
      isActive: false,
    },
    // Future sections can be added here
    // {
    //   id: 'reports',
    //   label: 'Reports',
    //   icon: 'report',
    //   href: '/reports',
    // },
  ];

  const handleMenuToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSidebarClose = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 lg:flex">
      <Sidebar isOpen={isSidebarOpen} onClose={handleSidebarClose} navItems={navItems} />

      <div className="flex-1 flex flex-col lg:ml-0">
        <Header title="Dashboard" onMenuToggle={handleMenuToggle} isSidebarOpen={isSidebarOpen} />

        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;
