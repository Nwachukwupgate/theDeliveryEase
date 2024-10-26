// import SVGIcon, { SVGIconProps } from "./SVGIcon";

// type ViewProps = Partial<SVGIconProps>;

const MessageIcon: React.FC = () => {
  return (
    <svg
    width="24"
    height="20"
    viewBox="0 0 24 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    >
    <path
        d="M22 3C22 1.9 21.1 1 20 1H4C2.9 1 2 1.9 2 3M22 3V15C22 16.1 21.1 17 20 17H4C2.9 17 2 16.1 2 15V3M22 3L12 10L2 3"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
    />
    </svg>

  );
};

export default MessageIcon;
