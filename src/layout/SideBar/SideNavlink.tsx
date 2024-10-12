import IconComponent from "@/common/icons/Icon";
import { matchPath, NavLink, useLocation } from "react-router-dom";

type navLinkProps = {
    link: string;
    icon: string;
    text: string;
    iconSize?: number;
};

const SideNavLink: React.FC<navLinkProps> = ({ link, icon, text, iconSize }) => {
  const defaultStyles = "flex items-center px-4 rounded-lg py-[0.85rem] my-2";
  const { pathname } = useLocation();
  const isActive = matchPath({ path: link, end: true }, pathname);

  return (
    <NavLink
      to={link}
      className={({ isActive }) =>
        isActive
          ? `${defaultStyles} bg-[#684166] text-primaryColor text-white`
          : `${defaultStyles} text-[#c8c6c6] hover:bg-primaryColorDark`
      }
    >
      <span>
        <IconComponent
          name={icon as any}
          size={iconSize ? iconSize : 30}
          fill={isActive ? "#fff" : "#c8c6c6"}
        />
      </span>
      <span className="ml-4">{text}</span>
    </NavLink>
  );
};

export default SideNavLink;
