import styled from '@emotion/styled';
import { useCallback } from 'react';

const AvatarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 100px;
`;

const AvatarImage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  color: var(--background);
  background-color: var(--avatar);
  border-radius: 50%;
`;

const AvatarName = styled.p`
  margin-bottom: 10px;
  color: var(--avatar);
  max-width: inherit;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export type AvatarProps = {
  name: string;
};

export const Avatar = ({ name }: AvatarProps) => {
  const createId = useCallback(() => {
    const alphabet: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    return alphabet.at(Math.random() * alphabet.length);
  }, []);

  const alias: string | undefined = name.at(0) || createId();

  return (
    <AvatarContainer>
      <AvatarName>{name}</AvatarName>
      <AvatarImage>{alias}</AvatarImage>
    </AvatarContainer>
  );
};
