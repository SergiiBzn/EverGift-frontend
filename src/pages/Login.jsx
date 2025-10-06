import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth.jsx";
import { Link, useNavigate } from "react-router";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const [isClicked, setIsClicked] = useState(false);

  const { login, error, setError, user } = useAuth();

  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setFormState((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsClicked(true);

    try {
      await login(formState);
    } finally {
      setIsClicked(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-full ">
      <form className="  w-full max-w-2xl " onSubmit={handleSubmit}>
        <fieldset className=" fieldset bg-base-200 border-base-300 rounded-box border p-4">
          {/* <legend className="fieldset-legend text-3xl font-bold text-black mb-6 text-center">
            Login
          </legend> */}

          <div className="divider divider-primary text-3xl font-bold text-black mb-6 text-center font-poppins">
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

            {/* password */}
            <label className="fieldset-label text-lg" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <input
                // type="password"
                type={showPassword ? "text" : "password"}
                onChange={handleChange}
                name="password"
                value={formState.password}
                className="input input-lg w-full pr-14"
                placeholder="Password"
                id="password"
                required
              />
              {showPassword ? (
                <EyeOff
                  size={22}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer z-30"
                  onClick={() => setShowPassword(!showPassword)}
                />
              ) : (
                <Eye
                  size={22}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer z-30"
                  onClick={() => setShowPassword(!showPassword)}
                />
              )}
            </div>
            <button
              className={`btn  btn-lg w-full my-4    ${
                isClicked ? "btn-secondary  cursor-not-allowed" : "btn-primary"
              }`}
            >
              {isClicked ? (
                <>
                  <span className="loading loading-spinner"></span>
                  Logging In...
                </>
              ) : (
                "Login"
              )}
              {/*  {isClicked ? "Logging In..." : "Login"} */}
            </button>
            <p className="text-lg text-center ">
              Don't Have An Account?{"  "}
              <Link className="link link-primary" to="/register">
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
