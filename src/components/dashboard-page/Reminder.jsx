import { addMonths, format, isWithinInterval, compareAsc } from "date-fns";
import useAuth from "../../hooks/useAuth.jsx";
import useEventActions from "../../hooks/useEventActions.js";

const ReminderComponent = ({ onEventClick = () => {} }) => {
  const { user } = useAuth();
  const { handleTogglePin } = useEventActions();

  //********** filter the next 2 months events **********

  const today = new Date();

  const twoMonthsLater = addMonths(today, 2);

  const filteredEvents = user.events
    ?.filter((event) => {
      const eventDate = new Date(event.date);
      return isWithinInterval(eventDate, { start: today, end: twoMonthsLater });
    })
    .sort((a, b) => compareAsc(new Date(a.date), new Date(b.date)));

  const pinnedEvents = (user?.events || [])
    .filter((e) => e.isPinned)
    .sort((a, b) => compareAsc(new Date(a.date), new Date(b.date)));

  return (
    <div className="bg-base-200 p-4 rounded-xl flex flex-col gap-6 shadow-md min-w-[300px]">
      <div className="flex flex-col ">
        <div className="divider divider-primary "></div>
        <h3 className="text-lg font-bold text-center">Pinned</h3>
        <div className="divider divider-primary "></div>
        <div
          className={`space-y-4 overflow-y-auto pr-1`}
          style={{ maxHeight: "280px" }}
        >
          {pinnedEvents.length === 0 && (
            <p className="text-center text-lg text-muted-dark opacity-70">
              No pinned events yet
            </p>
          )}
          {pinnedEvents.map((event) => (
            <div
              key={event._id}
              onClick={() => onEventClick(event)}
              className="flex items-center gap-4 p-4 rounded-lg bg-white shadow-sm"
            >
              <div className="flex-1">
                <p className="font-bold">{event.title}</p>
                <p className="text-sm text-muted-light dark:text-muted-dark">
                  {format(new Date(event.date), "dd MMM")}
                </p>
              </div>
              {event.contact?.profile?.avatar && (
                <img
                  className="h-12 w-12 rounded-full object-cover"
                  src={event.contact.profile.avatar}
                  alt={event.title}
                />
              )}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleTogglePin(event);
                }}
                className="p-1 rounded-full hover:bg-yellow-100 transition-colors"
                aria-label={event.isPinned ? "Unpin event" : "Pin event"}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill={event.isPinned ? "#eab308" : "none"}
                  stroke={event.isPinned ? "#eab308" : "currentColor"}
                  strokeWidth={1.5}
                  className={`w-6 h-6 ${
                    event.isPinned ? "drop-shadow" : "opacity-40"
                  }`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.98 20.54a.562.562 0 01-.84-.61l1.285-5.386a.563.563 0 00-.182-.557L3.04 10.385a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4 mt-6">
        <div className="divider divider-primary " />
        <h3 className="text-lg font-bold mb-4 text-center">
          Events in the next 2 months
        </h3>

        <div className="divider divider-primary "></div>
        <div
          className={`space-y-4  overflow-y-auto pr-1`}
          style={{ maxHeight: "280px" }}
        >
          {filteredEvents?.length === 0 && (
            <p className="text-center text-lg text-muted-dark opacity-70">
              No Event in the next 2 months
            </p>
          )}
          {filteredEvents?.map((event) => (
            <div
              key={event._id}
              onClick={() => onEventClick(event)}
              className="flex items-center gap-4 p-4 rounded-lg bg-white shadow-sm"
            >
              <div className="flex-1">
                <p className="font-bold">{event.title}</p>
                <p className="text-sm text-muted-light dark:text-muted-dark">
                  {format(new Date(event.date), "dd MMMM yyyy")}
                </p>
              </div>
              {event.contact?.profile?.avatar && (
                <img
                  className="h-12 w-12 rounded-full object-cover"
                  src={event.contact.profile.avatar}
                  alt={event.title}
                />
              )}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleTogglePin(event);
                }}
                className="p-1 rounded-full hover:bg-yellow-100 transition-colors"
                aria-label={event.isPinned ? "Unpin event" : "Pin event"}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill={event.isPinned ? "#eab308" : "none"}
                  stroke={event.isPinned ? "#eab308" : "currentColor"}
                  strokeWidth={1.5}
                  className={`w-6 h-6 ${
                    event.isPinned ? "drop-shadow" : "opacity-40"
                  }`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.98 20.54a.562.562 0 01-.84-.61l1.285-5.386a.563.563 0 00-.182-.557L3.04 10.385a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReminderComponent;
