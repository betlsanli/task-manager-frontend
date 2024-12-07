import React from 'react';
import { useParams } from 'react-router-dom';
import Kanban from '../components/kanban/Kanban';

const ProjectPage = () => {
  const { projectId } = useParams(); // Extract projectId from the URL

  return (
    <div>
      <h1>Project {projectId}</h1>
      <p>desc</p>
      <Kanban></Kanban>
    </div>
  );
};

export default ProjectPage;
