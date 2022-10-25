import styled from '@emotion/styled';
import { MessageType } from '@reducers/message';

type MessageContainerProps = {
  type: MessageType;
};

export const MessageContainer = styled.div<MessageContainerProps>`
  display: flex;
  flex-direction: column;
  align-items: ${({ type }) =>
    type === MessageType.Incoming ? 'flex-start' : 'flex-end'};
`;

export const TextMessage = styled.div<MessageContainerProps>`
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
