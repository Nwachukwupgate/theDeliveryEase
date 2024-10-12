import SVGIcon, { SVGIconProps } from "./SVGIcon";

type ViewProps = Partial<SVGIconProps>;

const WalletIcon: React.FC<ViewProps> = ({ stroke = "#330E32", ...props }) => {
  return (
    <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11.275 8.969c-.263.256-.413.625-.375 1.019.056.675.675 1.169 1.35 1.169h1.187v.744c0 1.294-1.056 2.35-2.35 2.35H3.912c-1.294 0-2.35-1.056-2.35-2.35V7.694c0-1.294 1.056-2.35 2.35-2.35h7.175c1.294 0 2.35 1.056 2.35 2.35v.9h-1.262c-.35 0-.668.138-.899.375z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M1.563 8.256V5.4c0-.744.456-1.407 1.15-1.669l5.963-1.875c.775-.39 1.606.185 1.606 1.016v2.375" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M14.099 9.231v1.288c0 .344-.275.625-.625.638h-1.225c-.675 0-1.294-.494-1.35-1.169-.056-.394.187-.763.45-1.019.263-.256.582-.394.932-.394h1.3c.35 0 .625.281.625.625z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M4.375 8h4.375" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg> 
    );
};

export default WalletIcon;