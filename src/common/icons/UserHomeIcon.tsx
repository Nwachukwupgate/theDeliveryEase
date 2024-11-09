import { SVGIconProps } from "./SVGIcon";

type ViewProps = Partial<SVGIconProps>;

const UserHomeIcon: React.FC<ViewProps> = () => {
  return (
    // <SVGIcon width="30" height="30" viewBox="0 0 30 30" fill="none"    className="w-4 h-4 md:w-6 md:h-6 lg:w-8 lg:h-12" {...props}>
       <svg width="13" height="14" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg"> 
        <rect x="0.804499" y="1.36163" width="4.78449" height="4.78449" rx="1.08306" fill="#D9D9D9" stroke="white" stroke-width="0.928333"/>
        <rect x="0.804499" y="8.02667" width="4.78449" height="4.78449" rx="1.08306" fill="#D9D9D9" stroke="white" stroke-width="0.928333"/>
        <rect x="7.46942" y="1.36163" width="4.78449" height="4.78449" rx="1.08306" fill="#D9D9D9" stroke="white" stroke-width="0.928333"/>
        <rect x="7.46942" y="8.02667" width="4.78449" height="4.78449" rx="1.08306" fill="#D9D9D9" stroke="white" stroke-width="0.928333"/>
       </svg> 
    // </SVGIcon>

  );
};

export default UserHomeIcon;