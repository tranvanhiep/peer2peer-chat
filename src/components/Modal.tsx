import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { ChangeEvent, FormEvent, useCallback, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Input } from './Input';
import { InputBox } from './InputBox';

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

const ModalLayout = styled.div<ModalProps>`
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
`;

const ModalContainer = styled.form`
  width: calc(100% - 40px);
`;

const StyledInputBox = styled(InputBox)`
  margin: 10px 0;
`;

const Label = styled.label``;

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

type SubmitButtonProps = {
  disabled: boolean;
};

const StyledIcon = styled(Icon)<SubmitButtonProps>`
  margin-right: 10px;
  width: 24px;
  height: 24px;
  fill: ${({ disabled }) =>
    disabled ? 'var(--icon-disabled-color' : 'var(--icon-color'};
`;

const SubmitButton = styled.button<SubmitButtonProps>`
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
`;

export type ModalProps = {
  open?: boolean;
};

export const Modal = ({ open = false }: ModalProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [disabled, setDisabled] = useState<boolean>(true);
  const [close, setClose] = useState<boolean>(false);
  const [isClosing, setIsClosing] = useState<boolean>(false);
  const timeoutId = useRef<number>();

  const onChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { target } = event;
      if (!target.value.trim()) {
        setDisabled(true);

        return;
      }

      setDisabled(false);
    },
    [setDisabled]
  );

  const onSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const { current } = inputRef;

      if (!current?.value.trim()) {
        return;
      }

      localStorage.setItem('name', current.value);
      setIsClosing(true);
      timeoutId.current = setTimeout(() => {
        setClose(true);
      }, 300);
    },
    [setClose]
  );

  if (!open || close) {
    clearTimeout(timeoutId.current);

    return null;
  }

  return createPortal(
    <ModalLayout open={open && !isClosing}>
      <ModalContainer onSubmit={onSubmit}>
        <Label htmlFor="name">Please input your name:</Label>
        <StyledInputBox>
          <Input
            ref={inputRef}
            id="name"
            type="text"
            name="name"
            placeholder="Your name"
            autoComplete="off"
            onChange={onChange}
          />
        </StyledInputBox>
        <SubmitButton type="submit" disabled={disabled}>
          <StyledIcon disabled={disabled} />
          Start Chat
        </SubmitButton>
      </ModalContainer>
    </ModalLayout>,
    document.getElementById('modal') as HTMLElement
  );
};
