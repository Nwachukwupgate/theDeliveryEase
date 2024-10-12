import SVGIcon, { SVGIconProps } from "./SVGIcon";

type ViewProps = Partial<SVGIconProps>;

const NameIcon: React.FC<ViewProps> = ({ stroke = "#330E32", ...props }) => {
  return (
    <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        >
        <circle cx="10" cy="7" r="6" stroke="#292D32" stroke-width="1.5" />
        <path
            d="M16.306 17.083C16.306 14.084 12.132 11.875 10 11.875C7.868 11.875 3.694 14.084 3.694 17.083"
            stroke="#292D32"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
    </svg>
  );
};

export default NameIcon;
