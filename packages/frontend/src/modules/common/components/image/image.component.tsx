import React, { FC } from 'react';
import { IImageComponent } from './image.types';
import { ImageStyled } from './image.styled';

export const ImageComponent: FC<IImageComponent> = ({ src }) => {
  return (
    <ImageStyled src={src} alt='Image was not found' />
  );
};
