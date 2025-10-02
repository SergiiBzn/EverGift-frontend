/** @format */

import { useState, useMemo } from "react";
// import AddGiftEventModal from "../Modals/addGiftEventModal";
import { EventModal, EventDetailsModal } from "../Modals/index.js";
import useEventActions from "../../hooks/useEventActions.js";

const ContactEvent = ({ contact, setContact }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const { handleCreateEvent, handleUpdate, handleDelete } = useEventActions();

  const handleOpenCreateModal = () => {
    setSelectedEvent(null);
    setIsCreateModalOpen(true);
  };

  const handleSaveEvent = async (eventData) => {
    const isEditMode = !!selectedEvent;
    const { contacts, ...payload } = eventData;

    if (isEditMode) {
      const updatedEvent = await handleUpdate(selectedEvent, payload);
      console.log({ ...updatedEvent, date: updatedEvent.date.slice("T")[0] });

      setContact((prev) => ({
        ...prev,
        events: prev.events.map((e) =>
          e.id === updatedEvent.id
            ? // ? { ...updatedEvent, date: updatedEvent.date.slice("T")[0] }
              updatedEvent
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
      events: prev.events.filter((e) => e.id !== selectedEvent.id),
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

      {/* create modal  */}

      <EventModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSave={handleSaveEvent}
        contactId={contact.id}
      />

      {/* All added Events cards */}
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {pagedEvents?.map((event) => (
          <div
            key={event._id}
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
      {isDetailsModalOpen && selectedEvent && (
        <EventDetailsModal
          isOpen={isDetailsModalOpen}
          event={selectedEvent}
          onClose={handleCloseDetailsModal}
          onDelete={handleDeleteEvent}
          onEdit={handleOpenEditModal}
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
