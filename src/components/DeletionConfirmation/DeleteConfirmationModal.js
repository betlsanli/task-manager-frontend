import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import axiosInstance from '../../axiosInstance';

const DeleteConfirmationModal = ({ visible, onClose, url, onDelete }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await axiosInstance.delete(url);
      onClose();
      onDelete(url.split('/').pop()); // Extract the projectId from the URL and pass it to onDelete
    } catch (error) {
      console.error('Failed to delete', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Delete Project"
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
      <p>Are you sure you want to delete this?</p>
    </Modal>
  );
};

export default DeleteConfirmationModal;
