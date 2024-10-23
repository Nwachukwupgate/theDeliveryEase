import ConciergeNav from "@/layout/SideBar/Concierge";
import UsersNav from "@/layout/SideBar/UsersNav"
import RidersNav from "./RidersNav";
import userStore from '@/utilities/stores'; 
import { useSnapshot } from 'valtio';


const Nav: React.FC = () => {

  const { userType } = useSnapshot(userStore);

  return (
    <nav className="pt-[50px]">
      {userType === "user" && <UsersNav />}
      {userType === "admin" && <ConciergeNav />}   
      {userType === "rider" && <RidersNav />}      
    </nav>
  );
};

export default Nav;