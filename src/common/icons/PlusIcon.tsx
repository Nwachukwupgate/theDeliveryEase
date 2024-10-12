import SVGIcon, { SVGIconProps } from "./SVGIcon";

type ViewProps = Partial<SVGIconProps>;

const PlusIcon: React.FC<ViewProps> = ({ stroke = "#000000", ...props }) => {
  return (
    <SVGIcon
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className="w-4 h-4"
      {...props}
    >
      <path
        d="M8 4V12M4 8H12"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SVGIcon>
  );
};

export default PlusIcon;
