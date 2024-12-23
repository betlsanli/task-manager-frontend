import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Kanban from '../components/kanban/Kanban';
import { Typography, Card } from 'antd';
import axiosInstance from '../axiosInstance';


const { Title } = Typography;

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

    <div style={{ backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      {/* Header with the project title */}
      <Card 
        style={{ 
          border: 'none', 
          backgroundColor: '#f5f5f5', // Grey background
          borderRadius: 0 // No rounded corners
        }}
      >
        <Title 
          level={2} 
          style={{ 
            margin: 0, 
            color: 'black' // White title text
          }}
        >
          {details.title ? `${details.title}` : 'Loading Project...'}
        </Title>
      </Card>

      {/* Kanban board */}
      <Kanban projectId={projectId} />
    </div>
  
    
  );
};

export default ProjectPage;
