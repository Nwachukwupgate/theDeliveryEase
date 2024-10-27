// import SVGIcon, { SVGIconProps } from "./SVGIcon";

// type ViewProps = Partial<SVGIconProps>;

const LogoutIcon: React.FC = () => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="w-6 h-6 md:w-6 md:h-6 lg:w-8 lg:h-8 logout-icon"  stroke= "#330E32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
      <polyline points="10 17 15 12 10 7" />
      <line x1="15" y1="12" x2="3" y2="12" />
    </svg>
  );
};

export default LogoutIcon;