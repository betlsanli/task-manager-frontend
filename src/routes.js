// src/routes.js
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import ProjectPage from './pages/ProjectPage';
import AllProjects from './pages/AllProjects'; 
import AllTasks from './pages/AllTasks'; 
import AllTeams from './pages/AllTeams';




const AppRoutes = () => (
  <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="projects" element={<AllProjects />} />
          <Route path="project/:projectId" element={<ProjectPage />}/>
          <Route path="tasks" element={<AllTasks />} />
          <Route path="/teams" element={<AllTeams />} />

        </Route>
      </Routes>
    </BrowserRouter>
);

export default AppRoutes;
