import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

const CreateLeadButton = () => {
  return (
    <Button component={Link} to="/create-lead" variant="contained" color="primary">
      Create Lead
    </Button>
  );
};

export default CreateLeadButton;
