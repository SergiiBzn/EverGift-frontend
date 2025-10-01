import useAuth from "../../hooks/useAuth";
import { format } from "date-fns";
import { useState } from "react";
import { ConfirmModal } from "../index.js";

const EventDetailsModal = ({ event, onClose, onDelete, onEdit }) => {
  const { user } = useAuth();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  if (!event) return null;

  // Find the contact details from the user's contacts list
  const getContactDetails = (contactId) => {
    return user?.contacts?.find((c) => c.id === contactId);
  };

  const eventContacts = Array.isArray(event.contacts)
    ? event.contacts.map(getContactDetails).filter(Boolean)
    : [];

  const handleDeleteClick = () => {
    setIsConfirmOpen(true); //
  };

  const handleConfirmDelete = () => {
    onDelete();
    setIsConfirmOpen(false);
  };

  return (
    <>
      <dialog id="event_details_modal" className="modal modal-open">
        <div className="modal-box w-11/12 max-w-lg">
          <div className="p-4">
            <h3 className="font-bold text-2xl text-center mb-6">
              {event.title}
            </h3>

            <div className="space-y-4">
              {/* Date */}
              <div className="flex items-center gap-4">
                <span className="font-semibold">Date:</span>
                <span>{format(new Date(event.date), "MMMM d, yyyy")}</span>
              </div>

              {/* Contacts */}
              {eventContacts.length > 0 && (
                <div>
                  <span className="font-semibold">For:</span>
                  <div className="flex flex-wrap gap-4 mt-2">
                    {eventContacts.map((contact) => (
                      <div
                        key={contact.id}
                        className="flex items-center gap-2 bg-base-200 p-2 rounded-lg"
                      >
                        <img
                          src={contact.avatar}
                          alt={contact.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <span>{contact.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Gift */}
              {event.gift?.name && (
                <div className="flex items-center gap-4">
                  <span className="font-semibold">Gift:</span>
                  <span>{event.gift.name}</span>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="modal-action mt-6">
              <button onClick={onEdit} className="btn btn-primary">
                Edit
              </button>
              <button onClick={handleDeleteClick} className="btn btn-error">
                Delete
              </button>
              <button onClick={onClose} className="btn">
                Close
              </button>
            </div>
          </div>
        </div>
      </dialog>
      <ConfirmModal
        isOpen={isConfirmOpen}
        title="Delete Event"
        message="Are you sure you want to delete this event? This action cannot be undone."
        onConfirm={handleConfirmDelete}
        onCancel={() => setIsConfirmOpen(false)}
        tone="danger"
      />
    </>
  );
};

export default EventDetailsModal;
