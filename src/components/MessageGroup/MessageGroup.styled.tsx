import styled from '@emotion/styled';
import { MessageType } from '@reducers/message';

type MessageGroupContainerProps = {
  type: MessageType;
};

export const MessageGroupContainer = styled.div<MessageGroupContainerProps>`
  display: flex;
  align-items: flex-end;
  align-self: ${({ type }) =>
    type === MessageType.Incoming ? 'flex-start' : 'flex-end'};
  margin: 10px;
  max-width: calc(50% - 40px);
  word-break: break-word;
`;
