// src/routes.js
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import ProjectPage from './pages/ProjectPage';


const AppRoutes = () => (
  <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="project/:projectId" element={<ProjectPage />}/>
            
        </Route>
      </Routes>
    </BrowserRouter>
);

export default AppRoutes;
