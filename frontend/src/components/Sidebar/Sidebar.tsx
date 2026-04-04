/**
 * Sidebar Component
 *
 * Main sidebar navigation component with collapsible mobile support
 */

import React from 'react';
import type { SidebarProps } from '../../types';
import NavItemComponent from './NavItem';
import SidebarHeader from './SidebarHeader';

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, navItems }) => {
  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-50 h-screen w-64 bg-white shadow-lg transition-transform duration-300 lg:static lg:z-0 lg:shadow-md lg:flex-shrink-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <SidebarHeader onClose={onClose} />

          {/* Navigation items */}
          <nav className="flex-1 overflow-y-auto px-3 py-4">
            <div className="space-y-2">
              {navItems.map((item) => (
                <NavItemComponent key={item.id} item={item} isActive={item.isActive} />
              ))}
            </div>
          </nav>

          {/* Footer */}
          <div className="border-t border-gray-200 p-4">
            <button className="w-full px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200">
              Sign Out
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
