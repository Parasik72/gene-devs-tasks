/* eslint-disable no-empty-pattern */
import { Box, Button } from '@mui/material';
import styled from 'styled-components';
import { FONT_SIZES, WEIGHTS } from '../../theme/fonts.const';
import { FLEX_GROW_NUMBER } from '../../theme/sizes.const';
import { COLORS } from '../../theme/colors.const';

export const StyledNavbarTitle = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    fontWeight: WEIGHTS.bold,
    fontSize: FONT_SIZES.m
  },
  flexGrow: FLEX_GROW_NUMBER.xxs,
  display: 'block',
  cursor: 'pointer'
}));

export const StyledNavbarBtn = styled(Button)(({}) => ({
  color: COLORS.white
}));
