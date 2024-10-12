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
    icon: "TrackingIcon",
    text: "Tracking",
    link: routes.usersRoutes.TRACKING,
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
  {
    icon: "SettingIcon",
    text: "Settings",
    link: routes.usersRoutes.SETTING,
  },
//   {
//     icon: "RadarShield",
//     text: "Communication",
//     link: routes.managerRoutes.COMMUNICATIONS,
//   },
];

const UsersNav: React.FC = () => {
    return (
      <>
        {...normalBar.map((props) => {
          return <SideNavLink key={props.text} {...props} />;
        })}
  
        {/* {...subNav.map((props, num) => {
          return <SideBarAccordion key={props.text} {...props} idnum={num + 1} />;
        })} */}
  
        {/* <Divider
          sx={{
            borderColor: "#E6F4FB1C",
            marginTop: "70px",
            marginBottom: "21px",
          }}
        /> */}
{/*   
        {...others.map((props) => {
          return <SideNavLink key={props.text} {...props} />;
        })} */}
      </>
    );
  };
  
  export default UsersNav;