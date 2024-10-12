import SVGIcon, { SVGIconProps } from "./SVGIcon";

type ViewProps = Partial<SVGIconProps>;

const ProductNameIcon: React.FC<ViewProps> = ({ stroke = "#330E32", ...props }) => {
  return (    
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
        <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#6a82fb" />
        <stop offset="100%" stop-color="#fc5c7d" />
        </linearGradient>
    </defs>
    
    <path d="M2.11328 4.95996L7.99995 8.36663L13.8466 4.97996" stroke="url(#gradient1)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    
    <path d="M8 14.4067V8.35999" stroke="url(#gradient1)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    
    <path d="M6.61993 1.65336L3.05993 3.62669C2.25326 4.07336 1.59326 5.19336 1.59326 6.11336V9.88002C1.59326 10.8 2.25326 11.92 3.05993 12.3667L6.61993 14.3467C7.37993 14.7667 8.62659 14.7667 9.38659 14.3467L12.9466 12.3667C13.7533 11.92 14.4133 10.8 14.4133 9.88002V6.11336C14.4133 5.19336 13.7533 4.07336 12.9466 3.62669L9.38659 1.64669C8.61993 1.22669 7.37993 1.22669 6.61993 1.65336Z" 
        stroke="url(#gradient1)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
);
};

export default ProductNameIcon;
