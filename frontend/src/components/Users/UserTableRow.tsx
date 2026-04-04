/**
 * UserTableRow Component
 *
 * Represents a single user row in the users table
 */

import React from 'react';
import type { UserTableRowProps, User } from '../../types';

export const UserTableRow: React.FC<UserTableRowProps> = ({ user, onEdit, onDelete }) => {
  // Helper function to get role badge color
  const getRoleBadgeColor = (role: User['role']) => {
    switch (role) {
      case 'admin':
        return 'bg-purple-100 text-purple-800';
      case 'manager':
        return 'bg-blue-100 text-blue-800';
      case 'user':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Helper function to get status badge color
  const getStatusBadgeColor = (status: User['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
      {/* User Info */}
      <td className="px-6 py-4">
        <div>
          <p className="font-medium text-gray-900">{`${user.firstName} ${user.lastName}`}</p>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
      </td>

      {/* Role */}
      <td className="px-6 py-4">
        <span
          className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getRoleBadgeColor(user.role)}`}
        >
          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
        </span>
      </td>

      {/* Status */}
      <td className="px-6 py-4">
        <span
          className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(user.status)}`}
        >
          {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
        </span>
      </td>

      {/* Last Login */}
      <td className="px-6 py-4 text-sm text-gray-600">
        {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'Never'}
      </td>

      {/* Actions */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onEdit?.(user)}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="Edit user"
            aria-label={`Edit ${user.firstName} ${user.lastName}`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </button>
          <button
            onClick={() => onDelete?.(user.id)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Delete user"
            aria-label={`Delete ${user.firstName} ${user.lastName}`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      </td>
    </tr>
  );
};

export default UserTableRow;
