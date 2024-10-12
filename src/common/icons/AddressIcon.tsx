import SVGIcon, { SVGIconProps } from "./SVGIcon";

type ViewProps = Partial<SVGIconProps>;

const AddressIcon: React.FC<ViewProps> = ({ stroke = "#330E32", ...props }) => {
  return (
    <svg width="9" height="12" viewBox="0 0 9 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#00c6ff" />
            <stop offset="100%" stop-color="#0072ff" />
            </linearGradient>
        </defs>
        <path d="M4.49988 0.583374C2.11059 0.583374 0.166548 2.52742 0.166548 4.914C0.15084 8.40504 4.33521 11.2997 4.49988 11.4167C4.49988 11.4167 8.84892 8.40504 8.83322 4.91671C8.83322 2.52742 6.88917 0.583374 4.49988 0.583374ZM4.49988 7.08337C3.3028 7.08337 2.33321 6.11379 2.33321 4.91671C2.33321 3.71962 3.3028 2.75004 4.49988 2.75004C5.69696 2.75004 6.66655 3.71962 6.66655 4.91671C6.66655 6.11379 5.69696 7.08337 4.49988 7.08337Z" fill="url(#gradient)" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.5"/>
    </svg>
    );
};

export default AddressIcon;

