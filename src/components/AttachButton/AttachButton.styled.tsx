import styled from '@emotion/styled';
import AttachIcon from '@icons/AttachIcon';

export const StyledAttachIcon = styled(AttachIcon)`
  width: 24px;
  height: 24px;
  fill: var(--icon-color);
  color: var(--icon-color);
`;

export const AttachButtonContainer = styled.button`
  position: relative;
  padding: 12px;
  border: none;
  outline: none;
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
    background-color: var(--white);
    border-radius: 50%;
    opacity: 0;
  }

  &:hover {
    &::before {
      opacity: 0.08;
    }
  }
`;

export const FileInput = styled.input``;
