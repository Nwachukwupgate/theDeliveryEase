import { useState, useEffect } from 'react';
import { useSnapshot } from 'valtio';
import sidebarStore from '@/utilities/sidebarStore';
import { Divider } from "@mui/material";
import Profile from "./Profile";
// import Search from "./Search";
// import BellFill from "@/common/icons/BellFill";
// import SearchOutline from "@/common/icons/SearchOutline";
import LogoutIcon from '@/common/icons/LogoutIcon';
import userStore from '@/utilities/stores';
import { useNavigate } from 'react-router-dom';
import routes from '@/navigation/routes';
import { SlMenu } from "react-icons/sl";


const Header: React.FC = () => {
  const navigate = useNavigate()
  const [isScrolled, setIsScrolled] = useState(false);
  const { isActive } = useSnapshot(sidebarStore);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLogout = () => {
    userStore.logoutUser()
    navigate(routes.HOME_PAGE)
  }

  return (
    <header
      className={`fixed right-0 top-0 z-50  py-4 lg:grid lg:h-[70px] w-full lg:grid-cols-12   px-3 md:px-16  lg:w-[calc(100%-250px)]  
      ${isScrolled ? 'bg-primaryColor100 shadow-md' : 'bg-transparent'} transition-colors duration-300 ease-in-out`}
    >

      {/* TODO: ADD SEARCH,NOTIFICATIONS IN MOBILE AND DESKTOP */}
      <div className="  lg:p-0 lg:hidden">
        {/* MOBILE NAV  */}
        <div className="flex justify-between ">
          <div className="flex lg:hidden">
            <button
              onClick={sidebarStore.toggleSidebar}
              type="button"
              className={`${isActive ? "text-black" : "text-primaryHoverColorDark"} focus:outline-none`}
              aria-label="toggle menu"
            >
              {isActive ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <SlMenu size={24} className='text-primaryColor600' />
              )}
            </button>
          </div>

          <div className="flex justify-around gap-4">
            {/* <div className='hidden'><SearchOutline /></div> */}
            {/* <div><BellFill /></div> */}
            <Profile />
            <div className='cursor-pointer' onClick={handleLogout}> <LogoutIcon /> </div>
          </div>
        </div>
      </div>

      {/* DESKTOP NAV COMPONENTS */}
      <div className="lg:col-span-6 hidden items-center lg:flex">
        {/* <Search /> */}
      </div>
      <div className=" hidden lg:flex col-span-12  h-full items-center justify-start lg:col-span-6 lg:justify-end lg:gap-4">
        {/* <div className="hidden px-2 lg:block" role="button">
          <BellFill />
        </div> */}
        <Divider sx={{ height: "80%" }} orientation="vertical" className="hidden lg:block" />
        <Profile />
        <button onClick={handleLogout}> <LogoutIcon /> </button>
      </div>
    </header>
  );
};

export default Header;