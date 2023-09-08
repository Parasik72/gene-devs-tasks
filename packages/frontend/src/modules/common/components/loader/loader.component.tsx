import React from 'react';
import { Box, CircularProgress } from '@mui/material';

export const LoaderComponent = () => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      position="absolute"
      width="100%"
      height="100%"
    >
      <CircularProgress />
    </Box>
  );
};
