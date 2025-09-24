const Logo = () => {
  return (
    <div className="flex items-center gap-8">
      <div className="flex items-center gap-3 text-primary">
        <svg
          className="text-primary"
          fill="currentColor"
          height="24"
          viewBox="0 0 24 24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 2L3 7v10l9 5 9-5V7l-9-5zm0 2.69L18.33 8 12 11.31 5.67 8 12 4.69zM5 9.4l7 3.9v7.5l-7-3.9V9.4zm9 0l7-3.9v7.5l-7 3.9V9.4z"></path>
        </svg>
        <h2 className="text-xl font-bold">EverGift</h2>
      </div>
    </div>
  );
};

export default Logo;
