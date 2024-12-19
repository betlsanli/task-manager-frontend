import React from 'react';
import AppRoutes from './routes';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';


const theme = createTheme({
  palette: {
      primary: { main: '#0052CC' },
      secondary: { main: '#172B4D' },
  },
});
const darkTheme = createTheme({
  palette: {
    mode: 'dark', // Set dark mode
    primary: {
      main: '#BB86FC', // Purple as the primary color
      light: '#D0A8FF', // Slightly lighter purple for hover effects
      dark: '#664192', // Darker purple for contrast
      contrastText: '#ffffff', // White text for primary elements
    },
    secondary: {
      main: '#F06476', 
      light: '#E12D44', 
      dark: '#D5162F', 
      contrastText: '#000000', // Black text for contrast
    },
    background: {
      default: '#121212', // Dark background for the app
      paper: '#1E1E1E', // Slightly lighter dark background for cards/paper
    },
    text: {
      primary: '#FFFFFF', // White text for primary content
      secondary: '#B3B3B3', // Light gray for secondary content
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif', // Default Material-UI font
    body1: {
      color: '#FFFFFF', // White text for general body content
    },
    body2: {
      color: '#B3B3B3', // Light gray for less prominent content
    },
    h1: {
      color: '#FFFFFF', // White for headings
    },
    h2: {
      color: '#FFFFFF', // White for subheadings
    },
  },
});

const whiteTheme = createTheme({
  palette: {
    mode: 'dark', 
    primary: {
      main: '#D9CEE9', // Primary color is white
      light: '#D9CEE9', // Slightly lighter white for hover effects
      dark: '#8DA0B6', // Slightly darker white for borders or backgrounds
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
      paper: '#F9F5FF', // Paper elements (like cards) are light gray
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


    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <AppRoutes></AppRoutes>
    </ThemeProvider>
    
  );
}


export default App;
