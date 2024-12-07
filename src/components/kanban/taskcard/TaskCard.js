import { useDraggable } from '@dnd-kit/core';
import '../Kanban.css'

export function TaskCard({ task }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: task.id,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        transition: isDragging ? 'none' : 'transform 150ms ease-out', // optional smooth transition
        zIndex: isDragging ? 1000 : 'auto', // Bring dragged card to front
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="task-card"
      style={style}
    >
      <h3 className="task-title">{task.title}</h3>
      <p className="task-description">{task.description}</p>
    </div>
  );
}

export default TaskCard;
