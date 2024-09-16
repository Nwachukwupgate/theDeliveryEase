
import SVGIcon, { SVGIconProps } from "./SVGIcon";

type ViewProps = Partial<SVGIconProps>;

const NextDay: React.FC<ViewProps> = ({ ...props }) => {
  return (
    <SVGIcon width="34" height="34" viewBox="0 0 34 34" fill="none"    className="w-4 h-4 md:w-6 md:h-6 lg:w-10 lg:h-10" {...props}>
    <path d="M2.83334 12.7499V9.91659C2.83334 5.66659 5.66667 2.83325 9.91667 2.83325H24.0833C28.3333 2.83325 31.1667 5.66659 31.1667 9.91659V12.7499" stroke="#330E32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M2.83334 21.25V24.0833C2.83334 28.3333 5.66667 31.1667 9.91667 31.1667H24.0833C28.3333 31.1667 31.1667 28.3333 31.1667 24.0833V21.25" stroke="#330E32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M9.49166 13.1184L17 17.4676L24.4517 13.1468" stroke="#330E32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M17 25.1742V17.4534" stroke="#330E32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M15.2433 8.91071L10.71 11.4324C9.69 11.9991 8.84001 13.4299 8.84001 14.6057V19.4083C8.84001 20.5841 9.67583 22.0149 10.71 22.5816L15.2433 25.1032C16.2067 25.6415 17.7933 25.6415 18.7708 25.1032L23.3042 22.5816C24.3242 22.0149 25.1742 20.5841 25.1742 19.4083V14.6057C25.1742 13.4299 24.3383 11.9991 23.3042 11.4324L18.7708 8.91071C17.7933 8.35821 16.2067 8.35821 15.2433 8.91071Z" stroke="#330E32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </SVGIcon>
  );
};

export default NextDay;
