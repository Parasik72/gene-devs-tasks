import React from 'react';
import { FC } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { IPopup } from './popup.interfaces';
import { WEIGHTS } from '../../theme/fonts.const';

export const Popup: FC<IPopup> = ({ isOpen, close, title, children, width }) => (
  <Dialog open={isOpen} onClose={close} sx={{
    '& .MuiDialog-container': {
      '& .MuiPaper-root': {
        width: width ? `${width}px` : 'default',
      }
    }
  }}>
    <DialogTitle fontWeight={WEIGHTS.bold} textAlign="center">
      {title}
    </DialogTitle>
    <DialogContent>
      <>{children}</>
    </DialogContent>
  </Dialog>
);
