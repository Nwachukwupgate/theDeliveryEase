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


<svg width="13" height="14" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="0.804499" y="1.36163" width="4.78449" height="4.78449" rx="1.08306" fill="#D9D9D9" stroke="white" stroke-width="0.928333"/>
<rect x="0.804499" y="8.02667" width="4.78449" height="4.78449" rx="1.08306" fill="#D9D9D9" stroke="white" stroke-width="0.928333"/>
<rect x="7.46942" y="1.36163" width="4.78449" height="4.78449" rx="1.08306" fill="#D9D9D9" stroke="white" stroke-width="0.928333"/>
<rect x="7.46942" y="8.02667" width="4.78449" height="4.78449" rx="1.08306" fill="#D9D9D9" stroke="white" stroke-width="0.928333"/>
</svg>
