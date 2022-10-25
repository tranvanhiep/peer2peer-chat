type AttachIconProps = {
  className?: string;
};

const AttachIcon = ({ className }: AttachIconProps) => (
  <svg className={className} viewBox="0 0 24 24">
    <path d="M16 4H4C2.89543 4 2 4.89543 2 6V18C2 19.1046 2.89543 20 4 20H6V22H4C1.79086 22 0 20.2091 0 18V6C0 3.79086 1.79086 2 4 2H16C18.2091 2 20 3.79086 20 6V14H18V6C18 4.89543 17.1046 4 16 4Z"></path>
    <path d="M12 9L16 14H4L7 10L9 12.72L12 9Z"></path>
    <path d="M7 19.5C7 17.0139 8.99618 15 11.4652 15H19.7129C21.53 15 23 16.4833 23 18.3122C23 20.1412 21.53 21.6246 19.7129 21.6246H12.2508C11.0856 21.6246 10.142 20.6718 10.142 19.5C10.142 18.3282 11.0856 17.3754 12.2508 17.3754H19.8579V18.8532H12.2508C11.8999 18.8532 11.6102 19.1435 11.6102 19.5C11.6102 19.8564 11.8999 20.1468 12.2508 20.1468H19.7129C20.7158 20.1468 21.5318 19.3259 21.5318 18.3122C21.5318 17.2987 20.7158 16.4778 19.7129 16.4778H11.4652C9.81043 16.4778 8.46824 17.8291 8.46824 19.5C8.46824 21.1709 9.81043 22.5222 11.4652 22.5222H19.8579V24H11.4652C8.99618 24 7 21.9861 7 19.5Z"></path>
  </svg>
);

export default AttachIcon;
