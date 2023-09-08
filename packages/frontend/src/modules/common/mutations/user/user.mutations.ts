import { QueryClient, useMutation, useQueryClient } from 'react-query';
import { userService } from '../../services/user/user.service';
import { IUserLoginSending, IUserRegistrationSending } from './user.mutation.types';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { HISTORY_KEYS, QUERY_KEYS, STORAGE_KEYS } from '../../constants/app-keys.constants';
import { IUserAccess } from '../../services/user/user.types';
import { onErrorAlert } from '../on-error.alert';

export const useRegisterMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const registrateFunc = (dto: IUserRegistrationSending) => userService.registration(dto.data);
  const onSuccess = (data: IUserAccess) => {
    localStorage.setItem(STORAGE_KEYS.TOKEN, data.accessToken);
    navigate(HISTORY_KEYS.ROOT);
    queryClient.invalidateQueries([QUERY_KEYS.USER]);
  };
  return useMutation(registrateFunc, { onSuccess, onError: onErrorAlert });
};

export const useLoginMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const loginFunc = (dto: IUserLoginSending) => userService.login(dto.data);
  const onSuccess = (data: IUserAccess) => {
    localStorage.setItem(STORAGE_KEYS.TOKEN, data.accessToken);
    navigate(HISTORY_KEYS.ROOT);
    queryClient.invalidateQueries([QUERY_KEYS.USER]);
  };
  return useMutation(loginFunc, { onSuccess, onError: onErrorAlert });
};
