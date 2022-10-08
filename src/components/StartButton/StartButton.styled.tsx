import { StartButtonProps } from '@components/StartButton/StartButton';
import styled from '@emotion/styled';
import MessageIcon from '@icons/MessageIcon';

type StyledIconProps = {
  disabled: boolean;
};

export const StyledIcon = styled(MessageIcon)<StyledIconProps>`
  margin-right: 10px;
  width: 24px;
  height: 24px;
  fill: ${({ disabled }) =>
    disabled ? 'var(--icon-disabled-color' : 'var(--icon-color'};
`;

export const StyledButton = styled.button<StartButtonProps>`
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
