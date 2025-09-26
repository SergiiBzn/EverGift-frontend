/** @format */

import Logo from "./Logo";
import UserMenu from "./UserMenu";
import GuestMenu from "./GuestMenu";
import useAuth from "../hooks/useAuth.jsx";

const Navbar = () => {
  const { user, isLoading } = useAuth();
  console.log(user);

  /*  if (isLoading) {
    return <div className="skeleton h-32 w-32"></div>;
  } */

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        <Logo />
      </div>
      {user ? <UserMenu user={user} /> : <GuestMenu />}
    </div>
  );
};

export default Navbar;
