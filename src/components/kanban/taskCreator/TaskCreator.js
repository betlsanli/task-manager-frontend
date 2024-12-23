import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Button, DatePicker, Select, List, Avatar } from 'antd';
import axiosInstance from '../../../axiosInstance';


const { Option } = Select;

const TaskCreator = ({ projectId, visible, onClose, addNewTaskToProject}) => {
  const [form] = Form.useForm();
  const [allUsers, setAllUsers] = useState([]);
  const [assigneeList, setAssigneeList] = useState([]);
  const [selectedUserIds, setSelectedUserIds] = useState([]);


  const handleFinish = (values) => {
    const now = new Date().toISOString();

    const newTask = {
      ...values,
      projectId,
      dueDate: values.dueDate ? values.dueDate.toISOString() : null,
      assignees: assigneeList.map(user => user.userId),
      startedAt: values.status === 'IN_PROGRESS' ? now : null,
      completedAt: values.status === 'DONE' ? now : null,
    };

    axiosInstance.post('/task/create-task', newTask)
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

  const handleClose = () => {
    setSelectedUserIds([]);  // Reset selected users
    setAssigneeList([]);      // Reset assignees
    onClose();                // Call the original onClose handler
  };
  

  useEffect(() => {
    if (!visible) {
      form.resetFields();
      setSelectedUserIds([]);  // Reset selected users here too
      setAssigneeList([]);
    }
    if (projectId == null) {
      return null;
    }
    axiosInstance.get(`/team/${projectId}`)
      .then(response => {
        const projectUsers = response.data.map((assignment) => assignment.userDto);
        setAllUsers(projectUsers);
      })
      .catch(error => {
        console.error('Failed to fetch all users of list', error);
      });
  }, [visible, form, projectId]);

  const handleSelectChange = (value) => {
    console.log("Selected user IDs from dropdown:", value);
    setSelectedUserIds(value);
  };
  

  const handleAddUsers = () => {
    console.log("Selected User IDs before adding to assigneeList:", selectedUserIds);
  
    const selectedUsers = allUsers.filter(user =>
      selectedUserIds.includes(user.userId) && !assigneeList.some(existingUser => existingUser.userId === user.userId)
    );
  
    console.log("Users to be added to assigneeList:", selectedUsers);
  
    setAssigneeList(prevList => [...prevList, ...selectedUsers]);
    setSelectedUserIds([]); // Clear selected IDs
  };
  

  const handleRemoveUser = (userId) => {
    setAssigneeList(prevList => prevList.filter(user => user.userId !== userId));
  };

  const userSelect = () => {
    const unassignedUsers = allUsers.filter(user =>
      !assigneeList.some(selectedUser => selectedUser.userId === user.userId)
    );

    return (
      <Select
        mode="multiple"
        allowClear
        showSearch
        placeholder="Assign a new user"
        optionFilterProp="children"
        onChange={handleSelectChange}
        value={selectedUserIds}
      >
        {unassignedUsers.map(user => (
          <Option key={user.userId} value={user.userId}>
            {user.firstName} {user.lastName}
          </Option>
        ))}
      </Select>
    );
  };

  return (
    <Modal
      title="Create a new task"
      visible={visible}
      onCancel={handleClose}
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

        <div>
          <div style={{ marginBottom: '16px' }}>Assign Users</div>
          <List
            itemLayout="horizontal"
            dataSource={assigneeList}
            footer={
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', alignItems: 'center' }}>
                {userSelect()}
                <Button
                  type="default"
                  onClick={handleAddUsers}
                >
                  Add Selected Users
                </Button>
              </div>
            }
            renderItem={user => (
              <List.Item
                key={user.userId}
                actions={[
                  <Button
                    danger
                    onClick={() => handleRemoveUser(user.userId)}
                    type='link'
                  >
                    Remove
                  </Button>
                ]}
              >
                <List.Item.Meta
                  avatar={<Avatar>{user.firstName[0]}</Avatar>}
                  title={`${user.firstName} ${user.lastName}`}
                />
              </List.Item>
            )}
          />
        </div>

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
