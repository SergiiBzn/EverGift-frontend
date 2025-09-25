/** @format */

import React, { useState } from "react";
import useAuth from "../hooks/useAuth.jsx";
import { toast } from "react-toastify";
import { Link } from "react-router";

const Register = () => {
  const [formState, setFormState] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");

  const [isClicked, setIsClicked] = useState(false);

  const { register, error, setError } = useAuth();

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
    // alert("Passwords do not match");

    console.log("ok ich bin da");

    setIsClicked(true);

    if (formState.password !== formState.confirmPassword) {
      // alert("Passwords do not match");
      toast.error("Passwords do not match");

      console.log("Passwords do not match");

      setIsClicked(false);
      return;
    }

    try {
      await register(formState);
    } finally {
      setIsClicked(false);
    }
  };

  /*   if (error) {
    toast.error(error);
  }
 */
  return (
    <div className="flex items-center justify-center h-full ">
      <form className="  w-full max-w-2xl " onSubmit={handleSubmit}>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box  border p-4">
          {/* <legend className="fieldset-legend text-3xl font-bold text-black mb-6 text-center">
            Register
          </legend> */}
          <div className="divider divider-primary text-3xl font-bold text-black mb-6 text-center">
            Register
          </div>

          <div className="flex flex-col gap-6">
            <label className="fieldset-label text-lg " htmlFor="email">
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
            <label className="fieldset-label text-lg" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              type="password"
              onChange={handleChange}
              name="confirmPassword"
              value={formState.confirmPassword}
              className="input input-lg w-full"
              placeholder="Confirm Password"
              id="confirmPassword"
              required
            />
            <button
              className={`btn  btn-lg w-full my-4   ${
                isClicked ? "btn-secondary  cursor-not-allowed" : "btn-primary"
              }`}>
              {isClicked ? (
                <>
                  <span className="loading loading-spinner"></span>
                  Registering...
                </>
              ) : (
                "Register"
              )}
            </button>

            <p className="text-lg text-center ">
              Already Have An Account?{"  "}
              <Link className="link link-primary" to="/login">
                Login
              </Link>
            </p>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default Register;
