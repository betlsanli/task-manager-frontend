import React from 'react';
import AppRoutes from './routes';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';

const whiteTheme = createTheme({
  palette: {
    mode: 'light', // Light mode theme
    primary: {
      main: '#ffffff', // Primary color is white
      light: '#f5f5f5', // Slightly lighter white for hover effects
      dark: '#e0e0e0', // Slightly darker white for borders or backgrounds
      contrastText: '#000000', // Black text for contrast
    },
    secondary: {
      main: '#1976d2', // Blue for secondary actions
      light: '#4791db',
      dark: '#115293',
      contrastText: '#ffffff', // White text for contrast
    },
    background: {
      default: '#ffffff', // App background is white
      paper: '#f9f9f9', // Paper elements (like cards) are light gray
    },
    text: {
      primary: '#000000', // Black text for primary content
      secondary: '#555555', // Gray text for secondary content
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif', // Default Material-UI font
    body1: {
      color: '#000000', // Black text for general body content
    },
    body2: {
      color: '#555555', // Gray text for less prominent content
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={whiteTheme}>
      {/* CssBaseline applies global styles */}
      <CssBaseline />
      <AppRoutes></AppRoutes>
    </ThemeProvider>
  );
}

export default App;
