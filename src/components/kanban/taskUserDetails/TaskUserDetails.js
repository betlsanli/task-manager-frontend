import React, { useState, useEffect } from "react";
import { Avatar, List, Button, Select } from 'antd';
import axiosInstance from "../../../axiosInstance";
import './TaskUserDetails.css';

const { Option } = Select;

const TaskUserDetails = ({ task}) => {
  const [assigneeList, setAssigneeList] = useState([]);
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    if (task) {
      setAssigneeList(task.assignees);

      axiosInstance.get(`/team/${task.projectId}`)
      .then(response => {
        const projectUsers = response.data.map((assignment) => assignment.userDto);
        setAllUsers(projectUsers);
      })
      .catch(error => {
        console.error('Failed to fetch all users of list', error);
      });
    }

  }, [task]);



  const handleAssigneeUpdate = () => {
    const updatedTask = { 
      ...task, 
      assignees: assigneeList.map(user => user.userId) // Extract only userId
    };
    console.log("Updating task with:", updatedTask); // Debugging

    axiosInstance.put(`/task/edit/${task.id}`, updatedTask)
      .then(response => {
        const updatedTaskData = response.data;
        console.log("Task updated successfully:", updatedTaskData); // Debugging
        setAssigneeList(updatedTaskData.assignees);
      })
      .catch(error => {
        console.error('Failed to update task', error);
      });
  };

  const handleRemoveUser = (userId) => {

    var user = assigneeList.find(user => user.userId === userId);
    var index = assigneeList.indexOf(user)
    if (index !== -1) {
      assigneeList.splice(index, 1);
    }

    handleAssigneeUpdate();
  };

  const handleSelectChange = (value) => {
    setSelectedUserIds(value);
  };

  const handleAddUsers = () => {
    const selectedUsers = allUsers.filter(user =>
      selectedUserIds.includes(user.userId) && !assigneeList.some(existingUser => existingUser.userId === user.userId)
    );

    selectedUsers.forEach(element => {assigneeList.push(element)})
    console.log('assignee list', assigneeList);
    
    handleAssigneeUpdate();
    setSelectedUserIds([]); // Clear selected IDs

  };

  const userSelect = () => {
    const unassignedUsers = allUsers.filter(user => 
      !assigneeList.some(assignedUser => assignedUser.userId === user.userId)
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
    <>
      <div style={{ marginBottom: '16px' }}>Assigned Users</div>
      <List
        itemLayout="horizontal"
        dataSource={assigneeList}
        footer={
          <div style={{display: 'flex', justifyContent:'space-between', gap:'16px', alignItems:'center'}}>
            {userSelect()}
            <Button
              type="primary"
              onClick={handleAddUsers}
              style={{ background: '#5786c8' }}
            >
              Add Selected Users
            </Button>
          </div>
        }
        renderItem={user => (
          <List.Item
            actions={[<Button danger type="link" onClick={() => handleRemoveUser(user.userId)}>Remove</Button>]}
          >
            <List.Item.Meta
              avatar={<Avatar>{user.firstName[0]}{user.lastName[0]}</Avatar>}
              title={`${user.firstName} ${user.lastName}`}
            />
            <div>{user.email}</div>
          </List.Item>
        )}
      />
    </>
  );
};

export default TaskUserDetails;