import SVGIcon, { SVGIconProps } from "./SVGIcon";

type ViewProps = Partial<SVGIconProps>;

const ProductDescriptionIcon: React.FC<ViewProps> = ({ stroke = "#330E32", ...props }) => {
  return ( 
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.11 4.96L8 8.37l5.84-3.39" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M8 14.41V8.36" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M6.62 1.65L3.06 3.63C2.25 4.07 1.59 5.19 1.59 6.11v3.77c0 .92.66 2.04 1.46 2.49l3.56 1.98c.76.42 1.63.42 2.39 0l3.56-1.98c.8-.45 1.46-1.57 1.46-2.49V6.11c0-.92-.66-2.04-1.46-2.49L9.01 1.65c-.76-.42-1.63-.42-2.39 0z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>

    );
};

export default ProductDescriptionIcon;
