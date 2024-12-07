import React, { useState } from 'react';
import Column from './column/Column.js';
import { TaskStatus } from './types.js';
import './Kanban.css';
import { DndContext } from '@dnd-kit/core';
import { v4 as uuidv4 } from 'uuid'; // Import the uuid package

// Initial tasks data
const initialTasks = [
  { 
    id: '1', 
    title: 'Task 1', 
    description: 'Description for Task 1', 
    status: TaskStatus.TO_DO,
  },
  { 
    id: '2', 
    title: 'Task 2', 
    description: 'Description for Task 2', 
    status: TaskStatus.TO_DO,
  },
  { 
    id: '3', 
    title: 'Task 3', 
    description: 'Description for Task 3', 
    status: TaskStatus.IN_PROGRESS,
  },
  { 
    id: '4', 
    title: 'Task 4', 
    description: 'Description for Task 4', 
    status: TaskStatus.DONE,
  },
];

const columns = [
  { id: TaskStatus.TO_DO, title: 'To Do' },
  { id: TaskStatus.IN_PROGRESS, title: 'In Progress' },
  { id: TaskStatus.DONE, title: 'Done' },
];

const Kanban = () => {
  const [tasks, setTasks] = useState(initialTasks);

  const handleDragEnd = (event) => {
    const { active, over } = event;
  
    if (!over) return;
  
    const taskId = active.id;
    const newStatus = over.id;
  
    setTasks(() =>
      tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: newStatus,
            }
          : task
      )
    );
  };

  const handleAddTask = (newTask) => {
    setTasks((prevTasks) => [
      ...prevTasks,
      {
        ...newTask,
        id: uuidv4(), // Use uuid to generate a unique ID for the new task
      },
    ]);
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
              onAddTask={handleAddTask} // Pass the task adding function to Column
            />
          ))}
        </DndContext>
      </div>
    </div>
  );
};

export default Kanban;
