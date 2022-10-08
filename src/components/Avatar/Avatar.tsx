import {
  AvatarContainer,
  AvatarImage,
  AvatarName,
} from '@components/Avatar/Avatar.styled';
import { useCallback } from 'react';

export type AvatarProps = {
  name: string;
};

const Avatar = ({ name }: AvatarProps) => {
  const createId = useCallback(() => {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

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

export default Avatar;
