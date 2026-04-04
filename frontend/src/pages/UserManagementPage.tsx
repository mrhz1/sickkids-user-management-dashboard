/**
 * UserManagementPage
 *
 * Main page for managing users with filtering, pagination, and actions
 */

import React, { useState, useMemo, useEffect } from 'react';
import type { User } from '../types/index';
import { UserTable, UserFilters, Pagination } from '../components/Users/index';
import { Modal, ConfirmationDialog, UserForm } from '../components/Common/index';
import type { UserFormData } from '../components/Common/index';
import MainLayout from '../layouts/MainLayout';
import { useAuth } from '../context/AuthContext';

const ITEMS_PER_PAGE = 5;

// API response types
interface ApiUser {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  is_staff: boolean;
  is_active: boolean;
  date_joined: string;
}

interface UsersApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: ApiUser[];
}

// Map API user to frontend User type
const mapApiUserToUser = (apiUser: ApiUser): User => ({
  id: String(apiUser.id),
  firstName: apiUser.first_name,
  lastName: apiUser.last_name,
  email: apiUser.email,
  role: apiUser.is_staff ? 'admin' : 'user',
  status: apiUser.is_active ? 'active' : 'inactive',
  createdAt: apiUser.date_joined.split('T')[0], // Extract date part
});

export const UserManagementPage: React.FC = () => {
  const { user } = useAuth();

  // Filter and pagination state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Modal state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch users from API
  useEffect(() => {
    const fetchUsers = async () => {
      if (!user) return; // Only fetch if user is authenticated
      setIsLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem('authToken');
        const response = await fetch('http://localhost:8000/api/users/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }

        const data = (await response.json()) as UsersApiResponse;
        const mappedUsers = data.results.map(mapApiUserToUser);
        setUsers(mappedUsers);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to load users';
        setError(message);
        console.error('Error fetching users:', err);
      } finally {
        setIsLoading(false);
      }
    };

    void fetchUsers();
  }, [user]);

  // Filter users based on search and filters
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        searchQuery === '' ||
        user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesRole = selectedRole === '' || user.role === selectedRole;
      const matchesStatus = selectedStatus === '' || user.status === selectedStatus;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, searchQuery, selectedRole, selectedStatus]);

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
    const user = users.find((u) => u.id === userId);
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

        {/* Error message */}
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

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
