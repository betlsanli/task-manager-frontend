import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Kanban from '../components/kanban/Kanban';
import { Box, Typography } from '@mui/material';
import axiosInstance from '../axiosInstance';



const ProjectPage = () => {
  const { projectId } = useParams(); 
  const[details, setDetails] = useState([]);

  useEffect(() => {
    if (!projectId) return;
    try {
      axiosInstance.get(`/project/${projectId}`)
      .then((response) => setDetails(response.data))
      .catch((error) => console.error('Error fetching project:', error));
      
    } catch (error) {
      console.error('Error fetching project:', error);
    }
  }, [projectId]);

  return (

    <div>
      <h1>{details.title}</h1>
      <Kanban projectId = {projectId}></Kanban>
    </div>
    
  );
};

export default ProjectPage;
