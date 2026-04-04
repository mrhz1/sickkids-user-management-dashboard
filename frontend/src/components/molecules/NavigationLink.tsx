import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Badge } from '../atoms/Badge';
import { Text } from '../atoms/Text';

interface NavigationLinkProps {
  icon: string;
  label: string;
  href: string;
  badge?: number;
  onClick?: () => void;
  collapsed?: boolean;
}

export const NavigationLink: React.FC<NavigationLinkProps> = ({
  label,
  href,
  badge,
  onClick,
  collapsed = false,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = location.pathname === href;

  const baseClasses =
    'w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200';
  const activeClasses = isActive
    ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600'
    : 'text-gray-700 hover:bg-gray-50';

  const handleClick = (): void => {
    void navigate(href);
    if (onClick) {
      void onClick();
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`${baseClasses} ${activeClasses}`}
      title={collapsed ? label : undefined}
    >
      <div className="w-5 h-5 bg-gray-400 rounded" />

      {!collapsed && (
        <div className="flex-1 flex items-center justify-between">
          <Text variant="label" className="text-left">
            {label}
          </Text>
          {badge && <Badge count={badge} />}
        </div>
      )}
    </button>
  );
};
