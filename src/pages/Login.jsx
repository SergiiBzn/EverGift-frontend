import { useState } from "react";
import useAuth from "../hooks/useAuth.jsx";
import { toast } from "react-toastify";
import { Link } from "react-router";

const Login = () => {
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });

  const [isClicked, setIsClicked] = useState(false);

  const { login, error, setError } = useAuth();

  const handleChange = (e) => {
    setFormState((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsClicked(true);

    login(formState);
    setIsClicked(false);
  };

  return (
    <div className="flex items-center justify-center h-full ">
      <form className="  w-full max-w-2xl " onSubmit={handleSubmit}>
        <fieldset className=" fieldset bg-base-200 border-base-300 rounded-box border p-4">
          {/* <legend className="fieldset-legend text-3xl font-bold text-black mb-6 text-center">
            Login
          </legend> */}

          <div className="divider divider-info text-3xl font-bold text-black mb-6 text-center">
            Login
          </div>
          <div className="flex flex-col gap-6">
            <label className="fieldset-label text-lg" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              onChange={handleChange}
              name="email"
              value={formState.email}
              className="input input-lg w-full"
              placeholder="Email"
              id="email"
              required
            />
            <label className="fieldset-label text-lg" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              onChange={handleChange}
              name="password"
              value={formState.password}
              className="input input-lg w-full"
              placeholder="Password"
              id="password"
              required
            />
            <button
              className={`btn btn-neutral btn-lg w-full my-4 ${
                isClicked
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
              disabled={isClicked}
            >
              {isClicked ? "Logging In..." : "Login"}
            </button>
            <p className="text-lg text-center ">
              Don't Have An Account?{"  "}
              <Link className="link link-info" to="/register">
                Register
              </Link>
            </p>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default Login;
