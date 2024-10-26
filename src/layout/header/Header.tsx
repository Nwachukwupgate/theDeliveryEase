import { useState, useEffect } from 'react';
import { useSnapshot } from 'valtio';
import sidebarStore from '@/utilities/sidebarStore';
import { Divider } from "@mui/material";
import Notifications from "./Notifications";
import Profile from "./Profile";
import Search from "./Search";
import Icon from '@/assets/image/logo.png'
import BellFill from "@/common/icons/BellFill";
import SearchOutline from "@/common/icons/SearchOutline";
import LogoutIcon from '@/common/icons/LogoutIcon';
import userStore from '@/utilities/stores';
import { useNavigate } from 'react-router-dom'; 
import routes from '@/navigation/routes';


const Header: React.FC = () => {
  const navigate = useNavigate()
  const [isScrolled, setIsScrolled] = useState(false);
  const { isActive } = useSnapshot(sidebarStore);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
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
      className={`fixed right-0 top-0 z-50 lg:grid lg:h-[70px] w-full lg:grid-cols-12 border-[#E0E0E0] lg:bg-white px-4 md:px-8 lg:w-[calc(100%-250px)] lg:border-b lg:pl-8 lg:pr-12 xl:pr-16 
        ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'} transition-colors duration-300 ease-in-out`}
    >
      <div className="pt-4 px-4 lg:p-0 lg:hidden">
        <div>
          <img className="w-auto h-12 sm:h-7" src={Icon} alt="Logo" />
        </div>

        <div className="flex justify-between mt-5">
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
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
                </svg>
              )}
            </button>
          </div>

          <div className="flex justify-around gap-4">
            <div className='hidden'><SearchOutline /></div>
            <div><BellFill /></div>
            <div>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4mYGiDHOtUVcSxuzNfeds4xWXNOpQ-lIMPA&s"
                alt="profile image"
                className="w-6 h-6 rounded-full"
              />
            </div>
            <div className='cursor-pointer' onClick={handleLogout}> <LogoutIcon /> </div>
          </div>
        </div>
      </div>
      <div className="lg:col-span-6 hidden items-center lg:flex">
        <Search />
      </div>
      <div className="col-span-12 flex h-full items-center justify-start lg:col-span-6 lg:justify-end lg:gap-4">
        <Notifications />
        <Divider sx={{ height: "80%" }} orientation="vertical" className="hidden lg:block" />
        <Profile />
        <div className='cursor-pointer hidden lg:block' onClick={handleLogout}> <LogoutIcon /> </div>
      </div>
    </header>
  );
};

export default Header;