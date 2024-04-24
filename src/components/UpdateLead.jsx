import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import LeadListButton from './LeadListButton';
import { TextField, FormControl, InputLabel, Select, MenuItem, Button, Box } from '@mui/material';

const UpdateLead = () => {
  const { id } = useParams();
  const [lead, setLead] = useState({
    first_name: '',
    last_name: '',
    title: '',
    age: '',
    status: '',
    owner: ''
  });
  const [owners, setOwners] = useState([]);

  useEffect(() => {
    // Fetch lead details
    axios.get(`http://127.0.0.1:8000/api/leads/change/${id}`)
      .then(response => {
        setLead(response.data);
      })
      .catch(error => {
        console.error('Error fetching lead:', error);
      });

    // Fetch owners
    axios.get('http://127.0.0.1:8000/api/users/')
      .then(response => {
        setOwners(response.data);
      })
      .catch(error => {
        console.error('Error fetching owners:', error);
      });
  }, [id]);

  const handleChange = (e) => {
    setLead({
      ...lead,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://127.0.0.1:8000/api/leads/change/${id}`, lead)
      .then(response => {
        console.log('Lead updated successfully:', response.data);
        // Optionally, redirect or show success message
      })
      .catch(error => {
        console.error('Error updating lead:', error);
      });
  };

  return (
    <div>
      <h2>Update Lead</h2>
      <form onSubmit={handleSubmit}>
        {/* Input fields for lead details */}
        <TextField
          type="text"
          name="first_name"
          value={lead.first_name}
          onChange={handleChange}
          label="First Name"
          fullWidth
          sx={{ mb: 2 }} // Add margin bottom
        />
        <TextField
          type="text"
          name="last_name"
          value={lead.last_name}
          onChange={handleChange}
          label="Last Name"
          fullWidth
          sx={{ mb: 2 }} // Add margin bottom
        />
        <TextField
          type="text"
          name="title"
          value={lead.title}
          onChange={handleChange}
          label="Title"
          fullWidth
          sx={{ mb: 2 }} // Add margin bottom
        />
        <TextField
          type="number"
          name="age"
          value={lead.age}
          onChange={handleChange}
          label="Age"
          fullWidth
          sx={{ mb: 2 }} // Add margin bottom
        />
        {/* Dropdown/select for status */}
        <FormControl fullWidth sx={{ mb: 2 }}> {/* Add margin bottom */}
          <InputLabel>Status</InputLabel>
          <Select name="status" value={lead.status} onChange={handleChange}>
            <MenuItem value="">Select Status</MenuItem>
            <MenuItem value="Contacted">Contacted</MenuItem>
            <MenuItem value="New Lead">New Lead</MenuItem>
            <MenuItem value="Qualified">Qualified</MenuItem>
          </Select>
        </FormControl>
        {/* Dropdown/select for owner using the owners state */}
        <FormControl fullWidth sx={{ mb: 2 }}> {/* Add margin bottom */}
          <InputLabel>Owner</InputLabel>
          <Select name="owner" value={lead.owner} onChange={handleChange}>
            <MenuItem value="">Select Owner</MenuItem>
            {owners.map(owner => (
              <MenuItem key={owner.id} value={owner.id}>{owner.username}</MenuItem>
            ))}
          </Select>
        </FormControl>
        {/* Submit button */}
        <Box mt={2} display="flex" justifyContent="space-between"> {/* Add margin top and flexbox styling */}
            <Button type="submit" variant="contained" color="primary">Update Lead</Button>
            <LeadListButton />
        </Box>
      </form>

    </div>
  );
};

export default UpdateLead;
