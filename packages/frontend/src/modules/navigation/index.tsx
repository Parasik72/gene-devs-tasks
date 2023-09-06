import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { AuthRoutes } from './auth.routes';
import { ROUTER_KEYS } from '../common/constants/app-keys.constants';
import { useUserQuery } from '../common/queries/user.query';
import { NavbarComponent } from '../common/navbar/navbar.component';
import 'react-toastify/dist/ReactToastify.css';

export const MainRouter = () => {
  const { checkAuth, isAuthLoading } = useUserQuery();
  const { data, isLoading } = checkAuth();
  const authRoutes = AuthRoutes();
  const loading = isLoading || isAuthLoading;

  return (
    <Router>
      <NavbarComponent />
      <ToastContainer />
      {!loading && (
        <Routes>
          {!data?.isAuth && authRoutes.map((routeInfo, index) => (
            <Route key={index} element={<routeInfo.component />} path={routeInfo.path} />
          ))}
          <Route element={<div>Hello world</div>} path={ROUTER_KEYS.ROOT} />
          <Route path="*" element={<Navigate to={ROUTER_KEYS.ROOT} replace />} />
        </Routes>
      )}
    </Router>
  );
};
