import { SendButtonProps } from '@components/SendButton/SendButton';
import styled from '@emotion/styled';
import SendIcon from '@icons/SendIcon';

export const StyledSendIcon = styled(SendIcon)<SendButtonProps>`
  width: 40px;
  height: 40px;
  color: ${({ disabled }) =>
    disabled ? 'var(--icon-disabled-color)' : 'var(--icon-color)'};
  fill: ${({ disabled }) =>
    disabled ? 'var(--icon-disabled-color)' : 'var(--icon-color)'};
`;

export const Button = styled.button<SendButtonProps>`
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
