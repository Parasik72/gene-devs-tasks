import React, { FC, useState } from 'react';
import { Box, Card, Checkbox, Typography } from '@mui/material';
import { SPACESNUMBER } from '../../../theme/spaces.const';
import { ITestOptionComponent } from './test-option.types';

export const TestOptionComponent: FC<ITestOptionComponent> = ({
  option,
  callback
}) => {
  const [isChecked, setIsChecked] = useState(false);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
    callback(option._id, e.target.checked);
  };

  return (
    <Card variant='outlined'>
      <Box 
        display="flex" 
        gap={SPACESNUMBER.xxs}
      >
        <Checkbox checked={isChecked} onChange={onChange}/>
        <Typography variant='h5' alignSelf="center">{option.text}</Typography>
      </Box>
    </Card>
  );
};
