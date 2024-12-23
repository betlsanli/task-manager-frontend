import React, { useState, useEffect } from 'react';
import { Layout, Card, Col, Row, Typography, Button, Space, Table } from 'antd';
import { useNavigate } from 'react-router-dom';
import axiosInstance from "../../axiosInstance";

const { Content } = Layout;
const { Title } = Typography;

const Dashboard = () => {
  const [assignedProjects, setAssignedProjects] = useState([]);
  const [assignedTasks, setAssignedTasks] = useState([]); // New state to store assigned tasks
  const [totalTasks, setTotalTasks] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem('user')).userId;
    // Fetch assigned projects
    axiosInstance.get(`/project/all-project`)
      .then((response) => {
        console.log('Assigned Projects:', response.data);
        setAssignedProjects(response.data);
      })
      .catch((error) => console.error('Error fetching assigned projects:', error));

    // Fetch assigned tasks
    axiosInstance.get(`/task/of-user/${userId}`)
      .then((response) => {
        console.log('Assigned Tasks:', response.data);
        setAssignedTasks(response.data);
      })
      .catch((error) => console.error('Error fetching assigned tasks:', error));

    // Fetch total tasks count for assigned projects
    axiosInstance.get(`/task/get-total-count`)
      .then((response) => {
        console.log('Total Tasks Count:', response.data);
        setTotalTasks(response.data);
      })
      .catch((error) => console.error('Error fetching total tasks count:', error));
  }, []);

  // Table columns for displaying project details
  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'Last Modified',
      dataIndex: 'lastModified',
      key: 'lastModified',
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Button
          type="link"
          onClick={() => navigate(`/project-dashboard/${record.id}`)}
        >
          Go to Project
        </Button>
      ),
    },
  ];

  // Columns for displaying assigned tasks
  const taskColumns = [
    {
      title: 'Task Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Project',
      dataIndex: 'projectTitle',
      key: 'projectTitle',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Priority',
      dataIndex: 'priority',
      key: 'priority',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Button
          type="link"
          onClick={() => navigate(`/task-detail/${record.id}`)}
        >
          View Task
        </Button>
      ),
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh', paddingTop: '20px' }}>
      <Layout>
        <Content style={{ margin: '16px' }}>
          <Row gutter={[16, 16]} align="middle">
            {/* Assigned Projects Card */}
            <Col span={12} style={{ marginTop: '20px' }}>
              <Card style={{ height: '350px', display: 'flex', flexDirection: 'column' }}>
                <Title level={4}>Assigned Projects</Title>
                <div style={{ flex: 1, overflowY: 'auto' }}>
                  <Table
                    dataSource={assignedProjects}
                    columns={columns}
                    pagination={false}
                    rowKey="id"
                    size="small"
                  />
                </div>
              </Card>
            </Col>

            {/* Assigned Tasks Card */}
            <Col span={12} style={{ marginTop: '20px' }}>
              <Card style={{ height: '350px', display: 'flex', flexDirection: 'column' }}>
                <Title level={4}>Assigned Tasks</Title>
                <div style={{ flex: 1, overflowY: 'auto' }}>
                  <Table
                    dataSource={assignedTasks}
                    columns={taskColumns}
                    pagination={false}
                    rowKey="id"
                    size="small"
                  />
                </div>
              </Card>
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
