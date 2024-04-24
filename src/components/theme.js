import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Change primary color as needed
    },
    secondary: {
      main: '#dc004e', // Change secondary color as needed
    },
    background: {
      default: '#f0f0f0', // Change default background color as needed
    },
  },
  typography: {
    fontFamily: 'Arial, sans-serif', // Change font family as needed
    fontSize: 14, // Change base font size as needed
  },
});

export default theme;
