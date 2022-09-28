import styled from '@emotion/styled';
import {
  ChangeEvent,
  FormEvent,
  KeyboardEvent,
  useCallback,
  useRef,
  useState,
} from 'react';
import { TextArea } from './Input';
import { InputBox } from './InputBox';
import { SendButton } from './SendButton';

const ChatBoxContainer = styled.form`
  display: flex;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 0 30px 30px;
`;

type StyledInputBoxProps = {
  line: number;
};

const StyledInputBox = styled(InputBox)<StyledInputBoxProps>`
  margin-right: 8px;
  height: ${({ line }) => (line * 20 > 52 ? `${line * 20}px` : 'auto')};
`;

const StyledSendButton = styled(SendButton)`
  margin-left: auto;
`;

export type ChatBoxProps = {
  submit(message: string): void;
};

export const ChatBox = ({ submit }: ChatBoxProps) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [line, setLine] = useState<number>(0);
  const [isSendDisabled, setIsSendDisabled] = useState<boolean>(true);

  const validateInput = useCallback((value: string) => {
    if (value.trim()) {
      setIsSendDisabled(false);

      return;
    }

    setIsSendDisabled(true);
  }, []);

  const onSubmit = useCallback(
    (event?: FormEvent<HTMLFormElement>) => {
      event?.preventDefault();
      const { current } = textAreaRef;

      if (!current?.value) {
        return;
      }

      submit(current.value);
      current.value = '';
      setLine(0);
      setIsSendDisabled(true);
    },
    [submit]
  );

  const onKeyDown = useCallback(
    (event: KeyboardEvent<HTMLTextAreaElement>) => {
      const { key, shiftKey } = event;

      if (key !== 'Enter' || shiftKey) {
        return;
      }

      event.preventDefault();
      onSubmit();
    },
    [onSubmit]
  );

  const onChange = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      const { target } = event;
      const lines = target.value.split('\n').length;

      setLine(lines ? lines : 0);
      validateInput(target.value);
    },
    [validateInput]
  );

  return (
    <ChatBoxContainer onSubmit={onSubmit}>
      <StyledInputBox line={line}>
        <TextArea
          ref={textAreaRef}
          rows={1}
          name="message"
          placeholder="Text message"
          onChange={onChange}
          onKeyDown={onKeyDown}
        />
      </StyledInputBox>
      <StyledSendButton type="submit" disabled={isSendDisabled} />
    </ChatBoxContainer>
  );
};
