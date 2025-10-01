import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";

const ContactNote = ({ contact, setContact }) => {
  const [note, setNote] = useState(contact.note || "");
  const [isEditing, setIsEditing] = useState(false);
  const [saveStatus, setSaveStatus] = useState("");

  const { baseUrl } = useAuth();
  const handleSave = async () => {
    setSaveStatus("Saving...");
    try {
      const res = await fetch(`${baseUrl}/contacts/${contact.slug}/note`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          note,
        }),
      });
      if (res.ok) {
        toast.success("Note saved successfully");
        setContact({ ...contact, note });
      }
      setIsEditing(false);
    } catch (error) {
      console.log(error);
      setSaveStatus("Error saving note");
    }
  };
  const handleCancel = () => {
    setNote(contact.note || "");
    setIsEditing(false);
    setSaveStatus("");
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSave();
    }
  };

  return (
    <div className="mt-6 flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <label
          onClick={() => setIsEditing(true)}
          className="block text-sm font-medium text-neutral"
        >
          Notes{" "}
        </label>
        {isEditing && (
          <div className="flex justify-end gap-2">
            <button
              onClick={handleCancel}
              className="btn btn-sm btn-outline btn-neutral"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="btn btn-sm btn-primary"
              disabled={saveStatus === "Saving..."}
            >
              {saveStatus === "Saving..." ? "Saving" : "Save"}
            </button>
          </div>
        )}
      </div>
      {isEditing ? (
        <>
          <textarea
            name="note"
            className="mt-1 w-full h-32 textarea  textarea-primary"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            onKeyDown={handleKeyDown}
          ></textarea>
        </>
      ) : (
        <div
          onClick={() => {
            setIsEditing(true);
            setSaveStatus("");
          }}
          className=" mt-1 block w-full h-32 overflow-y-auto rounded-lg textarea prose"
        >
          {contact.note ? (
            <div className="whitespace-pre-wrap">{contact.note}</div>
          ) : (
            <p className="text-zinc-500 dark:text-zinc-400">
              No notes yet. Click here to add note.
            </p>
          )}
        </div>
      )}
    </div>
  );
};
export default ContactNote;
