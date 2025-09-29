/** @format */
import Logo from "./Logo";

const Footer = () => {
  // <footer className="bg-base-200 text-base-content px-6 py-10">
  // <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
  //   {/* Branding */}
  //   <div>
  //     <h2 className="text-2xl font-bold text-primary">🎁 GiftApp</h2>
  //     <p className="mt-2 text-sm text-base-content/70">
  //       Keep track of your gifts, contacts, and events in one place.
  //     </p>
  //   </div>

  //   {/* Navigation */}
  //   <div>
  //     <h6 className="footer-title">Navigation</h6>
  //     <ul className="space-y-2">
  //       <li><a className="link link-hover">Home</a></li>
  //       <li><a className="link link-hover">Contacts</a></li>
  //       <li><a className="link link-hover">Events</a></li>
  //       <li><a className="link link-hover">Wishlist</a></li>
  //     </ul>
  //   </div>

  //   {/* Legal */}
  //   <div>
  //     <h6 className="footer-title">Legal</h6>
  //     <ul className="space-y-2">
  //       <li><a className="link link-hover">Privacy Policy</a></li>
  //       <li><a className="link link-hover">Terms of Service</a></li>
  //     </ul>
  //   </div>

  //   {/* Social */}
  //   <div>
  //     <h6 className="footer-title">Follow us</h6>
  //     <div className="flex gap-4 mt-2">
  //       <a className="hover:text-primary"><i className="fa-brands fa-github text-xl"></i></a>
  //       <a className="hover:text-primary"><i className="fa-brands fa-twitter text-xl"></i></a>
  //       <a className="hover:text-primary"><i className="fa-brands fa-linkedin text-xl"></i></a>
  //     </div>
  //   </div>
  // </div>

  // {/* Bottom bar */}
  // <div className="border-t mt-8 pt-6 text-sm text-base-content/70 text-center">
  //   © {new Date().getFullYear()} GiftApp. All rights reserved.
  // </div>
  return (
    <footer className="bg-[#332E2B] text-base-content">
      {/* Bottom bar */}
      <div className="border-t py-4 text-sm text-[#f5ede8] text-center">
        © {new Date().getFullYear()} EverGift. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
