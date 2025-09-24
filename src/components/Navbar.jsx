import Logo from "./Logo";
import UserMenu from "./UserMenu";
import GuestMenu from "./GuestMenu";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const { user } = useAuth();

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
