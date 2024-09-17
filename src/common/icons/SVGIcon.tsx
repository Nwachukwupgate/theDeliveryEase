// SVGIcon.tsx
import React from 'react';

export interface SVGIconProps extends React.SVGProps<SVGSVGElement> {
  width?: string;
  height?: string;
  viewBox?: string;
  className?: string;
  stroke?: string;
  fill?: string;
}

const SVGIcon: React.FC<SVGIconProps> = ({ width, height, viewBox, children, className, stroke, fill,  ...props }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox={viewBox}
      className={className}
      stroke={stroke}
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {children}
    </svg>
  );
};

export default SVGIcon;
