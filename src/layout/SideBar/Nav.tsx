import UsersNav from "@/layout/SideBar/UsersNav"
import RidersNav from "./RidersNav";
import userStore from '@/utilities/stores'; 
import { useSnapshot } from 'valtio';
import AdminNav from "@/layout/SideBar/Admin";


const Nav: React.FC = () => {

  const { userType } = useSnapshot(userStore);

  return (
    <nav className="pt-[50px]">
      {userType === "user" && <UsersNav />}
      {userType === "admin" && <AdminNav />}   
      {userType === "rider" && <RidersNav />}      
    </nav>
  );
};

export default Nav;