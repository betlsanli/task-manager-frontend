import React from 'react';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';

function Footer() {
  return (
    <BottomNavigation sx={{ backgroundColor: '#f5f5f5' }}>
      <BottomNavigationAction label="Footer Content"/>
    </BottomNavigation>
  );
}

export default Footer;
