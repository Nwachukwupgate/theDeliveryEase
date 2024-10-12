
import SVGIcon, { SVGIconProps } from "./SVGIcon";

type ViewProps = Partial<SVGIconProps>;


const FilterIcon: React.FC<ViewProps> = ({ stroke = "#330E32", ...props }) => {
    return (
        <SVGIcon width="28" height="28" viewBox="0 0 28 28" fill="none" className="w-4 h-4 md:w-6 md:h-6 lg:w-10 lg:h-10" {...props}>
            <path d="M4 6H14M1.5 1H16.5M6.5 11H11.5" stroke={stroke} strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
        </SVGIcon>
    );
}
export default FilterIcon;
