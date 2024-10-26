import routes from "@/navigation/routes";
import SideNavLink from "@/layout/SideBar/SideNavlink";



const normalBar = [
  {
    icon: "DashboardIcon",
    text: "Dashboard",
    link: routes.AdminRoute.ADMIN_DASHBOARD,
    iconSize: 30,
  },
  {
    icon: "OrderIcon",
    text: "Order",
    link: routes.AdminRoute.ADMIN_ORDER,
  },
  {
    icon: "ServicesIcon",
    text: "Services",
    link: routes.AdminRoute.ADMIN_SERVICES,
  },
  {
    icon: "ServicesIcon",
    text: "Create Rider",
    link: routes.AdminRoute.CREATE_RIDERS,
  },
  // {
  //   icon: "RadarShield",
  //   text: "Communication",
  //   link: '',
  // },
//   {
//     icon: "SmallHouseFill",
//     text: "Common Areas",
//     link: routes.managerRoutes.COMMON_AREAS,
//   },
//   {
//     icon: "RadarShield",
//     text: "Communication",
//     link: routes.managerRoutes.COMMUNICATIONS,
//   },
];

const ConciergeNav: React.FC = () => {
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
  
  export default ConciergeNav;