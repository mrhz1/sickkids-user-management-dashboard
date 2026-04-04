/**
 * NavItem Component
 *
 * Represents a single navigation item in the sidebar.
 * Supports both simple links and collapsible sections.
 */

import React from 'react';
import type { NavItem } from '../../types';

interface NavItemProps {
  item: NavItem;
  isActive?: boolean;
}

export const NavItemComponent: React.FC<NavItemProps> = ({ item, isActive = false }) => {
  return (
    <a
      href={item.href || '#'}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
        isActive ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-gray-700 hover:bg-gray-50'
      }`}
      title={item.label}
    >
      {/* Icon placeholder - replace with actual icon component */}
      <div
        className={`flex items-center justify-center w-5 h-5 rounded ${
          isActive ? 'bg-blue-100' : 'bg-gray-100'
        }`}
      >
        <span className="text-xs font-bold">{item.icon.charAt(0).toUpperCase()}</span>
      </div>
      <span className="text-sm font-medium">{item.label}</span>
    </a>
  );
};

export default NavItemComponent;
