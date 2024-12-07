import React from 'react';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';

function Footer() {
  return (
    <BottomNavigation sx={{ backgroundColor: 'primary.light' }}>
      <BottomNavigationAction label="Footer Content"/>
    </BottomNavigation>
  );
}

export default Footer;
