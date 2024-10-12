import SVGIcon, { SVGIconProps } from "./SVGIcon";

type ViewProps = Partial<SVGIconProps>;

const UserHomeIcon: React.FC<ViewProps> = ({ stroke = "#330E32", ...props }) => {
  return (
    <SVGIcon width="24" height="24" viewBox="0 0 24 24" fill="none"    className="w-4 h-4 md:w-6 md:h-6 lg:w-6 lg:h-6" {...props}>
      <rect x="3" y="3" width="8" height="8" rx="2" stroke={stroke} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <rect x="13" y="3" width="8" height="4" rx="2" stroke={stroke} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <rect x="13" y="9" width="8" height="8" rx="2" stroke={stroke} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <rect x="3" y="13" width="8" height="4" rx="2" stroke={stroke} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </SVGIcon>

  );
};

export default UserHomeIcon;