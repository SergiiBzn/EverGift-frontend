import useAuth from "./useAuth.jsx";
import { toast } from "react-toastify";
import { improveErrorMessage } from "../utils/improveErrorMessage.js";

const useEventActions = () => {
  const { user, setUser, baseUrl } = useAuth();

  /**
   * Creates a new event for a specific contact.
   * @param {object} eventData - The data for the new event.
   * @param {string} contactId - The ID of the contact to associate the event with.
   * @returns {Promise<object|null>} The newly created event object or null on failure.
   */
  const handleCreateEvent = async (eventData, contactId) => {
    try {
      const response = await fetch(`${baseUrl}/contacts/${contactId}/events`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
        credentials: "include",
      });

      if (!response.ok) {
        const { error } = await response.json();
        await improveErrorMessage(error, 5000);
        return null;
      }
      const newEvent = await response.json();
      setUser((prevUser) => ({
        ...prevUser,
        events: [...(prevUser.events || []), newEvent],
      }));
      toast.success("Event created successfully");
      return newEvent;
    } catch (error) {
      console.error("Error creating event:", error);
      toast.error(error);
      return null;
    }
  };

  const handleDelete = async (event) => {
    if (!event || !event.contact || !event.contact._id || !event._id) {
      toast.error("Invalid event data provided for deletion.");
      return;
    }
    const { contact, _id: eventId } = event;
    const contactId = contact._id;
    try {
      const res = await fetch(
        `${baseUrl}/contacts/${contactId}/events/${eventId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!res.ok) {
        console.error("Failed to delete event");
      }
      setUser((prevUser) => ({
        ...prevUser,
        events: prevUser.events.filter((event) => event._id !== eventId),
      }));
      toast.success("Event deleted successfully");
    } catch (error) {
      toast.error("Error deleting event");
      console.error("Error deleting event:", error);
    }
  };
  const handleUpdate = async (event) => {
    // try {
    //   const res = await fetch(
    //     `${baseUrl}/contacts/${contactId}/events/${eventId}`,
    //     {
    //       method: "PUT",
    //       credentials: "include",
    //     }
    //   );
    //   if (!res.ok) {
    //     toast.error("Failed to edit event");
    //   }
    //   setUser((prevUser) => ({
    //     ...prevUser,
    //     events: prevUser.events.map((event) =>
    //       event._id === eventId ? { ...event, ...res.data } : event
    //     ),
    //   }));
    //   toast.success("Event edited successfully");
    // } catch (error) {
    //   toast.error("Error editing event");
    //   console.error("Error editing event:", error);
    // }
    console.log(`Editing event ${event}`);
  };
  const handleArchieve = async (event) => {
    if (!event || !event.contact || !event.contact._id || !event._id) {
      toast.error("Invalid event data provided for achieving.");
      return;
    }
    console.log(`archieve event:${event}`);
  };
  const handleEdit = (event) => {
    console.log("Editing event:", event);
  };
  return {
    handleDelete,
    handleUpdate,
    handleArchieve,
    handleCreateEvent,
    handleEdit,
  };
};

export default useEventActions;
