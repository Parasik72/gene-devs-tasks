import React, { FC, useEffect, useMemo, useState } from 'react';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';
import { SPACESNUMBER } from '../../../theme/spaces.const';
import { WEIGHTS } from '../../../theme/fonts.const';
import { getStringTime } from '../../functions/get-string-time.function';
import { ITimerComponent } from './timer.types';

export const TimerComponent: FC<ITimerComponent> = ({ time, setTime }) => {
  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTime) => prevTime + 1000);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const timeStr = useMemo(() => getStringTime(time), [time]) ;

  return (
    <Box display="flex" alignItems="center" gap={SPACESNUMBER.xxs}>
      <Typography variant='h6' fontWeight={WEIGHTS.bold}>Timer:</Typography>
      <Typography variant='h6'>{timeStr}</Typography>
    </Box>
  );
};
