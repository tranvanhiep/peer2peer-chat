import AttachmentMessage from '@components/AttachmentMessage/AttachmentMessage';
import {
  MessageContainer,
  TextMessage,
} from '@components/Message/Message.styled';
import { AttachmentState } from '@reducers/attachment';
import { MessageType } from '@reducers/message';

export type MessageProps = {
  type: MessageType;
  content: string;
  attachments: AttachmentState[];
};

const Message = ({ content, type, attachments }: MessageProps) => {
  const htmlContent = content.trim().normalize().replace(/\\n/g, '<br />');

  return (
    <MessageContainer>
      {htmlContent ? (
        <TextMessage
          type={type}
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        ></TextMessage>
      ) : null}
      {attachments.length
        ? attachments.map(({ id, file }) => (
            <AttachmentMessage key={id} file={file}></AttachmentMessage>
          ))
        : null}
    </MessageContainer>
  );
};

export default Message;
