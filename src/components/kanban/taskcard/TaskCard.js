import { useDraggable } from '@dnd-kit/core';
import '../Kanban.css'

const statusColors = {
  TO_DO: 'rgba(91, 9, 109, 0.68)',       
  IN_PROGRESS: 'rgba(124, 131, 9, 0.68)', 
  DONE: 'rgba(51, 131, 9, 0.68)',       
};

// Mock Users Data
export const sampleUsers = [
  { id: 'user-1', firstName: 'Alice', lastName: 'Johnson', email: 'alice.johnson@example.com' },
  { id: 'user-2', firstName: 'Bob', lastName: 'Smith', email: 'bob.smith@example.com' },
  { id: 'user-3', firstName: 'Charlie', lastName: 'Brown', email: 'charlie.brown@example.com' },
];

// Mock Tasks Data
export const sampleTasks = [
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
      { id: 'user-1', firstName: 'Alice', lastName: 'Johnson', email: 'alice.johnson@example.com' },
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
      { id: 'user-2', firstName: 'Bob', lastName: 'Smith', email: 'bob.smith@example.com' },
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
      { id: 'user-2', firstName: 'Bob', lastName: 'Smith', email: 'bob.smith@example.com' },
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
      { id: 'user-3', firstName: 'Charlie', lastName: 'Brown', email: 'charlie.brown@example.com' },
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
      { id: 'user-1', firstName: 'Alice', lastName: 'Johnson', email: 'alice.johnson@example.com' },
    ],
  },
];

export function TaskCard({ task }) {
  const assignedUser = task.assignees?.[0];

  const formattedDueDate = task.dueDate
    ? new Date(task.dueDate).toLocaleDateString()
    : 'No due date';


  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: task.id,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        transition: isDragging ? 'none' : 'transform 150ms ease-out', // optional smooth transition
        zIndex: isDragging ? 1000 : 'auto', // Bring dragged card to front
        backgroundColor: statusColors[task.status], // Set background color based on status

      }
    : {
      backgroundColor: statusColors[task.status], // Set background color based on status
    };


  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="task-card"
      style={style}
     // onClick={() => onClick(task)} // Added click listener for modal opening

    >
      <h3 className="task-title">{task.title}</h3>
      <p className="task-description">{task.description}</p>
      <p className="task-user">Assigned to: {assignedUser?.firstName} {assignedUser?.lastName}</p>
      <p className="task-priority">Priority: {task.priority}</p>
      <p className="task-due-date">Due: {formattedDueDate}</p>

    </div>
  );
}

export default TaskCard;
