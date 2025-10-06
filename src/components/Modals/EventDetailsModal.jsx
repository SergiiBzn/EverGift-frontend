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
        <div className="modal-box w-11/12 max-w-lg rounded-3xl">
          <div className="p-4">
            {/* Modal Header with Contact Info */}
            <div className="flex flex-col items-center mb-6">
              {event.contact?.profile?.avatar && (
                <img
                  src={event.contact.profile.avatar}
                  alt={event.contact.profile.name}
                  className="w-20 h-20 rounded-full object-cover mb-4 "
                />
              )}
              {event.contact?.profile?.name && (
                <p className="text-lg font-semibold text-primary">
                  For {event.contact.profile.name}'s
                </p>
              )}
              <h3 className="font-bold text-2xl text-center mt-1">
                {event.title}
              </h3>
            </div>

            <div className="space-y-4">
              {/* Date */}
              <div className="flex items-center gap-4">
                <span className="font-semibold">Date:</span>
                <span>{format(new Date(event.date), "MMMM d, yyyy")}</span>
              </div>
              {/* Gift */}
              <div className="flex items-center gap-4">
                <span className="font-semibold">Gift:</span>
                {event.gift?.name && event.gift.name !== "default" ? (
                  <span>{event.gift.name}</span>
                ) : (
                  <span className="text-gray-400 italic">No gift prepared</span>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="modal-action mt-6">
              <button
                onClick={onEdit}
                className="btn btn-primary min-w-28 rounded-xl"
              >
                Edit
              </button>
              <button
                onClick={handleDeleteClick}
                className="btn btn-error min-w-28 rounded-xl text-white"
              >
                Delete
              </button>
              <button
                onClick={onClose}
                className="btn btn-outline min-w-28 rounded-xl"
              >
                Close
              </button>
            </div>
          </div>
        </div>
        {/* Backdrop: click outside to close */}
        <div className="modal-backdrop" onClick={onClose}></div>
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
