import { SVGIconProps } from "./SVGIcon";

type ViewProps = Partial<SVGIconProps>;

const HistoryIcon: React.FC<ViewProps> = () => {
  return (
    // <SVGIcon width="24" height="24" viewBox="0 0 24 24" fill="none"    className="w-4 h-4 md:w-6 md:h-6 lg:w-6 lg:h-6" {...props}>
    //     <path d="M12 8V12L15 14" stroke={stroke} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    //     <path d="M3 12C3 7.03 7.03 3 12 3C16.97 3 21 7.03 21 12C21 16.97 16.97 21 12 21C8.86 21 6.12 19.36 4.67 16.9" stroke={stroke} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    //     <path d="M3 12H6" stroke={stroke} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    // </SVGIcon>

    <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14.3042 7.46935L13.6724 10.1641C13.1309 12.4914 12.0607 13.4326 10.0494 13.2392C9.72702 13.2134 9.37889 13.1554 9.00498 13.0651L7.92193 12.8073C5.23363 12.169 4.402 10.841 5.03378 8.14626L5.66556 5.44507C5.7945 4.89709 5.94922 4.42003 6.14262 4.02678C6.89689 2.46666 8.1798 2.04763 10.333 2.55692L11.4096 2.80834C14.1108 3.44013 14.936 4.7746 14.3042 7.46935Z" stroke="white" stroke-width="1.16042" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M10.0491 13.2393C9.64941 13.51 9.14656 13.7357 8.53412 13.9355L7.51553 14.2708C4.95617 15.0959 3.60879 14.4061 2.77716 11.8468L1.95198 9.3003C1.12679 6.74094 1.81015 5.38712 4.36951 4.56194L5.3881 4.2267C5.65242 4.1429 5.90384 4.07198 6.14237 4.02686C5.94897 4.42011 5.79425 4.89717 5.66531 5.44514L5.03353 8.14633C4.40175 10.8411 5.23338 12.1691 7.92168 12.8073L9.00473 13.0652C9.37864 13.1555 9.72677 13.2135 10.0491 13.2393Z" stroke="white" stroke-width="1.16042" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M8.48877 6.23779L11.6154 7.03074" stroke="white" stroke-width="1.16042" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M7.85742 8.73291L9.72698 9.20997" stroke="white" stroke-width="1.16042" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>

    );
};

export default HistoryIcon;

