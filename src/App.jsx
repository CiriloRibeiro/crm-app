import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LeadList from './components/LeadList';
import CreateLead from './components/CreateLead';
import UpdateLead from './components/UpdateLead';
import DeleteLead from './components/DeleteLead';

// Define your custom theme
const theme = createTheme();

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Container maxWidth="md">
          <Typography variant="h1" align="center" gutterBottom>
            CRM App
          </Typography>
          <Routes>
            <Route path="/" element={<LeadList />} />
            <Route path="/create-lead" element={<CreateLead />} />
            <Route path="/update-lead/:id" element={<UpdateLead />} />
            <Route path="/delete-lead/:id" element={<DeleteLead />} />
          </Routes>
        </Container>
      </Router>
    </ThemeProvider>
  );
};

export default App;
