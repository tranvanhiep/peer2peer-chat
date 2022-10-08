import {
  AttachmentThumbnailContainer,
  FileAttachmentThumbnail,
  ImageAttachmentThumbnail,
  StyledFileIcon,
} from '@components/AttachmentThumbnail/AttachmentThumbnail.styled';
import CloseButton from '@components/CloseButton/CloseButton';
import useIsImageAttachment from '@hooks/useIsImageAttachment';
import useLoadAttachment from '@hooks/useLoadImageAttachment';
import { useCallback } from 'react';

type AttachmentThumbnailProps = {
  id: string;
  file: File;
  onRemove(id: string): void;
};

const AttachmentThumbnail = ({
  id,
  file,
  onRemove,
}: AttachmentThumbnailProps) => {
  const { name, type } = file;
  const isImageAttachment = useIsImageAttachment(type);
  const image = useLoadAttachment(file);

  const onClick = useCallback(() => {
    onRemove(id);
  }, [onRemove, id]);

  return (
    <AttachmentThumbnailContainer>
      {isImageAttachment ? (
        <FileAttachmentThumbnail>
          <ImageAttachmentThumbnail src={image} alt={name} />
          <CloseButton onClick={onClick} title={`Remove ${name}`} />
        </FileAttachmentThumbnail>
      ) : (
        <FileAttachmentThumbnail>
          <StyledFileIcon />
          <CloseButton onClick={onClick} title={`Remove ${name}`} />
        </FileAttachmentThumbnail>
      )}
    </AttachmentThumbnailContainer>
  );
};

export default AttachmentThumbnail;
