import { useDroppable } from '@dnd-kit/core';
import TaskCard from '../taskcard/TaskCard.js';
import TaskDetail from '../taskDetail/TaskDetail.js';
import { AddCircle } from '@mui/icons-material';
import { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';
import '../Kanban.css';

export function Column({ column, tasks, onAddTask, onUpdateTask }) {
  const { setNodeRef } = useDroppable({
    id: column.id,
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedTask, setSelectedTask] = useState(null); // Task selected for detail view
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false); // Controls detail dialog visibility

  const handleAddTaskClick = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setTitle('');
    setDescription('');
  };

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setIsDetailDialogOpen(true); // Open the dialog when a task is clicked
  };

  const handleCloseDetailDialog = () => {
    setIsDetailDialogOpen(false);
    setSelectedTask(null); // Clear the selected task
  };

  const handleSaveTask = (updatedTask) => {
    onUpdateTask(updatedTask); // Update task in parent state
    setIsDetailDialogOpen(false); // Close the detail dialog
  };

  return (
    <div ref={setNodeRef} className="column-container">
      <div className="column-title">
        {column.title}
        <AddCircle
          className="add-task-button"
          onClick={handleAddTaskClick}
          fontSize="large"
        />
      </div>

      {/* Task Detail Dialog */}
      {selectedTask && (
        <TaskDetail
          open={isDetailDialogOpen}
          task={selectedTask}
          onClose={handleCloseDetailDialog}
          onSave={handleSaveTask} // Pass save handler to TaskDetail
        />
      )}

      <div className="task-cards-container">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onClick={handleTaskClick} // Pass click handler to TaskCard
          />
        ))}
      </div>
    </div>
  );
}

export default Column;
