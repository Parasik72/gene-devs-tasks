/* eslint-disable no-empty-pattern */
import styled from 'styled-components';
import { SPACES } from '../../../theme/spaces.const';
import { FONT_SIZES } from '../../../theme/fonts.const';
import { COLORS } from '../../../theme/colors.const';

export const FormikFormInputItem = styled('div')(({}) => ({
  width: '100%',
  padding: `${SPACES.s} 0`,
  '&>label': {
    marginRight: SPACES.xs
  },
  '&>input': {
    padding: SPACES.xs,
    width: '100%'
  }
}));

export const FormikFormErrorText = styled('span')(({}) => ({
  color: COLORS.red,
  fontSize: FONT_SIZES.m,
  marginTop: SPACES.xs,
  width: '100%'
}));
