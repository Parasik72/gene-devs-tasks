import React from 'react';
import { AppBar, Box, Container, Toolbar, Typography } from '@mui/material';
import { useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { StyledNavbarBtn, StyledNavbarTitle } from './navbar.styled';
import { APP_NAME } from '../constants/app.consts';
import UserModel from '../services/user/user.model';
import { HISTORY_KEYS, QUERY_KEYS } from '../constants/app-keys.constants';
import { logoutUser } from '../functions/user.functions';

export const NavbarComponent = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const user = queryClient.getQueryData<UserModel>(QUERY_KEYS.USER);
  const isAuth = user !== undefined && user?.isAuth;

  const onLogoutClick = () => logoutUser(queryClient);
  const onSignIn = () => navigate(HISTORY_KEYS.LOGIN);
  const onSignUp = () => navigate(HISTORY_KEYS.REGISTRATION);
  const onTitle = () => navigate(HISTORY_KEYS.ROOT);

  return (
    <AppBar component="nav">
      <Container>
        <Toolbar>
          <Box display="flex" justifyContent="space-between" width="100%">
            <Typography 
              onClick={onTitle} 
              variant="h5" 
              component={StyledNavbarTitle}
              alignSelf='center'
            >
              {APP_NAME}
            </Typography>
            {user && (
              <Box>
                {!isAuth && (
                  <>
                    <Box onClick={onSignIn} component={StyledNavbarBtn}>
                  Sign in
                    </Box>
                    <Box onClick={onSignUp} component={StyledNavbarBtn}>
                  Sign up
                    </Box>
                  </>
              
                )}
                {isAuth && (
                  <>
                    <Box onClick={onLogoutClick} component={StyledNavbarBtn}>
                  Logout
                    </Box>
                  </>
                )}
              </Box>
            )}
          </Box>
          
        </Toolbar>
      </Container>
    </AppBar>
  );
};
