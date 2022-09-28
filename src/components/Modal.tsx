import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { ChangeEvent, FormEvent, useCallback, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Input } from './Input';
import { InputBox } from './InputBox';
import { StartButton } from './StartButton';

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

const Backdrop = styled.div<ModalProps>`
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
  z-index: 1;
`;

const ModalContainer = styled.form``;

const StyledInputBox = styled(InputBox)`
  margin: 10px 0;
  width: calc(100% - 40px);
`;

const Label = styled.label``;

export type ModalProps = {
  open?: boolean;
};

export const Modal = ({ open = false }: ModalProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [disabled, setDisabled] = useState<boolean>(true);
  const [close, setClose] = useState<boolean>(false);
  const [isClosing, setIsClosing] = useState<boolean>(false);
  const timeoutId = useRef<NodeJS.Timeout>();

  const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    if (!target.value.trim()) {
      setDisabled(true);

      return;
    }

    setDisabled(false);
  }, []);

  const onSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
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
  }, []);

  if (!open || close) {
    clearTimeout(timeoutId.current);

    return null;
  }

  return createPortal(
    <>
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
          <StartButton disabled={disabled} type="submit">
            Start Chat
          </StartButton>
        </ModalContainer>
      </ModalLayout>
      <Backdrop open={open && !isClosing} />
    </>,
    document.getElementById('modal') as HTMLElement
  );
};
