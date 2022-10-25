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
  isDelivered: boolean;
};

const Message = ({ content, type, attachments, isDelivered }: MessageProps) => {
  const html = content
    .trim()
    .split(/\n/)
    .map((v) =>
      v.replace(/\s?(https?:\/\/.+)\s?/g, '<a href="$&" target="_blank">$&</a>')
    )
    .join('<br />');

  return (
    <MessageContainer type={type}>
      {html ? (
        <TextMessage
          type={type}
          dangerouslySetInnerHTML={{ __html: html }}
        ></TextMessage>
      ) : null}
      {attachments.length
        ? attachments.map(({ id, file }) => (
            <AttachmentMessage
              key={id}
              file={file}
              isDelivered={isDelivered}
            ></AttachmentMessage>
          ))
        : null}
    </MessageContainer>
  );
};

export default Message;
