import React from 'react';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';

function Footer() {
  return (
    <BottomNavigation sx={{ backgroundColor: 'primary.dark' }}>
      <BottomNavigationAction label="Footer Content"/>
    </BottomNavigation>
  );
}

export default Footer;
