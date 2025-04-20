import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import Icon from '@/assets/image/logo.png'
import routes from '@/navigation/routes';
import { SlMenu } from 'react-icons/sl';
import { CgClose } from "react-icons/cg";

const HomeHeader = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className={`${isOpen ? 'bg-primaryHoverColorDark' : 'bg-white'} shadow-sm  opacity-100  fixed top-0 w-full z-50`}>
      <div className="container px-6 py-4 mx-auto md:flex md:justify-between md:items-center">
        <div className="flex items-center justify-between">
          <a href="#">
            <img className="w-auto h-6 lg:h-12" src={Icon} alt="Logo" />
          </a>

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className={`${isOpen ? "text-white hidden" : "text-primaryHoverColorDark"} focus:outline-none`}
              aria-label="toggle menu"
            >
              <SlMenu size={24} className='text-primaryColor600' />
            </button>
          </div>
        </div>

        {/* Mobile Menu open: "block", Menu closed: "hidden" */}
        <div className={`h-screen  opacity-95 bg-[#421240CC] bg-opacity-70 md:hidden absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out md:mt-0 md:p-0 top-0 md:relative md:bg-transparent md:w-auto md:opacity-100 md:translate-x-0 md:items-center ${isOpen ? 'block opacity-100 translate-x-0' : 'hidden opacity-0 -translate-x-full'}`}>
          {/* close button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            className={`${isOpen ? "text-white block ml-auto" : "text-primaryHoverColorDark"} focus:outline-none`}
            aria-label="toggle menu"
          >
            <CgClose size={24} className='text-white' />
          </button>

          <div className="flex flex-col text-center md:h-auto md:flex-row md:mx-6 pt-12 space-y-2">
            {/* <Link className="my-2  text-white transition-colors duration-300 transform border-b-2 border-white  py-4 hover:text-white md:mx-4 md:my-0" to="/">ABOUT</Link> */}
            {/* <Link className="my-2  text-white transition-colors duration-300 transform border-b-2 border-white  py-4 hover:text-white md:mx-4 md:my-0" to="/shop">SERVICE</Link> */}
            {/* <Link className="my-2  text-white transition-colors duration-300 transform border-b-2 border-white  py-4 hover:text-white md:mx-4 md:my-0" to="/contact">TRACK</Link> */}
            <Link className="my-2  text-white transition-colors duration-300 transform border-b-2 border-white  py-4 hover:text-black md:mx-4 md:my-0" to="/contact">CONTACT US</Link>
          </div>

          <div className='w-full mt-8'>
            <Link to={routes.LOGIN}>
              <Button fullWidth sx={{ backgroundColor: "#92278f" }}> Get Started</Button>
            </Link>
          </div>
        </div>


        <div className='hidden md:flex'>
          <Link className="my-2 px-4 border-r border-black text-black transition-colors duration-300 transform hover:text-primaryHoverColorDark md:mx-1 md:my-0" to="/">HOME</Link>
          {/* <Link className="my-2 px-4 border-r border-black text-black transition-colors duration-300 transform hover:text-primaryHoverColorDark md:my-0" to="/">ABOUT</Link> */}
          {/* <Link className="my-2 px-4 border-r border-black text-black transition-colors duration-300 transform hover:text-primaryHoverColorDark md:my-0" to="/shop">SERVICE</Link> */}
          {/* <Link className="my-2 px-4 border-r border-black text-black transition-colors duration-300 transform hover:text-primaryHoverColorDark md:my-0" to="/contact">TRACK</Link> */}
          <Link className="my-2 px-4 text-black transition-colors duration-300 transform hover:text-primaryHoverColorDark md:my-0" to="/contact">CONTACT US</Link>
        </div>

        <Link to={routes.LOGIN} className="hidden md:flex">
          <Button variant="contained" color="primary">
            Get Started
          </Button>
        </Link>

      </div>
    </nav>
  );
};

export default HomeHeader;
