import React from 'react';
import { Typography, Link, Box } from '@mui/material';

const Footer = () => {
  return (
    <Box component="footer" sx={{ backgroundColor: '#f0f0f0', marginTop: '10px', textAlign: 'center' }}>
      <Typography variant="body1">Backend powered by Django REST Framework</Typography>
      <Typography variant="body1">Deployed on Render with a PostgreSQL database</Typography>
      <Typography variant="body1">Visit the <Link href="https://django-crm-api.onrender.com/api/leads" target="_blank" rel="noopener noreferrer">Django CRM API</Link></Typography>
    </Box>
  );
};

export default Footer;
