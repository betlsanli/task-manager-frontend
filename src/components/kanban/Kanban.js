import React, { useEffect, useState } from 'react';
import Column from './column/Column.js';
import { TaskStatus } from './types.js';
import './Kanban.css';
import { DndContext } from '@dnd-kit/core';
import { v4 as uuidv4 } from 'uuid'; // Import the uuid package
//import TaskModal from './taskcard/TaskModal'; 
import axios from 'axios';

//Sample Users Data
const sampleUsers = [
  { id: '1', firstName: 'Alice', lastName: 'Johnson', email: 'alice.johnson@example.com' },
  { id: '2', firstName: 'Bob', lastName: 'Smith', email: 'bob.smith@example.com' },
  { id: '3', firstName: 'Charlie', lastName: 'Brown', email: 'charlie.brown@example.com' },
];

//will fix it
//Sample Tasks Data
const sampleTasks = [
  {
    id: 'task-1',
    title: 'Setup project repository',
    description: 'Initialize GitHub repo',
    priority: 'HIGH',
    status: 'TO_DO',
    dueDate: '2024-12-30T00:00:00Z',
    startedAt: null,
    completedAt: null,
    createdAt: '2024-12-01T12:00:00Z',
    lastModifiedAt: '2024-12-01T12:00:00Z',
    projectId: 'project-1',
    assignees: [
      { id: '1', firstName: 'Alice', lastName: 'Johnson', email: 'alice.johnson@example.com' },
      { id: '2', firstName: 'Bob', lastName: 'Smith', email: 'bob.smith@example.com' }
    ],
  },
  {
    id: 'task-2',
    title: 'Design database schema',
    description: 'Define tables for user management',
    priority: 'MEDIUM',
    status: 'TO_DO',
    dueDate: '2024-12-20T00:00:00Z',
    startedAt: null,
    completedAt: null,
    createdAt: '2024-12-01T12:00:00Z',
    lastModifiedAt: '2024-12-01T12:00:00Z',
    projectId: 'project-1',
    assignees: [
      { id: '2', firstName: 'Bob', lastName: 'Smith', email: 'bob.smith@example.com' },
    ],
  },
  {
    id: 'task-3',
    title: 'Implement user login',
    description: 'Develop authentication flow for login',
    priority: 'HIGH',
    status: 'IN_PROGRESS',
    dueDate: '2024-12-25T00:00:00Z',
    startedAt: '2024-12-10T00:00:00Z',
    completedAt: null,
    createdAt: '2024-12-01T12:00:00Z',
    lastModifiedAt: '2024-12-01T12:00:00Z',
    projectId: 'project-2',
    assignees: [
      { id: '2', firstName: 'Bob', lastName: 'Smith', email: 'bob.smith@example.com' },
    ],
  },
  {
    id: 'task-4',
    title: 'Test user signup flow',
    description: 'Ensure signup works with edge cases',
    priority: 'LOW',
    status: 'DONE',
    dueDate: '2024-12-15T00:00:00Z',
    startedAt: '2024-12-05T00:00:00Z',
    completedAt: '2024-12-08T00:00:00Z',
    createdAt: '2024-12-01T12:00:00Z',
    lastModifiedAt: '2024-12-08T12:00:00Z',
    projectId: 'project-2',
    assignees: [
      { id: '3', firstName: 'Charlie', lastName: 'Brown', email: 'charlie.brown@example.com' },
    ],
  },
  {
    id: 'task-5',
    title: 'Prepare UI wireframes',
    description: 'Design initial wireframes for dashboard UI',
    priority: 'HIGH',
    status: 'IN_PROGRESS',
    dueDate: '2024-12-22T00:00:00Z',
    startedAt: '2024-12-10T00:00:00Z',
    completedAt: null,
    createdAt: '2024-12-01T12:00:00Z',
    lastModifiedAt: '2024-12-10T12:00:00Z',
    projectId: 'project-1',
    assignees: [
      { id: '1', firstName: 'Alice', lastName: 'Johnson', email: 'alice.johnson@example.com' },
    ],
  },
];


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

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    const newStatus = over.id;

    setTasks((prev) =>
      prev.map((task) =>
        task.id === active.id
          ? { ...task, status: newStatus }
          : task
      )
    );
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

            />
          ))}
        </DndContext>
      </div>
      
    </div>
  );
};

export default Kanban;
