import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Select, Button, message, List, Avatar, Popconfirm } from 'antd';
import { UserOutlined, DeleteOutlined } from '@ant-design/icons';
import axiosInstance from '../../axiosInstance';

const { Option } = Select;

const AssignUsersModal = ({ projectId, visible, onClose, updateAssignedUsersCount }) => {
  const [email, setEmail] = useState('');
  const [user, setUser] = useState(null);
  const [role, setRole] = useState('');
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (projectId) {
      fetchAssignments();
    }
  }, [projectId]);

  const fetchAssignments = () => {
    axiosInstance
      .get(`/team/${projectId}`)
      .then((response) => {
        setAssignments(response.data);
        updateAssignedUsersCount(response.data.length); // Update parent with the new count
      })
      .catch((error) => {
        console.error('Error fetching project assignments:', error);
        message.error('Failed to fetch project assignments.');
      });
  };

  const handleSearchUser = () => {
    if (!email) {
      message.warning('Please enter an email address.');
      return;
    }
    setLoading(true);
    axiosInstance
      .get(`/user/email/${email}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error('Error fetching user by email:', error);
        message.error('User not found.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleAssignUser = () => {
    if (!user || !role) {
      message.warning('Please select a user and a role.');
      return;
    }
    axiosInstance
      .post('/team/add-member', {
        userId: user.userId,
        projectId,
        role,
      })
      .then(() => {
        message.success('User assigned successfully.');
        fetchAssignments();
        setUser(null);
        setEmail('');
        setRole('');
      })
      .catch((error) => {
        console.error('Error assigning user:', error);
        message.error('Failed to assign user.');
      });
  };

  const handleDeleteAssignment = (userId, role) => {
    axiosInstance
      .delete('/team/delete', {
        params: { projectId, userId, role },
      })
      .then(() => {
        message.success('Assignment deleted successfully.');
        fetchAssignments();
      })
      .catch((error) => {
        console.error('Error deleting assignment:', error);
        message.error('Failed to delete assignment.');
      });
  };

  return (
    <Modal
      title="Assign Users to Project"
      visible={visible}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Close
        </Button>,
      ]}
    >
      <Form layout="vertical">
        <Form.Item label="User Email">
          <Input
            placeholder="Enter user email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
        </Form.Item>
        <Button onClick={handleSearchUser} loading={loading}>
          Search User
        </Button>
        {user && (
          <div style={{ marginTop: '16px' }}>
            <p>
              <strong>User Found:</strong> {user.firstName} {user.lastName} ({user.email})
            </p>
            <Form.Item label="Select Role">
              <Select
                value={role}
                onChange={(value) => setRole(value)}
                placeholder="Select a role"
              >
                <Option value="MANAGER">Manager</Option>
                <Option value="DEVELOPER">Developer</Option>
              </Select>
            </Form.Item>
            <Button type="primary" onClick={handleAssignUser}>
              Assign User
            </Button>
          </div>
        )}
      </Form>
      <h3 style={{ marginTop: '24px' }}>Project Assignments</h3>
      <List
        itemLayout="horizontal"
        dataSource={assignments}
        renderItem={(assignment) => (
          <List.Item
            actions={[
              <Popconfirm
                title="Are you sure you want to delete this assignment?"
                onConfirm={() => handleDeleteAssignment(assignment.userDto.userId, assignment.roleStr)}
                okText="Yes"
                cancelText="No"
              >
                <Button type="link" icon={<DeleteOutlined />} danger>
                  Delete
                </Button>
              </Popconfirm>,
            ]}
          >
            <List.Item.Meta
              avatar={<Avatar icon={<UserOutlined />} />}
              title={`${assignment.userDto.firstName} ${assignment.userDto.lastName}`}
              description={`${assignment.userDto.email} - Role: ${assignment.roleStr}`}
            />
          </List.Item>
        )}
      />
    </Modal>
  );
};

export default AssignUsersModal;
