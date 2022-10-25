import styled from '@emotion/styled';

export const AvatarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 100px;
  margin-right: 10px;
`;

export const AvatarImage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  color: var(--background);
  background-color: var(--avatar);
  border-radius: 50%;
`;

export const AvatarName = styled.p`
  margin-bottom: 10px;
  color: var(--avatar);
  max-width: inherit;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
