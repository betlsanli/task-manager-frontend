import { useDroppable } from '@dnd-kit/core';
import TaskCard from '../taskcard/TaskCard.js';
import TaskDetails from '../taskDetail/TaskDetail.js'; // Updated import
import { AddCircle } from '@mui/icons-material';
import { useState } from 'react';
import '../Kanban.css';

export function Column({ column, tasks, onUpdateTask }) {
  const { setNodeRef } = useDroppable({ id: column.id });

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedTask, setSelectedTask] = useState(null);

  const handleAddTaskClick = () => {
    setIsDialogOpen(true);
  };

  const handleTaskClick = (task) => {
    setSelectedTask(task);
  };

  const handleSaveTask = (updatedTask) => {
    onUpdateTask(updatedTask); // Update task in parent state
    setSelectedTask(null); // Close the modal
  };

  const handleCloseModal = () => {
    setSelectedTask(null);
  };

  return (
    <div ref={setNodeRef} className="column-container">
      <div className="column-title">
        {column.title}
      </div>

      {/* Task Details Modal */}
      {selectedTask && (
        <TaskDetails
          visible={!!selectedTask}
          task={selectedTask}
          onClose={handleCloseModal}
          onSave={handleSaveTask}
        />
      )}

      <div className="task-cards-container">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} onDoubleClick={() => handleTaskClick(task)} />
        ))}
      </div>
    </div>
  );
}

export default Column;
