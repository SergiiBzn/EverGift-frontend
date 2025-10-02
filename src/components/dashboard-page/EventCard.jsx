// import useAuth from "../../hooks/useAuth.jsx";

import useEventActions from "../../hooks/useEventActions.js";

const EventCard = ({ event, onEventClick }) => {
  const { handleTogglePin } = useEventActions();
  // const { setUser, baseUrl } = useAuth();
  // const handleDelete = async (eventId, contactId) => {
  //   try {
  //     const res = await fetch(
  //       `${baseUrl}/contacts/${contactId}/events/${eventId}`,
  //       {
  //         method: "DELETE",
  //         credentials: "include",
  //       }
  //     );

  //     if (res.ok) {
  //       setUser((prevUser) => ({
  //         ...prevUser,
  //         events: prevUser.events.filter((event) => event._id !== eventId),
  //       }));
  //     } else {
  //       console.error("Failed to delete event");
  //     }
  //   } catch (error) {
  //     console.error("Error deleting event:", error);
  //   }
  // };
  return (
    <div className="flex items-center justify-between gap-4 p-4 rounded-lg bg-white shadow-md">
      <div
        onClick={() => onEventClick(event)}
        className="flex items-center gap-4 hover:cursor-pointer flex-1"
      >
        {event.contact?.profile && (
          <img
            className="h-18 w-18 rounded-full"
            src={event.contact.profile.avatar}
            alt={event.contact.profile.name}
          />
        )}
        <div className="space-y-1 ">
          <p className="font-bold text-lg text-gray-900 ">{event.title}</p>
          {event.contact?.profile && (
            <p className="text-sm text-black/80 ">
              {event.contact.profile.name}
            </p>
          )}
        </div>
      </div>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          handleTogglePin(event);
        }}
        aria-label={event.isPinned ? "Unpin event" : "Pin event"}
        className="p-1 rounded-full transition-colors hover:bg-yellow-100"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill={event.isPinned ? "#eab308" : "none"}
          stroke={event.isPinned ? "#eab308" : "currentColor"}
          strokeWidth={1.5}
          className={`w-6 h-6 ${event.isPinned ? "drop-shadow" : "opacity-40"}`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.98 20.54a.562.562 0 01-.84-.61l1.285-5.386a.563.563 0 00-.182-.557L3.04 10.385a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
          />
        </svg>
      </button>
      {/* <button
        onClick={() => handleDelete(event._id, event.contact.id)}
        className="text-red-500 hover:text-red-400"
      >
        <span className="material-symbols-outlined">delete</span>
      </button> */}
    </div>
  );
};

export default EventCard;
