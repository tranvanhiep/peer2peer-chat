import {
  StyledButton,
  StyledIcon,
} from '@components/StartButton/StartButton.styled';
import { ComponentPropsWithoutRef, ReactNode } from 'react';

export type StartButtonProps = ComponentPropsWithoutRef<'button'> & {
  disabled: boolean;
  children: ReactNode;
};

const StartButton = ({ disabled, children, ...rest }: StartButtonProps) => {
  return (
    <StyledButton disabled={disabled} {...rest}>
      <StyledIcon disabled={disabled} />
      {children}
    </StyledButton>
  );
};

export default StartButton;
