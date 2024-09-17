import SVGIcon, { SVGIconProps } from "./SVGIcon";
import React from 'react';

type ViewProps = Partial<SVGIconProps>;

const HomeIcon: React.FC<ViewProps> = ({ fill = 'white', ...props }) => {
  return (
    <SVGIcon
      width="20" // default size
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      className="w-6 h-6 md:w-8 md:h-8" // Tailwind classes for responsive sizes
      {...props}
    >
      <path d="M17.05 2.91006C16.1332 1.98399 15.0412 1.24973 13.8376 0.750111C12.6341 0.250494 11.3431 -0.00448012 10.04 5.95696e-05C4.57999 5.95696e-05 0.129988 4.45006 0.129988 9.91006C0.129988 11.6601 0.589988 13.3601 1.44999 14.8601L0.0499878 20.0001L5.29999 18.6201C6.74999 19.4101 8.37999 19.8301 10.04 19.8301C15.5 19.8301 19.95 15.3801 19.95 9.92006C19.95 7.27006 18.92 4.78006 17.05 2.91006ZM10.04 18.1501C8.55999 18.1501 7.10999 17.7501 5.83999 17.0001L5.53999 16.8201L2.41999 17.6401L3.24999 14.6001L3.04999 14.2901C2.22773 12.977 1.79113 11.4593 1.78999 9.91006C1.78999 5.37006 5.48999 1.67006 10.03 1.67006C12.23 1.67006 14.3 2.53006 15.85 4.09006C16.6175 4.85402 17.2257 5.76272 17.6394 6.76348C18.0531 7.76425 18.264 8.83717 18.26 9.92006C18.28 14.4601 14.58 18.1501 10.04 18.1501ZM14.56 11.9901C14.31 11.8701 13.09 11.2701 12.87 11.1801C12.64 11.1001 12.48 11.0601 12.31 11.3001C12.14 11.5501 11.67 12.1101 11.53 12.2701C11.39 12.4401 11.24 12.4601 10.99 12.3301C10.74 12.2101 9.93999 11.9401 8.99999 11.1001C8.25999 10.4401 7.76999 9.63006 7.61999 9.38006C7.47999 9.13006 7.59999 9.00006 7.72999 8.87006C7.83999 8.76006 7.97999 8.58006 8.09999 8.44006C8.21999 8.30006 8.26999 8.19006 8.34999 8.03006C8.42999 7.86006 8.38999 7.72006 8.32999 7.60006C8.26999 7.48006 7.76999 6.26006 7.56999 5.76006C7.36999 5.28006 7.15999 5.34006 7.00999 5.33006H6.52999C6.35999 5.33006 6.09999 5.39006 5.86999 5.64006C5.64999 5.89006 5.00999 6.49006 5.00999 7.71006C5.00999 8.93006 5.89999 10.1101 6.01999 10.2701C6.13999 10.4401 7.76999 12.9401 10.25 14.0101C10.84 14.2701 11.3 14.4201 11.66 14.5301C12.25 14.7201 12.79 14.6901 13.22 14.6301C13.7 14.5601 14.69 14.0301 14.89 13.4501C15.1 12.8701 15.1 12.3801 15.03 12.2701C14.96 12.1601 14.81 12.1101 14.56 11.9901Z" fill={fill}
      />
      
    </SVGIcon>
  );
};

export default HomeIcon;
