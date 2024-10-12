import SVGIcon, { SVGIconProps } from "./SVGIcon";

type ViewProps = Partial<SVGIconProps>;

const HistoryIcon: React.FC<ViewProps> = ({ stroke = "#330E32", ...props }) => {
  return (
    <SVGIcon width="24" height="24" viewBox="0 0 24 24" fill="none"    className="w-4 h-4 md:w-6 md:h-6 lg:w-6 lg:h-6" {...props}>
        <path d="M12 8V12L15 14" stroke={stroke} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M3 12C3 7.03 7.03 3 12 3C16.97 3 21 7.03 21 12C21 16.97 16.97 21 12 21C8.86 21 6.12 19.36 4.67 16.9" stroke={stroke} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M3 12H6" stroke={stroke} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </SVGIcon>
    );
};

export default HistoryIcon;

