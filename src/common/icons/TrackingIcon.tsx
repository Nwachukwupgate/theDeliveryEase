import { SVGIconProps } from "./SVGIcon";

type ViewProps = Partial<SVGIconProps>;

const TrackingIcon: React.FC<ViewProps> = () => {
  return (
    // <SVGIcon
    //   width="20" // default size
    //   height="20"
    //   viewBox="0 0 20 20"
    //   fill="none"
    //   className="w-6 h-6 md:w-8 md:h-8" // Tailwind classes for responsive sizes
    //   {...props}
    // >
    //   <path d="M12 11.5C13.1046 11.5 14 10.6046 14 9.5C14 8.39543 13.1046 7.5 12 7.5C10.8954 7.5 10 8.39543 10 9.5C10 10.6046 10.8954 11.5 12 11.5Z" stroke={stroke} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    //   <path d="M12 21C10.2 18.8 6 13.9 6 9.5C6 6.46243 8.46243 4 11.5 4C14.5376 4 17 6.46243 17 9.5C17 13.9 12.8 18.8 12 21Z" stroke={stroke} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    //   <path d="M8 20L2 14" stroke={stroke} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    //   <path d="M20 4L14 10" stroke={stroke} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    // </SVGIcon>

    <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8.07645 9.45247C9.18731 9.45247 10.0878 8.55194 10.0878 7.44108C10.0878 6.33022 9.18731 5.42969 8.07645 5.42969C6.96559 5.42969 6.06506 6.33022 6.06506 7.44108C6.06506 8.55194 6.96559 9.45247 8.07645 9.45247Z" stroke="white" stroke-width="1.16042"/>
      <path d="M2.67408 6.26744C3.94409 0.684551 12.2153 0.690998 13.4788 6.27389C14.2202 9.54884 12.183 12.321 10.3973 14.0358C9.1015 15.2865 7.05143 15.2865 5.74918 14.0358C3.96988 12.321 1.9327 9.5424 2.67408 6.26744Z" stroke="white" stroke-width="1.16042"/>
    </svg>

    );
};

export default TrackingIcon;

