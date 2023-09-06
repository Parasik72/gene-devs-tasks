import { QueryClient } from 'react-query';
import { QUERY_KEYS, STORAGE_KEYS } from '../constants/app-keys.constants';

export const logoutUser = async (queryClient: QueryClient) => {
  localStorage.removeItem(STORAGE_KEYS.TOKEN);
  queryClient.setQueriesData([QUERY_KEYS.USER], null);
  await queryClient.invalidateQueries([QUERY_KEYS.USER]);
};
