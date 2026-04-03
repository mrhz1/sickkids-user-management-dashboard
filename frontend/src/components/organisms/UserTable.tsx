import React from 'react';
import { Text } from '../atoms/Text';
import { Button } from '../atoms/Button';
import type { User } from '../../types/user';

interface UserTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (userId: string) => void;
}

export const UserTable: React.FC<UserTableProps> = ({ users, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50">
            <th className="px-6 py-3 text-left">
              <Text variant="label">Username</Text>
            </th>
            <th className="px-6 py-3 text-left">
              <Text variant="label">First Name</Text>
            </th>
            <th className="px-6 py-3 text-left">
              <Text variant="label">Last Name</Text>
            </th>
            <th className="px-6 py-3 text-left">
              <Text variant="label">Email</Text>
            </th>
            <th className="px-6 py-3 text-left">
              <Text variant="label">Actions</Text>
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <td className="px-6 py-4">
                <Text variant="body2">{user.username}</Text>
              </td>
              <td className="px-6 py-4">
                <Text variant="body2">{user.firstName}</Text>
              </td>
              <td className="px-6 py-4">
                <Text variant="body2">{user.lastName}</Text>
              </td>
              <td className="px-6 py-4">
                <Text variant="body2" className="text-blue-600">
                  {user.email}
                </Text>
              </td>
              <td className="px-6 py-4">
                <div className="flex gap-2">
                  <Button variant="secondary" size="sm" onClick={() => onEdit(user)}>
                    Edit
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => onDelete(user.id)}
                    className="text-red-600 hover:bg-red-50"
                  >
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {users.length === 0 && (
        <div className="text-center py-12">
          <Text variant="body2" className="text-gray-500">
            No users found. Create your first user to get started.
          </Text>
        </div>
      )}
    </div>
  );
};
