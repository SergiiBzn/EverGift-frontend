import { Link, NavLink } from "react-router-dom";
const GuestMenu = () => {
  // NavLink from react-router gives us the isActive prop
  return (
    <div className="flex-none space-x-4">
      <NavLink
        to="/register"
        className={({ isActive }) =>
          `btn btn-lg btn-ghost ${
            isActive ? "bg-primary/10 text-primary" : "text-gray-600"
          }`
        }
      >
        Register
      </NavLink>

      <NavLink
        to="/login"
        className={({ isActive }) =>
          `btn btn-lg btn-ghost ${
            isActive ? "bg-primary/10 text-primary" : "text-gray-600"
          }`
        }
      >
        Login
      </NavLink>
    </div>
  );
};

export default GuestMenu;
