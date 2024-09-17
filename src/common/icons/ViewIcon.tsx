import SVGIcon, { SVGIconProps } from "./SVGIcon";
import React from 'react';

type ViewProps = Partial<SVGIconProps>;

const ViewIcon: React.FC<ViewProps> = ({ stroke = "#330E32", ...props }) => {
  return (
    <SVGIcon
      width="28" // default size
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      className="w-4 h-4 md:w-6 md:h-6 lg:w-10 lg:h-10" // Tailwind classes for responsive sizes
      {...props}
    >
      <path
        d="M14 2.33325C7.56001 2.33325 2.33334 7.55992 2.33334 13.9999C2.33334 20.4399 7.56001 25.6666 14 25.6666C20.44 25.6666 25.6667 20.4399 25.6667 13.9999"
        stroke={stroke}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.1667 12.8333L24.7333 3.2666"
        stroke= {stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M25.6667 7.96825V2.33325H20.0317"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SVGIcon>
  );
};

export default ViewIcon;
