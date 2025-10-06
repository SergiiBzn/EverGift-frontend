/** @format */

import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const AuthContext = createContext();

const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(true);

  const [error, setError] = useState(null);

  const [allContacts, setAllContacts] = useState([]);

  const [allUsers, setAllUsers] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);
  const navigate = useNavigate();

  //********** register **********
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

      setUser(userData);

      navigate("/login");
    } catch (error) {
      // error handling with toastify

      toast.error(error);
    } finally {
      setIsRefreshing(false);
    }
  };

  //********** login **********
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

      toast.success(
        <div className="text-center">
          welcome {userData.profile?.name || ""}
        </div>
      );
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
    setIsRefreshing(true);
    try {
      const response = await fetch(`${baseUrl}/users/logout`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!response.ok) {
        const { error } = await response.json();
        await improveErrorMessage(error);

        return;
      }
      // const { message } = await response.json();
      setUser(null);
      navigate("/login");
    } catch (error) {
      toast.error(error);
    } finally {
      setIsRefreshing(false);
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
        // getAllUsers(userData);
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
  const sendContactRequest = async ({ email }) => {
    try {
      const response = await fetch(`${baseUrl}/requests`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
        credentials: "include",
      });
      if (!response.ok) {
        const { error } = await response.json();
        await improveErrorMessage(error);
        return;
      }
      const { message } = await response.json();
      toast.success(message);
    } catch (error) {
      toast.error(error);
    }
  };

  const getNotifications = async () => {
    try {
      const res = await fetch(`${baseUrl}/notifications`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
        credentials: "include",
      });
      if (!res.ok) {
        toast.error("Failed to get notifications");
        return null;
      }
      const data = await res.json();

      setUser((prev) => ({
        ...prev,
        notifications: data,
        hasNotification: false,
      }));
      setNotifications(data);
      return data;
    } catch (error) {
      toast.error("Error getting notifications");
      console.error("Error getting notifications:", error);
      return null;
    }
  };
  const updateNotification = async (notificationId, action) => {
    try {
      const response = await fetch(
        `${baseUrl}/notifications/${notificationId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            action: action,
          }),
          credentials: "include",
        }
      );
      if (!response.ok) {
        const { error } = await response.json();
        await improveErrorMessage(error);
        return;
      }
      getNotifications();
      toast.success(
        `Notification ${
          action === "delete" ? "deleted" : action + "ed"
        } successfully`
      );
    } catch (error) {
      toast.error(error);
    }
  };

  const getSentRequests = async () => {
    try {
      const res = await fetch(`${baseUrl}/requests`, {
        // headers: {
        //   "Content-Type": "application/json",
        // },
        method: "GET",
        credentials: "include",
      });
      if (!res.ok) {
        toast.error("Failed to get sent requests");
        return null;
      }
      const data = await res.json();
      setSentRequests(data);
      setUser((prev) => ({
        ...prev,
        sentRequests: data,
      }));
      return data;
    } catch (error) {
      toast.error("Error getting sent requests");
      console.error("Error getting sent requests:", error);
      return null;
    }
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

        allContacts,
        setAllContacts,
        allUsers,
        setAllUsers,
        sendContactRequest,

        baseUrl,
        notifications,
        sentRequests,
        getNotifications,
        updateNotification,
        getSentRequests,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
