import React, { useState, useEffect } from 'react';
import { Modal, Avatar, Table, Button, Input, DatePicker, Select, Form } from 'antd';
import dayjs from 'dayjs';
import axios from 'axios';
import './TaskDetail.css';

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

const TaskDetails = ({ visible, task, onClose, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [taskData, setTaskData] = useState(task);
  const [form] = Form.useForm();

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
    form.validateFields().then((values) => {
      const updatedTask = { ...taskData, ...values };
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

  return (
    <Modal
      visible={visible}
      title={`Task Details - ${taskData?.title || ''}`}
      onCancel={handleCancelClick}
      footer={[
        isEditing ? (
          <>
            <Button key="cancel" onClick={handleCancelClick}>
              Cancel
            </Button>
            <Button key="save" type="primary" onClick={handleSaveClick}>
              Save
            </Button>
          </>
        ) : (
          <Button key="edit" type="primary" onClick={() => setIsEditing(true)}>
            Edit
          </Button>
        ),
      ]}
    >
      

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
        <div className="task-meta">
            <div>
              <p>Started At: {formatDate(task.startedAt)}</p>
            </div>
            <div>
              <p>Completed At: {formatDate(task.completedAt)}</p>
            </div>
      </div>
      </Form>
    </Modal>
  );
};

export default TaskDetails;
