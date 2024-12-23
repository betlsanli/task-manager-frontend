import { useDraggable } from '@dnd-kit/core';
import '../Kanban.css';
import { Avatar, Tooltip } from 'antd';


const statusColors = {
  TO_DO: 'rgba(250, 233, 240, 0.68)',
  IN_PROGRESS: 'rgba(250, 249, 233, 0.68)',
  DONE: 'rgba(233, 250, 234, 0.68)',
};

export function TaskCard({ task, onDoubleClick }) {
  const { assignees = [] } = task;

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
      
      <p className="task-priority">Priority: {task.priority}</p>
      <p className="task-due-date">Due: {formattedDueDate}</p>
      <div className="task-assignees">
        {assignees.map((user) => (
          <Tooltip key={user.userId} title={`${user.firstName} ${user.lastName}`}>
            <Avatar style={{ backgroundColor: '#1890ff', marginRight: '8px' }}>
              {user.firstName[0]}{user.lastName[0]}
            </Avatar>
          </Tooltip>
        ))}
      </div>
      {/* <p className="task-started-at">Started At: {task.startedAt ? new Date(task.startedAt).toLocaleString() : 'Not started'}</p>
      <p className="task-completed-at">Completed At: {task.completedAt ? new Date(task.completedAt).toLocaleString() : 'Not completed'}</p> */}

    </div>
  );
}

export default TaskCard;
