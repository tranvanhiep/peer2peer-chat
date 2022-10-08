import styled from '@emotion/styled';
import CloseIcon from '@icons/CloseIcon';

export const StyledCloseIcon = styled(CloseIcon)`
  fill: var(--icon-color);
  color: var(--icon-color);
  width: 20px;
  height: 20px;
`;

export const Button = styled.button`
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
