import styled from '@emotion/styled';
import FileIcon from '@icons/FileIcon';

export const AttachmentThumbnailContainer = styled.div`
  background-color: var(--background);
  border-radius: 4px;

  &:not(:last-child) {
    margin-right: 16px;
  }
`;

export const ImageAttachmentThumbnail = styled.img`
  width: 100%;
`;

export const StyledFileIcon = styled(FileIcon)`
  fill: var(--icon-color);
  width: 24px;
  height: 28px;
`;

export const FileAttachmentThumbnail = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 61px;
  height: 61px;
`;
