import SVGIcon, { SVGIconProps } from "./SVGIcon";
import React from 'react';

type ViewProps = Partial<SVGIconProps>;

const GoogleIcon: React.FC<ViewProps> = ({ ...props }) => {
  return (
    <SVGIcon
      width="17" // default size
      height="16"
      viewBox="0 0 17 16"
      fill="none"
      className="w-4 h-4 md:w-6 md:h-6" // Tailwind classes for responsive sizes
      {...props}
    >
        <g clip-path="url(#clip0_186_1664)">   
            <path d="M16.2927 8.07311C16.2927 7.5475 16.25 7.01904 16.1591 6.50195H8.86584V9.47949H13.0424C12.869 10.4398 12.3122 11.2893 11.4968 11.8291V13.7611H13.9885C15.4517 12.4144 16.2927 10.4256 16.2927 8.07311Z" fill="#4285F4"/>

            <path d="M8.86588 15.628C10.9513 15.628 12.71 14.9433 13.9913 13.7614L11.4996 11.8294C10.8064 12.301 9.91143 12.5681 8.86872 12.5681C6.8515 12.5681 5.14112 11.2071 4.52743 9.37744H1.95618V11.3691C3.26879 13.9801 5.94233 15.628 8.86588 15.628V15.628Z" fill="#34A853"/>

            <path d="M4.52459 9.37743C4.2007 8.41712 4.2007 7.37726 4.52459 6.41695V4.42529H1.95618C0.859495 6.61014 0.859495 9.18423 1.95618 11.3691L4.52459 9.37743V9.37743Z" fill="#FBBC04"/>

            <path d="M8.86588 3.22354C9.96825 3.20649 11.0337 3.6213 11.832 4.38273L14.0396 2.17515C12.6418 0.862533 10.7865 0.140878 8.86588 0.163607C5.94232 0.163607 3.26879 1.81148 1.95618 4.42535L4.52459 6.417C5.13544 4.58445 6.84866 3.22354 8.86588 3.22354V3.22354Z" fill="#EA4335"/>
        </g>

        <defs>
            <clipPath id="clip0_186_1664">
                <rect width="15.4644" height="15.4644" fill="white" transform="translate(0.979004 0.163086)"/>
            </clipPath>
        </defs>
    </SVGIcon>
  );
};

export default GoogleIcon;
