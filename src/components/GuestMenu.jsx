import { Link } from "react-router-dom";
const GuestMenu = () => {
  return (
    <div className="flex-none">
      <Link to="/login" className="btn btn-lg btn-ghost ">
        Login
      </Link>
    </div>
  );
};

export default GuestMenu;
