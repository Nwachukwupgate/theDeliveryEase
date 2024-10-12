import SVGIcon, { SVGIconProps } from "./SVGIcon";

type ViewProps = Partial<SVGIconProps>;

const ChatIcon: React.FC<ViewProps> = ({ stroke = "#330E32", ...props }) => {
  return (
    <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    >
    <path
        d="M21.5 11.5C21.5034 12.9839 21.1735 14.4464 20.55 15.8C19.6889 17.4015 18.3697 18.715 16.733 19.6145C15.0964 20.514 13.2118 21.0006 11.25 21C9.76607 21.0035 8.30363 20.6736 6.95 20.05L1.25 22L3.85 15.8C3.22648 14.4464 2.89656 12.9839 2.9 11.5C2.901 9.53832 3.3876 7.65367 4.28705 6.01703C5.1865 4.38039 6.5 3.06114 8.1 2.2C9.45364 1.57649 10.9161 1.24657 12.4 1.25003H13C15.3006 1.3734 17.4697 2.2256 19.035 3.79087C20.6003 5.35615 21.4525 7.52518 21.5759 9.82503L21.5 11.5Z"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
    />
    </svg>

  );
};

export default ChatIcon;
