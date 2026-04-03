import React from 'react';
import { Button } from '../atoms/Button';
import { SearchInput } from '../molecules/SearchInput';
import { useSidebar } from '../../hooks/useSidebar';
import { useResponsive } from '../../hooks/useResponsive';

export const Navbar: React.FC = () => {
  const { toggleSidebar } = useSidebar();
  const { isMobile } = useResponsive();

  return (
    <nav className="h-16 bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40">
      <div className="h-full px-4 md:px-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <Button variant="ghost" size="md" onClick={toggleSidebar} className="p-2 h-10 w-10">
            ☰
          </Button>
          <h1 className="text-lg font-bold text-blue-600 hidden sm:block whitespace-nowrap">
            SickKids Dashboard
          </h1>
        </div>

        {!isMobile && (
          <div className="flex-1 max-w-md hidden md:block">
            <SearchInput />
          </div>
        )}

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="md" className="p-2 h-10 w-10">
            🔔
          </Button>
          <Button variant="ghost" size="md" className="p-2 h-10 w-10">
            👤
          </Button>
        </div>
      </div>
    </nav>
  );
};
