import React from 'react';
import { Text } from '../atoms/Text';
import type { UserProfile as UserProfileType } from '../../types/layout';

interface UserProfileProps {
  user: UserProfileType;
  onClick?: () => void;
  collapsed?: boolean;
}

export const UserProfile: React.FC<UserProfileProps> = ({ user, onClick, collapsed = false }) => {
  const initials = user.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors"
      title={collapsed ? user.name : undefined}
    >
      <div className="flex-shrink-0 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
        {initials}
      </div>

      {!collapsed && (
        <div className="flex-1 text-left">
          <Text variant="label" className="truncate">
            {user.name}
          </Text>
          <Text variant="caption" className="truncate text-gray-600">
            {user.role}
          </Text>
        </div>
      )}
    </button>
  );
};
