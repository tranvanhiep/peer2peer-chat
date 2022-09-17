import styled from '@emotion/styled';
import { ChangeEvent, useCallback, useRef, useState } from 'react';
import Input from './Input';
import { SendButton } from './SendButton';

const ChatBoxContainer = styled.div`
  display: flex;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 0 30px 30px;
`;

type InputContainerProps = {
  line: number;
};

const InputContainer = styled.div<InputContainerProps>`
  display: flex;
  margin-right: 8px;
  padding: 0 20px;
  width: 100%;
  height: ${({ line }) => (line * 20 > 52 ? `${line * 20}px` : 'auto')};
  border-radius: 26px;
  background-color: var(--input-bg-color);
  box-shadow: var(--input-shadow);
`;

const StyledSendButton = styled(SendButton)`
  margin-left: auto;
`;

export const ChatBox = () => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [line, setLine] = useState<number>(0);
  const [isSendDisabled, setIsSendDisabled] = useState<boolean>(true);

  const onChange = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      const { target } = event;
      const lines = target.value.split('\n').length;

      setLine(lines ? lines : 0);

      if (target.value.trim()) {
        setIsSendDisabled(false);
      } else {
        setIsSendDisabled(true);
      }
    },
    [setLine]
  );

  return (
    <ChatBoxContainer>
      <InputContainer line={line}>
        <Input ref={inputRef} onChange={onChange} />
      </InputContainer>
      <StyledSendButton disabled={isSendDisabled} />
    </ChatBoxContainer>
  );
};
