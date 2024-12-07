import React from 'react';
import { Box } from '@mui/material';
import Menu from '../menu/Menu.js';
import Footer from '../footer/Footer.js';
import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Top Navigation Menu */}
      <Menu />

      {/* Main Content Area */}
      <Box component="main" sx={{ flexGrow: 1, width: '100%', padding: '0 20px' }}>
        <Box sx={{ width: '100%' }}>
          <Outlet />
        </Box>
      </Box>

      {/* Footer */}
      <Footer />
    </Box>
  );
}

export default Layout;
