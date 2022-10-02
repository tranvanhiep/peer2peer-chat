import styled from '@emotion/styled';
import { ReactNode } from 'react';

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  width: 100%;
  border-radius: 26px;
  background-color: var(--input-bg-color);
  box-shadow: var(--input-shadow);
`;

type InputBoxProps = {
  children: ReactNode;
  className?: string;
};

export const InputBox = ({ children, className }: InputBoxProps) => {
  return <InputContainer className={className}>{children}</InputContainer>;
};
