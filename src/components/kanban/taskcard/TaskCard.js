import { useDraggable } from '@dnd-kit/core';
import '../Kanban.css';

const statusColors = {
  TO_DO: 'rgba(255, 99, 132, 0.68)',
  IN_PROGRESS: 'rgba(255, 206, 86, 0.68)',
  DONE: 'rgba(54, 162, 235, 0.68)',
};

export function TaskCard({ task, onDoubleClick }) {
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
        transition: isDragging ? 'none' : 'transform 150ms ease-out',
        zIndex: isDragging ? 1000 : 'auto',
        backgroundColor: statusColors[task.status],
      }
    : {
        backgroundColor: statusColors[task.status],
      };

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="task-card"
      style={style}
      onDoubleClick={() => onDoubleClick(task)} // Click listener for opening the TaskDetail modal
    >
      <h3 className="task-title">{task.title}</h3>
      <p className="task-description">{task.description}</p>
      <p className="task-user" style={{ color: '#444444' }}>
        Assigned to: {assignedUser?.firstName} {assignedUser?.lastName}
      </p>
      <p className="task-priority">Priority: {task.priority}</p>
      <p className="task-due-date">Due: {formattedDueDate}</p>
      {/* <p className="task-started-at">Started At: {task.startedAt ? new Date(task.startedAt).toLocaleString() : 'Not started'}</p>
      <p className="task-completed-at">Completed At: {task.completedAt ? new Date(task.completedAt).toLocaleString() : 'Not completed'}</p> */}

    </div>
  );
}

export default TaskCard;
