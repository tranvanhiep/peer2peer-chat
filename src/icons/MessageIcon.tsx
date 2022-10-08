type MessageIconProps = {
  className?: string;
};

const MessageIcon = ({ className }: MessageIconProps) => (
  <svg viewBox="0 0 24 24" className={className}>
    <path
      d="M20.17 4H0L3.67 8V18C3.64829 18.5077 3.82871 19.0033 4.17174 19.3781C4.51476 19.753 4.9924 19.9766 5.5 20H20.17C20.6776 19.9766 21.1552 19.753 21.4983 19.3781C21.8413 19.0033 22.0217 18.5077 22 18V6C22.0217 5.49233 21.8413 4.99675 21.4983 4.62186C21.1552 4.24698 20.6776 4.02335 20.17 4V4ZM20 18H5.67V6H20V18Z"
      fill="white"
    ></path>
    <path d="M15 14H8V15.75H15V14Z" fill="white"></path>
    <path d="M18 11H8V12.75H18V11Z" fill="white"></path>
    <path d="M18 8H8V9.75H18V8Z" fill="white"></path>
  </svg>
);

export default MessageIcon;
