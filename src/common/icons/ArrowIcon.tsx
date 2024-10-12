import SVGIcon, { SVGIconProps } from "./SVGIcon";

type ViewProps = Partial<SVGIconProps>;

const ArrowIcon: React.FC<ViewProps> = ({ stroke = "#330E32", ...props }) => {
  return (
    <SVGIcon width="28" height="28" viewBox="0 0 28 28" fill="none"    className="w-4 h-4 md:w-6 md:h-6 lg:w-10 lg:h-10" {...props}>
        <path d="M3.33301 7.99998H12.6663M12.6663 7.99998L7.99967 3.33331M12.6663 7.99998L7.99967 12.6666" stroke="#8E95A9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </SVGIcon>
  );
};

export default ArrowIcon;