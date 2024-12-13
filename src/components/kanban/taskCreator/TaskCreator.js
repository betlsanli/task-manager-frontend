import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Button, DatePicker, Select } from 'antd';
import axios from 'axios';


const { Option } = Select;

const TaskCreator = ({ projectId, visible, onClose, addNewTaskToProject}) => {
  const [form] = Form.useForm();

  const handleFinish = (values) => {
    const newTask = {
      ...values,
      projectId,
      dueDate: values.dueDate ? values.dueDate.toISOString() : null,
      assignees: [],
    };

    axios.post('/task/create-task', newTask)
      .then(response => {
        console.log('Task created successfully:', response.data);
        addNewTaskToProject(response.data);
        onClose();
        form.resetFields();
      })
      .catch(error => {
        console.error('Failed to create task', error);
      });
  };

  useEffect(() => {
    if (!visible) {
      form.resetFields();
    }
  }, [visible, form]);

  return (
    <Modal
      title="Create a new task"
      visible={visible}
      onCancel={onClose}
      footer={null}
    >
      <Form layout="vertical" form={form} onFinish={handleFinish}>
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: 'Please enter the task title' }]}
        >
          <Input placeholder="Enter the task title" />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
        >
          <Input.TextArea placeholder="Enter the task description" />
        </Form.Item>
        <Form.Item
          name="priority"
          label="Priority"
        >
          <Select placeholder="Select priority">
            <Option value="LOW">Low</Option>
            <Option value="MEDIUM">Medium</Option>
            <Option value="HIGH">High</Option>
            <Option value="CRITICAL">Critical</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="status"
          label="Status"
        >
          <Select placeholder="Select status">
            <Option value="TO_DO">To Do</Option>
            <Option value="IN_PROGRESS">In Progress</Option>
            <Option value="DONE">Done</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="dueDate"
          label="Due Date"
        >
          <DatePicker
            showTime={{ format: 'HH:mm' }}
            format="YYYY-MM-DD HH:mm"
            initialValue={null}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Create Task
          </Button>
          <Button onClick={onClose} style={{ marginLeft: '8px' }}>
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TaskCreator;
