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
];

const AdminNav: React.FC = () => {
    return (
      <>
        {...normalBar.map((props) => {
          return <SideNavLink key={props.text} {...props} />;
        })}
      </>
    );
  };
  
  export default AdminNav;