/** @format */

import { useState } from "react";

const EditProfile = ({ profile, isOpen, setIsOpen }) => {
  const [formData, setFormData] = useState({
    name: profile.name || "",
    avatar: profile.avatar || "",
    birthday: profile.birthday || "",
    gender: profile.gender || "",
    tags: profile.tags || [],
  });
  const [newTag, setNewTag] = useState("");
  console.log(formData.avatar);

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
          <h2 className="text-2xl font-bold ">Edit Profile</h2>
          <button
            className="btn btn-sm btn-ghost rounded-full"
            onClick={() => setIsOpen(false)}>
            <span className="material-symbols-outlined text-primary/80 dark:text-primary/70">
              close
            </span>
          </button>
        </div>
        <form className="mt-6 space-y-6">
          <div className="flex items-center gap-4">
            {/* <div className="relative h-24 w-24"> */}
            <div className="relative avatar">
              <div className="w-24 rounded-xl">
                <img src={formData.avatar} />
              </div>
              <button className="absolute bottom-0 right-0 btn btn-primary btn-sm rounded-2xl">
                <span className="material-symbols-outlined text-sm">edit</span>
              </button>
              {/* <input className="hidden" id="avatar-upload" type="file" /> */}
            </div>
            <div className="flex-1">
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
          </div>
          <div>
            <label className="block text-sm font-medium">
              Birthday
              <input
                className="mt-1 w-full rounded-lg border-primary/20 bg-background-light py-2 px-4 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-primary/30 dark:bg-background-dark dark:focus:border-primary"
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
                    <span className="flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm text-primary dark:bg-primary/20">
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
              className="mt-2 w-full rounded-lg border-primary/20 bg-background-light py-2 px-4 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-primary/30 dark:bg-background-dark dark:focus:border-primary"
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
              className="btn btn-outline  hover:bg-primary/10 rounded-xl "
              onClick={() => setIsOpen(false)}>
              Cancel
            </button>
            <button className="btn btn-primary rounded-xl" type="submit">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
