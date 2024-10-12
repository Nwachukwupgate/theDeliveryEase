import SVGIcon, { SVGIconProps } from "./SVGIcon";

type ViewProps = Partial<SVGIconProps>;

const OrderIcon: React.FC<ViewProps> = ({ stroke = "#330E32", ...props }) => {
  return (
    <SVGIcon width="34" height="34" viewBox="0 0 34 34" fill="none"    className="w-4 h-4 md:w-6 md:h-6 lg:w-6 lg:h-6" {...props}>
        <path d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z" stroke="#3F2C4D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M7.28613 7.28564H16.7147" stroke="#3F2C4D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M7.28613 12H16.7147" stroke="#3F2C4D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M7.28613 16.2856H16.7147" stroke="#3F2C4D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </SVGIcon>
  );
};

export default OrderIcon;
