import { Link } from "react-router";
import useAuth from "../hooks/useAuth";

const UserMenu = ({ user }) => {
  const { logout } = useAuth();
  // console.log(user);
  const handleClose = () => {
    // if (document.activeElement instanceof HTMLElement) {
    document.activeElement.blur();
    // }
  };

  return (
    <div className="flex-none">
      <Link to="/Notifications" className="btn btn-ghost btn-circle relative">
        <span className="material-symbols-outlined">notifications</span>
        {user?.hasNotification && (
          <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-primary"></span>
        )}
      </Link>

      <div className="dropdown dropdown-end">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-ghost btn-circle avatar"
        >
          <div className="w-10 rounded-full">
            <img alt="user avatar" src={user?.profile?.avatar} />
          </div>
        </div>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
        >
          <li onClick={handleClose}>
            <Link to="/profile" className="justify-between">
              Profile
              {/* <span className="badge">New</span> */}
            </Link>
          </li>
          <li onClick={handleClose}>
            <Link to="/">dashboard</Link>
          </li>
          <li onClick={handleClose}>
            <button onClick={logout}>Logout</button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserMenu;
