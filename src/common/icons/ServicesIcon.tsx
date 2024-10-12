import SVGIcon, { SVGIconProps } from "./SVGIcon";

type ViewProps = Partial<SVGIconProps>;

const ServicesIcon: React.FC<ViewProps> = ({ stroke = "#330E32", ...props }) => {
  return (
    <SVGIcon width="34" height="34" viewBox="0 0 34 34" fill="none"    className="w-4 h-4 md:w-6 md:h-6 lg:w-6 lg:h-6" {...props}>
        <circle cx="12" cy="12" r="2" stroke={stroke} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M16.24 7.76L17.66 6.34" stroke={stroke} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M12 2V4" stroke={stroke} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M16.24 16.24L17.66 17.66" stroke={stroke} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M12 20V22" stroke={stroke} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M7.76 16.24L6.34 17.66" stroke={stroke} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M7.76 7.76L6.34 6.34" stroke={stroke} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M2 12H4" stroke={stroke} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M20 12H22" stroke={stroke} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </SVGIcon>
  );
};

export default ServicesIcon;
