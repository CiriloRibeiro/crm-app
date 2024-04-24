import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

const LeadListButton = () => {
  return (
    <Button component={Link} to="/" variant="outlined" color="primary">
      Lead List
    </Button>
  );
};

export default LeadListButton;
