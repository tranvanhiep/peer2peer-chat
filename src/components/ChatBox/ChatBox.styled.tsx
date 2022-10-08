import InputBox from '@components/InputBox/InputBox';
import SendButton from '@components/SendButton/SendButton';
import styled from '@emotion/styled';

export const ChatBoxContainer = styled.form`
  display: flex;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 0 30px 30px;
`;

type StyledInputBoxProps = {
  line: number;
};

export const StyledInputBox = styled(InputBox)<StyledInputBoxProps>`
  margin-right: 8px;
  height: ${({ line }) => (line * 20 > 52 ? `${line * 20}px` : 'auto')};
`;

export const StyledSendButton = styled(SendButton)`
  margin-left: auto;
`;

export const AttachmentContainer = styled.div`
  display: flex;
  margin: 15px 0 5px;
`;
