/** @format */

import React, { useState } from "react";
import useAuth from "../../hooks/useAuth.jsx";
import { improveErrorMessage } from "../../utils/improveErrorMessage.js";
import { toast } from "react-toastify";
import { useParams } from "react-router";

const AddGiftEventModal = ({ contact, setContact }) => {
  const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

  const [formData, setFormData] = useState({
    title: "",

    date: "",
  });

  const { user, setUser } = useAuth();
  const { contactSlug } = useParams();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleClose = (e) => {
    e.preventDefault();
    document.getElementById("addGiftEventModal").close();
  };

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      const giftObject = {
        gift: {
          name: formData.gift || "default",
          date: formData.date || "",
        },
        title: formData.title || "",
        date: formData.date,
      };
      const response = await fetch(`${baseUrl}/contacts/${contact.id}/events`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(giftObject),
        credentials: "include",
      });

      if (!response.ok) {
        const { error } = await response.json();
        await improveErrorMessage(error, 5000);
        return;
      }

      const event = await response.json();
      console.log("event", event);

      /*   setUser({ ...user, events: [...(user.events || []), event] });
      document.getElementById("addGiftEventModal").close();
      setFormData({
        ...formData,

        title: "",

        date: "",
      }); */
      setContact({ ...contact, events: [...(contact.events || []), event] });

      document.getElementById("addGiftEventModal").close();
      setFormData({
        ...formData,

        title: "",

        date: "",
      });

      toast.success("Event created successfully");
      document.getElementById("addGiftEventModal").close();
    } catch (error) {
      console.error("Error creating event:", error);
      toast.error(error);
    }
  };
  return (
    <dialog
      id="addGiftEventModal"
      className="modal  modal-bottom sm:modal-middle fixed inset-0 z-50 flex items-center justify-center p-4 rounded-3xl bg-amber-700 text-white "
    >
      <div className="modal-box max-h-none h-auto bg-amber-700 text-white ">
        <h3 className="font-bold text-lg text-center">Add Gift Event</h3>

        <div className=" modal-action">
          <form
            onSubmit={handleSave}
            className="relative z-10 w-full max-w-lg  bg-amber-700 text-white  "
          >
            {/* if there is a button in form, it will close the modal */}
            <div className="px-6 py-5 sm:px-8 sm:py-7">
              <div className="space-y-4">
                {/* title */}
                <div className="grid grid-cols-12 items-center gap-3">
                  <label
                    htmlFor="title"
                    className="col-span-4 text-right text-lg"
                  >
                    Event Title:
                  </label>
                  <div className="col-span-8">
                    <input
                      id="title"
                      type="text"
                      className="w-full rounded-xl bg-white/95 p-3 text-gray-900 outline-none focus:ring-2 focus:ring-orange-400"
                      value={formData.title || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          title: e.target.value,
                        })
                      }
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                {/* Date */}
                <div className="grid grid-cols-12 items-center gap-3">
                  <label
                    htmlFor="date"
                    className="col-span-4 text-right text-lg"
                  >
                    Event Date:
                  </label>
                  <div className="col-span-8">
                    <input
                      id="date"
                      type="date"
                      className="w-full rounded-xl bg-white/95 p-3 text-gray-900 outline-none focus:ring-2 focus:ring-orange-400"
                      value={formData.date}
                      onChange={(e) =>
                        setFormData({ ...formData, date: e.target.value })
                      }
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-8 flex items-center justify-between">
                <button
                  className="btn  btn-outline hover:bg-primary/10 rounded-xl"
                  onClick={handleClose}
                >
                  Close
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary rounded-xl"
                >
                  {isSubmitting ? "saving..." : "save"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default AddGiftEventModal;
