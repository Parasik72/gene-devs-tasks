import { ToastOptions } from 'react-toastify';

export enum ToastAlertTypes {
  success = 'success',
  error = 'error'
}

export type ToastAlertType = 'success' | 'error';

export const ToastAlertPosition: ToastOptions = { position: 'top-center' };
