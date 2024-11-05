import { useState } from 'react';
import { Link } from 'react-router-dom'; 
import { Button } from '@mui/material';
import Icon from '@/assets/image/logo.png'
import routes from '@/navigation/routes';

const HomeHeader = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className={`${isOpen ? 'bg-primaryHoverColorDark' : 'bg-white'}  opacity-100 shadow fixed top-0 w-full z-50`}>
      <div className="container px-6 py-6 mx-auto md:flex md:justify-between md:items-center">
        <div className="flex items-center justify-between">
          <a href="#">
            <img className="w-auto h-6 lg:h-12" src={Icon} alt="Logo" />
          </a>

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className={`${isOpen ? "text-white" : "text-primaryHoverColorDark"} focus:outline-none`}
              aria-label="toggle menu"
            >
              {isOpen ? (
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
        </div>

        {/* Mobile Menu open: "block", Menu closed: "hidden" */}
        <div className={`h-screen bg-primaryHoverColorDark opacity-95 md:hidden absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out md:mt-0 md:p-0 md:top-0 md:relative md:bg-transparent md:w-auto md:opacity-100 md:translate-x-0 md:items-center ${isOpen ? 'block opacity-100 translate-x-0' : 'hidden opacity-0 -translate-x-full'}`}>
          <div className="flex flex-col items-center md:h-auto md:flex-row md:mx-6 pt-12 space-y-2">
            <Link className="my-2 text-white transition-colors duration-300 transform border-b-2 border-white px-32 py-4 hover:text-white md:mx-4 md:my-0" to="/">ABOUT</Link>
            <Link className="my-2 text-white transition-colors duration-300 transform border-b-2 border-white px-32 py-4 hover:text-white md:mx-4 md:my-0" to="/shop">SERVICE</Link>
            <Link className="my-2 text-white transition-colors duration-300 transform border-b-2 border-white px-32 py-4 hover:text-white md:mx-4 md:my-0" to="/contact">TRACK</Link>
            <Link className="my-2 text-white transition-colors duration-300 transform border-b-2 border-white px-28 py-4 hover:text-black md:mx-4 md:my-0" to="/about">CONTACT US</Link>            
          </div>

          <div className='w-full mt-8'>
            <Link to={routes.LOGIN}>            
                <Button fullWidth sx={{ backgroundColor: "#92278f" }}> Get Started</Button>
            </Link>
          </div>
        </div>


        <div className='hidden md:flex'>
            <Link className="my-2 px-4 border-r border-black text-black transition-colors duration-300 transform hover:text-primaryHoverColorDark md:mx-1 md:my-0" to="/">HOME</Link>
            <Link className="my-2 px-4 border-r border-black text-black transition-colors duration-300 transform hover:text-primaryHoverColorDark md:my-0" to="/">ABOUT</Link>
            <Link className="my-2 px-4 border-r border-black text-black transition-colors duration-300 transform hover:text-primaryHoverColorDark md:my-0" to="/shop">SERVICE</Link>
            <Link className="my-2 px-4 border-r border-black text-black transition-colors duration-300 transform hover:text-primaryHoverColorDark md:my-0" to="/contact">TRACK</Link>
            <Link className="my-2 px-4 text-black transition-colors duration-300 transform hover:text-primaryHoverColorDark md:my-0" to="/about">CONTACT US</Link>
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
