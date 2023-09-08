import { ReactNode } from 'react';

export interface IPopup {
  isOpen: boolean;
  title: string;
  children: ReactNode;
  close: () => void;
  width?: number;
}

export interface IPopupInfo {
  isOpen: boolean;
  hidePopup: () => void;
}
