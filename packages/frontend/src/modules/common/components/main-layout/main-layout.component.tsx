import React, { FC } from 'react';
import { Box, Container } from '@mui/material';
import { SPACES } from '../../../theme/spaces.const';
import { IMainLayoutComponent } from './main-layout.types';

export const MainLayoutComponent: FC<IMainLayoutComponent> = ({ children }) => {
  return (
    <Container>
      <Box 
        marginTop={SPACES.xxl}
        display="flex"
        flexDirection="column"
        pb={SPACES.xxl}
      >
        {children}
      </Box>
    </Container>
  );
};
