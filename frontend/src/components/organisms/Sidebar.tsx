import React from 'react';
import { NavigationLink } from '../molecules/NavigationLink';
import { UserProfile } from '../molecules/UserProfile';
import { useSidebar } from '../../hooks/useSidebar';
import { useResponsive } from '../../hooks/useResponsive';
import { SIDEBAR_ITEMS } from '../../constants/navigation';
import type { UserProfile as UserProfileType } from '../../types/layout';

const MOCK_USER: UserProfileType = {
  id: '1',
  name: 'Dr. Sarah Wilson',
  email: 'sarah.wilson@sickkids.ca',
  role: 'Dashboard Admin',
};

export const Sidebar: React.FC = () => {
  const { sidebarOpen, closeSidebar } = useSidebar();
  const { isMobile } = useResponsive();

  const handleNavClick = () => {
    if (isMobile) {
      closeSidebar();
    }
  };

  const shouldCollapse = !sidebarOpen;

  const sidebarWidth = sidebarOpen ? 'w-60' : 'w-20';

  return (
    <>
      {isMobile && sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={closeSidebar} />
      )}

      <aside
        className={`fixed left-0 top-16 h-[calc(100vh-64px)] bg-white border-r border-gray-200 transition-all duration-300 ease-in-out overflow-y-auto z-30 ${sidebarWidth} ${
          isMobile && !sidebarOpen ? '-translate-x-full' : 'translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full p-4 gap-4">
          <nav className="flex-1 space-y-1">
            {SIDEBAR_ITEMS.map((item) => (
              <NavigationLink
                key={item.id}
                icon={item.icon}
                label={item.label}
                href={item.href}
                badge={item.badge}
                isActive={item.isActive}
                collapsed={shouldCollapse}
                onClick={handleNavClick}
              />
            ))}
          </nav>

          <div className="border-t border-gray-200" />

          <UserProfile user={MOCK_USER} collapsed={shouldCollapse} onClick={() => {}} />
        </div>
      </aside>
    </>
  );
};
