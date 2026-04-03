import React from 'react';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { useSidebar } from '../../hooks/useSidebar';
import { useResponsive } from '../../hooks/useResponsive';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { sidebarOpen } = useSidebar();
  const { isMobile } = useResponsive();

  const mainMargin = React.useMemo(() => {
    if (isMobile) return 'ml-0';
    return sidebarOpen ? 'ml-60' : 'ml-20';
  }, [sidebarOpen, isMobile]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Sidebar />

      <main className={`transition-all duration-300 ease-in-out pt-16 ${mainMargin}`}>
        <div className="container mx-auto px-4 md:px-6 py-6">{children}</div>
      </main>
    </div>
  );
};
