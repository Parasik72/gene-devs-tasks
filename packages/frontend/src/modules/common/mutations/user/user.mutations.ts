import { QueryClient } from 'react-query';
import { ToastAlertTypes } from '../../constants/alert.constants';
import { toastAlert } from '../../functions/alert.functions';
import { HttpException } from '../../services/http.classes';
import { userService } from '../../services/user/user.service';
import { IUserToken } from '../../services/user/user.types';
import { IUserLoginSending, IUserRegistrationSending } from './user.mutation.interfaces';
import { NavigateFunction } from 'react-router-dom';
import { HISTORY_KEYS, QUERY_KEYS, STORAGE_KEYS } from '../../constants/app-keys.constants';

const onError = (err: HttpException) => toastAlert(ToastAlertTypes.error, err.message);

export const useRegisterMutation = (queryClient: QueryClient, navigate: NavigateFunction) => {
  const registrateFunc = (dto: IUserRegistrationSending) => userService.registration(dto.data);
  const onSuccess = (data: IUserToken) => {
    localStorage.setItem(STORAGE_KEYS.TOKEN, data.accessToken);
    navigate(HISTORY_KEYS.ROOT);
    queryClient.invalidateQueries([QUERY_KEYS.USER]);
  };
  return { registrateFunc, onSuccess, onError };
};

export const useLoginMutation = (queryClient: QueryClient, navigate: NavigateFunction) => {
  const loginFunc = (dto: IUserLoginSending) => userService.login(dto.data);
  const onSuccess = (data: IUserToken) => {
    localStorage.setItem(STORAGE_KEYS.TOKEN, data.accessToken);
    navigate(HISTORY_KEYS.ROOT);
    queryClient.invalidateQueries([QUERY_KEYS.USER]);
  };
  return { loginFunc, onSuccess, onError };
};
