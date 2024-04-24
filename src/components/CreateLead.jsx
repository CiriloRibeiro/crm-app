import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, TextField, FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles'; // Import ThemeProvider
import LeadListButton from './LeadListButton';
import Footer from './Footer'; // Import Footer component

// Define your custom theme
const theme = createTheme();

const CreateLead = () => {
  const [owners, setOwners] = useState([]);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    title: '',
    age: '',
    status: '',
    owner: ''
  });

  useEffect(() => {
    // Fetch owners
    axios.get('https://django-crm-api.onrender.com/api/users/') // Updated URL
      .then(response => {
        setOwners(response.data);
      })
      .catch(error => {
        console.error('Error fetching owners:', error);
      });
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://django-crm-api.onrender.com/api/leads/', formData) // Updated URL
      .then(response => {
        console.log('Lead created successfully:', response.data);
        // Clear form data after successful submission
        setFormData({
          first_name: '',
          last_name: '',
          title: '',
          age: '',
          status: '',
          owner: ''
        });
      })
      .catch(error => {
        console.error('Error creating lead:', error);
      });
  };

  return (
    <ThemeProvider theme={theme}> {/* Apply the MUI theme */}
      <div>
        <h2>Create Lead</h2>
        <form onSubmit={handleSubmit}>
          {/* Input fields for lead details */}
          <TextField
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            label="First Name"
            fullWidth
            sx={{ mb: 2 }} // Add margin bottom
          />
          <TextField
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            label="Last Name"
            fullWidth
            sx={{ mb: 2 }} // Add margin bottom
          />
          <TextField
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            label="Title"
            fullWidth
            sx={{ mb: 2 }} // Add margin bottom
          />
          <TextField
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            label="Age"
            fullWidth
            sx={{ mb: 2 }} // Add margin bottom
          />
          {/* Dropdown/select for status */}
          <FormControl fullWidth sx={{ mb: 2 }}> {/* Add margin bottom */}
            <InputLabel>Status</InputLabel>
            <Select name="status" value={formData.status} onChange={handleChange}>
              <MenuItem value="">Select Status</MenuItem>
              <MenuItem value="Contacted">Contacted</MenuItem>
              <MenuItem value="New Lead">New Lead</MenuItem>
              <MenuItem value="Qualified">Qualified</MenuItem>
            </Select>
          </FormControl>
          {/* Dropdown/select for owner using the owners state */}
          <FormControl fullWidth sx={{ mb: 2 }}> {/* Add margin bottom */}
            <InputLabel>Owner</InputLabel>
            <Select name="owner" value={formData.owner} onChange={handleChange}>
              <MenuItem value="">Select Owner</MenuItem>
              {owners.map(owner => (
                <MenuItem key={owner.id} value={owner.id}>{owner.username}</MenuItem>
              ))}
            </Select>
          </FormControl>
          {/* Submit button */}
          <Box mt={2} display="flex" justifyContent="space-between"> {/* Add margin top and flexbox styling */}
              <Button type="submit" variant="contained" color="primary">Create Lead</Button>
              <LeadListButton />
          </Box>
        </form>
        <Footer /> {/* Add the Footer component */}
      </div>
    </ThemeProvider>
  );
};

export default CreateLead;
