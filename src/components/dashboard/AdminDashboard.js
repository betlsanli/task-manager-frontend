import React, { useState, useEffect } from 'react';
import { Layout, Card, Col, Row, Typography, Button, List } from 'antd';
import axiosInstance from "../../axiosInstance";
import ProjectModal from '../projectsModal/ProjectsModal'; 
import UsersModal from '../usersModal/UsersModal'; 

const { Content } = Layout;
const { Title, Text } = Typography;

const AdminDashboard = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalProjects, setTotalProjects] = useState(0);
  const [totalTasks, setTotalTasks] = useState(0);
  const [isProjectModalVisible, setIsProjectModalVisible] = useState(false);
  const [isUsersModalVisible, setIsUsersModalVisible] = useState(false);

  useEffect(() => {
    axiosInstance.get(`/user/get-total-count`)
      .then((response) => {
        setTotalUsers(response.data);
      })
      .catch((error) => console.error('Error fetching total count of users:', error));

    axiosInstance.get(`/project/get-total-count`)
      .then((response) => {
        setTotalProjects(response.data);
      })
      .catch((error) => console.error('Error fetching total counts of projects:', error));

    axiosInstance.get(`/task/get-total-count`)
      .then((response) => {
        setTotalTasks(response.data);
      })
      .catch((error) => console.error('Error fetching total counts of tasks:', error));
  }, []);

  const showProjectModal = () => {
    setIsProjectModalVisible(true);
  };

  const closeProjectModal = () => {
    setIsProjectModalVisible(false);
  };

  const showUsersModal = () => {
    setIsUsersModalVisible(true);
  };

  const closeUsersModal = () => {
    setIsUsersModalVisible(false);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout>
        <Content style={{ margin: '16px' }}>
          {/* Statistics Cards */}
          <Row gutter={16}>
            <Col span={8}>
              <Card>
                <Title level={4}>{totalUsers}</Title>
                <Text>Total Users</Text>
              </Card>
            </Col>
            <Col span={8}>
              <Card>
                <Title level={4}>{totalProjects}</Title>
                <Text>Total Projects</Text>
              </Card>
            </Col>
            <Col span={8}>
              <Card>
                <Title level={4}>{totalTasks}</Title>
                <Text>Total Tasks</Text>
              </Card>
            </Col>
          </Row>

          {/* Quick Actions */}
          <div style={{ marginTop: '20px' }}>
            <Title level={4}>Quick Actions</Title>
            <Row gutter={16}>
              <Col span={12}>
                <Card>
                  <Title level={5}>Manage Users</Title>
                  <Text>View, edit, or delete user accounts.</Text>
                  <Button type="primary" block style={{ marginTop: '10px' }} onClick={showUsersModal}>
                    Manage Users
                  </Button>
                </Card>
              </Col>
              <Col span={12}>
                <Card>
                  <Title level={5}>Manage Projects</Title>
                  <Text>View, edit, or delete projects and tasks.</Text>
                  <Button type="primary" block style={{ marginTop: '10px' }} onClick={showProjectModal}>
                    Manage Projects
                  </Button>
                </Card>
              </Col>
              {/* <Col span={8}>
                <Card>
                  <Title level={5}>Review Reports</Title>
                  <Text>Check submitted reports or flagged content.</Text>
                  <Button type="primary" block style={{ marginTop: '10px' }}>
                    Go
                  </Button>
                </Card>
              </Col> */}
            </Row>
          </div>

          {/* Recent Activity */}
          <div style={{ marginTop: '20px' }}>
            <Title level={4}>Recent Activity</Title>
            <List
              bordered
              dataSource={[
                'User JohnDoe123 created a new project',
                'User JaneDoe flagged an issue',
                'Admin updated system settings',
              ]}
              renderItem={(item) => <List.Item>{item}</List.Item>}
            />
          </div>

          <ProjectModal
            visible={isProjectModalVisible}
            onClose={closeProjectModal}
          />

          <UsersModal
            visible={isUsersModalVisible}
            onClose={closeUsersModal}
          />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminDashboard;
