import { ToastAlertTypes } from '../constants/alert.constants';
import { toastAlert } from '../functions/alert.functions';
import { HttpException } from '../services/http.classes';

export const onErrorAlert = 
  (err: HttpException) => toastAlert(ToastAlertTypes.error, err.message);
