import useAuth from "./useAuth";
import { toast } from "react-toastify";
import { useState } from "react";

const useNotifications = () => {
  const { baseUrl, improveErrorMessage, setUser } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);

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

  return {
    notifications,
    sentRequests,
    getNotifications,
    updateNotification,
    getSentRequests,
  };
};
export default useNotifications;
