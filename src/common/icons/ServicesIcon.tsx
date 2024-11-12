import { SVGIconProps } from "./SVGIcon";

type ViewProps = Partial<SVGIconProps>;

const ServicesIcon: React.FC<ViewProps> = () => {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.95898 11.3876V8.97931C2.95898 5.36689 5.36726 2.95862 8.97967 2.95862H21.021C24.6335 2.95862 27.0417 5.36689 27.0417 8.97931V11.3876" stroke="white" stroke-width="1.17159" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M2.95898 18.6124V21.0207C2.95898 24.6331 5.36726 27.0414 8.97967 27.0414H21.021C24.6335 27.0414 27.0417 24.6331 27.0417 21.0207V18.6124" stroke="white" stroke-width="1.17159" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M8.61914 11.7006L15.0011 15.3973L21.3348 11.7247" stroke="white" stroke-width="1.17159" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M15.001 21.9478V15.3853" stroke="white" stroke-width="1.17159" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M13.5071 8.12437L9.65391 10.2678C8.78693 10.7494 8.06445 11.9656 8.06445 12.965V17.0471C8.06445 18.0465 8.77488 19.2627 9.65391 19.7443L13.5071 21.8876C14.326 22.3452 15.6746 22.3452 16.5055 21.8876L20.3587 19.7443C21.2257 19.2627 21.9482 18.0465 21.9482 17.0471V12.965C21.9482 11.9656 21.2377 10.7494 20.3587 10.2678L16.5055 8.12437C15.6746 7.65475 14.326 7.65475 13.5071 8.12437Z" stroke="white" stroke-width="1.17159" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  );
};

export default ServicesIcon;
