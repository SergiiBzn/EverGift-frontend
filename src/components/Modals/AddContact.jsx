/** @format */

import React, { useState } from "react";
import useContacts from "../../hooks/useContacts";
import useAuth from "../../hooks/useAuth";

const AddContact = ({ profile = {}, isOpen, setIsOpen }) => {
  const [formData, setFormData] = useState({
    name: profile.name || "",
    avatar: profile.avatar || "",
    birthday: profile.birthday || "",
    gender: profile.gender || "",
    tags: profile.tags || [],
  });
  const [newTag, setNewTag] = useState("");
  const { createContact, isLoading } = useContacts();

  const { user, allUsers } = useAuth();

  console.log("hallo user Contacts", user.contacts);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const addTag = () => {
    const newTagTrimmed = newTag.trim();
    if (newTagTrimmed !== "" && !formData.tags.includes(newTagTrimmed)) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        tags: [...prevFormData.tags, newTagTrimmed],
      }));
    }
    setNewTag(""); // Clear input after adding
  };

  // Handles Enter key press
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent form submission on Enter
      addTag();
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((t) => t !== tagToRemove),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await createContact({ contactType: "custom", customProfil: formData });
    setIsOpen(false); // Close modal on save
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      />
      <div className="w-full relative max-w-lg rounded-xl bg-base-100 p-6 shadow-xl dark:bg-background-dark dark:ring-1 dark:ring-primary/30">
        <div className="flex items-start justify-between">
          <h2 className="text-2xl font-bold ">
            {profile.name ? "Edit Contact" : "Add Contact"}
          </h2>
          <button
            className="btn btn-sm btn-ghost rounded-full"
            onClick={() => setIsOpen(false)}>
            <span className="material-symbols-outlined text-primary/80 dark:text-primary/70">
              close
            </span>
          </button>
        </div>
        <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
          <div className="mt-4">
            <label
              htmlFor="users"
              className="block text-sm font-medium text-gray-700">
              Existing Contacts
            </label>
            <select
              id="users"
              className="select select-primary mt-1 block w-full rounded-md sm:text-sm input input-lg">
              <option value="">Select a contact</option>

              {/*TODO: should be the name of the user ( so the user need a username) */}
              {allUsers.map((contact) => {
                return (
                  <option key={contact._id} value={contact.email}>
                    {contact.email}
                  </option>
                );
              })}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">
              Name
              <input
                className="mt-1 w-full rounded-lg input input-lg input-primary"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
              />
            </label>
          </div>

          <div>
            <label
              htmlFor="gender"
              className="block text-sm font-medium text-gray-700">
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full rounded-xl bg-white/95 p-3 text-gray-900 outline-none ring-0 focus:ring-2 focus:ring-orange-400 select select-primary">
              <option value="" disabled>
                Select Gender
              </option>
              <option value="female">Female</option>
              <option value="male">Male</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">
              Birthday
              <input
                className="mt-1 w-full rounded-lg border-primary/20 bg-background-light py-2 px-4 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-primary/30 dark:bg-background-dark dark:focus:border-primary input input-primary"
                name="birthday"
                type="date"
                value={formData.birthday}
                onChange={handleChange}
              />
            </label>
          </div>
          <div>
            <label className="block text-sm font-medium">
              Tags
              <div className="mt-1 flex flex-wrap gap-2">
                {formData.tags.map((tag) => {
                  return (
                    <span
                      key={tag}
                      className="flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm text-primary dark:bg-primary/20">
                      {tag}
                      <button
                        className="ml-2 text-primary/50 hover:text-primary"
                        onClick={() => handleRemoveTag(tag)}>
                        ×
                      </button>
                    </span>
                  );
                })}
              </div>
            </label>
            <input
              className="mt-2 w-full rounded-lg border-primary/20 bg-background-light py-2 px-4 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-primary/30 dark:bg-background-dark dark:focus:border-primary input input-primary"
              name="tags"
              placeholder="Add a tag..."
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              className="btn btn-outline  hover:bg-primary/10 rounded-xl "
              onClick={() => setIsOpen(false)}>
              Cancel
            </button>
            <button
              className={`btn btn-primary rounded-xl ${
                isLoading ? "cursor-not-allowed" : ""
              }`}
              type="submit"
              disabled={isLoading}>
              {isLoading ? (
                <>
                  <span className="loading loading-spinner"></span>
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddContact;
