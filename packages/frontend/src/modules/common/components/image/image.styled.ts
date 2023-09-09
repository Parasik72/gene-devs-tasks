import styled from 'styled-components';

export const ImageStyled = styled('img')(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%'
  },
  width: '500px',
}));
