import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import axios from 'axios';

const DeleteConfirmationModal = ({ visible, onClose, taskId, onDelete }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await axios.delete(`/task/delete/${taskId}`);
      onClose();
      onDelete(taskId);
    } catch (error) {
      console.error('Failed to delete task', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Delete Task"
      visible={visible}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="confirm" type="danger" onClick={handleDelete} loading={loading}>
          Confirm
        </Button>,
      ]}
    >
      <p>Are you sure you want to delete this task?</p>
    </Modal>
  );
};

export default DeleteConfirmationModal;

/*
import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

const DeleteConfirmationModal = ({ visible, task, onClose, onConfirm }) => {
  if (!task) return null;

  return (
    <Dialog open={visible} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Delete Task</DialogTitle>
      <DialogContent>
        <Typography>Are you sure you want to delete this task?</Typography>
        <Typography style={{ fontWeight: 'bold', margin: '10px 0' }}>{task.name}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={onConfirm} color="error">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmationModal;
*/