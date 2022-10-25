import {
  FileAttachmentMessage,
  ImageAttachmentMessage,
  StyledFileIcon,
  Text,
} from '@components/AttachmentMessage/AttachmentMessage.styled';
import useIsImageAttachment from '@hooks/useIsImageAttachment';
import useLoadAttachment from '@hooks/useLoadImageAttachment';

type AttachmentMessageProps = {
  file: File;
  isDelivered: boolean;
};

const AttachmentMessage = ({ file, isDelivered }: AttachmentMessageProps) => {
  const { type, name } = file;
  const isImageAttachment = useIsImageAttachment(type);
  const url = useLoadAttachment(file);

  return (
    <>
      {isImageAttachment ? (
        <ImageAttachmentMessage src={url} alt={name} />
      ) : (
        <FileAttachmentMessage href={url} target="_blank">
          <StyledFileIcon />
          {name}
        </FileAttachmentMessage>
      )}
      <Text>{!isDelivered ? 'Sending...' : null}</Text>
    </>
  );
};

export default AttachmentMessage;
