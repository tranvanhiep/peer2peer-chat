import styled from '@emotion/styled';
import { ComponentPropsWithoutRef, ReactNode } from 'react';

type IconProps = {
  className?: string;
};

const Icon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className}>
    <path
      d="M20.17 4H0L3.67 8V18C3.64829 18.5077 3.82871 19.0033 4.17174 19.3781C4.51476 19.753 4.9924 19.9766 5.5 20H20.17C20.6776 19.9766 21.1552 19.753 21.4983 19.3781C21.8413 19.0033 22.0217 18.5077 22 18V6C22.0217 5.49233 21.8413 4.99675 21.4983 4.62186C21.1552 4.24698 20.6776 4.02335 20.17 4V4ZM20 18H5.67V6H20V18Z"
      fill="white"
    ></path>
    <path d="M15 14H8V15.75H15V14Z" fill="white"></path>
    <path d="M18 11H8V12.75H18V11Z" fill="white"></path>
    <path d="M18 8H8V9.75H18V8Z" fill="white"></path>
  </svg>
);

type StyledIconProps = {
  disabled: boolean;
};

const StyledIcon = styled(Icon)<StyledIconProps>`
  margin-right: 10px;
  width: 24px;
  height: 24px;
  fill: ${({ disabled }) =>
    disabled ? 'var(--icon-disabled-color' : 'var(--icon-color'};
`;

type StartButtonProps = ComponentPropsWithoutRef<'button'> & {
  disabled: boolean;
  children: ReactNode;
};

const StyledButton = styled.button<StartButtonProps>`
  display: flex;
  align-items: center;
  margin: 40px auto 0;
  padding: 16px;
  height: 48px;
  font-family: var(--base-font);
  font-size: 14px;
  background-color: ${({ disabled }) =>
    disabled ? 'var(--button-inactive-color)' : 'var(--button-active-color)'};
  border-radius: 58px;
  box-shadow: var(--button-shadow);
  border: none;
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
`;

export const StartButton = ({
  disabled,
  children,
  ...rest
}: StartButtonProps) => {
  return (
    <StyledButton disabled={disabled} {...rest}>
      <StyledIcon disabled={disabled} />
      {children}
    </StyledButton>
  );
};
