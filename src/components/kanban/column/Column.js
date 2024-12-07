import { useDroppable } from '@dnd-kit/core';
import TaskCard from '../taskcard/TaskCard.js';
import { AddCircle } from '@mui/icons-material';
import { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';
import '../Kanban.css'; // Import the CSS file

export function Column({ column, tasks, onAddTask }) {
  const { setNodeRef } = useDroppable({
    id: column.id,
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleAddTaskClick = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setTitle('');
    setDescription('');
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (title.trim() && description.trim()) {
      const newTask = {
        id: String(tasks.length + 1),
        title,
        description,
        status: column.id,
      };
      onAddTask(newTask);
      handleCloseDialog();
    }
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

      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Add New Task</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Task Title"
            type="text"
            fullWidth
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <TextField
            margin="dense"
            label="Task Description"
            type="text"
            fullWidth
            variant="outlined"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            multiline
            rows={4}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleFormSubmit} color="primary">
            Add Task
          </Button>
        </DialogActions>
      </Dialog>

      <div className="task-cards-container">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}

export default Column;
