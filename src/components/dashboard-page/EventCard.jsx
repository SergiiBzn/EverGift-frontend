// import useAuth from "../../hooks/useAuth.jsx";

const EventCard = ({ event, onEventClick }) => {
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
    <div
      onClick={() => onEventClick(event)}
      className="flex items-center justify-between gap-4 p-4 rounded-lg bg-white shadow-md hover:cursor-pointer"
    >
      <div className="flex items-center gap-4">
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
