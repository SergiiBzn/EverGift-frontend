/** @format */

const Footer = () => {
  return (
    <footer>
      <div className="flex justify-center items-center p-4 bg-black text-white  text-lg sm:text-xl  ">
        <p>
          {" "}
          &copy;{new Date().getFullYear()} Made with ❤️ by Yan, Sergii and
          Arnaud
        </p>
      </div>
    </footer>
  );
};

export default Footer;
