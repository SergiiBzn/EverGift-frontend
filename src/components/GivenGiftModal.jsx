/** @format */

import React, { useEffect, useState } from "react";

// TailwindCSS-based modal for adding a given gift
// Props:
// - isOpen: boolean to control visibility
// - onClose: function to close the modal
// - onSave: function({ name, description, date })
export default function GivenGiftModal({
  isOpen = false,
  onClose = () => {},
  onSave = () => {},
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    if (isOpen) {
      setName("");
      setDescription("");
      setDate("");
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  const handleSave = (e) => {
    e?.preventDefault?.();
    onSave({ name, description, date });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <form onSubmit={handleSave} className="relative z-10 w-full max-w-lg rounded-3xl bg-amber-700 text-white shadow-xl">
        <div className="px-6 py-5 sm:px-8 sm:py-7">
          <h2 className="mb-6 text-center text-3xl font-semibold">Given Gift</h2>

          <div className="space-y-4">
            {/* Gift name */}
            <div className="grid grid-cols-12 items-center gap-3">
              <label htmlFor="giftName" className="col-span-4 text-right text-lg">
                Gift name:
              </label>
              <div className="col-span-8">
                <input
                  id="giftName"
                  type="text"
                  className="w-full rounded-xl bg-white/95 p-3 text-gray-900 outline-none focus:ring-2 focus:ring-orange-400"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Description */}
            <div className="grid grid-cols-12 items-center gap-3">
              <label htmlFor="description" className="col-span-4 text-right text-lg">
                Description:
              </label>
              <div className="col-span-8">
                <input
                  id="description"
                  type="text"
                  className="w-full rounded-xl bg-white/95 p-3 text-gray-900 outline-none focus:ring-2 focus:ring-orange-400"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>

            {/* Date */}
            <div className="grid grid-cols-12 items-center gap-3">
              <label htmlFor="date" className="col-span-4 text-right text-lg">
                Date:
              </label>
              <div className="col-span-8">
                <input
                  id="date"
                  type="date"
                  className="w-full rounded-xl bg-white/95 p-3 text-gray-900 outline-none focus:ring-2 focus:ring-orange-400"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-between">
            <button type="submit" className="min-w-28 rounded-2xl bg-orange-500 px-6 py-3 font-semibold text-white shadow hover:bg-orange-600 active:bg-orange-700">
              save
            </button>
            <button type="button" onClick={onClose} className="min-w-28 rounded-2xl bg-orange-500/90 px-6 py-3 font-semibold text-white shadow hover:bg-orange-600 active:bg-orange-700">
              cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

