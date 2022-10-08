import styled from '@emotion/styled';
import FileIcon from '@icons/FileIcon';

export const ImageAttachmentMessage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 20px;
`;

export const StyledFileIcon = styled(FileIcon)`
  margin-right: 20px;
  fill: var(--icon-color);
  width: 24px;
  height: 28px;
`;

export const FileAttachmentMessage = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  border-radius: 20px;
  background-color: var(--attachment-bg-color);
`;
