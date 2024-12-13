import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogActions, DialogContent, DialogTitle, TextField, FormControl, InputLabel,
  Select, MenuItem, Button, IconButton
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { TaskPriority, TaskStatus } from '../types.js';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import axios from 'axios';

// Define the priorities array
const priorities = [
  { id: TaskPriority.LOW, title: 'Low' },
  { id: TaskPriority.MEDIUM, title: 'Medium' },
  { id: TaskPriority.HIGH, title: 'High' },
  { id: TaskPriority.CRITICAL, title: 'Critical' },
];

const statuses = [
  { id: TaskStatus.TO_DO, title: 'To Do' },
  { id: TaskStatus.IN_PROGRESS, title: 'In Progress' },
  { id: TaskStatus.DONE, title: 'Done' },
];

const TaskDetail = ({
  open,
  task,
  onClose,
  onSave,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);

  useEffect(() => {
    setEditedTask(task);
    setIsEditing(false);
  }, [task]);

  const handleChange = (field, value) => {
    setEditedTask((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSaveClick = () => {
    // Validate fields and send an update request
    const updatedTask = { ...task, ...editedTask };
    axios.put(`/task/edit/${task.id}`, updatedTask)
      .then((response) => {
        const updatedTaskData = response.data;
        setEditedTask(updatedTaskData);
        onSave(updatedTaskData); // Notify parent of changes
        setIsEditing(false);
      })
      .catch((error) => {
        console.error('Failed to update task', error);
      });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        Task Details
        <IconButton
          aria-label="edit"
          onClick={() => setIsEditing((prev) => !prev)}
          style={{ position: 'absolute', right: 16, top: 16 }}
        >
          <EditIcon />
        </IconButton>
      </DialogTitle>
      <form>
        <DialogContent>
          {/* Title */}
          <TextField
            margin="normal"
            label="Task Title"
            variant="outlined"
            fullWidth
            value={editedTask?.title || ''}
            onChange={(e) => handleChange('title', e.target.value)}
            InputProps={{
              readOnly: !isEditing,
            }}
            required
          />
          {/* Description */}
          <TextField
            margin="normal"
            label="Task Description"
            variant="outlined"
            fullWidth
            multiline
            rows={3}
            value={editedTask?.description || ''}
            onChange={(e) => handleChange('description', e.target.value)}
            InputProps={{
              readOnly: !isEditing,
            }}
          />
          {/* Priority Dropdown */}
          <FormControl fullWidth margin="normal" disabled={!isEditing}>
            <InputLabel>Priority</InputLabel>
            <Select
              value={editedTask?.priority || ''}
              onChange={(e) => handleChange('priority', e.target.value)}
              required
            >
              {priorities.map((priority) => (
                <MenuItem key={priority.id} value={priority.id}>
                  {priority.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {/* Status Dropdown */}
          <FormControl fullWidth margin="normal" disabled={!isEditing}>
            <InputLabel>Status</InputLabel>
            <Select
              value={editedTask?.status || ''}
              onChange={(e) => handleChange('status', e.target.value)}
              required
            >
              {statuses.map((status) => (
                <MenuItem key={status.id} value={status.id}>
                  {status.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {/* Date Pickers */}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              label="Due Date"
              value={editedTask?.dueDate ? dayjs(editedTask.dueDate) : null}
              onChange={(date) => handleChange('dueDate', date?.toISOString())}
              disabled={!isEditing}
              renderInput={(props) => (
                <TextField {...props} fullWidth margin="normal" />
              )}
            />
            <DateTimePicker
              label="Started At"
              value={editedTask?.startedAt ? dayjs(editedTask.startedAt) : null}
              onChange={(date) => handleChange('startedAt', date?.toISOString())}
              disabled={!isEditing}
              renderInput={(props) => (
                <TextField {...props} fullWidth margin="normal" />
              )}
            />
            <DateTimePicker
              label="Completed At"
              value={editedTask?.completedAt ? dayjs(editedTask.completedAt) : null}
              onChange={(date) => handleChange('completedAt', date?.toISOString())}
              disabled={!isEditing}
              renderInput={(props) => (
                <TextField {...props} fullWidth margin="normal" />
              )}
            />
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="secondary">
            Close
          </Button>
          {isEditing && (
            <Button type="button" onClick={handleSaveClick} color="primary">
              Save
            </Button>
          )}
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default TaskDetail;
