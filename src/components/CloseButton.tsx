import styled from '@emotion/styled';
import { ComponentPropsWithoutRef } from 'react';

type CloseIconProps = {
  className?: string;
};

const CloseIcon = ({ className }: CloseIconProps) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    height="24"
    viewBox="0 96 960 960"
    width="24"
  >
    <path d="m336 776 144-144 144 144 56-56-144-144 144-144-56-56-144 144-144-144-56 56 144 144-144 144 56 56Zm144 200q-83 0-156-31.5T197 859q-54-54-85.5-127T80 576q0-83 31.5-156T197 293q54-54 127-85.5T480 176q83 0 156 31.5T763 293q54 54 85.5 127T880 576q0 83-31.5 156T763 859q-54 54-127 85.5T480 976Z"></path>
  </svg>
);

const StyledCloseIcon = styled(CloseIcon)`
  fill: var(--icon-color);
  color: var(--icon-color);
  width: 20px;
  height: 20px;
`;

const Button = styled.button`
  position: absolute;
  top: -20px;
  right: -20px;
  padding: 12px;
  border: none;
  outline: none;
  border-radius: 50%;
  background-color: transparent;
  cursor: pointer;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: var(--white);
    opacity: 0;
  }

  &:hover {
    &::before {
      opacity: 0.08;
    }
  }
`;

type CloseButtonProps = ComponentPropsWithoutRef<'button'> & {
  onClick(): void;
};

export const CloseButton = ({ onClick, ...rest }: CloseButtonProps) => {
  return (
    <Button onClick={onClick} {...rest}>
      <StyledCloseIcon />
    </Button>
  );
};
