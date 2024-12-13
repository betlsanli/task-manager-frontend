import React, { useEffect, useState } from 'react';
import Column from './column/Column.js';
import { TaskStatus } from './types.js';
import './Kanban.css';
import { DndContext } from '@dnd-kit/core';
import { v4 as uuidv4 } from 'uuid'; // Import the uuid package
//import TaskModal from './taskcard/TaskModal'; 
import axios from 'axios';


const columns = [
  { id: TaskStatus.TO_DO, title: 'To Do' },
  { id: TaskStatus.IN_PROGRESS, title: 'In Progress' },
  { id: TaskStatus.DONE, title: 'Done' },
];

//we will handle the infinite scroll horizontally later

const Kanban = ({projectId}) => {
  //const [tasks, setTasks] = useState(initialTasks);

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (!projectId) return;
    try {
      axios.get(`/task/of-project/${projectId}`)
      .then((response) => setTasks(response.data))
      .catch((error) => console.error('Error fetching tasks:', error));
      
      //setTasks(sampleTasks);

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
  
    // Optimistically update the UI
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? { ...task, status: newStatus }
          : task
      )
    );
  
    try {
      // Save the updated status to the backend
      await axios.put(`/task/edit/${taskId}`, {
        ...taskToUpdate,
        status: newStatus, // Update the status
      });
    } catch (error) {
      console.error('Error updating task status:', error);
  
      // Rollback the change if the request fails
      setTasks((prev) =>
        prev.map((task) =>
          task.id === taskId
            ? { ...task, status: taskToUpdate.status } // Revert to the old status
            : task
        )
      );
    }
  };
  

  const handleAddTask = (newTask) => {
    setTasks((prevTasks) => [
      ...prevTasks,
      {
        ...newTask,
        id: uuidv4(),
      },
    ]);
  };

  const handleUpdateTask = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  return (
    <div className="kanban-container">
      <div className="columns-container">
        <DndContext onDragEnd={handleDragEnd}>
          {columns.map((column) => (
            <Column
              key={column.id}
              column={column}
              tasks={tasks.filter((task) => task.status === column.id)}
              onAddTask={handleAddTask} 
             // onTaskClick={handleTaskClick}
             onUpdateTask={handleUpdateTask}
            />
          ))}
        </DndContext>
      </div>
      
    </div>
  );
};

export default Kanban;
