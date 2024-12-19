import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Typography, Box } from '@mui/material';
import axiosInstance from '../../axiosInstance';

function ProjectDashboard() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [projectAssignments, setProjectAssignments] = useState([]);

  const handleGoToKanban = () => {
    navigate(`/project-kanban/${projectId}`);
  };

  useEffect(() => {
    if (!projectId) return;
    try {
      axiosInstance.get(`/team/${projectId}`)
      .then((response) => setProjectAssignments(response.data))
      .catch((error) => console.error('Error fetching project assignments:', error));
      
    } catch (error) {
      console.error('Error fetching project assignments:', error);
    }
  }, [projectId]);

/*   const handleAddUsers = () => {
    const newAssignment = {
      ...values,
      projectId,
      dueDate: values.dueDate ? values.dueDate.toISOString() : null,
      assignees: [],
      startedAt: values.status === 'IN_PROGRESS' ? now : null,
      completedAt: values.status === 'DONE' ? now : null,
    };

    axiosInstance.post('/task/create-task', newTask)
      .then(response => {
        console.log('Task created successfully:', response.data);
        addNewTaskToProject(response.data);
        onClose();
        form.resetFields();
      })
      .catch(error => {
        console.error('Failed to create task', error);
      });
  }  */

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Project Dashboard
      </Typography>
      <Typography variant="h6" gutterBottom>
        Current Project ID: {projectId}
      </Typography>
      
      {/* Example content */}
      <Box sx={{ mt: 2 }}>
        <Typography variant="body1">Here, you can view general information about the project.</Typography>
      </Box>

      {/* Button to go to Kanban */}
      <Box sx={{ mt: 4 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleGoToKanban}
        >
          Go to Kanban Board
        </Button>
      </Box>
    </Box>
  );
}

export default ProjectDashboard;
