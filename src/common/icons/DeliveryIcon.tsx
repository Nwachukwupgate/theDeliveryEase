// import SVGIcon, { SVGIconProps } from "./SVGIcon";

// type ViewProps = Partial<SVGIconProps>;

const DeliveryIcon: React.FC = () => {
  return (
    <svg width="30" height="30" viewBox="0 0 144 144" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Calendar Frame */}
      <rect x="20" y="20" width="104" height="104" rx="8" fill="#ECEFF1" stroke="#90A4AE" strokeWidth="2" />

      {/* Calendar Top Bar */}
      <rect x="20" y="20" width="104" height="28" fill="#607D8B" />

      {/* Calendar Days (Grid) */}
      <g fill="#455A64" opacity="0.8" fontSize="2">
        <circle cx="40" cy="58" r="1.5" />
        <circle cx="60" cy="58" r="1.5" />
        <circle cx="80" cy="58" r="1.5" />
        <circle cx="100" cy="58" r="1.5" />
        <circle cx="120" cy="58" r="1.5" />

        <circle cx="40" cy="78" r="1.5" />
        <circle cx="60" cy="78" r="1.5" />
        <circle cx="80" cy="78" r="1.5" />
        <circle cx="100" cy="78" r="1.5" />
        <circle cx="120" cy="78" r="1.5" />

        <circle cx="40" cy="98" r="1.5" />
        <circle cx="60" cy="98" r="1.5" />
        <circle cx="80" cy="98" r="1.5" />
        <circle cx="100" cy="98" r="1.5" />
        <circle cx="120" cy="98" r="1.5" />
      </g>

      {/* Add Delivery Button (Inside Calendar) */}
      <g opacity="0.9">
        <rect x="20" y="25" width="30" height="8" rx="2" fill="#43A047" />
        <text x="22" y="29" fill="white" fontFamily="Arial" fontSize="2" fontWeight="bold">Add Delivery</text>

        {/* Plus Icon for Add Delivery */}
        <g transform="translate(10,25)">
          <rect x="16" y="1" width="3" height="8" fill="white" />
          <rect x="12" y="4" width="8" height="3" fill="white" />
        </g>
      </g>

      {/* Month/Year Text at Top Bar */}
      <text x="15" y="16" fill="white" fontFamily="Arial" fontSize="2" textAnchor="middle" fontWeight="bold">Oct 2024</text>

      {/* Bottom Shadow for Depth */}
      <rect x="20" y="70" width="104" height="3" fill="#CFD8DC" rx="2" />
    </svg>
  );
};

export default DeliveryIcon;
