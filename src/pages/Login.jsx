/** @format */

import React, { useState } from "react";
import useAuth from "../hooks/useAuth.jsx";

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
<>
    <div>
      {error && (
        <div>


          <div className="alert alert-error">
            <div className="flex-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="w-6 h-6 mx-2 stroke-current">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <span>{error}</span>
            </div>
          </div>
        </div>
      )}

      </div>
      <form onSubmit={handleSubmit}>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend">Login</legend>
          <label className="fieldset-label" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            onChange={handleChange}
            name="email"
            value={formState.email}
            className="input"
            placeholder="Email"
            id="email"
            required
          />
          <label className="fieldset-label" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            onChange={handleChange}
            name="password"
            value={formState.password}
            className="input"
            placeholder="Password"
            id="password"
            required
          />

          <button
            className={`btn btn-neutral mt-4 ${
              isClicked
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
            disbale={isClicked}>
            {isClicked ? "Logging In..." : "Login"}
          </button>
        </fieldset>


      </form>
</>
  );
};

export default Login;
