import React, { useState, useMemo } from "react";

const ContactEvent = () => {
  // --- State Management ---
  // Placeholder for events data, should be fetched from an API
  const [events, setEvents] = useState(
    // Example placeholder structure. Replace with API data.
    Array.from({ length: 7 }, (_, i) => ({
      id: i + 1,
      title: `Event Title ${i + 1}`,
      date: `YYYY-MM-DD`,
    }))
  );
  const [currentPage, setCurrentPage] = useState(0);
  const [pinned, setPinned] = useState([]); // Stores IDs of pinned events

  const itemsPerPage = 5;

  // --- Memoized Calculations for Pagination ---
  const totalPages = useMemo(
    () => Math.ceil(events.length / itemsPerPage),
    [events.length]
  );

  const pagedEvents = useMemo(() => {
    const start = currentPage * itemsPerPage;
    const end = start + itemsPerPage;
    return events.slice(start, end);
  }, [events, currentPage]);

  // --- Event Handlers ---
  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleAddEvent = () => {
    // Placeholder for Add Event modal logic
    console.log("Add event button clicked");
  };

  const handleEventClick = (event) => {
    // Placeholder for opening event details modal
    console.log("Event card clicked:", event);
  };

  return (
    <div className="rounded-xl bg-white shadow-sm p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-zinc-900 ">Gift Events</h3>
        <div className="flex items-center gap-2">
          <button
            onClick={handleAddEvent}
            className="btn btn-primary btn-outline rounded-2xl"
          >
            <span className="material-symbols-outlined"> add </span>
            <span>Add</span>
          </button>
          {totalPages > 1 && (
            <div className="flex items-center gap-2">
              <button
                disabled={currentPage === 0}
                onClick={handlePrevPage}
                className="btn btn-ghost rounded-full"
              >
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <button
                disabled={currentPage >= totalPages - 1}
                onClick={handleNextPage}
                className="btn btn-ghost rounded-full"
              >
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {pagedEvents.map((event) => (
          <div
            key={event.id}
            onClick={() => handleEventClick(event)}
            className="group relative cursor-pointer rounded-lg  bg-primary/60 p-4 shadow-lg hover:scale-105 transition-shadow"
          >
            <div className="flex flex-col gap-2">
              <h4 className="text-md font-semibold text-zinc-900">
                {event.title}
              </h4>
              <p className="text-sm text-base-100">{event.date}</p>
            </div>

            <button className="btn btn-ghost rounded-full absolute top-1 right-1">
              <span className="material-symbols-outlined text-base">
                push_pin
              </span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactEvent;
