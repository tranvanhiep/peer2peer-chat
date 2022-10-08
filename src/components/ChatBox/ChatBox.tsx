import AttachmentThumbnail from '@components/AttachmentThumbnail/AttachmentThumbnail';
import {
  AttachmentContainer,
  ChatBoxContainer,
  StyledInputBox,
  StyledSendButton,
} from '@components/ChatBox/ChatBox.styled';
import { TextArea } from '@components/Input/Input';
import reducer, {
  AttachmentActionType,
  AttachmentState,
} from '@reducers/attachment';
import genId from '@utils/genId';
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

export type ChatBoxProps = {
  submit(message: string, attachments: AttachmentState[]): void;
};

const initialState: AttachmentState[] = [];

const ChatBox = ({ submit }: ChatBoxProps) => {
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
        id: genId(),
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
              <AttachmentThumbnail
                key={id}
                id={id}
                file={file}
                onRemove={onRemove}
              />
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

export default ChatBox;
