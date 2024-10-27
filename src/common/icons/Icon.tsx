import { TIconPack, iconPack } from "@/common/icons/pack";
import { FC } from "react";
import { SVGIconProps } from "./SVGIcon";

export interface IconProps {
  color?: SVGIconProps["color"];
  name: TIconPack;
  size?: number | string;
  className?: string;
  fill?: string;
  viewBox?: string;
}

const IconComponent: FC<IconProps> = ({
  name,
  size,
  className,
  fill,
  viewBox = "0 0 24 24", // Default viewBox
  ...props
}) => {
  const IconFromPack = iconPack[name] as FC<SVGIconProps>;

  return (
    <IconFromPack
      height={size}
      width={size}
      fill={fill}
      className={className}
      viewBox={viewBox} // Pass the viewBox prop
      {...props}
    />
  );
};

export default IconComponent;
