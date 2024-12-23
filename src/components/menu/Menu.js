import React, { useEffect, useState } from 'react';
import { Layout, Menu, Dropdown, Avatar, Button, Typography } from 'antd';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import axiosInstance from '../../axiosInstance';
import { useNavigate } from 'react-router-dom';

const { Header } = Layout;

const MenuBar = ({ onLogout }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance
      .get(`/user/profile`)
      .then((response) => {
        const userData = response.data;
        setCurrentUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
      })
      .catch((error) => console.error('Error fetching profile:', error));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    onLogout();
    navigate('/login');
  };

  const profileMenu = (
    <Menu>
      {currentUser && (
        <>
          <Menu.Item disabled style={{ color: 'black' }}>
            Name: {currentUser.firstName} {currentUser.lastName}
          </Menu.Item>
          <Menu.Item disabled style={{ color: 'black' }}>Email: {currentUser.email}</Menu.Item>
          <Menu.Item disabled style={{ color: 'black' }}>
            Role: {currentUser.isAdmin ? 'Admin' : 'User'}
          </Menu.Item>
          <Menu.Divider />
        </>
      )}
      <Menu.Item onClick={() => navigate(`/user-profile/${currentUser?.userId}`)}>Settings</Menu.Item>
      <Menu.Item onClick={handleLogout}>Logout</Menu.Item>
    </Menu>
  );

  return (
    <Header
      style={{
        backgroundColor: '#f5f5f5',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: 'none',  // Remove the drop shadow
        height: '50px',     // Make the header thinner
      }}
    >
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Typography.Text
          style={{
            color: 'black',
            fontSize: '20px',
            fontWeight: 'bold',
            marginRight: '16px',
          }}
        >
          CIRA
        </Typography.Text>
      </div>

      {/* Home Button */}
      <Button
        type="link"
        icon={<HomeOutlined />}
        style={{ color: 'black' }}
        onClick={() => navigate('/')}
      />

      {/* Profile Dropdown (aligned to the right) */}
      <div style={{ marginLeft: 'auto' }}>
        <Dropdown overlay={profileMenu} placement="bottomRight">
          <Avatar icon={<UserOutlined />} style={{ cursor: 'pointer', color: 'black', borderColor: 'black' }} />
        </Dropdown>
      </div>
    </Header>
  );
};

export default MenuBar;
