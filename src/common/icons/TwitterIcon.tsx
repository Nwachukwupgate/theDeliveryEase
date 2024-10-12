import SVGIcon, { SVGIconProps } from "./SVGIcon";
import React from 'react';

type ViewProps = Partial<SVGIconProps>;

const TwitterIcon: React.FC<ViewProps> = ({ stroke = 'white', ...props }) => {
  return (
    <SVGIcon
      width="18" // default size
      height="18"
      viewBox="0 0 22 18"
      fill="none"
      className="w-6 h-6 md:w-8 md:h-8" // Tailwind classes for responsive sizes
      {...props}
    >
      <path 
        d="M1 15.5C2.765 16.521 4.814 17 7 17C13.48 17 18.762 11.863 18.992 5.438L21 1.5L17.646 2C16.9152 1.35552 15.9744 0.999939 15 1C12.428 1 10.5 3.517 11.12 5.98C7.568 6.21 4.349 4.021 2.487 1.105C1.251 5.302 2.397 10.356 5.5 13.471C5.5 14.647 2.5 15.349 1 15.5Z" 
        stroke={stroke}
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      
    </SVGIcon>
  );
};

export default TwitterIcon;
