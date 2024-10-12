import SVGIcon, { SVGIconProps } from "./SVGIcon";

type SameDayProps = Partial<SVGIconProps> & {
  strokeColor?: string;
};

const SameDay: React.FC<SameDayProps> = ({ stroke= "#330E32", ...props }) => {
  return (
    <SVGIcon width="34" height="34" viewBox="0 0 34 34" fill="none"    className="w-4 h-4 md:w-6 md:h-6 lg:w-6 lg:h-6" {...props}>
      <path
        d="M4.49084 10.54L17 17.7792L29.4242 10.5825"
        stroke={stroke} /* Use the strokeColor prop */
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17 30.6142V17.765"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.0675 3.51332L6.5025 7.70666C4.78833 8.65582 3.38583 11.0358 3.38583 12.9908V20.995C3.38583 22.95 4.78833 25.33 6.5025 26.2792L14.0675 30.4867C15.6825 31.3792 18.3317 31.3792 19.9467 30.4867L27.5117 26.2792C29.2258 25.33 30.6283 22.95 30.6283 20.995V12.9908C30.6283 11.0358 29.2258 8.65582 27.5117 7.70666L19.9467 3.49916C18.3175 2.60666 15.6825 2.60666 14.0675 3.51332Z"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SVGIcon>
  );
};

export default SameDay;
