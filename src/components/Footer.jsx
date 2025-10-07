/** @format */
import { Link } from "react-router";
import Logo from "./Logo";
import useAuth from "../hooks/useAuth.jsx";

const Footer = () => {
  const { user } = useAuth();
  return (
    <footer className="bg-base-200 text-base-content py-6 shadow-inner">
      {/* <div className="w-full mx-auto grid grid-cols-1 md:grid-cols-3 gap-8"> */}
      <div
        className={`w-full mx-auto flex flex-col md:flex-row justify-around gap-8`}
      >
        {/* Branding */}
        <div>
          <Logo />
          <p className="mt-2 text-sm text-base-content/70">
            Keep track of your gifts, contacts, and events in one place.
          </p>
        </div>

        {/* Navigation */}
        {user && (
          <div>
            <h6 className="footer-title">Navigation</h6>
            <ul className="flex flex-col space-y-2">
              <Link className="link link-hover" to="/">
                Dashboard
              </Link>
              <Link className="link link-hover" to="/profile">
                Profile
              </Link>
              <Link className="link link-hover" to="/Notifications">
                Notifications
              </Link>
            </ul>
          </div>
        )}

        {/* our Contact */}
        <div>
          <h6 className={user ? `footer-title` : `footer-title text-center`}>
            Contacts Us
          </h6>
          <ul
            className={
              user
                ? "flex flex-col flex-start w-full space-y-2"
                : "flex gap-10 "
            }
          >
            <li className="flex flex-col sm:flex-row sm:items-center gap-2 ">
              <h2 className="font-medium">Yan Yang</h2>

              <a
                href="https://www.linkedin.com/in/yan-yang-dev25/"
                target="_blank"
                rel="noopener noreferrer"
                className="link link-hover hover:text-primary flex items-center gap-2 break-all"
              >
                <i className="fa-brands fa-linkedin text-xl text-blue-600"></i>
              </a>
              <a
                href="https://github.com/o0vini0o"
                target="_blank"
                rel="noopener noreferrer"
                className="link link-hover hover:text-primary flex items-center gap-2 break-all"
              >
                <i className="fa-brands fa-github text-xl"></i>
              </a>
            </li>

            <li className="flex  gap-2  ">
              <h2 className="font-medium">Brice Arnaud Habenicht</h2>
              <a
                href="https://www.linkedin.com/in/brice-arnaud-habenicht/"
                target="_blank"
                rel="noopener noreferrer"
                className="link link-hover hover:text-primary flex items-center gap-2 break-all"
              >
                <i className="fa-brands fa-linkedin text-xl text-blue-600"></i>
              </a>
              <a
                href="https://github.com/Arnaudbrice"
                target="_blank"
                rel="noopener noreferrer"
                className="link link-hover hover:text-primary flex items-center gap-2 break-all"
              >
                <i className="fa-brands fa-github text-xl"></i>
              </a>
            </li>

            <li className="flex  gap-2  ">
              <h2 className="font-medium">Sergii Buzun</h2>
              <a
                href="https://www.linkedin.com/in/sergii-buzun/"
                target="_blank"
                rel="noopener noreferrer"
                className="link link-hover hover:text-primary flex items-center gap-2 break-all"
              >
                <i className="fa-brands fa-linkedin text-xl text-blue-600"></i>
              </a>
              <a
                href="https://github.com/SergiiBzn"
                target="_blank"
                rel="noopener noreferrer"
                className="link link-hover hover:text-primary flex items-center gap-2 break-all"
              >
                <i className="fa-brands fa-github text-xl"></i>
              </a>
            </li>
          </ul>
        </div>

        {/* Social */}
        {/*  <div>
          <h6 className="footer-title">Follow Us</h6>
          <div className="flex gap-4 mt-2">
            <a className="hover:text-primary">
              <i className="fa-brands fa-github text-xl">
                https://github.com/Arnaudbrice
              </i>
            </a>
            <a className="hover:text-primary">
              <i className="fa-brands fa-twitter text-xl"></i>
            </a>
            <a className="hover:text-primary">
              <i className="fa-brands fa-linkedin text-xl"></i>
            </a>
          </div>
        </div> */}
      </div>

      {/* Bottom bar */}
      <div className="border-t mt-8 pt-6 text-sm text-base-content/70 text-center">
        © {new Date().getFullYear()} GiftApp. All rights reserved.
      </div>
    </footer>
  );
  /*  return (
    <footer className="bg-[#332E2B] text-base-content">

      <div className="border-t py-4 text-sm text-[#f5ede8] text-center">
        © {new Date().getFullYear()} EverGift. All rights reserved.
      </div>
    </footer>
  ); */
};

export default Footer;
