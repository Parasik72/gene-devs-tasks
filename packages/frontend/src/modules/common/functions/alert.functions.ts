import { toast } from 'react-toastify';
import { ToastAlertPosition, ToastAlertType } from '../constants/alert.constants';

export const toastAlert = (type: ToastAlertType, message: string) => {
  switch (type) {
  case 'error':
    toast.error(message, ToastAlertPosition);
    break;
  case 'success':
  default:
    toast.success(message, ToastAlertPosition);
    break;
  }
};
