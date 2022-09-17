import styled from '@emotion/styled';

type IconProps = {
  className?: string;
};

const Icon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className}>
    <path d="M2,3v18l20,-9L2,3zM4,14l9,-2 -9,-2L4,6.09L17.13,12 4,17.91L4,14z"></path>
  </svg>
);

type SendButtonProps = {
  disabled: boolean;
  className?: string;
};

const SendIcon = styled(Icon)<SendButtonProps>`
  width: 40px;
  height: 40px;
  color: var(
    ${({ disabled }) => (disabled ? '--icon-disabled-color' : '--icon-color')}
  );
  fill: var(
    ${({ disabled }) => (disabled ? '--icon-disabled-color' : '--icon-color')}
  );
`;

const Button = styled.button<SendButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 52px;
  height: 52px;
  border: none;
  border-radius: 50%;
  background-color: var(
    ${({ disabled }) =>
      disabled ? '--button-inactive-color' : '--button-active-color'}
  );
  box-shadow: var(--button-shadow);
`;

export const SendButton = ({ disabled, className }: SendButtonProps) => {
  return (
    <Button className={className} disabled={disabled}>
      <SendIcon disabled={disabled} />
    </Button>
  );
};
