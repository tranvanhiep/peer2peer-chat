import styled from '@emotion/styled';

type MessageContainerProps = {
  type: MessageType;
};

const MessageContainer = styled.div<MessageContainerProps>`
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
};

export const Message = ({ content, type }: MessageProps) => {
  const htmlContent = content.trim().normalize().replace(/\\n/g, '<br />');

  return (
    <MessageContainer
      type={type}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    ></MessageContainer>
  );
};
