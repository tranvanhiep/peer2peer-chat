import styled from '@emotion/styled';
import { ChangeEvent, forwardRef, Ref } from 'react';

const TextArea = styled.textarea`
  padding: 14px 0;
  font-size: 14px;
  line-height: 20px;
  color: var(--input-color);
  resize: none;
  border: none;
  width: 100%;
  height: auto;
  background-color: transparent;
  outline: none;
  overflow: hidden;
`;

type InputProps = {
  onChange(event: ChangeEvent<HTMLTextAreaElement>): void;
};

const Input = ({ onChange }: InputProps, ref: Ref<HTMLTextAreaElement>) => {
  return (
    <TextArea
      ref={ref}
      rows={1}
      placeholder="Text message"
      spellCheck={false}
      onChange={onChange}
    />
  );
};

export default forwardRef<HTMLTextAreaElement, InputProps>(Input);
