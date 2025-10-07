/** @format */
import { Link } from "react-router";
import Logo from "./Logo";

const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content px-10  py-10">
      <div className="w-full mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Branding */}
        <div>
          <h2 className="text-2xl font-bold text-primary footer-title">
            🎁 GiftApp
          </h2>
          <p className="mt-2 text-sm text-base-content/70">
            Keep track of your gifts, contacts, and events in one place.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h6 className="footer-title">Navigation</h6>
          <ul className="flex flex-col space-y-2">
            <Link to="/">
              <a className="link link-hover">Dashboard</a>
            </Link>
            <Link to="/profile">
              <a className="link link-hover">Profile</a>
            </Link>

            <Link to="/Notifications">
              <a className="link link-hover">Notifications</a>
            </Link>
          </ul>
        </div>

        {/* our Contact */}
        <div>
          <h6 className="footer-title"> Contacts Us</h6>
          <ul className="flex flex-col space-y-4 w-full">
            <li className="flex flex-col  items-start  gap-2 p-2  rounded-lg bg-white shadow-sm border-y-2 border-primary/50   ">
              <div className="grid grid-cols-3 w-full ">
                <img
                  className="w-12 h-12 bg-center bg-no-repeat bg-cover rounded-full  "
                  src="https://media.licdn.com/dms/image/v2/D4E35AQHmZn1_xKz1eA/profile-framedphoto-shrink_200_200/B4EZhajHK7GUAY-/0/1753865811089?e=1760436000&v=beta&t=SzED2wfhCyuj732EP08nD3I2DPUxAH9rcspxBZNnlv8"
                  alt="Yan Yang"
                />

                <div className="col-span-2">
                  <h2 className="font-bold w-full">Yan Yang</h2>
                  <p>Full Stack Developer</p>
                </div>
              </div>

              {/* LinkedIn */}
              <div className="space-y-4">
                <a
                  href="https://www.linkedin.com/in/yan-yang-dev25/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link link-hover hover:text-primary flex items-center gap-2 break-all"
                >
                  <i className="fa-brands fa-linkedin text-xl text-blue-600"></i>
                  https://www.linkedin.com/in/yan-yang-dev25/
                </a>
                <a
                  href="https://github.com/o0vini0o"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link link-hover hover:text-primary flex items-center gap-2 break-all"
                >
                  <i className="fa-brands fa-github text-xl"></i>
                  https://github.com/o0vini0o
                </a>
              </div>
            </li>

            <li className="flex flex-col  items-start  gap-2 p-2  rounded-lg bg-white shadow-sm border-y-2 border-primary/50  ">
              <div className="grid grid-cols-3 w-full ">
                <img
                  className="w-12 h-12 bg-center bg-no-repeat bg-cover rounded-full "
                  src="https://media.licdn.com/dms/image/v2/D4E35AQGTHKvM0-yVWg/profile-framedphoto-shrink_200_200/B4EZls_E8IIUAc-/0/1758470098986?e=1760432400&v=beta&t=jsw1rFoLT_QDEA-zHClpcTcPFE8sWyMYfig07cn7OQo"
                  alt="Brice Arnaud Habenicht"
                />

                <div className="col-span-2">
                  <h2 className="font-bold w-full">Brice Arnaud Habenicht</h2>
                  <p>Full Stack Developer</p>
                </div>
              </div>

              {/* LinkedIn */}
              <div className="space-y-4">
                <a
                  href="https://www.linkedin.com/in/brice-arnaud-habenicht/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link link-hover hover:text-primary flex items-center gap-2 break-all"
                >
                  <i className="fa-brands fa-linkedin text-xl text-blue-600"></i>
                  https://www.linkedin.com/in/brice-arnaud-habenicht/
                </a>
                <a
                  href="https://github.com/Arnaudbrice"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link link-hover hover:text-primary flex items-center gap-2 break-all"
                >
                  <i className="fa-brands fa-github text-xl"></i>
                  https://github.com/Arnaudbrice
                </a>
              </div>
            </li>
            <li className="flex flex-col  items-start  gap-4 p-4 rounded-lg bg-white shadow-sm  border-y-2 border-primary/50  ">
              <div className="grid grid-cols-3 w-full ">
                <img
                  className="w-12 h-12 bg-center bg-no-repeat bg-cover rounded-full "
                  src="https://media.licdn.com/dms/image/v2/D4E35AQHdfyRNeSgvFQ/profile-framedphoto-shrink_200_200/B4EZhaoiXgHEAg-/0/1753867233008?e=1760436000&v=beta&t=i-n-YDzas5RkpLxuonjhw1z9OjQS0WktCjq_dwBxyu4"
                  alt="Sergii Buzun"
                />

                <div className="col-span-2">
                  <h2 className="font-bold w-full">Sergii Buzun</h2>
                  <p>Full Stack Developer</p>
                </div>
              </div>

              {/* LinkedIn */}
              <div className="space-y-4 ">
                <a
                  href="https://www.linkedin.com/in/sergii-buzun/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link link-hover hover:text-primary flex items-center gap-2 break-all"
                >
                  <i className="fa-brands fa-linkedin text-xl text-blue-600"></i>
                  https://www.linkedin.com/in/sergii-buzun/
                </a>
                <a
                  href="https://github.com/SergiiBzn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link link-hover hover:text-primary flex items-center gap-2 break-all"
                >
                  <i className="fa-brands fa-github text-xl"></i>
                  https://github.com/SergiiBzn
                </a>
              </div>
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
