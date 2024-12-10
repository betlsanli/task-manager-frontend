import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Button,
  Typography,
} from '@mui/material';

// Sample dynamic statuses and teams
const statuses = ['TO_DO', 'IN_PROGRESS', 'DONE'];
const teams = ['Team 1', 'Team 2', 'Team 3', 'Team 4'];

const TaskModal = ({ open, onClose, taskData, handleSave }) => {
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [team, setTeam] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (taskData) {
      setTaskName(taskData.name);
      setTaskDescription(taskData.description);
      setTeam(taskData.team);
      setStatus(taskData.status);
    }
  }, [taskData]);

  const handleSaveClick = () => {
    handleSave({
      name: taskName,
      description: taskDescription,
      team,
      status,
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Task Details</DialogTitle>
      <DialogContent>
        <Typography variant="h6">Project: {taskData?.project}</Typography>
        <TextField
          label="Task Name"
          fullWidth
          variant="outlined"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          sx={{ my: 1 }}
        />
        <TextField
          label="Task Description"
          fullWidth
          multiline
          rows={3}
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
          sx={{ my: 1 }}
        />
        <TextField
          select
          label="Team"
          fullWidth
          value={team}
          onChange={(e) => setTeam(e.target.value)}
          sx={{ my: 1 }}
        >
          {teams.map((teamOption) => (
            <MenuItem key={teamOption} value={teamOption}>
              {teamOption}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Status"
          fullWidth
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          sx={{ my: 1 }}
        >
          {statuses.map((statusOption) => (
            <MenuItem key={statusOption} value={statusOption}>
              {statusOption}
            </MenuItem>
          ))}
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSaveClick} color="primary" variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskModal;
