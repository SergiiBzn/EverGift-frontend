/** @format */

import React, { useState } from "react";
import useAuth from "../hooks/useAuth.jsx";
import { toast } from "react-toastify";

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

  if (error) {
    toast.error(error);
  }
  return (
    <form
      className=" inset-0 flex items-center justify-center h-full "
      onSubmit={handleSubmit}>
      <fieldset className=" fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
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
          disabled={isClicked}>
          {isClicked ? "Logging In..." : "Login"}
        </button>
      </fieldset>
    </form>
  );
};

export default Login;
