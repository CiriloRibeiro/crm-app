import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button, Typography, Table, TableHead, TableBody, TableCell, TableRow } from '@mui/material';
import CreateLeadButton from './CreateLeadButton';
import Footer from './Footer';

const LeadList = () => {
  const [leads, setLeads] = useState([]);
  const [error, setError] = useState(null);
  const [ownersMap, setOwnersMap] = useState({});

  useEffect(() => {
    // Fetch leads and owners when the component mounts
    Promise.all([
      axios.get('https://django-crm-api.onrender.com/api/leads/'), // Fetch leads
      axios.get('https://django-crm-api.onrender.com/api/users/')    // Fetch owners
    ])
      .then(([leadsRes, ownersRes]) => {
        setLeads(leadsRes.data);
        const ownersData = ownersRes.data.reduce((acc, owner) => {
          acc[owner.id] = owner.username;
          return acc;
        }, {});
        setOwnersMap(ownersData);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data');
      });
  }, []);

  return (
    <div>
      <Typography variant="h2">Leads</Typography>
      {error && <p>Error: {error}</p>}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Age</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Owner</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {leads.map(lead => (
            <TableRow key={lead.id}>
              <TableCell>{lead.first_name}</TableCell>
              <TableCell>{lead.last_name}</TableCell>
              <TableCell>{lead.title}</TableCell>
              <TableCell>{lead.age}</TableCell>
              <TableCell>{lead.status}</TableCell>
              <TableCell>{ownersMap[lead.owner]}</TableCell> {/* Display owner's name */}
              <TableCell>
                <Link to={`/update-lead/${lead.id}`}>
                  <Button variant="outlined" color="primary">Update</Button>
                </Link>
                <Link to={`/delete-lead/${lead.id}`}>
                  <Button variant="outlined" color="secondary">Delete</Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>  
      <br />
      <CreateLeadButton />
      <Footer />
    </div>
  );
};

export default LeadList;
