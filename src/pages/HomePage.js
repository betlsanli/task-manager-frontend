import React from 'react';
import Dashboard from '../components/dashboard/Dashboard';
import AdminDashboard from '../components/dashboard/AdminDashboard';

const HomePage = ({ isAdmin }) => {
  if (isAdmin === null) {
    return <div>Loading...</div>;
  }

  return isAdmin ? <AdminDashboard /> : <Dashboard />;
};

export default HomePage;
