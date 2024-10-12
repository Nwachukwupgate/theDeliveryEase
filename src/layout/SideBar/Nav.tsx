import ConciergeNav from "@/layout/SideBar/Concierge";
import UsersNav from "@/layout/SideBar/UsersNav"

const Nav: React.FC = () => {
  return (
    <nav className="pt-[50px]">
      <UsersNav />
      <ConciergeNav />
    </nav>
  );
};

export default Nav;