import styled from '@emotion/styled';
import {
  ChangeEvent,
  ClipboardEvent,
  FormEvent,
  KeyboardEvent,
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react';
import { v4 } from 'uuid';
import { Attachment } from './Attachment';
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

const AttachmentContainer = styled.div`
  display: flex;
  margin: 15px 0 5px;
`;

export type ChatBoxProps = {
  submit(message: string, attachments: AttachmentState[]): void;
};

export type AttachmentState = {
  id: string;
  file: File;
  name: string;
  type: string;
  lastModified: number;
};

enum AttachmentActionType {
  Add = 'add',
  Remove = 'remove',
  Clear = 'clear',
}

type AttachmentAction = {
  type: AttachmentActionType;
  payload?: AttachmentState[] | Pick<AttachmentState, 'id'>;
};

const initialState: AttachmentState[] = [];

const reducer = (state: AttachmentState[], action: AttachmentAction) => {
  const { payload, type } = action;

  switch (type) {
    case AttachmentActionType.Add:
      if (!Array.isArray(payload)) {
        return state;
      }

      return [...state, ...payload];
    case AttachmentActionType.Remove:
      if (!payload || Array.isArray(payload)) {
        return state;
      }

      return state.filter((item) => item.id !== payload.id);
    case AttachmentActionType.Clear:
      return [];
    default:
      return state;
  }
};

export const ChatBox = ({ submit }: ChatBoxProps) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [line, setLine] = useState<number>(0);
  const [isSendDisabled, setIsSendDisabled] = useState<boolean>(true);
  const [attachments, setAttachments] = useReducer(reducer, initialState);

  const validateInput = useCallback(() => {
    if (textAreaRef.current?.value.trim() || attachments.length) {
      setIsSendDisabled(false);

      return;
    }

    setIsSendDisabled(true);
  }, [attachments.length]);

  const onSubmit = useCallback(
    (event?: FormEvent<HTMLFormElement>) => {
      event?.preventDefault();
      const { current } = textAreaRef;

      if (!current?.value && !attachments) {
        return;
      }

      submit(current?.value ?? '', attachments);
      setLine(0);
      setIsSendDisabled(true);
      setAttachments({ type: AttachmentActionType.Clear });

      if (!current?.value) {
        return;
      }

      current.value = '';
    },
    [submit, attachments]
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
      validateInput();
    },
    [validateInput]
  );

  const onPaste = useCallback((event: ClipboardEvent) => {
    const { clipboardData } = event;

    if (!clipboardData.files.length) {
      return;
    }

    event.preventDefault();

    const payload = Array.from(clipboardData.files).map((file) => {
      const { lastModified, name, type } = file;

      return {
        id: v4(),
        file,
        name,
        type,
        lastModified,
      };
    });

    setAttachments({ type: AttachmentActionType.Add, payload });
    setIsSendDisabled(!payload.length);
  }, []);

  const onRemove = useCallback((id: string) => {
    setAttachments({ type: AttachmentActionType.Remove, payload: { id } });
  }, []);

  useEffect(() => {
    validateInput();
  }, [validateInput]);

  return (
    <ChatBoxContainer onSubmit={onSubmit}>
      <StyledInputBox line={line}>
        {attachments.length ? (
          <AttachmentContainer>
            {attachments.map(({ id, file }) => (
              <Attachment key={id} id={id} file={file} onRemove={onRemove} />
            ))}
          </AttachmentContainer>
        ) : null}
        <TextArea
          ref={textAreaRef}
          rows={1}
          name="message"
          placeholder="Text message"
          onChange={onChange}
          onKeyDown={onKeyDown}
          onPaste={onPaste}
        />
      </StyledInputBox>
      <StyledSendButton type="submit" disabled={isSendDisabled} title="Send" />
    </ChatBoxContainer>
  );
};
