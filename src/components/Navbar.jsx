import { NavLink } from 'react-router-dom';
import Logo from '../assests/svg/wheel.svg?react';

const Navbar = () => {
  return (
    <div className="bg-[#3470ff]">
      <nav>
        <div className="flex justify-between items-center h-16 w-full px-[120px] max-w-[1440px]">
          <div className="flex-shrink-0">
            <NavLink to="/" className="flex items-center text-white">
              <div className="block h-8 w-auto">
                <Logo />
              </div>
              {/* <img
                src={<Logo />}
                alt="RentaCarUa"
                className="block h-8 w-auto"
              /> */}
              <span className="ml-2 text-lg font-semibold font-manrope">
                RentaCarUa
              </span>
            </NavLink>
          </div>
          <div className="flex space-x-4 mr-4">
            <NavLink
              to="/catalog"
              className="text-white text-[18px] hover:border-violet-600  hover:border-b-2  transition duration-300 ease-in-out"
            >
              Catalog
            </NavLink>
            <NavLink
              to="/favorites"
              className="text-white text-[18px] hover:border-violet-600 hover:border-b-2 transition duration-300 ease-in-out"
            >
              Favorites
            </NavLink>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
