import routes from "@/navigation/routes";
import SideNavLink from "@/layout/SideBar/SideNavlink";



const normalBar = [
  {
    icon: "UserHomeIcon",
    text: "Dashboard",
    link: routes.usersRoutes.DASHBOARD,
    iconSize: 30,
  },
  {
    icon: "DeliveryIcon",
    text: "Add Deliveries",
    link: routes.usersRoutes.DELIVERY,
  },
  {
    icon: "HistoryIcon",
    text: "History",
    link: routes.usersRoutes.HISTORY,
  },
  {
    icon: "ContactIcon",
    text: "Contact",
    link: routes.usersRoutes.CONTACT,
  },
];

const UsersNav: React.FC = () => {
  return (
    <>
      {...normalBar.map((props) => {
        return <SideNavLink key={props.text} {...props} />;
      })}
    </>
  );
};

export default UsersNav;