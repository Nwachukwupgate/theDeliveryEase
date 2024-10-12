import SVGIcon, { SVGIconProps } from "./SVGIcon";

type ViewProps = Partial<SVGIconProps>;

const BellFill: React.FC<ViewProps> = ({ stroke = "#330E32", ...props }) => {
  return (
    <SVGIcon width="28" height="28" viewBox="0 0 28 28" fill="none"    className="w-4 h-4 md:w-6 md:h-6 lg:w-12 lg:h-12" {...props}>
        <path d="M10.0165 2.425C7.25816 2.425 5.0165 4.66667 5.0165 7.425V9.83334C5.0165 10.3417 4.79983 11.1167 4.5415 11.55L3.58316 13.1417C2.9915 14.125 3.39983 15.2167 4.48316 15.5833C8.07483 16.7833 11.9498 16.7833 15.5415 15.5833C16.5498 15.25 16.9915 14.0583 16.4415 13.1417L15.4832 11.55C15.2332 11.1167 15.0165 10.3417 15.0165 9.83334V7.425C15.0165 4.675 12.7665 2.425 10.0165 2.425Z" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"/>
        <path d="M11.5584 2.66667C11.3001 2.59167 11.0334 2.53334 10.7584 2.5C9.95843 2.4 9.19176 2.45834 8.4751 2.66667C8.71676 2.05 9.31676 1.61667 10.0168 1.61667C10.7168 1.61667 11.3168 2.05 11.5584 2.66667Z" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M12.5166 15.8833C12.5166 17.2583 11.3916 18.3833 10.0166 18.3833C9.33327 18.3833 8.69993 18.1 8.24993 17.65C7.79993 17.2 7.5166 16.5667 7.5166 15.8833" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10"/>
    </SVGIcon>
  );
};

export default BellFill;
