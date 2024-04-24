import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button, List, ListItem, ListItemText } from '@mui/material';
import CreateLeadButton from './CreateLeadButton';

const LeadList = () => {
  const [leads, setLeads] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch leads when the component mounts
    axios.get('http://127.0.0.1:8000/api/leads/')
      .then(res => {
        setLeads(res.data);
      })
      .catch(error => {
        console.error('Error fetching leads:', error);
        setError('Failed to fetch leads');
      });
  }, []);

  return (
    <div>
      <h2>Leads</h2>
      {error && <p>Error: {error}</p>}
      <List>
        {leads.map(lead => (
          <ListItem key={lead.id} className="lead-list-item"> {/* Apply lead-list-item class */}
            <ListItemText primary={`${lead.first_name} ${lead.last_name}`} />
            <Link to={`/update-lead/${lead.id}`}>
              <Button variant="outlined" color="primary">Update</Button>
            </Link>
            <Link to={`/delete-lead/${lead.id}`}>
              <Button variant="outlined" color="secondary">Delete</Button>
            </Link>
          </ListItem>
        ))}
      </List>
      <CreateLeadButton />
    </div>
  );
};

export default LeadList;
