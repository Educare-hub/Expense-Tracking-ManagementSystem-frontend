//src/components/nav/Navbar.tsx

import { FaBars } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from '../../app/store';

import { logout } from "../../features/auth/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();

  // Get state from Redux:
  const { user, token } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
  dispatch(logout());
  localStorage.removeItem("expensepro_token");
  localStorage.removeItem("token");
};

  // Determine dashboard link based on role
  const dashboardLink =
    user?.role === "admin"
      ? "/admin/dashboard"
      : user?.role === "user"
      ? "/user/dashboard"
      : "/login";

  return (
    <div className="bg-lienear-to-tr from-cyan-400 via-teal-500 to-blue-600 text-white shadow-md">
      <div className="navbar container mx-auto">

        {/* NAVBAR START */}
        <div className="navbar-start">
          {/* Mobile dropdown */}
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
              className="menu menu-sm dropdown-content bg-linear-to-tr 
                        from-cyan-400 via-teal-500 to-blue-600 text-white 
                        rounded-box z-10 mt-3 w-52 p-2 shadow"
            >
              <li><NavLink to="/">Home</NavLink></li>
              <li><NavLink to="/about">About</NavLink></li>
              <li><NavLink to={dashboardLink}>Dashboard</NavLink></li>
              <li><NavLink to="/services">Services</NavLink></li>


              {!token && (
                <>
                  <li><NavLink to="/auth/register">Register</NavLink></li>
                  <li><NavLink to="/auth/login">Login</NavLink></li>
                </>
              )}

              {token && (
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* NAVBAR CENTER (desktop) */}
        <div className="navbar-center hidden md:flex">
          <ul className="menu menu-horizontal px-1 text-white font-medium">
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/about">About</NavLink></li>
            <li><NavLink to="/services">Services</NavLink></li>
            <li><NavLink to={dashboardLink}>Dashboard</NavLink></li>
          </ul>
        </div>

        {/* NAVBAR END (desktop) */}
        <div className="navbar-end hidden md:flex">
          <ul className="menu menu-horizontal px-1 text-white font-medium">

            {!token && (
              <>
                <li><NavLink to="/auth/register">Register</NavLink></li>
                <li><NavLink to="/auth/login">Login</NavLink></li>

              </>
            )}

            {token && (
              <li>
                <button onClick={handleLogout} className="btn btn-sm btn-ghost">
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
