import React, { useState, useEffect } from 'react';
import { Layout, Card, Col, Row, Typography, Button } from 'antd';
import axiosInstance from "../../axiosInstance";
import ProjectModal from '../projectsModal/ProjectsModal'; 

const { Content } = Layout;
const { Title, Text } = Typography;

const Dashboard = () => {
  const [assignedProjects, setAssignedProjects] = useState([]);
  const [totalTasks, setTotalTasks] = useState(0);
  const [isProjectModalVisible, setIsProjectModalVisible] = useState(false);

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem('user')).id;
    
    //assigned projects
    axiosInstance.get(`/project/all-project`)
      .then((response) => {
        console.log('Assigned Projects:', response.data); 
        setAssignedProjects(response.data);
      })
      .catch((error) => console.error('Error fetching assigned projects:', error));

    //total tasks count for assigned projects
    axiosInstance.get(`/task/get-total-count`)
      .then((response) => {
        console.log('Total Tasks Count:', response.data); 
        setTotalTasks(response.data);
      })
      .catch((error) => console.error('Error fetching total tasks count:', error));
  }, []);

  const showProjectModal = () => {
    setIsProjectModalVisible(true);
  };

  const closeProjectModal = () => {
    setIsProjectModalVisible(false);
  };

  return (
    <Layout style={{ minHeight: '100vh', paddingTop: '64px', paddingLeft: '200px' }}>
      <Layout>
        <Content style={{ margin: '16px' }}>
          {/* Statistics Cards */}
          <Row gutter={16}>
            <Col span={15}>
              <Card>
                <Title level={4}>{assignedProjects.length || 0}</Title>
                <Text>Assigned Projects</Text>
              </Card>
            </Col>
            <Col span={15} style={{ marginTop: '20px' }}>
              <Card>
                <Title level={4}>{totalTasks || 0}</Title>
                <Text>Total Tasks</Text>
              </Card>
            </Col>
          </Row>

          <div style={{ marginTop: '80px' }}>
            <Row gutter={16}>
              <Col span={20}>
                <Card>
                  <Title level={5}>Manage Projects</Title>
                  <Text>View, edit, or delete assigned projects and tasks.</Text>
                  <Button type="primary" block style={{ marginTop: '10px' }} onClick={showProjectModal}>
                    Manage Projects
                  </Button>
                </Card>
              </Col>
            </Row>
          </div>

          <ProjectModal
            visible={isProjectModalVisible}
            onClose={closeProjectModal}
          />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
