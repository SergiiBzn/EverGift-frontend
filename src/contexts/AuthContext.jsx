/** @format */

import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";

const AuthContext = createContext();

const baseUrl = "http://localhost:3000";

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(true);

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const register = async (formState) => {
    setIsRefreshing(true);
    try {
      const response = await fetch(`${baseUrl}/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
        credentials: "include",
      });

      if (!response.ok) {
        //TODO: get zod validation error from response
        const { error } = await response.json();
        setError(error);
        throw new Error("Error Signing Up");
      }
      const userData = await response.json();
      setUser(userData);

      navigate("/login");
    } catch (error) {
      // TODO: error handling with toastify
      console.log(error);
    }
  };

  const login = async (formState) => {
    setIsRefreshing(true);
    try {
      const response = await fetch(`${baseUrl}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
        credentials: "include",
      });

      if (!response.ok) {
        //TODO: get zod validation error from response
        const { error } = await response.json();
        setError(error);
        throw new Error("Error Logging In");
      }
      const userData = await response.json();
      setUser(userData);
    } catch (error) {
      console.log(error);
      // TODO: error handling with toastify
    }
  };

  const logout = async () => {
    setUser(null);
    try {
      const response = await fetch(`${baseUrl}/users/logout`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error(" Logout Failed");
      }
      const { message } = await response.json();
      setUser(null);
      navigate("/login");
    } catch (error) {
      console.log(error);
      // TODO: error handling with toastify
    }
  };

  useEffect(() => {
    const refreshUser = async () => {
      try {
        const response = await fetch(`${baseUrl}/users/me`, {
          method: "GET",
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Please Login");
        }
        const userData = await response.json();
        setUser(userData);
        setIsRefreshing(false);
      } catch (error) {
        console.log(error);
        // navigate to login page if user is not authenticated
        navigate("/login");
        // TODO: error handling with toastify
      }
    };
    refreshUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        register,
        login,
        logout,
        isRefreshing,
        setIsRefreshing,
        error,
        setError,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
