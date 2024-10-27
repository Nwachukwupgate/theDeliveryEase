import { FC, ReactNode } from "react";

export interface SVGIconProps {
  /**
   * The paths, shapes and other SVG elements.
   */
  children?: ReactNode;
  /**
   * The fill color of the icon. Default is "none".
   */
  fill?: string;

  /**
   * The height of the icon. Default is 24.
   */
  height?: number | string;

  /**
   * The viewBox of the icon.
   */
  viewBox: string;

  /**
   * The width of the icon. Default is 24.
   */
  width?: number | string;

  /**
   * The XML namespace of the icon. Default is "http://www.w3.org/2000/svg".
   */
  xmlns?: string;

  /**
   * The color of the icon. Default is currentColor
   */
  color?: string;

  /**
   * The stroke color of the svg icon
   */
  stroke?: string;

  /**
   * The stroke width of the svg icon
   */
  strokeWidth?: string;

  strokeLinejoin?: "inherit" | "round" | "miter" | "bevel" | undefined;
  fillRule?: "evenodd" | "nonzero" | undefined;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Renders an SVG icon component.
 */
const SVGIcon: FC<SVGIconProps> = ({
  fill = "none",
  width = 24,
  height = 24,
  xmlns = "http://www.w3.org/2000/svg",
  color = "currentColor",
  stroke,
  children,
  viewBox,
  strokeWidth,
  strokeLinejoin,
  fillRule,
  className,
}) => {
  return (
    <svg
      color={color}
      fill={fill}
      height={height}
      stroke={stroke}
      strokeLinejoin={strokeLinejoin}
      strokeWidth={strokeWidth}
      viewBox={viewBox}
      width={width}
      xmlns={xmlns}
      fillRule={fillRule}
      className={className ? className : ""}
    >
      {children}
    </svg>
  );
};

export default SVGIcon;
