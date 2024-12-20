import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Avatar, Button, Form, Input, Layout, Menu, Space, Typography, message } from 'antd';
import { UserOutlined, LockOutlined, EditOutlined, SaveOutlined } from '@ant-design/icons';
import axiosInstance from '../axiosInstance';

const { Content, Sider } = Layout;
const { Title, Text } = Typography;

const ProfilePage = () => {
  const { userId } = useParams(); // Correctly extract userId
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState('details');
  const [currentUser, setCurrentUser] = useState(null); // Store current user details
  const [form] = Form.useForm();

  useEffect(() => {
    // Get the current user from localStorage
    const currentUserData = JSON.parse(localStorage.getItem('user')); // Assuming user is stored in localStorage
    setCurrentUser(currentUserData);

    if (!userId || !currentUserData) {
      console.error('User ID not found or current user not available');
      setLoading(false);
      return;
    }

    console.log('User ID:', userId); // Debug userId

    axiosInstance
      .get(`/user/${userId}`)
      .then((response) => {
        console.log('API Response:', response.data); // Debug API response
        setUser(response.data);
        setLoading(false);
        form.setFieldsValue({
          email: response.data.email,
          firstName: response.data.firstName,
          lastName: response.data.lastName,
        });
      })
      .catch((error) => {
        console.error('Error fetching user details:', error);
        message.error('Failed to fetch user details.');
        setLoading(false);
      });
  }, [userId, form]);

  const handleEdit = () => setEditing(true);
  const handleCancel = () => {
    setEditing(false);
    form.resetFields();
  };

  const handleSave = (values) => {
    axiosInstance
      .put(`/user/edit/${userId}`, {
        ...values,
        isAdmin: user.isAdmin,
      })
      .then((response) => {
        message.success('Profile updated successfully!');
        setUser(response.data);
        setEditing(false);
      })
      .catch((error) => {
        console.error('Error updating profile:', error);
        message.error('Failed to update profile.');
      });
  };

  const handleResetPassword = (values) => {
    axiosInstance
      .put('/user/reset-password', {
        userId: user.userId,
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      })
      .then(() => {
        message.success('Password reset successfully!');
      })
      .catch((error) => {
        console.error('Error resetting password:', error);
        if (error.response && error.response.status === 401) {
          message.error('Current password is incorrect.');
        } else {
          message.error('Failed to reset password.');
        }
      });
  };

  if (loading) {
    return (
      <Layout style={{ minHeight: '100vh', padding: '20px' }}>
        <Content>
          <Text>Loading...</Text>
        </Content>
      </Layout>
    );
  }

  if (!user) {
    return (
      <Layout style={{ minHeight: '100vh', padding: '20px' }}>
        <Content>
          <Text>User data not found.</Text>
        </Content>
      </Layout>
    );
  }

  const canEditProfile = currentUser && (currentUser.userId === userId || currentUser.isAdmin);
  const canResetPassword = currentUser && (currentUser.userId === userId || currentUser.isAdmin);

  return (
    <Layout style={{ minHeight: '100vh', padding: '20px' }}>
      <Sider width={300} style={{ background: '#fff', borderRight: '1px solid #ddd', padding: '20px' }}>
        <Space direction="vertical" align="center" style={{ width: '100%' }}>
          <Avatar size={120} icon={<UserOutlined />} />
          <Title level={4}>{user.firstName} {user.lastName}</Title>
          <Menu
            mode="vertical"
            selectedKeys={[selectedMenu]}
            onClick={({ key }) => setSelectedMenu(key)}
            style={{ width: '100%' }}
          >
            <Menu.Item key="details" icon={<UserOutlined />}>
              Personal Details
            </Menu.Item>
            {/* Only show "Reset Password" menu item if the conditions are met */}
            {canResetPassword && (
              <Menu.Item key="password" icon={<LockOutlined />}>
                Reset Password
              </Menu.Item>
            )}
          </Menu>
        </Space>
      </Sider>
      <Content style={{ padding: '20px', background: '#fff' }}>
        {selectedMenu === 'details' && (
          <div>
            <Title level={4}>Personal Details</Title>
            <Form
              form={form}
              layout="vertical"
              onFinish={handleSave}
              initialValues={{
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
              }}
            >
              <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Email is required' }]}>
                <Input disabled={!editing} />
              </Form.Item>
              <Form.Item label="First Name" name="firstName" rules={[{ required: true, message: 'First Name is required' }]}>
                <Input disabled={!editing} />
              </Form.Item>
              <Form.Item label="Last Name" name="lastName" rules={[{ required: true, message: 'Last Name is required' }]}>
                <Input disabled={!editing} />
              </Form.Item>
              {editing && (
                <Form.Item
                  label="Current Password"
                  name="password"
                  rules={[{ required: true, message: 'Current password is required to update your profile.' }]}
                >
                  <Input.Password />
                </Form.Item>
              )}
              {canEditProfile && (
                <>
                  {editing ? (
                    <Space>
                      <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
                        Save
                      </Button>
                      <Button onClick={handleCancel}>Cancel</Button>
                    </Space>
                  ) : (
                    <Button type="primary" onClick={handleEdit} icon={<EditOutlined />}>
                      Edit
                    </Button>
                  )}
                </>
              )}
            </Form>
          </div>
        )}
        {selectedMenu === 'password' && (
          <div>
            <Title level={4}>Reset Password</Title>
            <Form layout="vertical" onFinish={handleResetPassword}>
              <Form.Item
                label="Current Password"
                name="currentPassword"
                rules={[{ required: true, message: 'Current Password is required' }]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item
                label="New Password"
                name="newPassword"
                rules={[{ required: true, message: 'New Password is required' }]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item
                label="Confirm Password"
                name="confirmPassword"
                rules={[
                  { required: true, message: 'Confirm Password is required' },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('newPassword') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('Passwords do not match!'));
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>
              {canResetPassword && (
                <Button type="primary" htmlType="submit">
                  Reset Password
                </Button>
              )}
            </Form>
          </div>
        )}
      </Content>
    </Layout>
  );
};

export default ProfilePage;
