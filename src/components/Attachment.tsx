import styled from '@emotion/styled';
import { useIsImageAttachment } from '@hooks/useIsImageAttachment';
import { useLoadAttachment } from '@hooks/useLoadImageAttachment';
import { useCallback } from 'react';
import { CloseButton } from './CloseButton';

const AttachmentContainer = styled.div`
  background-color: var(--background);
  border-radius: 4px;

  &:not(:last-child) {
    margin-right: 16px;
  }
`;

const ImageAttachment = styled.img`
  width: 100%;
`;

type FileIconProps = {
  className?: string;
};

export const FileIcon = ({ className }: FileIconProps) => (
  <svg viewBox="0 0 24 24" className={className}>
    <path d="M6 2c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6H6zm7 7V3.5L18.5 9H13z"></path>
  </svg>
);

const StyledFileIcon = styled(FileIcon)`
  fill: var(--icon-color);
  width: 24px;
  height: 28px;
`;

const FileAttachment = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 61px;
  height: 61px;
`;

type AttachmentProps = {
  id: string;
  file: File;
  onRemove(id: string): void;
};

export const Attachment = ({ id, file, onRemove }: AttachmentProps) => {
  const { name, type } = file;
  const isImageAttachment = useIsImageAttachment(type);
  const image = useLoadAttachment(file);

  const onClick = useCallback(() => {
    onRemove(id);
  }, [onRemove, id]);

  return (
    <AttachmentContainer>
      {isImageAttachment ? (
        <FileAttachment>
          <ImageAttachment src={image} alt={name} />
          <CloseButton onClick={onClick} title={`Remove ${name}`} />
        </FileAttachment>
      ) : (
        <FileAttachment>
          <StyledFileIcon />
          <CloseButton onClick={onClick} title={`Remove ${name}`} />
        </FileAttachment>
      )}
    </AttachmentContainer>
  );
};
