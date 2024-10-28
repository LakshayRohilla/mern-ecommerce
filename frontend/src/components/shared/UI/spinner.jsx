import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Spinner = ({ size = 40, thickness = 3.6, color = 'primary' }) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <CircularProgress size={size} thickness={thickness} color={color} />
    </Box>
  );
};

export default Spinner;