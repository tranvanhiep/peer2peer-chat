import {
  FileAttachmentMessage,
  ImageAttachmentMessage,
  StyledFileIcon,
} from '@components/AttachmentMessage/AttachmentMessage.styled';
import useIsImageAttachment from '@hooks/useIsImageAttachment';
import useLoadAttachment from '@hooks/useLoadImageAttachment';

type AttachmentMessageProps = {
  file: File;
};

const AttachmentMessage = ({ file }: AttachmentMessageProps) => {
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
    </>
  );
};

export default AttachmentMessage;
