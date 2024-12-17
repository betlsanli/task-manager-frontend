import React, { useState, useEffect } from 'react';
import { Modal, Avatar, Tabs, Button, Input, DatePicker, Select, Form } from 'antd';
import dayjs from 'dayjs';
import axios from 'axios';
import './TaskDetail.css';
import TaskUserDetails from '../taskUserDetails/TaskUserDetails';
import DeleteConfirmationModal from '../../taskDeletion/DeleteConfirmationModal';

const { TabPane } = Tabs;

const { Option } = Select;

const formatDate = (date) => (date ? dayjs(date).format('YYYY-MM-DD HH:mm') : 'N/A');

const priorityOptions = [
  { key: 'LOW', value: 'Low' },
  { key: 'MEDIUM', value: 'Medium' },
  { key: 'HIGH', value: 'High' },
  { key: 'CRITICAL', value: 'Critical' },
];

const statusOptions = [
  { key: 'TO_DO', value: 'To Do' },
  { key: 'IN_PROGRESS', value: 'In Progress' },
  { key: 'DONE', value: 'Done' },
];

const TaskDetail = ({ visible, task, onClose, onSave, handleDeleteTask}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [taskData, setTaskData] = useState(task);
  const [form] = Form.useForm();
  const [showDeleteModal, setShowDeleteModal] = useState(false);


  useEffect(() => {
    if (task) {
      setTaskData(task);
      form.setFieldsValue({
        title: task.title,
        description: task.description,
        priority: task.priority,
        status: task.status,
        dueDate: task.dueDate ? dayjs(task.dueDate) : null,
        /* startedAt: task.startedAt ? dayjs(task.startedAt) : null,
        completedAt: task.completedAt ? dayjs(task.completedAt) : null, */
      });
    }
  }, [task]);

  const handleSaveClick = () => {
    const now = new Date();
    form.validateFields().then((values) => {
      const updatedTask = { ...taskData, ...values };

      // Update startedAt and completedAt based on the new status
    if (updatedTask.status === 'TO_DO') {
      updatedTask.startedAt = null;
      updatedTask.completedAt = null;
    } 
    else if (updatedTask.status === 'IN_PROGRESS') {
      updatedTask.startedAt = updatedTask.startedAt || now; // Define startedAt if not already set
      updatedTask.completedAt = null; // Ensure completedAt is null
    } 
    else if (updatedTask.status === 'DONE') {
      updatedTask.completedAt = updatedTask.completedAt || now; // Define completedAt if not already set
    }

      axios
        .put(`/task/edit/${task.id}`, updatedTask)
        .then((response) => {
          onSave(response.data); // Pass updated task to parent
          setIsEditing(false);
        })
        .catch((error) => {
          console.error('Failed to update task', error);
        });
    });
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    form.resetFields();
    onClose(); // Close the modal
  };

  const handleOpenDeleteModal = () => {
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const onTaskDeleted = (taskId) =>{
    handleDeleteTask(taskId);
    onClose(); // Close the modal
  }
  return (
    <>
      {/* Main Task Details Modal */}
      <Modal
        visible={visible}
        title={`Task Details - ${taskData?.title || ''}`}
        onCancel={handleCancelClick}
        footer={[]} 
      >
        {task ? (
        <>
          <Tabs defaultActiveKey="1" style={{ marginTop: '-24px' }}>

            <TabPane tab="Details" key="1">

              <Form form={form} layout="vertical" disabled={!isEditing}>
                <Form.Item
                  label="Title"
                  name="title"
                  rules={[
                    { required: true, message: 'Please enter the task title' },
                    { max: 128, message: 'Title cannot be more than 128 characters long' },
                  ]}
                >
                  <Input />
                </Form.Item>

                <div className="task-meta">
                  <div>
                    <p>Created At: {formatDate(task.createdAt)}</p>
                  </div>
                  <div>
                    <p>Last Modified At: {formatDate(task.lastModifiedAt)}</p>
                  </div>
                </div>

                <Form.Item
                  label="Description"
                  name="description"
                  rules={[{ max: 512, message: 'Description cannot be more than 512 characters long' }]}
                >
                  <Input.TextArea style={{ minHeight: '128px' }} />
                </Form.Item>

                <Form.Item label="Priority" name="priority">
                  <Select>
                    {priorityOptions.map((option) => (
                      <Option key={option.key} value={option.key}>
                        {option.value}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item label="Status" name="status">
                  <Select>
                    {statusOptions.map((option) => (
                      <Option key={option.key} value={option.key}>
                        {option.value}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item label="Due Date" name="dueDate">
                  <DatePicker showTime={{ format: 'HH:mm' }} format="YYYY-MM-DD HH:mm" />
                </Form.Item>
              </Form>

              <>
                {!isEditing && (
                <>
                  <Button key="delete" type="danger" style={{ marginRight: '8px' }} onClick={handleOpenDeleteModal}>
                    Delete
                  </Button>
                  <Button key="edit" type="primary" onClick={() => setIsEditing(true)}>
                    Edit
                  </Button>
                </>
                )}
                {isEditing && (
                  <>
                    <Button key="cancel" style={{ marginRight: '8px' }} onClick={handleCancelClick}>
                      Cancel
                    </Button>
                    <Button key="save" type="primary" onClick={handleSaveClick}>
                      Save
                    </Button>
                  </>
                )}
                </>

            </TabPane>

            <TabPane tab="Users" key="2">
              <TaskUserDetails task={task} />
            </TabPane>

          </Tabs>
        </>
        ) : (
          <p>Loading...</p>
        )}

       
      </Modal>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        visible={showDeleteModal}
        onClose={handleCloseDeleteModal}
        taskId={task?.id}
        onDelete = {onTaskDeleted}
      />
    </>
  );
};

export default TaskDetail;
