import {
  Button,
  StyledSendIcon,
} from '@components/SendButton/SendButton.styled';
import { ComponentPropsWithoutRef } from 'react';

export type SendButtonProps = ComponentPropsWithoutRef<'button'> & {
  disabled: boolean;
  className?: string;
};

const SendButton = ({ disabled, className, ...rest }: SendButtonProps) => {
  return (
    <Button className={className} disabled={disabled} {...rest}>
      <StyledSendIcon disabled={disabled} />
    </Button>
  );
};

export default SendButton;
