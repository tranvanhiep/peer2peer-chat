import {
  AttachButtonContainer,
  FileInput,
  StyledAttachIcon,
} from '@components/AttachButton/AttachButton.styled';
import { ChangeEvent, useCallback, useRef } from 'react';

type AttachButtonProps = {
  onAttachmentChange(files: FileList): void;
};

const AttachButton = ({ onAttachmentChange }: AttachButtonProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onClick = useCallback(() => {
    if (!fileInputRef.current) {
      return;
    }

    fileInputRef.current.click();
  }, []);

  const onChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { target } = event;

      if (!target.files?.length) {
        return;
      }

      onAttachmentChange(target.files);
    },
    [onAttachmentChange]
  );

  return (
    <AttachButtonContainer type="button" onClick={onClick}>
      <StyledAttachIcon />
      <FileInput
        ref={fileInputRef}
        type="file"
        multiple
        hidden
        onChange={onChange}
      />
    </AttachButtonContainer>
  );
};

export default AttachButton;
