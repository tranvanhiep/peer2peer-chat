import styled from '@emotion/styled';
import { Avatar, AvatarProps } from './Avatar';
import { Message, MessageProps, MessageType } from './Message';

type MessageGroupContainerProps = {
  type: MessageType;
};

const MessageGroupContainer = styled.div<MessageGroupContainerProps>`
  display: flex;
  align-items: flex-end;
  align-self: ${({ type }) =>
    type === MessageType.Incoming ? 'flex-start' : 'flex-end'};
  margin: 10px;
`;

type MessageGroupProps = AvatarProps & MessageProps;

export const MessageGroup = ({ name, type, ...rest }: MessageGroupProps) => {
  return (
    <MessageGroupContainer type={type}>
      {type === MessageType.Incoming && <Avatar name={name} />}
      <Message type={type} {...rest} />
    </MessageGroupContainer>
  );
};
