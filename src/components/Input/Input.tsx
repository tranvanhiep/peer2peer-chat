import { css } from '@emotion/react';
import styled from '@emotion/styled';

const baseStyle = css`
  padding: 14px 0;
  font-family: var(--base-font);
  font-size: 14px;
  line-height: 20px;
  color: var(--input-color);
  border: none;
  width: 100%;
  height: auto;
  background-color: transparent;
  outline: none;
  overflow: hidden;
`;

export const Input = styled.input`
  ${baseStyle};
`;

export const TextArea = styled.textarea`
  ${baseStyle};
  resize: none;
`;
