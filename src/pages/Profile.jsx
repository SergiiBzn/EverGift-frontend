/** @format */

import React, { useState } from "react";
import ReceivedGiftModal from "../components/ReceivedGiftModal.jsx";

export default function Profile() {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-semibold">Profile</h1>

      <button
        className="rounded-lg bg-blue-600 px-4 py-2 text-white shadow hover:bg-blue-700"
        onClick={() => setOpen(true)}
      >
        Add Received Gift
      </button>

      <ReceivedGiftModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onSave={(data) => {
          console.log("Saved gift:", data);
          setOpen(false);
        }}
        fromOptions={["Alice", "Bob", "Charlie"]}
        onAddSender={() => alert("Add sender clicked")}
      />
    </div>
  );
}
