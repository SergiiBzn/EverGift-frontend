/** @format */

import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

export const AuthContext = createContext();

const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(true);

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const register = async (formState) => {
    try {
      const response = await fetch(`${baseUrl}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
        credentials: "include",
      });

      if (!response.ok) {
        //get zod validation error from response
        const { error } = await response.json();
        await improveErrorMessage(error);
        return;
      }
      const userData = await response.json();

      console.log("userData", userData);
      setUser(userData);

      navigate("/login");
    } catch (error) {
      // error handling with toastify

      toast.error(error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const login = async (formState) => {
    try {
      const response = await fetch(`${baseUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
        credentials: "include",
      });

      if (!response.ok) {
        // get zod validation error from response
        const { error } = await response.json();
        await improveErrorMessage(error);

        return;
        // throw new Error("Error Logging In");
      }
      const userData = await response.json();
      setUser(userData);

      toast.success(`welcome ${userData.profil.name}`);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      // error handling with toastify
      toast.error(error);
    } finally {
      setIsRefreshing(false);
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
        const { error } = await response.json();
        await improveErrorMessage(error);
        // throw new Error(" Logout Failed");
      }
      const { message } = await response.json();
      setUser(null);
      navigate("/login");
    } catch (error) {
      toast.error(error);
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
      } catch (error) {
        console.error("Error fetching user:", error);
        setUser(null);
      } finally {
        setIsRefreshing(false);
      }
    };
    refreshUser();
  }, [navigate]);

  const improveErrorMessage = async (error) => {
    const errorArray = error
      .split("✖")
      .map((error) => "✖" + error)
      .filter((error) => error !== "✖");
    console.log("error", errorArray);
    toast.error(
      <div>
        {errorArray.map((error) => (
          <p>{error}</p>
        ))}
      </div>,
      { autoClose: 8000 }
    );
  };

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
        baseUrl,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
