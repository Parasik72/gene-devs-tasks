/* eslint-disable no-empty-pattern */
import { Paper } from '@mui/material';
import styled from 'styled-components';
import { SPACES } from '../../theme/spaces.const';
import { COLORS } from '../../theme/colors.const';

export const StyledAuthFormContainer = styled(Paper)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%'
  },
  width: '400px',
  padding: SPACES.m
}));

export const StyledAuthTitleContainer = styled('div')(({}) => ({
  borderBottomWidth: '2px',
  borderBottomColor: COLORS.gray,
  borderBottomStyle: 'solid',
  padding: `0 0 ${SPACES.s} 0`
}));
