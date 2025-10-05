import useAuth from "./useAuth.jsx";
import { toast } from "react-toastify";
import { improveErrorMessage } from "../utils/improveErrorMessage.js";

const useEventActions = () => {
  const { setUser, baseUrl } = useAuth();

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
    if (!event) {
      toast.error("Invalid event data provided for deletion.");
      return;
    }

    const { contact, _id: eventId } = event;
    let contactId;
    if (!contact) {
      contactId = event.contactId;
    } else {
      contactId = contact.id;
    }

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
  const handleUpdate = async (eventToEdit, formData) => {
    const { contact, _id: eventId } = eventToEdit;
    let contactId;
    if (!contact) {
      contactId = eventToEdit.contactId;
    } else {
      contactId = contact.id;
    }

    try {
      const res = await fetch(
        `${baseUrl}/contacts/${contactId}/events/${eventId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "PUT",
          credentials: "include",
          body: JSON.stringify(formData),
        }
      );

      if (!res.ok) {
        toast.error("Failed to edit event");
        return null;
      }
      const updatedEvent = await res.json();
      return updatedEvent;
    } catch (error) {
      toast.error("Error editing event");
      console.error("Error editing event:", error);
    }
    console.log(`Editing event ${event}`);
  };
  const handleTogglePin = async (event) => {
    console.log("toggle pin event:", event);

    if (!event) {
      toast.error("Invalid event data provided for pin toggle.");
      return null;
    }
    const { contact, _id: eventId } = event;
    let contactId;
    if (!contact) {
      contactId = event.contactId;
    } else {
      contactId = contact.id;
    }
    const desiredPinnedState = !event.isPinned;
    try {
      const res = await fetch(
        `${baseUrl}/contacts/${contactId}/events/${eventId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "PUT",
          credentials: "include",
          body: JSON.stringify({ isPinned: desiredPinnedState }),
        }
      );
      if (!res.ok) {
        toast.error("Failed to toggle pin");
        return null;
      }
      const updatedEvent = await res.json();
      // update user events list in state
      setUser((prev) => ({
        ...prev,
        events: prev.events.map((ev) =>
          ev._id === updatedEvent._id ? updatedEvent : ev
        ),
      }));
      toast.success(desiredPinnedState ? "Event pinned" : "Event unpinned");
      return updatedEvent;
    } catch (error) {
      toast.error("Error toggling pin");
      console.error("Error toggling pin:", error);
      return null;
    }
  };
  const handleArchieve = async (event) => {
    if (!event || !event.contact || !event.contact._id || !event._id) {
      toast.error("Invalid event data provided for achieving.");
      return;
    }
    console.log(`archieve event:${event}`);
  };

  return {
    handleDelete,
    handleUpdate,
    handleArchieve,
    handleCreateEvent,
    handleTogglePin,
  };
};

export default useEventActions;
