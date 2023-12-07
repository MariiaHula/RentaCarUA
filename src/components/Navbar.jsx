import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <div>
        <NavLink to="/"> Home</NavLink>
      </div>
      <div>
        <NavLink to="/catalog">Catalog</NavLink>
      </div>
      <div>
        <NavLink to="/favorites">Favorites</NavLink>
      </div>
    </div>
  );
};

export default Navbar;
