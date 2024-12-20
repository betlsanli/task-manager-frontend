import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import ProjectPage from './pages/ProjectPage';
import AllProjects from './pages/AllProjects';
import AllTasks from './pages/AllTasks';
import AllTeams from './pages/AllTeams';
import RegisterPage from './pages/RegisterPage';
import ProjectDashboard from './components/dashboard/ProjectDashboard';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';

const AppRoutes = () => {
  const [loggedIn, setLoggedIn] = useState(null);
  
  // Check session storage on initial render
  useEffect(() => {
    const authStatus = localStorage.getItem('token');
    if(authStatus === null){
      setLoggedIn(false)
    } 
    else{
      setLoggedIn(true);
    }
  }, []);

  // Login logic: store token in session storage and update token state
  const handleLogin = () => {
    setLoggedIn(true); // Update state to allow access to protected routes
  };

  const handleLogout = useCallback(() => {
    setLoggedIn(false)
  }, []);
  
  return (
    <BrowserRouter>
      <Routes>
        {/* Protected Routes */}
        <Route path="/" element={loggedIn ? <Layout handleLogout={handleLogout} /> : <Navigate to="/login" />}>
          <Route index element={loggedIn ? <HomePage /> : <Navigate to="/login" />} />
          <Route path="projects" element={loggedIn ? <AllProjects /> : <Navigate to="/login" />} />
          <Route path="project-dashboard/:projectId" element={loggedIn ? <ProjectDashboard /> : <Navigate to="/login" />} />
          <Route path="project-kanban/:projectId" element={loggedIn ? <ProjectPage /> : <Navigate to="/login" />} />
          <Route path="tasks" element={loggedIn ? <AllTasks /> : <Navigate to="/login" />} />
          <Route path="teams" element={loggedIn ? <AllTeams /> : <Navigate to="/login" />} />
          <Route path="user-profile/:userId" element={loggedIn ? <ProfilePage /> : <Navigate to="/login" />} />
        </Route>

        {/* Login Route */}
        <Route path="/login" element={loggedIn ? <Navigate to="/" /> : <LoginPage onLogin={handleLogin} />} />

        {/* Register Route */}
        <Route path="/register" element={<RegisterPage />} />

        {/* Default fallback route */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
