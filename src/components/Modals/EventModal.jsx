/** @format */

import { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth.jsx";

const EventModal = ({
  isOpen,
  onClose,
  onSave,
  eventToEdit,
  contactId,
  initialDate,
}) => {
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Default state now includes a 'contacts' array
  const getDefaultFormData = () => ({
    title: "",
    date: "",
    isRepeat: "none",
    isPinned: false,
    contacts: [], // MODIFIED: from 'contact' to 'contacts' array
    gift: {
      name: "",
    },
  });
  const [formData, setFormData] = useState(getDefaultFormData());

  // Effect to sync form state with eventToEdit prop
  useEffect(() => {
    if (isOpen) {
      if (eventToEdit) {
        // Edit mode: pre-fill form with event data
        setFormData({
          title: eventToEdit.title || "",
          date: eventToEdit.date
            ? new Date(eventToEdit.date).toISOString().split("T")[0]
            : "",
          isRepeat: eventToEdit.isRepeat || "none", // CORRECTED: Handle incoming string
          isPinned: eventToEdit.isPinned || false,
          contacts: Array.isArray(eventToEdit.contacts)
            ? eventToEdit.contacts.map((c) =>
                typeof c === "object" ? c.id : c
              )
            : eventToEdit.contacts
              ? [eventToEdit.contacts]
              : [],
          gift: {
            name: eventToEdit.gift?.name || "",
          },
        });
      } else {
        // Create mode: reset and pre-fill based on context
        const newFormData = getDefaultFormData();
        if (initialDate) {
          newFormData.date = initialDate; // Pre-fill date from calendar
        }
        if (contactId) {
          newFormData.contacts = [contactId];

          // Pre-fill contact from ContactEvent page
        }
        setFormData(newFormData);
      }
    }
  }, [eventToEdit, contactId, user?.contacts, isOpen, initialDate]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "giftName") {
      setFormData((prev) => ({
        ...prev,
        gift: { ...prev.gift, name: value },
      }));
    } else if (name === "isRepeat") {
      setFormData((prev) => ({
        ...prev,
        isRepeat: checked ? "yearly" : "none",
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  //  Handler for toggling contact selection
  const handleContactToggle = (idToToggle) => {
    setFormData((prev) => {
      const contacts = prev.contacts.includes(idToToggle)
        ? prev.contacts.filter((id) => id !== idToToggle) // Unselect
        : [...prev.contacts, idToToggle]; // Select
      return { ...prev, contacts };
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const payload = { ...formData };
    const isEditMode = !!eventToEdit;
    if (!isEditMode && contactId) payload.contacts = [contactId];

    if (payload.gift && !payload.gift.name) {
      delete payload.gift;
    }

    try {
      await onSave(payload);
      onClose();
    } catch (error) {
      console.error("Failed to save event:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  if (!isOpen) return null;

  const isEditMode = !!eventToEdit;

  const showContactSelector = !isEditMode && !contactId;

  return (
    <dialog id="event_modal" className="modal modal-open">
      <div className="modal-box w-11/12 max-w-lg rounded-xl">
        <div className="p-4">
          {isEditMode && (
            <div className="flex flex-col items-center mb-6">
              {eventToEdit.contact?.profile?.avatar && (
                <img
                  src={eventToEdit.contact.profile.avatar}
                  alt={eventToEdit.contact.profile.name}
                  className="w-20 h-20 rounded-full object-cover mb-4 "
                />
              )}
              {eventToEdit.contact?.profile?.name && (
                <p className="text-lg font-semibold text-primary">
                  For {eventToEdit.contact.profile.name}
                </p>
              )}
            </div>
          )}
          {!isEditMode && (
            <h3 className="font-bold text-2xl text-center mb-6">
              Create New Event
            </h3>
          )}
          <form onSubmit={handleSave}>
            <div className="space-y-4">
              {/* Event Title and Date */}
              <input
                type="text"
                name="title"
                placeholder="Event Title"
                className="input input-bordered w-full"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
              <input
                type="date"
                name="date"
                className="input input-bordered w-full"
                value={formData.date}
                onChange={handleInputChange}
                required
              />

              {/* MODIFIED: Contact Selector for Multi-Select */}

              {/* Contact Selector with Search + Horizontal Scroll */}
              {showContactSelector && (
                <div>
                  <label className="label">
                    <span className="label-text">Select Contacts</span>
                  </label>

                  {/*search input */}
                  <input
                    type="text"
                    placeholder="Search contacts..."
                    className="input input-bordered w-full mb-3"
                    value={formData.contactSearch || ""}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        contactSearch: e.target.value,
                      }))
                    }
                  />

                  {/* selected contacts (badges) */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {formData.contacts.map((_id) => {
                      const contact = user?.contacts?.find(
                        (c) => c._id === _id
                      );
                      return (
                        <div
                          key={_id}
                          className="badge badge-primary gap-2 py-3 px-4 text-sm"
                        >
                          {/* contact avatar */}
                          <img
                            src={contact?.avatar}
                            alt={contact?.name}
                            className="h-5 w-5 rounded-full"
                          />
                          {/* contact name */}
                          <span>{contact?.name}</span>
                          {/* remove button */}
                          <button
                            type="button"
                            onClick={() => handleContactToggle(_id)}
                            className="ml-1 text-white/80 hover:text-red-300"
                          >
                            ✕
                          </button>
                        </div>
                      );
                    })}
                  </div>

                  {/* horizontal scrollable contact selector */}
                  <div className="flex space-x-4 overflow-x-auto p-2 rounded-lg bg-gray-100 dark:bg-gray-800 scrollbar-custom">
                    {user?.contacts
                      ?.filter((c) =>
                        c.name
                          .toLowerCase()
                          .includes(
                            (formData.contactSearch || "").toLowerCase()
                          )
                      )
                      .map((contact) => {
                        const isSelected = formData.contacts.includes(
                          contact.id
                        );

                        return (
                          <div
                            key={contact.id}
                            onClick={() => handleContactToggle(contact._id)}
                            className={`flex-shrink-0 w-20 cursor-pointer p-2 rounded-lg text-center transition-all ${
                              isSelected
                                ? "bg-primary text-white"
                                : "bg-base-100 hover:bg-gray-200"
                            }`}
                          >
                            <img
                              className="h-16 w-16 rounded-full object-cover mx-auto"
                              src={contact.avatar}
                              alt={contact.name}
                            />
                            <span className="text-xs block truncate mt-2">
                              {contact.name}
                            </span>
                          </div>
                        );
                      })}
                  </div>
                </div>
              )}

              {/* Gift Name */}
              <input
                type="text"
                name="giftName"
                placeholder="Gift Name (Optional)"
                className="input input-bordered w-full"
                value={formData.gift.name}
                onChange={handleInputChange}
              />

              {/* Toggles */}
              <div className="flex justify-around pt-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="isRepeat"
                    className="toggle toggle-primary"
                    checked={formData.isRepeat === "yearly"}
                    onChange={handleInputChange}
                  />
                  <span className="text-lg">Repeat Annually</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="isPinned"
                    className="toggle toggle-secondary"
                    checked={formData.isPinned}
                    onChange={handleInputChange}
                  />
                  <span className="text-lg">Pin Event</span>
                </label>
              </div>
            </div>

            <div className="mt-8 flex items-center justify-between">
              <button
                type="button"
                className="btn btn-ghost"
                onClick={onClose}
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={
                  isSubmitting ||
                  (!isEditMode && formData.contacts.length === 0)
                }
              >
                {isSubmitting ? (
                  <span className="loading loading-spinner"></span>
                ) : isEditMode ? (
                  "Save Changes"
                ) : (
                  "Create Event"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default EventModal;
