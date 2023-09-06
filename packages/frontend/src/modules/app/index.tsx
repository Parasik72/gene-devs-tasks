import React from 'react';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ThemeProvider } from '@mui/material/styles';
import { StyledEngineProvider } from '@mui/material';
import { ThemeProvider as ScThemeProvider } from 'styled-components';
import { MainRouter } from '../navigation';
import { queryClient } from './query-client';
import { theme } from '../theme';
import '../../style.css';

const AppContainer = () => (
  <StyledEngineProvider injectFirst>
    <ThemeProvider theme={theme}>
      <ScThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <MainRouter />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ScThemeProvider>
    </ThemeProvider>
  </StyledEngineProvider>
);

export default AppContainer;
