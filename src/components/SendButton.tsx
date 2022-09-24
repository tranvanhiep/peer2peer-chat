import styled from '@emotion/styled';
import { ComponentPropsWithoutRef } from 'react';

type IconProps = {
  className?: string;
};

const Icon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className}>
    <path d="M2,3v18l20,-9L2,3zM4,14l9,-2 -9,-2L4,6.09L17.13,12 4,17.91L4,14z"></path>
  </svg>
);

type SendButtonProps = ComponentPropsWithoutRef<'button'> & {
  disabled: boolean;
  className?: string;
};

const SendIcon = styled(Icon)<SendButtonProps>`
  width: 40px;
  height: 40px;
  color: ${({ disabled }) =>
    disabled ? 'var(--icon-disabled-color)' : 'var(--icon-color)'};
  fill: ${({ disabled }) =>
    disabled ? 'var(--icon-disabled-color)' : 'var(--icon-color)'};
`;

const Button = styled.button<SendButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 52px;
  height: 52px;
  border: none;
  border-radius: 50%;
  background-color: ${({ disabled }) =>
    disabled ? 'var(--button-inactive-color)' : 'var(--button-active-color)'};
  box-shadow: var(--button-shadow);
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
`;

export const SendButton = ({
  disabled,
  className,
  ...rest
}: SendButtonProps) => {
  return (
    <Button className={className} disabled={disabled} {...rest}>
      <SendIcon disabled={disabled} />
    </Button>
  );
};
