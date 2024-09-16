
import SVGIcon, { SVGIconProps } from "./SVGIcon";

type ViewProps = Partial<SVGIconProps>;

const ExpressIcon: React.FC<ViewProps> = ({ ...props }) => {
  return (
    <SVGIcon width="28" height="28" viewBox="0 0 28 28" fill="none"    className="w-4 h-4 md:w-6 md:h-6 lg:w-10 lg:h-10" {...props}>
    <path d="M25.6667 17.5C25.6667 22.015 22.015 25.6667 17.5 25.6667L18.725 23.625" stroke="#330E32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M2.33334 10.4999C2.33334 5.98492 5.985 2.33325 10.5 2.33325L9.275 4.37492" stroke="#330E32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M15.9833 5.19165L20.6267 7.87497L25.2233 5.20333" stroke="#330E32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M20.6267 12.6233V7.86328" stroke="#330E32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M19.53 2.57825L16.73 4.12987C16.1 4.47987 15.575 5.36653 15.575 6.08986V9.05324C15.575 9.77657 16.0883 10.6632 16.73 11.0132L19.53 12.5649C20.125 12.9032 21.105 12.9032 21.7117 12.5649L24.5117 11.0132C25.1417 10.6632 25.6667 9.77657 25.6667 9.05324V6.08986C25.6667 5.36653 25.1533 4.47987 24.5117 4.12987L21.7117 2.57825C21.1167 2.25159 20.1367 2.25159 19.53 2.57825Z" stroke="#330E32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M2.74168 18.0251L7.37334 20.7085L11.9817 18.0368" stroke="#330E32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M7.37334 25.4568V20.6968" stroke="#330E32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M6.28834 15.4117L3.48834 16.9634C2.85834 17.3134 2.33334 18.2 2.33334 18.9234V21.8867C2.33334 22.6101 2.84668 23.4967 3.48834 23.8467L6.28834 25.3984C6.88333 25.7367 7.86333 25.7367 8.47 25.3984L11.27 23.8467C11.9 23.4967 12.425 22.6101 12.425 21.8867V18.9234C12.425 18.2 11.9117 17.3134 11.27 16.9634L8.47 15.4117C7.86333 15.0851 6.88333 15.0851 6.28834 15.4117Z" stroke="#330E32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </SVGIcon>
  );
};

export default ExpressIcon;
