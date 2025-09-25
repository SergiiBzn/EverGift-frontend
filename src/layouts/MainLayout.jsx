/** @format */

import { Outlet } from "react-router";
import Footer from "../components/Footer.jsx";
import Navbar from "../components/Navbar.jsx";
import { ToastContainer, toast, Bounce, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MainLayout = () => {
  return (
    <div
      className="grid grid-rows-[auto_1fr_auto] min-h-screen font-inter text-base-content"
      data-theme="light"
    >
      <div>
        <Navbar />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          transition:Bounce
          className="mt-[9rem] text-lg"
        />
      </div>

      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
