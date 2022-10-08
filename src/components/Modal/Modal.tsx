import { Input } from '@components/Input/Input';
import {
  Backdrop,
  Label,
  ModalContainer,
  ModalLayout,
  StyledInputBox,
} from '@components/Modal/Modal.styled';
import StartButton from '@components/StartButton/StartButton';
import { ChangeEvent, FormEvent, useCallback, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

export type ModalProps = {
  open?: boolean;
};

const Modal = ({ open = false }: ModalProps) => {
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

export default Modal;
