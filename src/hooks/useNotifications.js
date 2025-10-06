import useAuth from "./useAuth";
import { toast } from "react-toastify";
import { useState } from "react";

const useNotifications = () => {
  const { baseUrl, setUser } = useAuth();
  const [notifications, setNotifications] = useState([]);

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
      }));
      setNotifications(data);
      return data;
    } catch (error) {
      toast.error("Error getting notifications");
      console.error("Error getting notifications:", error);
      return null;
    }
  };
  return {
    notifications,
    getNotifications,
  };
};
export default useNotifications;
