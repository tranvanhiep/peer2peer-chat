import styled from '@emotion/styled';
import { useIsImageAttachment } from '@hooks/useIsImageAttachment';
import { useLoadAttachment } from '@hooks/useLoadImageAttachment';
import { FileIcon } from './Attachment';

const ImageAttachmentMessage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 20px;
`;

const StyledFileIcon = styled(FileIcon)`
  margin-right: 20px;
  fill: var(--icon-color);
  width: 24px;
  height: 28px;
`;

const FileAttachmentMessage = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  border-radius: 20px;
  background-color: var(--attachment-bg-color);
`;

type AttachmentMessageProps = {
  file: File;
};

export const AttachmentMessage = ({ file }: AttachmentMessageProps) => {
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
