// SVGIcon.tsx
import React from 'react';

export interface SVGIconProps extends React.SVGProps<SVGSVGElement> {
  width?: string;
  height?: string;
  viewBox?: string;
}

const SVGIcon: React.FC<SVGIconProps> = ({ width, height, viewBox, children, ...props }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox={viewBox}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {children}
    </svg>
  );
};

export default SVGIcon;
