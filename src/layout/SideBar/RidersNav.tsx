import routes from "@/navigation/routes";
import SideNavLink from "@/layout/SideBar/SideNavlink";



const normalBar = [
  {
    icon: "UserHomeIcon",
    text: "Dashboard",
    link: routes.RidersRoute.RIDER_DASHBOARD,
    iconSize: 30,
  },
  {
    icon: "HistoryIcon",
    text: "History",
    link: routes.RidersRoute.RIDER_DELIVERIES,
  },
  {
    icon: "ContactIcon",
    text: "Contact",
    link: routes.RidersRoute.RIDER_CONTACT,
  },
  {
    icon: "SettingIcon",
    text: "Settings",
    link: routes.RidersRoute.RIDER_SETTINGS,
  },
];

const RidersNav: React.FC = () => {
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
  
  export default RidersNav;