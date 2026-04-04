import React, { useState } from 'react';
import { UserTable } from '../organisms/UserTable';
import { Modal } from '../atoms/Modal';
import { UserForm } from '../molecules/UserForm';
import { Button } from '../atoms/Button';
import { Text } from '../atoms/Text';
import type { User, UserFormData } from '../../types/user';

export const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      username: 'jsmith',
      firstName: 'John',
      lastName: 'Smith',
      email: 'john.smith@sickkids.ca',
    },
    {
      id: '2',
      username: 'mjoyce',
      firstName: 'Mary',
      lastName: 'Joyce',
      email: 'mary.joyce@sickkids.ca',
    },
    {
      id: '3',
      username: 'pwilson',
      firstName: 'Peter',
      lastName: 'Wilson',
      email: 'peter.wilson@sickkids.ca',
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | undefined>(undefined);

  const handleAddUser = () => {
    setSelectedUser(undefined);
    setIsModalOpen(true);
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleDeleteUser = (userId: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers((prev) => prev.filter((u) => u.id !== userId));
    }
  };

  const handleSubmit = (formData: UserFormData) => {
    if (selectedUser) {
      setUsers((prev) => prev.map((u) => (u.id === selectedUser.id ? { ...u, ...formData } : u)));
    } else {
      const newUser: User = {
        id: Date.now().toString(),
        ...formData,
      };
      setUsers((prev) => [...prev, newUser]);
    }
    setIsModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(undefined);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <Text as="h2" variant="body1" className="text-2xl font-bold mb-1">
            User Management
          </Text>
          <Text variant="body2" className="text-gray-600">
            Manage users in your system
          </Text>
        </div>
        <Button variant="primary" onClick={handleAddUser}>
          + Add User
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <UserTable users={users} onEdit={handleEditUser} onDelete={handleDeleteUser} />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={selectedUser ? 'Edit User' : 'Add New User'}
      >
        <UserForm initialData={selectedUser} onSubmit={handleSubmit} />
      </Modal>
    </div>
  );
};
