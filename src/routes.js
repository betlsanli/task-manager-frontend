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
  const [isAdmin, setIsAdmin] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (token) {
      setLoggedIn(true);
      if (user) {
        const parsedUser = JSON.parse(user);
        setIsAdmin(parsedUser.isAdmin);
      }
    } else {
      setLoggedIn(false);
      setIsAdmin(null);
    }
  }, []);

  const handleLogin = useCallback(() => {
    setLoggedIn(true);
    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      setIsAdmin(parsedUser.isAdmin);
    }
  }, []);

  const handleLogout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setLoggedIn(false);
    setIsAdmin(null);
  }, []);

  if (loggedIn === null) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Protected Routes */}
        <Route
          path="/"
          element={
            loggedIn ? <Layout handleLogout={handleLogout} isAdmin={isAdmin} /> : <Navigate to="/login" />
          }
        >
          <Route index element={<HomePage isAdmin={isAdmin} />} />
          <Route path="projects" element={<AllProjects />} />
          <Route path="project-dashboard/:projectId" element={<ProjectDashboard />} />
          <Route path="project-kanban/:projectId" element={<ProjectPage />} />
          <Route path="tasks" element={<AllTasks />} />
          <Route path="teams" element={<AllTeams />} />
          <Route path="user-profile/:userId" element={<ProfilePage />} />
        </Route>

        {/* Public Routes */}
        <Route path="/login" element={loggedIn ? <Navigate to="/" /> : <LoginPage onLogin={handleLogin} />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Default Fallback */}
        <Route path="*" element={<Navigate to={loggedIn ? "/" : "/login"} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;