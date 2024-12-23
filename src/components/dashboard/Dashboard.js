import React, { useState, useEffect } from 'react';
import { Layout, Card, Col, Row, Typography, Button, Space, Table } from 'antd';
import { useNavigate } from 'react-router-dom';
import axiosInstance from "../../axiosInstance";
import TaskDetail from '../kanban/taskDetail/TaskDetail.js'; 


const { Content } = Layout;
const { Title } = Typography;

const Dashboard = () => {
  const [assignedProjects, setAssignedProjects] = useState([]);
  const [assignedTasks, setAssignedTasks] = useState([]); // New state to store assigned tasks
  const [totalTasks, setTotalTasks] = useState(0);
  const navigate = useNavigate();
  const [selectedTask, setSelectedTask] = useState(null); 
  const [modalVisible, setModalVisible] = useState(false); 


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
      .then(async (response) => {
        console.log('Assigned Tasks:', response.data);

        // Fetch project titles for each task
        const tasksWithProjectTitles = await Promise.all(response.data.map(async (task) => {
          const projectResponse = await axiosInstance.get(`/project/${task.projectId}`);
          return {
            ...task,
            projectTitle: projectResponse.data.title, // Add project title
          };
        }));

        setAssignedTasks(tasksWithProjectTitles);
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
          type="primary"
          onClick={() => {
            setSelectedTask(record);
            setModalVisible(true); 
          }}
        >
          Edit Task
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
      {/* Task Detail Modal */}
      <TaskDetail
        visible={modalVisible}
        task={selectedTask}
        onClose={() => setModalVisible(false)}
        onSave={(updatedTask) => {
          setAssignedTasks((prevTasks) =>
            prevTasks.map((task) =>
              task.id === updatedTask.id ? updatedTask : task
            )
          );
          setModalVisible(false);
        }}
      />
    </Layout>
  );
};

export default Dashboard;
