import styled from '@emotion/styled';
import { AttachmentMessage } from './AttachmentMessage';
import { AttachmentState } from './ChatBox';

type MessageContainerProps = {
  type: MessageType;
};

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const TextMessage = styled.div<MessageContainerProps>`
  padding: 10px 12px;
  margin-left: ${({ type }) => (type === MessageType.Incoming ? '10px' : '0')};
  background: ${({ type }) =>
    type === MessageType.Incoming
      ? 'var(--incoming-bg-color)'
      : 'var(--outgoing-bg-color)'};
  color: ${({ type }) =>
    type === MessageType.Incoming
      ? 'var(--incoming-color)'
      : 'var(--outgoing-color)'};
  border-radius: ${({ type }) =>
    type === MessageType.Incoming ? '20px 20px 20px 4px' : '20px 20px 4px'};
`;

export enum MessageType {
  Incoming,
  Outgoing,
}

export type MessageProps = {
  type: MessageType;
  content: string;
  attachments: AttachmentState[];
};

export const Message = ({ content, type, attachments }: MessageProps) => {
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
