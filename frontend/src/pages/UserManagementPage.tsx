/**
 * UserManagementPage
 *
 * Main page for managing users with filtering, pagination, and actions
 */

import React, { useState, useMemo } from 'react';
import type { User } from '../types/index';
import { UserTable, UserFilters, Pagination } from '../components/Users/index';
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
  // State management
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading] = useState(false);

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
    // TODO: Open edit modal or navigate to edit page
    console.log('Edit user:', user);
  };

  const handleDeleteUser = (userId: string) => {
    // TODO: Show confirmation and delete
    console.log('Delete user:', userId);
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
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
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
    </MainLayout>
  );
};

export default UserManagementPage;
