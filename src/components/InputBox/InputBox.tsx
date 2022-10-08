import { InputContainer } from '@components/InputBox/InputBox.styled';
import { ReactNode } from 'react';

type InputBoxProps = {
  children: ReactNode;
  className?: string;
};

const InputBox = ({ children, className }: InputBoxProps) => {
  return <InputContainer className={className}>{children}</InputContainer>;
};

export default InputBox;
