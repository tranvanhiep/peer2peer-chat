import AttachButton from '@components/AttachButton/AttachButton';
import AttachmentThumbnail from '@components/AttachmentThumbnail/AttachmentThumbnail';
import {
  AttachmentContainer,
  ChatBoxContainer,
  StyledInputBox,
  StyledSendButton,
  StyledTextArea,
  TextAreaContainer,
} from '@components/ChatBox/ChatBox.styled';
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
  const [line, setLine] = useState<number>(1);
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
      setLine(1);
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
      const returnLine = target.value.split('\n').length || 1;
      const charPerLine = target.clientWidth / 10;
      const lineByLength =
        target.value.length > charPerLine
          ? Math.ceil(target.value.length / charPerLine) - 1 || 1
          : 0;
      const line = returnLine + lineByLength;

      setLine(line > 4 ? 4 : line);
      validateInput();
    },
    [validateInput]
  );

  const onAttachmentChange = useCallback((files: FileList) => {
    const payload = Array.from(files).map((file) => {
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

  const onPaste = useCallback(
    (event: ClipboardEvent) => {
      const { clipboardData } = event;

      if (!clipboardData.files.length) {
        return;
      }

      event.preventDefault();
      onAttachmentChange(clipboardData.files);
    },
    [onAttachmentChange]
  );

  const onRemove = useCallback((id: string) => {
    setAttachments({ type: AttachmentActionType.Remove, payload: { id } });
  }, []);

  useEffect(() => {
    validateInput();
  }, [validateInput]);

  return (
    <ChatBoxContainer onSubmit={onSubmit}>
      <StyledInputBox>
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
        <TextAreaContainer>
          <StyledTextArea
            ref={textAreaRef}
            rows={line}
            name="message"
            placeholder="Text message"
            onChange={onChange}
            onKeyDown={onKeyDown}
            onPaste={onPaste}
          />
          <AttachButton onAttachmentChange={onAttachmentChange} />
        </TextAreaContainer>
      </StyledInputBox>
      <StyledSendButton type="submit" disabled={isSendDisabled} title="Send" />
    </ChatBoxContainer>
  );
};

export default ChatBox;
