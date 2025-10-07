/** @format */

import { useState, useMemo } from "react";
// import AddGiftEventModal from "../Modals/addGiftEventModal";
import { EventModal, EventDetailsModal } from "../Modals/index.js";
import useEventActions from "../../hooks/useEventActions.js";
import { getNextEventDate } from "../../utils/eventHelpers.js";
import { format } from "date-fns";

const ContactEvent = ({ contact, setContact }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  // const [isPinned, setIsPinned] = useState(false);
  const { handleCreateEvent, handleUpdate, handleDelete, handleTogglePin } =
    useEventActions();

  const handleOpenCreateModal = () => {
    setSelectedEvent(null);
    setIsCreateModalOpen(true);
  };

  const handleSaveEvent = async (eventData) => {
    const isEditMode = !!selectedEvent;
    const { contacts, ...payload } = eventData;

    if (isEditMode) {
      const updatedEvent = await handleUpdate(selectedEvent, payload);

      setContact((prev) => ({
        ...prev,
        events: prev.events.map((e) =>
          e._id === updatedEvent._id
            ? { ...updatedEvent, date: updatedEvent.date.split("T")[0] }
            : e
        ),
      }));
      setIsEditModalOpen(false);
      setSelectedEvent(null);
    } else {
      const newEvent = await handleCreateEvent(payload, contacts[0]);

      setContact((prev) => ({
        ...prev,
        events: [
          ...(prev.events || []),
          {
            ...newEvent,
            date: newEvent.date.split("T")[0],
          },
        ],
      }));
      setIsCreateModalOpen(false);
    }
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setIsDetailsModalOpen(true);
  };

  const handleCloseDetailsModal = () => {
    setSelectedEvent(null);
    setIsDetailsModalOpen(false);
  };

  // --- Event Edit Modal ---
  const handleOpenEditModal = () => {
    setIsDetailsModalOpen(false);
    setIsEditModalOpen(true);
  };
  const handleDeleteEvent = async () => {
    if (!selectedEvent) return;

    await handleDelete(selectedEvent);
    setContact((prev) => ({
      ...prev,
      events: prev.events.filter((e) => e._id !== selectedEvent._id),
    }));
    handleCloseDetailsModal();
  };

  // --- Memoized Calculations for Pagination ---
  const totalPages = useMemo(
    () => Math.ceil(contact?.events.length / itemsPerPage),
    [contact?.events.length]
  );

  const pagedEvents = useMemo(() => {
    const start = currentPage * itemsPerPage;
    const end = start + itemsPerPage;
    return contact?.events.slice(start, end);
  }, [contact?.events, currentPage]);

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

  return (
    <div className="h-full flex flex-col rounded-xl bg-white shadow-sm p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-zinc-900 ">Gift Events</h3>
        <div className="flex items-center gap-2">
          <button
            onClick={handleOpenCreateModal}
            className="btn btn-primary btn-outline "
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

      {/* create modal  */}

      <EventModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSave={handleSaveEvent}
        contactId={contact.id}
      />

      {/* All added Events cards */}
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {pagedEvents?.map((event) => {
          const nextDate = getNextEventDate(event, new Date());
          return (
            <div
              key={event._id}
              onClick={() => handleEventClick(event)}
              className="group relative cursor-pointer rounded-lg  bg-base-200 p-4 shadow-lg hover:scale-105 transition-shadow"
            >
              <div className="flex flex-col gap-2">
                <h4 className="text-md font-semibold text-zinc-900">
                  {event.title}
                </h4>
                <p className="text-sm text-gray-500">
                  {format(nextDate, "yyyy-MM-dd")}
                </p>
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleTogglePin(event);
                  setContact((prev) => ({
                    ...prev,
                    events: prev.events.map((e) =>
                      e._id === event._id
                        ? { ...e, isPinned: !event.isPinned }
                        : e
                    ),
                  }));
                }}
                aria-label={event.isPinned ? "Unpin event" : "Pin event"}
                className="p-1 rounded-full transition-colors absolute top-1 right-1 hover:bg-yellow-100"
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
          );
        })}
      </div>
      {isDetailsModalOpen && selectedEvent && (
        <EventDetailsModal
          isOpen={isDetailsModalOpen}
          event={selectedEvent}
          onClose={handleCloseDetailsModal}
          onDelete={handleDeleteEvent}
          onEdit={handleOpenEditModal}
          onArchive={(response) => {
            setContact(response.contact);
          }}
        />
      )}
      {isEditModalOpen && selectedEvent && (
        <EventModal
          isOpen={isEditModalOpen}
          onSave={handleSaveEvent}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedEvent(null);
          }}
          contactId={contact.id}
          eventToEdit={selectedEvent}
        />
      )}
    </div>
  );
};

export default ContactEvent;
