import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, Table, Input, Button, Space, Typography, message } from 'antd';
import { SortAscendingOutlined, SortDescendingOutlined } from '@ant-design/icons';
import axiosInstance from "../../axiosInstance";
import DeleteConfirmationModal from '../DeletionConfirmation/DeleteConfirmationModal';

const { Text } = Typography;

const UsersModal = ({ visible, onClose }) => {
  const navigate = useNavigate(); // Hook to navigate programmatically

  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('ascend'); // Default ascending sort order
  const [sortField, setSortField] = useState('firstName'); // Default sorting by first name
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);

  // Fetch users on modal visibility
  useEffect(() => {
    if (visible) {
      axiosInstance.get('/user/all-users')
        .then((response) => {
          setUsers(response.data);
          setFilteredUsers(response.data); // Initially, show all users
        })
        .catch((error) => console.error('Error fetching users:', error));
    }
  }, [visible]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    filterUsers(e.target.value);
  };

  const filterUsers = (query) => {
    const filtered = users.filter(user =>
      user.firstName.toLowerCase().includes(query.toLowerCase()) ||
      user.lastName.toLowerCase().includes(query.toLowerCase()) ||
      user.email.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  const handleSortChange = (pagination, filters, sorter) => {
    if (sorter.order) {
      setSortOrder(sorter.order);
      setSortField(sorter.field);
    }
  };

  const handleDeleteUser = (userId) => {
    setDeleteUserId(userId);
    setIsDeleteModalVisible(true);
  };

  const handleConfirmDelete = async (userId) => {
    try {
      setUsers(users.filter(user => user.userId !== userId));
      setFilteredUsers(filteredUsers.filter(user => user.userId !== userId));
    } catch (error) {
      message.error('Failed to delete user');
      console.error('Failed to delete user', error);
    } finally {
      setIsDeleteModalVisible(false);
    }
  };

  const columns = [
    {
      title: (
        <>
          First Name{' '}
          {sortField === 'firstName' && sortOrder === 'ascend' && <SortAscendingOutlined />}
          {sortField === 'firstName' && sortOrder === 'descend' && <SortDescendingOutlined />}
        </>
      ),
      dataIndex: 'firstName',
      key: 'firstName',
      sorter: (a, b) => a.firstName.localeCompare(b.firstName),
      sortOrder: sortField === 'firstName' ? sortOrder : null,
    },
    {
      title: (
        <>
          Last Name{' '}
          {sortField === 'lastName' && sortOrder === 'ascend' && <SortAscendingOutlined />}
          {sortField === 'lastName' && sortOrder === 'descend' && <SortDescendingOutlined />}
        </>
      ),
      dataIndex: 'lastName',
      key: 'lastName',
      sorter: (a, b) => a.lastName.localeCompare(b.lastName),
      sortOrder: sortField === 'lastName' ? sortOrder : null,
    },
    {
      title: (
        <>
          Email{' '}
          {sortField === 'email' && sortOrder === 'ascend' && <SortAscendingOutlined />}
          {sortField === 'email' && sortOrder === 'descend' && <SortDescendingOutlined />}
        </>
      ),
      dataIndex: 'email',
      key: 'email',
      sorter: (a, b) => a.email.localeCompare(b.email),
      sortOrder: sortField === 'email' ? sortOrder : null,
    },
    {
      title: (
        <>
          Role{' '}
          {sortField === 'isAdmin' && sortOrder === 'ascend' && <SortAscendingOutlined />}
          {sortField === 'isAdmin' && sortOrder === 'descend' && <SortDescendingOutlined />}
        </>
      ),
      dataIndex: 'isAdmin',
      key: 'isAdmin',
      sorter: (a, b) => a.isAdmin - b.isAdmin, // Sort by boolean values
      render: (isAdmin) => (isAdmin ? 'Admin' : 'User'), // Display 'Admin' or 'User' based on the boolean value
      sortOrder: sortField === 'isAdmin' ? sortOrder : null,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button type="link" onClick={() => navigate(`/user-profile/${record.userId}`)}>
            View Profile
          </Button>
          <Button type="link" danger onClick={() => handleDeleteUser(record.userId)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Modal
        title="Manage Users"
        visible={visible}
        onCancel={onClose}
        footer={null}
        width={800}
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          <Input
            placeholder="Search Users"
            value={searchQuery}
            onChange={handleSearchChange}
            style={{ marginBottom: 16 }}
          />

          <Table
            columns={columns}
            dataSource={filteredUsers}
            rowKey="userId"
            pagination={{
              pageSize: 5,
            }}
            onChange={handleSortChange}
            style={{ marginTop: 16 }}
          />
        </Space>
      </Modal>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        visible={isDeleteModalVisible}
        onClose={() => setIsDeleteModalVisible(false)}
        url={`/user/delete/${deleteUserId}`}
        onDelete={handleConfirmDelete}
      />
    </>
  );
};

export default UsersModal;
