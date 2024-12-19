import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, Table, Input, Button, Space, Typography, Form, message } from 'antd';
import { SortAscendingOutlined, SortDescendingOutlined } from '@ant-design/icons';
import axiosInstance from "../../axiosInstance";
import DeleteConfirmationModal from '../DeletionConfirmation/DeleteConfirmationModal';
import ProjectDashboard from '../dashboard/ProjectDashboard'

const { Text } = Typography;

const ProjectsModal = ({ visible, onClose }) => {
  const navigate = useNavigate(); // Hook to navigate programmatically

  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [sortOrder, setSortOrder] = useState('ascend'); // Default ascending sort order
  const [sortField, setSortField] = useState('title'); // Default sorting by title
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [deleteProjectId, setDeleteProjectId] = useState(null);

  // Fetch projects on modal visibility
  useEffect(() => {
    if (visible) {
      axiosInstance.get('/project/all-project')
        .then((response) => {
          setProjects(response.data);
          setFilteredProjects(response.data); // Initially, show all projects
        })
        .catch((error) => console.error('Error fetching projects:', error));
    }
  }, [visible]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    filterProjects(e.target.value);
  };

  const filterProjects = (query) => {
    const filtered = projects.filter(project =>
      project.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProjects(filtered);
  };

  const handleCreateProject = (values) => {
    axiosInstance.post('/project/create-project', values)
      .then(response => {
        message.success('Project created successfully!');
        form.resetFields();
        setIsCreateModalVisible(false);
        // Refresh the list after creating the project
        setProjects(prevProjects => [response.data, ...prevProjects]);
        setFilteredProjects(prevProjects => [response.data, ...prevProjects]);
      })
      .catch((error) => {
        message.error('Error creating project!');
        console.error('Error creating project:', error);
      });
  };

  const handleSortChange = (pagination, filters, sorter) => {
    if (sorter.order) {
      setSortOrder(sorter.order);
      setSortField(sorter.field);
    }
  };

  const handleDeleteProject = (projectId) => {
    setDeleteProjectId(projectId);
    setIsDeleteModalVisible(true);
  };

  const handleConfirmDelete = async (projectId) => {
    try {
      setProjects(projects.filter(project => project.id !== projectId));
      setFilteredProjects(filteredProjects.filter(project => project.id !== projectId));
    } catch (error) {
      message.error('Failed to delete project');
      console.error('Failed to delete project', error);
    } finally {
      setIsDeleteModalVisible(false);
    }
  };

  const columns = [
    {
      title: (
        <>
          Title{' '}
          {sortField === 'title' && sortOrder === 'ascend' && <SortAscendingOutlined />}
          {sortField === 'title' && sortOrder === 'descend' && <SortDescendingOutlined />}
        </>
      ),
      dataIndex: 'title',
      key: 'title',
      sorter: (a, b) => a.title.localeCompare(b.title),
      sortOrder: sortField === 'title' ? sortOrder : null,
    },
    {
      title: (
        <>
          Created At{' '}
          {sortField === 'createdAt' && sortOrder === 'ascend' && <SortAscendingOutlined />}
          {sortField === 'createdAt' && sortOrder === 'descend' && <SortDescendingOutlined />}
        </>
      ),
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text) => <Text>{new Date(text).toLocaleDateString()}</Text>,
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
      sortOrder: sortField === 'createdAt' ? sortOrder : null,
    },
    {
      title: (
        <>
          Last Modified{' '}
          {sortField === 'lastModifiedAt' && sortOrder === 'ascend' && <SortAscendingOutlined />}
          {sortField === 'lastModifiedAt' && sortOrder === 'descend' && <SortDescendingOutlined />}
        </>
      ),
      dataIndex: 'lastModifiedAt',
      key: 'lastModifiedAt',
      render: (text) => <Text>{new Date(text).toLocaleDateString()}</Text>,
      sorter: (a, b) => new Date(a.lastModifiedAt) - new Date(b.lastModifiedAt),
      sortOrder: sortField === 'lastModifiedAt' ? sortOrder : null,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button type="link" onClick={() => navigate(`/project-dashboard/${record.id}`)}>Go to Project</Button>
          <Button type="link" danger onClick={() => handleDeleteProject(record.id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Modal
        title="Manage Projects"
        visible={visible}
        onCancel={onClose}
        footer={null}
        width={800}
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          <Input
            placeholder="Search Projects"
            value={searchQuery}
            onChange={handleSearchChange}
            style={{ marginBottom: 16 }}
          />
          <Button
            type="primary"
            onClick={() => setIsCreateModalVisible(true)}
            style={{ marginBottom: 16 }}
          >
            Create Project
          </Button>

          <Table
            columns={columns}
            dataSource={filteredProjects}
            rowKey="id"
            pagination={{
              pageSize: 5,
            }}
            onChange={handleSortChange}
            style={{ marginTop: 16 }}
          />
        </Space>
      </Modal>

      {/* Create Project Modal */}
      <Modal
        title="Create Project"
        open={isCreateModalVisible}
        onCancel={() => setIsCreateModalVisible(false)}
        footer={null}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleCreateProject}
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: 'Title is required' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Description (Optional)"
            name="description"
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Create Project
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        visible={isDeleteModalVisible}
        onClose={() => setIsDeleteModalVisible(false)}
        url={`/project/delete/${deleteProjectId}`}
        onDelete={handleConfirmDelete}
      />
    </>
  );
};

export default ProjectsModal;
