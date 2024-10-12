import SVGIcon, { SVGIconProps } from "./SVGIcon";

type ViewProps = Partial<SVGIconProps>;

const UnknownIcon: React.FC<ViewProps> = ({ stroke = "#330E32", ...props }) => {
  return (
  <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
        <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#00c6ff" />
        <stop offset="100%" stop-color="#0072ff" />
        </linearGradient>
        <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#ff758c" />
        <stop offset="100%" stop-color="#ff7eb3" />
        </linearGradient>
    </defs>
    
    <path d="M7.50009 8.16663H8.12509C8.81259 8.16663 9.37509 7.64163 9.37509 6.99996V1.16663H3.75009C2.81259 1.16663 1.99385 1.65079 1.56885 2.36245" 
        stroke="url(#gradient1)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    
    <path d="M1.25 9.91663C1.25 10.885 2.0875 11.6666 3.125 11.6666H3.75C3.75 11.025 4.3125 10.5 5 10.5C5.6875 10.5 6.25 11.025 6.25 11.6666H8.75C8.75 11.025 9.3125 10.5 10 10.5C10.6875 10.5 11.25 11.025 11.25 11.6666H11.875C12.9125 11.6666 13.75 10.885 13.75 9.91663V8.16663H11.875C11.5312 8.16663 11.25 7.90413 11.25 7.58329V5.83329C11.25 5.51246 11.5312 5.24996 11.875 5.24996H12.6812L11.6125 3.5058C11.3875 3.14413 10.975 2.91663 10.525 2.91663H9.375V6.99996C9.375 7.64163 8.8125 8.16663 8.125 8.16663H7.5" 
        stroke="url(#gradient2)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>

    <path d="M5 12.8333C5.69036 12.8333 6.25 12.311 6.25 11.6667C6.25 11.0223 5.69036 10.5 5 10.5C4.30964 10.5 3.75 11.0223 3.75 11.6667C3.75 12.311 4.30964 12.8333 5 12.8333Z" 
        stroke="url(#gradient1)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>

    <path d="M10 12.8333C10.6904 12.8333 11.25 12.311 11.25 11.6667C11.25 11.0223 10.6904 10.5 10 10.5C9.30964 10.5 8.75 11.0223 8.75 11.6667C8.75 12.311 9.30964 12.8333 10 12.8333Z" 
        stroke="url(#gradient1)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>

    <path d="M13.75 7V8.16667H11.875C11.5312 8.16667 11.25 7.90417 11.25 7.58333V5.83333C11.25 5.5125 11.5312 5.25 11.875 5.25H12.6812L13.75 7Z" 
        stroke="url(#gradient2)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>

    <path d="M1.25 4.66663H5" stroke="url(#gradient1)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M1.25 6.41663H3.75" stroke="url(#gradient1)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M1.25 8.16663H2.5" stroke="url(#gradient1)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
);
};

export default UnknownIcon;

