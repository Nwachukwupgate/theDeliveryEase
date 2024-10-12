// import AppLogo from "@/common/icons/AppLogo";
// import Hamburger from "@/common/icons/pack/Hamburger";
import { Divider } from "@mui/material";
import Notifications from "./Notifications";
import Profile from "./Profile";
import Search from "./Search";

const Header: React.FC = () => {
  return (
    <header
      className={`fixed right-0 top-0 z-50 grid h-[70px] w-full grid-cols-12 border-[#E0E0E0] bg-white px-4 md:px-8 lg:w-[calc(100%-250px)] lg:border-b lg:pl-8 lg:pr-12 xl:pr-16`}
    >
      <div className="col-span-6 hidden items-center lg:flex">
        <Search />
      </div>
      <div className="col-span-12 flex h-full items-center justify-start lg:col-span-6 lg:justify-end lg:gap-4">
        <Notifications />
        <Divider
          sx={{ height: "80%" }}
          orientation="vertical"
          className="hidden lg:block"
        />
        {/* <div className="mr-auto lg:hidden">
          <button className="cursor-pointer [appearance:none]">
            <Hamburger />
          </button>
        </div>
        <div className="mb-1 mr-auto lg:hidden">
          <AppLogo />
        </div> */}
        <Profile />
      </div>
    </header>
  );
};

export default Header;