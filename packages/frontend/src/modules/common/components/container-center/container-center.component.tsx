import React from 'react';
import { Box } from '@mui/material';
import { FC } from 'react';
import { IContainerCenterComponent } from './container-center.types';

export const ContainerCenterComponent: FC<IContainerCenterComponent> = ({ children, isAbsolute }) => (
  <Box position={isAbsolute ? 'absolute' : 'relative'}>
    <Box height="100vh">
      <Box
        height="100%"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <>{children}</>
      </Box>
    </Box>
  </Box>
);
