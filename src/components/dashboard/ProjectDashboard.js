import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Layout, Row, Col, Card, Typography, Spin, Button, Progress, Form, Input, message } from 'antd';
import { Pie } from 'react-chartjs-2';
import axiosInstance from '../../axiosInstance';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import dayjs from 'dayjs';
import AssignUsersModal from '../assignUsersModal/AssignUsersModal'; 

ChartJS.register(ArcElement, Tooltip, Legend);

const { Title, Text } = Typography;
const { Content } = Layout;

const formatDate = (date) => (date ? dayjs(date).format('YYYY-MM-DD HH:mm') : 'N/A');

const ProjectDashboard = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [taskStats, setTaskStats] = useState(null);
  const [priorityStats, setPriorityStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [totalTaskCount, setTotalTaskCount] = useState(null);
  const [isEditable, setIsEditable] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [assignedUsersCount, setAssignedUsersCount] = useState(null);
  const [form] = Form.useForm();
  const [isAssignUsersModalVisible, setIsAssignUsersModalVisible] = useState(false); // Modal visibility state

  useEffect(() => {
    // Fetch project details
    axiosInstance
      .get(`/project/${projectId}`)
      .then((response) => {
        setProject(response.data);
        form.setFieldsValue({ title: response.data.title, description: response.data.description });
      })
      .catch((error) => {
        console.error('Error fetching project details:', error);
      });

    // Fetch task statistics
    axiosInstance
      .get(`/task/status-stats/${projectId}`)
      .then((response) => {
        setTaskStats(response.data);
      })
      .catch((error) => {
        console.error('Error fetching task stats:', error);
      });

    // Fetch task priority statistics
    axiosInstance
      .get(`/task/priority-stats/${projectId}`)
      .then((response) => {
        setPriorityStats(response.data);
      })
      .catch((error) => {
        console.error('Error fetching task priority stats:', error);
      });

    // Fetch total task count
    axiosInstance
      .get(`/task/get-total-count/${projectId}`)
      .then((response) => {
        setTotalTaskCount(response.data);
      })
      .catch((error) => {
        console.error('Error fetching total task count:', error);
      })
      .finally(() => {
        setLoading(false);
      });

    // Fetch assigned users count
    axiosInstance
      .get(`/team/get-count/${projectId}`)
      .then((response) => {
        setAssignedUsersCount(response.data); // Set the count of assigned users
      })
      .catch((error) => {
        console.error('Error fetching assigned users count:', error);
      })
      .finally(() => {
        setLoading(false);
      });

    const user = JSON.parse(localStorage.getItem('user'));
    // Check if the user is an admin
    if (user.isAdmin) {
      setIsEditable(true); // Allow editing if the user is an admin
    } else {
      // Fetch the user's role for this specific project
      axiosInstance
        .get(`/team/get-role/${projectId}`)
        .then((response) => {
          const roles = response.data;
          // Check if the user is a manager for the project
          if (roles.includes('MANAGER')) {
            setIsEditable(true);
          }
        })
        .catch((error) => {
          console.error('Error fetching user roles:', error);
        });
    }
  }, [projectId, form]);

  const updateAssignedUsersCount = (newCount) => {
    setAssignedUsersCount(newCount);
  };

  const handleSubmit = (values) => {
    const updatedProject = { title: values.title, description: values.description };
    axiosInstance
      .put(`/project/edit/${projectId}`, updatedProject)
      .then((response) => {
        message.success('Project updated successfully');
        setProject(response.data);
        setIsEditMode(false); // Exit edit mode after successful update
      })
      .catch((error) => {
        message.error('Error updating project');
        console.error('Error updating project:', error);
      });
  };

  const handleCancel = () => {
    form.setFieldsValue({ title: project?.title, description: project?.description });
    setIsEditMode(false); //Exit edit mode when canceled
  };

  const statusChartData = {
    labels: taskStats ? taskStats.map((stat) => stat.status) : [],
    datasets: [
      {
        label: 'Task Status Distribution',
        data: taskStats ? taskStats.map((stat) => stat.count) : [],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverOffset: 4,
      },
    ],
  };

  const priorityChartData = {
    labels: priorityStats ? priorityStats.map((stat) => stat.priority) : [],
    datasets: [
      {
        label: 'Task Priority Distribution',
        data: priorityStats ? priorityStats.map((stat) => stat.count) : [],
        backgroundColor: ['#FB4848', '#FCFA59', '#FFB044', '#C0FF63'],
        hoverOffset: 4,
      },
    ],
  };

  const calculateProgress = () => {
    if (!taskStats) return 0;

    const doneTasks = taskStats.find((stat) => stat.status === 'DONE')?.count || 0;
    const totalTasks = taskStats.reduce((acc, stat) => acc + stat.count, 0);

    return totalTasks === 0 ? 0 : (doneTasks / totalTasks) * 100;
  };

  const progressPercentage = calculateProgress();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content style={{ padding: '20px', background: '#f5f5f5' }}>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Card>
              {loading ? (
                <Spin tip="Loading..." />
              ) : (
                <>
                  <Title level={4}>
                    <Form
                      form={form}
                      layout="vertical"
                      onFinish={handleSubmit}
                      initialValues={{ title: project?.title, description: project?.description }}
                    >
                      <Form.Item
                        name="title"
                        label="Project Title"
                        rules={[{ required: true, message: 'Please input the project title!' }]}
                      >
                        <Input autoFocus disabled={!isEditMode} />
                      </Form.Item>

                      <Form.Item
                        name="description"
                        label="Project Description"
                        rules={[{ required: true, message: 'Please input the project description!' }]}
                      >
                        <Input.TextArea disabled={!isEditMode} />
                      </Form.Item>

                      <div className="task-meta">
                        <div>
                          <p>Created At: {formatDate(project?.createdAt)}</p>
                        </div>
                        <div>
                          <p>Last Modified At: {formatDate(project?.lastModifiedAt)}</p>
                        </div>
                      </div>

                      {isEditable && (
                        <div style={{ marginTop: '20px' }}>
                          {!isEditMode ? (
                            <Button
                              type="primary"
                              onClick={() => setIsEditMode(true)} // Allow editing
                            >
                              Edit
                            </Button>
                          ) : (
                            <div>
                              <Button type="primary" htmlType="submit" style={{ marginRight: '10px' }}>
                                Save
                              </Button>
                              <Button onClick={handleCancel}>Cancel</Button>
                            </div>
                          )}
                        </div>
                      )}
                    </Form>
                  </Title>
                </>
              )}
            </Card>
          </Col>

          {/* Progress Bar for task completion with percentage */}
          <Col span={24}>
            {loading ? (
              <Spin tip="Loading task progress..." />
            ) : (
              <>
                <div style={{ marginBottom: '10px', fontSize: '16px', fontWeight: 'bold' }}>
                  {`Progress: ${progressPercentage.toFixed(2)}%`}
                </div>
                <Progress
                  percent={progressPercentage}
                  status="active"
                  showInfo={false}
                  strokeColor="#4BC0C0"
                  style={{ marginBottom: '20px' }}
                />
              </>
            )}
          </Col>

          {/* Task Status Pie Chart */}
          <Col span={6}>
            <Card>
              {loading ? (
                <Spin tip="Loading Task Status Stats..." />
              ) : (
                <>
                  <Title level={4}>Task Status Stats</Title>
                  <div style={{ height: '300px', width: '300px' }}>
                    <Pie data={statusChartData} height={300} width={300} />
                  </div>
                </>
              )}
            </Card>
          </Col>

          {/* Task Priority Pie Chart */}
          <Col span={6}>
            <Card>
              {loading ? (
                <Spin tip="Loading Task Priority Stats..." />
              ) : (
                <>
                  <Title level={4}>Task Priority Stats</Title>
                  <div style={{ height: '300px', width: '300px' }}>
                    <Pie data={priorityChartData} height={300} width={300} />
                  </div>
                </>
              )}
            </Card>
          </Col>

          <Col span={12}>
            <Card style={{ marginBottom: '35px' }}>
              {loading ? (
                <Spin tip="Loading Total Task Count..." />
              ) : (
                <>
                  <Title level={4}>Total Task Count</Title>
                  <Text>{totalTaskCount !== null ? totalTaskCount : 'N/A'}</Text>

                  {/* Button below the total task count */}
                  <div style={{ marginTop: '20px' }}>
                    <Button
                      type="primary"
                      onClick={() => navigate(`/project-kanban/${projectId}`)}
                      style={{ width: '100%' }}
                    >
                      Go to Kanban Board
                    </Button>
                  </div>
                </>
              )}
            </Card>

            <Card style={{ marginTop: '35px' }}>
              <div>
                <Title level={4}>Assigned Users</Title>
                <Text>{assignedUsersCount !== null ? assignedUsersCount : 'N/A'}</Text>

                {/* Conditionally render the button based on isEditable */}
                {isEditable && (
                  <div style={{ marginTop: '20px' }}>
                    <Button
                      type="primary"
                      onClick={() => setIsAssignUsersModalVisible(true)} // Show the modal when clicked
                      style={{ width: '100%' }}
                    >
                      Assign Users
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          </Col>
        </Row>

        {/* Assign Users Modal */}
        <AssignUsersModal
          projectId={projectId}
          visible={isAssignUsersModalVisible}
          onClose={() => setIsAssignUsersModalVisible(false)} // Close the modal
          updateAssignedUsersCount={updateAssignedUsersCount}
        />

      </Content>
    </Layout>
  );
};

export default ProjectDashboard;
