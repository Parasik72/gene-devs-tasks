import { useQuery } from 'react-query';
import { useState } from 'react';
import { QUERY_KEYS, STORAGE_KEYS } from '../constants/app-keys.constants';
import UserModel from '../services/user/user.model';
import { userService } from '../services/user/user.service';

export const useUserQuery = () => {
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(true);

  const checkAuth = () => {
    const checkAuthFunc = async () => {
      setIsAuthLoading(true);
      if(!localStorage.getItem(STORAGE_KEYS.TOKEN)) {
        return new UserModel(false, '');
      }
      const result = await userService.checkAuth();
      localStorage.setItem(STORAGE_KEYS.TOKEN, result.accessToken);
      return new UserModel(true, result.user.email);
    };
    const onSuccess = () => {
      setIsAuthLoading(false);
    };
    const onError = () => {
      if (localStorage.getItem(STORAGE_KEYS.TOKEN)) {
        localStorage.removeItem(STORAGE_KEYS.TOKEN);
      }
      setIsAuthLoading(false);
    };
    return useQuery(QUERY_KEYS.USER, checkAuthFunc, { onSuccess, onError });
  };

  return {
    checkAuth,
    isAuthLoading
  };
};
