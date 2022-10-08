import Avatar, { AvatarProps } from '@components/Avatar/Avatar';
import Message, { MessageProps } from '@components/Message/Message';
import { MessageGroupContainer } from '@components/MessageGroup/MessageGroup.styled';
import { MessageType } from '@reducers/message';

type MessageGroupProps = AvatarProps & MessageProps;

const MessageGroup = ({ name, type, ...rest }: MessageGroupProps) => {
  return (
    <MessageGroupContainer type={type}>
      {type === MessageType.Incoming ? <Avatar name={name} /> : null}
      <Message type={type} {...rest} />
    </MessageGroupContainer>
  );
};

export default MessageGroup;
