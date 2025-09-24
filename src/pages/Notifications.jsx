/** @format */

import React, { useState } from "react";
import GivenGiftModal from "../components/GivenGiftModal.jsx";

export default function Notifications() {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-semibold">Notifications</h1>

      <button
        className="rounded-lg bg-blue-600 px-4 py-2 text-white shadow hover:bg-blue-700"
        onClick={() => setOpen(true)}
      >
        Add Given Gift
      </button>

      <GivenGiftModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onSave={(data) => {
          console.log("Given gift saved:", data);
          setOpen(false);
        }}
      />
    </div>
  );
}
