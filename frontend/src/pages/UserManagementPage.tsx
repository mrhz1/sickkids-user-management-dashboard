/**
 * UserManagementPage
 *
 * Main page for managing users with filtering, pagination, and actions
 */

import React, { useState, useMemo } from 'react';
import type { User } from '../types/index';
import { UserTable, UserFilters, Pagination } from '../components/Users/index';
import { Modal, ConfirmationDialog, UserForm } from '../components/Common/index';
import type { UserFormData } from '../components/Common/index';
import MainLayout from '../layouts/MainLayout';

// Mock data - replace with actual API call
const MOCK_USERS: User[] = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@sickkids.ca',
    role: 'admin',
    status: 'active',
    createdAt: '2024-01-15',
    lastLogin: '2024-04-04',
  },
  {
    id: '2',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@sickkids.ca',
    role: 'manager',
    status: 'active',
    createdAt: '2024-02-01',
    lastLogin: '2024-04-03',
  },
  {
    id: '3',
    firstName: 'Bob',
    lastName: 'Johnson',
    email: 'bob.johnson@sickkids.ca',
    role: 'user',
    status: 'active',
    createdAt: '2024-02-15',
    lastLogin: '2024-04-02',
  },
  {
    id: '4',
    firstName: 'Alice',
    lastName: 'Williams',
    email: 'alice.williams@sickkids.ca',
    role: 'user',
    status: 'inactive',
    createdAt: '2024-03-01',
  },
  {
    id: '5',
    firstName: 'Charlie',
    lastName: 'Brown',
    email: 'charlie.brown@sickkids.ca',
    role: 'manager',
    status: 'pending',
    createdAt: '2024-03-20',
  },
];

const ITEMS_PER_PAGE = 5;

export const UserManagementPage: React.FC = () => {
  // Filter and pagination state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading] = useState(false);

  // Modal state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Filter users based on search and filters
  const filteredUsers = useMemo(() => {
    return MOCK_USERS.filter((user) => {
      const matchesSearch =
        searchQuery === '' ||
        user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesRole = selectedRole === '' || user.role === selectedRole;
      const matchesStatus = selectedStatus === '' || user.status === selectedStatus;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [searchQuery, selectedRole, selectedStatus]);

  // Paginate users
  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredUsers.slice(startIndex, endIndex);
  }, [filteredUsers, currentPage]);

  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);

  // Reset to first page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedRole, selectedStatus]);

  // Handlers
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleRoleChange = (role: string) => {
    setSelectedRole(role);
  };

  const handleStatusChange = (status: string) => {
    setSelectedStatus(status);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleDeleteUser = (userId: string) => {
    const user = MOCK_USERS.find((u) => u.id === userId);
    if (user) {
      setSelectedUser(user);
      setIsDeleteDialogOpen(true);
    }
  };

  const handleAddUserClick = () => {
    setSelectedUser(null);
    setIsAddModalOpen(true);
  };

  const handleAddUserSubmit = (data: UserFormData) => {
    setIsSubmitting(true);
    // TODO: Call API to add user
    setTimeout(() => {
      console.log('Adding user:', data);
      // TODO: Add to users list
      setIsSubmitting(false);
      setIsAddModalOpen(false);
    }, 500);
  };

  const handleEditUserSubmit = (data: UserFormData) => {
    setIsSubmitting(true);
    // TODO: Call API to edit user
    setTimeout(() => {
      console.log('Editing user:', selectedUser?.id, data);
      // TODO: Update in users list
      setIsSubmitting(false);
      setIsEditModalOpen(false);
    }, 500);
  };

  const handleDeleteConfirm = () => {
    if (!selectedUser) return;
    setIsSubmitting(true);
    // TODO: Call API to delete user
    setTimeout(() => {
      console.log('Deleting user:', selectedUser.id);
      // TODO: Remove from users list
      setIsSubmitting(false);
      setIsDeleteDialogOpen(false);
    }, 500);
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Page header with action button */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">User Management</h2>
            <p className="mt-1 text-gray-600">Manage users and their roles</p>
          </div>
          <button
            onClick={handleAddUserClick}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Add User
          </button>
        </div>

        {/* Filters */}
        <UserFilters
          onSearch={handleSearch}
          onRoleChange={handleRoleChange}
          onStatusChange={handleStatusChange}
          searchQuery={searchQuery}
          selectedRole={selectedRole}
          selectedStatus={selectedStatus}
        />

        {/* Results summary */}
        <div className="text-sm text-gray-600">
          Showing {paginatedUsers.length === 0 ? 0 : (currentPage - 1) * ITEMS_PER_PAGE + 1} to{' '}
          {Math.min(currentPage * ITEMS_PER_PAGE, filteredUsers.length)} of {filteredUsers.length}{' '}
          users
        </div>

        {/* User table */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
          <UserTable
            users={paginatedUsers}
            isLoading={isLoading}
            onEdit={handleEditUser}
            onDelete={handleDeleteUser}
          />
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>

      {/* Add User Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New User"
        footer={
          <>
            <button
              onClick={() => setIsAddModalOpen(false)}
              disabled={isSubmitting}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium disabled:opacity-50"
            >
              Cancel
            </button>
          </>
        }
      >
        <UserForm onSubmit={handleAddUserSubmit} isLoading={isSubmitting} />
      </Modal>

      {/* Edit User Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit User"
        footer={
          <>
            <button
              onClick={() => setIsEditModalOpen(false)}
              disabled={isSubmitting}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium disabled:opacity-50"
            >
              Cancel
            </button>
          </>
        }
      >
        <UserForm user={selectedUser} onSubmit={handleEditUserSubmit} isLoading={isSubmitting} />
      </Modal>

      {/* Delete Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={isDeleteDialogOpen}
        title="Delete User"
        message={
          selectedUser
            ? `Are you sure you want to delete ${selectedUser.firstName} ${selectedUser.lastName}? This action cannot be undone.`
            : 'Are you sure you want to delete this user?'
        }
        onConfirm={handleDeleteConfirm}
        onCancel={() => setIsDeleteDialogOpen(false)}
        confirmText="Delete"
        cancelText="Cancel"
        isDestructive
        isLoading={isSubmitting}
      />
    </MainLayout>
  );
};

export default UserManagementPage;
