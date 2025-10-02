/** @format */
import {
  CalendarComponent,
  ContactsComponent,
  ReminderComponent,
} from "../components";
import useEventAction from "../hooks/useEventActions.js";
import { useState } from "react";
import { EventModal, EventDetailsModal } from "../components/index.js";

const Dashboard = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventToEdit, setEventToEdit] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [initialDate, setInitialDate] = useState(null);
  const { handleCreateEvent, handleUpdate, handleDelete } = useEventAction();

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setIsDetailsModalOpen(true);
  };

  const handleCloseDetailsModal = () => {
    setIsDetailsModalOpen(false);
    setSelectedEvent(null);
  };
  const handleDeleteEvent = async () => {
    if (selectedEvent) {
      await handleDelete(selectedEvent);
      handleCloseDetailsModal();
    }
  };

  const handleOpenEditModal = () => {
    setEventToEdit(selectedEvent);
    setIsEditModalOpen(true);
    handleCloseDetailsModal();
  };
  const handleOpenCreateModal = (date) => {
    setInitialDate(date);
    setIsCreateModalOpen(true);
  };

  const handleSaveEvent = async (eventData) => {
    const { contacts, ...payload } = eventData;

    if (eventToEdit) {
      // Update event

      const updatedEvent = await handleUpdate(eventToEdit, payload);
      console.log("updatedEvent", updatedEvent);
    } else {
      // Create event
      if (contacts && contacts.length > 0) {
        for (const contactId of contacts) {
          await handleCreateEvent(payload, contactId);
        }
      } else {
        console.log("No contacts selected");
      }
    }
    setIsCreateModalOpen(false);
    setIsEditModalOpen(false);
    setEventToEdit(null);
  };

  return (
    <main className="flex-1 p-6 lg:p-10">
      {/* <h1 className="text-3xl md:text-4xl font-bold mb-8">Dashboard</h1> */}
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(250px,1fr)_minmax(400px,2fr)_minmax(250px,1fr)] gap-8 ">
        <ContactsComponent />
        <CalendarComponent
          onEventClick={handleEventClick}
          onCreateEvent={handleOpenCreateModal}
        />
        <ReminderComponent />
      </div>
      {isDetailsModalOpen && selectedEvent && (
        <EventDetailsModal
          event={selectedEvent}
          onClose={handleCloseDetailsModal}
          onDelete={handleDeleteEvent}
          onEdit={handleOpenEditModal}
        />
      )}
      {(isCreateModalOpen || isEditModalOpen) && (
        <EventModal
          isOpen={isCreateModalOpen || isEditModalOpen}
          onClose={() => {
            setIsCreateModalOpen(false);
            setIsEditModalOpen(false);
            setEventToEdit(null);
          }}
          onSave={handleSaveEvent}
          eventToEdit={eventToEdit}
          initialDate={initialDate}
        />
      )}
    </main>
  );
};

export default Dashboard;
