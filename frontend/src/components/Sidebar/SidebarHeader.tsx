/**
 * SidebarHeader Component
 *
 * Header section of the sidebar displaying logo and close button (mobile)
 */

import React from 'react';

interface SidebarHeaderProps {
  onClose: () => void;
}

export const SidebarHeader: React.FC<SidebarHeaderProps> = ({ onClose }) => {
  return (
    <div className="flex items-center justify-between border-b border-gray-200 px-4 py-4">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="flex items-center justify-center w-8 h-8 bg-blue-600 rounded-lg">
          <span className="text-white font-bold text-sm">SK</span>
        </div>
        <span className="font-bold text-gray-900">SickKids</span>
      </div>

      {/* Close button (mobile only) */}
      <button
        onClick={onClose}
        className="lg:hidden p-1 hover:bg-gray-100 rounded-lg transition-colors"
        aria-label="Close sidebar"
      >
        <svg
          className="w-6 h-6 text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
};

export default SidebarHeader;
