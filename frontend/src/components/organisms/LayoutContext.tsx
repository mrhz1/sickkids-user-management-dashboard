import React, { createContext, useState, useCallback } from 'react';
import type { LayoutContextType } from '../../types/layout';

export const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

interface LayoutProviderProps {
  children: React.ReactNode;
}

export const LayoutProvider: React.FC<LayoutProviderProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = useCallback(() => {
    setSidebarOpen((prev) => !prev);
  }, []);

  const closeSidebar = useCallback(() => {
    setSidebarOpen(false);
  }, []);

  const openSidebar = useCallback(() => {
    setSidebarOpen(true);
  }, []);

  const value: LayoutContextType = {
    sidebarOpen,
    toggleSidebar,
    closeSidebar,
    openSidebar,
  };

  return <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>;
};
