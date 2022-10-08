import {
  Button,
  StyledCloseIcon,
} from '@components/CloseButton/CloseButton.styled';
import { ComponentPropsWithoutRef } from 'react';

type CloseButtonProps = ComponentPropsWithoutRef<'button'> & {
  onClick(): void;
};

const CloseButton = ({ onClick, ...rest }: CloseButtonProps) => {
  return (
    <Button onClick={onClick} {...rest}>
      <StyledCloseIcon />
    </Button>
  );
};

export default CloseButton;
