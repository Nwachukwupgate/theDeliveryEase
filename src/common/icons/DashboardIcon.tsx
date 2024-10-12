import SVGIcon, { SVGIconProps } from "./SVGIcon";

type ViewProps = Partial<SVGIconProps>;

const DashboardIcon: React.FC<ViewProps> = ({ stroke = "#330E32", ...props }) => {
  return (
    <SVGIcon width="28" height="28" viewBox="0 0 28 28" fill="none"    className="w-4 h-4 md:w-6 md:h-6 lg:w-12 lg:h-12" {...props}>
        <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 22V12H15V22" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </SVGIcon>
  );
};

export default DashboardIcon;
