import React, { useEffect, useState } from 'react';
import Column from './column/Column.js';
import { TaskStatus } from './types.js';
import './Kanban.css';
import { DndContext } from '@dnd-kit/core';
import { v4 as uuidv4 } from 'uuid'; // Import the uuid package
import axiosInstance from '../../axiosInstance';
import TaskCreator from './taskCreator/TaskCreator.js';


const columns = [
  { id: TaskStatus.TO_DO, title: 'To Do' },
  { id: TaskStatus.IN_PROGRESS, title: 'In Progress' },
  { id: TaskStatus.DONE, title: 'Done' },
];


const Kanban = ({projectId}) => {
  const [tasks, setTasks] = useState([]);
  const [isTaskModalVisible, setTaskModalVisible] = useState(false);


  useEffect(() => {
    if (!projectId) return;
    try {
      axiosInstance.get(`/task/of-project/${projectId}`)
      .then((response) => setTasks(response.data))
      .catch((error) => console.error('Error fetching tasks:', error));

    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  }, [projectId]);

  
  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (!over) return;
  
    const taskId = active.id; // ID of the dragged task
    const newStatus = over.id; // ID of the column it was dragged to
  
    const taskToUpdate = tasks.find((task) => task.id === taskId);
    if (!taskToUpdate || taskToUpdate.status === newStatus) return;

  
    const updatedTask = {
      ...taskToUpdate,
      status: newStatus,
      startedAt: newStatus === TaskStatus.TO_DO ? null: 
      newStatus === TaskStatus.IN_PROGRESS ? new Date().toISOString() : taskToUpdate.startedAt,
      completedAt: newStatus === TaskStatus.TO_DO || newStatus === TaskStatus.IN_PROGRESS
      ? null
      :newStatus === TaskStatus.DONE ? new Date().toISOString() : taskToUpdate.completedAt,
    };
  
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? updatedTask : task
      )
    );
  
    try {
      // Save the updated status and timestamps to the backend
      await axiosInstance.put(`/task/edit/${taskId}`, updatedTask);
    } catch (error) {
      console.error('Error updating task status:', error);
  
      // Rollback the change if the request fails
      setTasks((prev) =>
        prev.map((task) =>
          task.id === taskId ? taskToUpdate : task
        )
      );
    }
  };
  

  const toggleTaskModal = () => {
    setTaskModalVisible(!isTaskModalVisible);
  };

  const addNewTaskToProject = (task) => {
    setTasks(prev => [...prev, task]);
  };

  const handleUpdateTask = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const deleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  }


  return (
    <div className="kanban-container">
      <button
        className="add-task-button"
        onClick={toggleTaskModal}
      >
        Create Task
      </button>
      <div className="columns-container">
        <DndContext onDragEnd={handleDragEnd}>
          {columns.map((column) => (
            <Column
              key={column.id}
              column={column}
              tasks={tasks.filter((task) => task.status === column.id)}
              onUpdateTask={handleUpdateTask}
              handleDeleteTask = {deleteTask}

            />
          ))}
        </DndContext>
      </div>
      {/* TaskCreator Modal */}
      <TaskCreator
        visible={isTaskModalVisible}
        onClose={toggleTaskModal}
        addNewTaskToProject={addNewTaskToProject}
        projectId={projectId}
      />
    </div>
  );
};

export default Kanban;
