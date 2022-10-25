import { TextArea } from '@components/Input/Input';
import InputBox from '@components/InputBox/InputBox';
import SendButton from '@components/SendButton/SendButton';
import styled from '@emotion/styled';

export const ChatBoxContainer = styled.form`
  display: flex;
  position: sticky;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 0 30px 30px;
  background-color: var(--background);
`;

export const StyledInputBox = styled(InputBox)`
  margin-right: 8px;
`;

export const StyledTextArea = styled(TextArea)`
  overflow-y: ${({ rows = 1 }) => (rows === 4 ? 'auto' : 'hidden')};
`;

export const StyledSendButton = styled(SendButton)`
  margin-left: auto;
`;

export const AttachmentContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 15px 0 5px;
`;

export const TextAreaContainer = styled.div`
  display: flex;
`;
