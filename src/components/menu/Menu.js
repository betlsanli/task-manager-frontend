import React, { useEffect, useState } from 'react';
import { Layout, Menu, Dropdown, Avatar, Button, Divider, Typography, Input } from 'antd';
import { SearchOutlined, DownOutlined, HomeOutlined, PlusOutlined, UserOutlined } from '@ant-design/icons';
import axiosInstance from '../../axiosInstance';
import { useNavigate } from 'react-router-dom';

const { Header } = Layout;

const sampleProjects = [
  { id: 1, name: 'Project 1' },
  { id: 2, name: 'Project 2' },
  { id: 3, name: 'Project 3' },
];

const sampleTeams = [
  { id: 1, name: 'Team 1' },
  { id: 2, name: 'Team 2' },
  { id: 3, name: 'Team 3' },
];

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

  const projectMenu = (
    <Menu>
      {sampleProjects.map((project) => (
        <Menu.Item key={project.id} onClick={() => navigate(`/project-dashboard/${project.id}`)}>
          {project.name}
        </Menu.Item>
      ))}
      <Menu.Divider />
      <Menu.Item onClick={() => navigate('/projects')}>See All Projects</Menu.Item>
      <Menu.Item icon={<PlusOutlined />}>Add Project</Menu.Item>
    </Menu>
  );

  const teamMenu = (
    <Menu>
      {sampleTeams.map((team) => (
        <Menu.Item key={team.id} onClick={() => navigate(`/team/${team.id}`)}>
          {team.name}
        </Menu.Item>
      ))}
      <Menu.Divider />
      <Menu.Item onClick={() => navigate('/teams')}>See All Teams</Menu.Item>
      <Menu.Item icon={<PlusOutlined />}>Add Team</Menu.Item>
    </Menu>
  );

  const profileMenu = (
    <Menu>
      {currentUser && (
        <>
          <Menu.Item disabled style={{ color: 'black' }}>
            Name: {currentUser.firstName} {currentUser.lastName}
          </Menu.Item>
          <Menu.Item disabled style={{color: 'black'}}>Email: {currentUser.email}</Menu.Item>
          <Menu.Item disabled style={{color: 'black'}}>
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
    <Header style={{ backgroundColor: '#664192', display: 'flex', alignItems: 'center' }}>
      <Button type="link" icon={<HomeOutlined />} 
      style={{ color: 'white'}} 
      onClick={() => navigate('/')} 
      
      />

      {/* Projects Dropdown */}
      <Dropdown overlay={projectMenu} placement="bottomLeft">
        <Typography.Link style={{ color: 'white', marginLeft: 16, cursor: 'pointer' }}>
          Projects <DownOutlined />
        </Typography.Link>
      </Dropdown>

      {/* Teams Dropdown */}
      <Dropdown overlay={teamMenu} placement="bottomLeft">
        <Typography.Link style={{ color: 'white', marginLeft: 16, cursor: 'pointer' }}>
          Teams <DownOutlined />
        </Typography.Link>
      </Dropdown>

      {/* Search Bar */}
      <Input
        placeholder="Search"
        prefix={<SearchOutlined />}
        style={{ width: 300, marginLeft: 'auto', marginRight: 16 }}
      />

      {/* Profile Dropdown */}
      <Dropdown overlay={profileMenu} placement="bottomRight">
        <Avatar icon={<UserOutlined />} style={{ cursor: 'pointer' }} />
      </Dropdown>
    </Header>
  );
};

export default MenuBar;
