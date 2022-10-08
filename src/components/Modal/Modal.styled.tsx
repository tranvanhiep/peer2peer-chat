import InputBox from '@components/InputBox/InputBox';
import { ModalProps } from '@components/Modal/Modal';
import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

export const Backdrop = styled.div<ModalProps>`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: var(--background);
  filter: opacity(0.9);
  animation: ${({ open }) => (open ? fadeIn : fadeOut)} 300ms ease-in-out;
`;

export const ModalLayout = styled.div<ModalProps>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  width: 50%;
  min-width: 300px;
  background-color: var(--modal-bg-color);
  border-radius: 10px;
  box-shadow: var(--modal-shadow);
  animation: ${({ open }) => (open ? fadeIn : fadeOut)} 300ms ease-in-out;
  z-index: 1;
`;

export const ModalContainer = styled.form``;

export const StyledInputBox = styled(InputBox)`
  margin: 10px 0;
  width: calc(100% - 40px);
`;

export const Label = styled.label``;
