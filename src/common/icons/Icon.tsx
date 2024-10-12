import { TIconPack, iconPack } from "@/common/icons/pack";
import { FC } from "react";
import { SVGIconProps } from "./SVGIcon";

export interface IconProps {
  color?: SVGIconProps["color"];

  /**
   * The name of the icon from the icon pack.
   */
  name: TIconPack;

  /**
   * The size of the icon which will be used as the width and height
   */
  size?: number | string;
  className?: string;
  fill?: string;
}

const IconComponent: FC<IconProps> = ({
  name,
  size,
  className,
  fill,
  ...props
}) => {
  const IconFromPack = iconPack[name];

  return (
    <IconFromPack
      height={size}
      className={className}
      width={size}
      fill={fill}
      {...props}
    />
  );
};

export default IconComponent;