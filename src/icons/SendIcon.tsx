type SendIconProps = {
  className?: string;
};

const SendIcon = ({ className }: SendIconProps) => (
  <svg viewBox="0 0 24 24" className={className}>
    <path d="M2,3v18l20,-9L2,3zM4,14l9,-2 -9,-2L4,6.09L17.13,12 4,17.91L4,14z"></path>
  </svg>
);

export default SendIcon;
