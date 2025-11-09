import { FaBars } from "react-icons/fa";
import { NavLink } from "react-router";

const Navbar = () => {
  return (
    <div className="bg-gradient-to-tr from-cyan-400 via-teal-500 to-blue-600 text-white shadow-md">
      <div className="navbar container mx-auto">
        {/* Navbar Start */}
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle md:hidden text-white"
            >
              <FaBars />
            </div>
            <ul
              tabIndex={-1}
              className="menu menu-sm dropdown-content bg-gradient-to-tr from-cyan-400 via-teal-500 to-blue-600 text-white rounded-box z-10 mt-3 w-52 p-2 shadow"
            >
              <li><NavLink to="/">Home</NavLink></li>
              <li><NavLink to="/about">About</NavLink></li>
              <li><NavLink to="/">Dashboard</NavLink></li>
              <li><NavLink to="/register">Register</NavLink></li>
              <li><NavLink to="/login">Login</NavLink></li>
            </ul>
          </div>
        </div>

        {/* Center Links (Desktop Only) */}
        <div className="navbar-center hidden md:flex">
          <ul className="menu menu-horizontal px-1 text-white font-medium">
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/about">About</NavLink></li>
            <li><NavLink to="/">Dashboard</NavLink></li>
          </ul>
        </div>

        {/* Right Links (Desktop Only) */}
        <div className="navbar-end hidden md:flex">
          <ul className="menu menu-horizontal px-1 text-white font-medium">
            <li><NavLink to="/register">Register</NavLink></li>
            <li><NavLink to="/login">Login</NavLink></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
