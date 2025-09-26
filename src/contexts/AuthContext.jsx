/** @format */

import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

<<<<<<< HEAD
const AuthContext = createContext();
=======
export const AuthContext = createContext();
>>>>>>> 05edeb7ed0f763aff9964df109f88d343b189cfa

const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(true);

  const [error, setError] = useState(null);

  const [allContacts, setAllContacts] = useState([]);

  const [allUsers, setAllUsers] = useState([]);
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

      toast.success(`welcome ${userData.profil?.name || ""}`);
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
        const response = await fetch("http://localhost:3000/users/me", {
          method: "GET",
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Please Login");
        }
        const userData = await response.json();

        console.log("new userData", userData);
        setUser(userData);
        getAllUsers(userData);
      } catch (error) {
        console.error("Error fetching user:", error);
        setUser(null);
      } finally {
        setIsRefreshing(false);
      }
    };
    refreshUser();
  }, [navigate]);

  // set for get contacts

  const getContacts = async () => {
    try {
      const response = await fetch(`${baseUrl}/contacts`, {
        credentials: "include", // Include cookies for authentication
      });

      const data = await response.json();

      console.log("data from create use contact", data);

      if (!response.ok) {
        const error = data.error || "An error occurred.";
        // await improveErrorMessage(error);
        console.log(error);
        toast.error(error);
      } else {
        console.log("newContact", data);

        setAllContacts(data);
      }
    } catch (error) {
      toast.error(error.message || "Failed to add contact.");
    }
  };

  // get all not custom users
  const getAllUsers = async (currentUser) => {
    // Receive the user object as an argument
    if (!currentUser) return; // Don't run if there's no user

    try {
      const response = await fetch("http://localhost:3000/users/allUsers", {
        credentials: "include", // Include cookies for authentication
      });

      const data = await response.json();

      if (!response.ok) {
        const error = data.error || "An error occurred.";
        // await improveErrorMessage(error);
        console.log(error);
        toast.error(error);
      } else {
        const filteredUser = data.filter(
          (singleUser) => singleUser._id !== currentUser._id // Use the passed-in user object
        );

        console.log("all not custom users", filteredUser);

        setAllUsers(filteredUser);
      }
    } catch (error) {
      console.log(error);
    }
  };
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
<<<<<<< HEAD
        allContacts,
        setAllContacts,
        allUsers,
        setAllUsers,
      }}>
=======
        baseUrl,
      }}
    >
>>>>>>> 05edeb7ed0f763aff9964df109f88d343b189cfa
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
