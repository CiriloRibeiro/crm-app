import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import LeadListButton from './LeadListButton';
import { Button, Typography, Box } from '@mui/material';

const DeleteLead = () => {
  const { id } = useParams();
  const [lead, setLead] = useState({
    first_name: '',
    last_name: '',
    title: '',
    age: '',
    status: '',
    owner: ''
  });

  useEffect(() => {
    // Fetch lead details
    axios.get(`http://127.0.0.1:8000/api/leads/change/${id}`)
      .then(response => {
        setLead(response.data);
      })
      .catch(error => {
        console.error('Error fetching lead:', error);
      });
  }, [id]);

  const handleDelete = () => {
    axios.delete(`http://127.0.0.1:8000/api/leads/change/${id}`)
      .then(response => {
        console.log('Lead deleted successfully:', response.data);
        // Redirect to lead list after deletion
        window.location.href = '/'; // Redirect to lead list after deletion
      })
      .catch(error => {
        console.error('Error deleting lead:', error);
      });
  };

  return (
    <div>
      <Typography variant="h2">Delete Lead</Typography>
      <Typography variant="body1">Are you sure you want to delete the lead: {lead.first_name} {lead.last_name}?</Typography>
      <Box display="flex" justifyContent="space-between" mt={2}> {/* Add margin top and flexbox styling */}
        <Button onClick={handleDelete} variant="contained" color="error">Delete Lead</Button>
        <LeadListButton />
      </Box>
    </div>
  );
};

export default DeleteLead;
