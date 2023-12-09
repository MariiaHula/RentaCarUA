import { NavLink } from 'react-router-dom';
import logo from '../assests/svg/wheel.svg';

const Navbar = () => {
  return (
    <div className="bg-gray-200 ">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 w-full px-[120px] max-w-[1440px]">
          <div className="flex-shrink-0">
            <NavLink to="/" className="flex items-center">
              <img src={logo} alt="RentaCarUa" className="block h-8 w-auto" />
              <span className="ml-2 text-gray-700 font-semibold">
                RentaCarUa
              </span>
            </NavLink>
          </div>
          <div className=" md:flex md:space-x-4">
            <NavLink
              to="/catalog"
              className="text-gray-700 hover:bg-violet-600 transition duration-300 ease-in-out"
            >
              Catalog
            </NavLink>
            <NavLink
              to="/favorites"
              className="text-gray-700 hover:bg-violet-600 transition duration-300 ease-in-out"
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
