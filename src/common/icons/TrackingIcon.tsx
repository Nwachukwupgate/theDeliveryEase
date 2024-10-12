import SVGIcon, { SVGIconProps } from "./SVGIcon";

type ViewProps = Partial<SVGIconProps>;

const TrackingIcon: React.FC<ViewProps> = ({ stroke = "#330E32", ...props }) => {
  return (
    <SVGIcon
      width="20" // default size
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      className="w-6 h-6 md:w-8 md:h-8" // Tailwind classes for responsive sizes
      {...props}
    >
      <path d="M12 11.5C13.1046 11.5 14 10.6046 14 9.5C14 8.39543 13.1046 7.5 12 7.5C10.8954 7.5 10 8.39543 10 9.5C10 10.6046 10.8954 11.5 12 11.5Z" stroke={stroke} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M12 21C10.2 18.8 6 13.9 6 9.5C6 6.46243 8.46243 4 11.5 4C14.5376 4 17 6.46243 17 9.5C17 13.9 12.8 18.8 12 21Z" stroke={stroke} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M8 20L2 14" stroke={stroke} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M20 4L14 10" stroke={stroke} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </SVGIcon>

    );
};

export default TrackingIcon;
