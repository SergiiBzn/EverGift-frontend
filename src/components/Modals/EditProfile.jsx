import { useState } from "react";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";

const EditProfile = ({ isOpen, setIsOpen }) => {
  const { baseUrl, setUser, user } = useAuth();
  const profile = user?.profile;
  const [formData, setFormData] = useState({
    name: profile.name || "",
    avatar: profile.avatar || "",
    birthday: new Date(profile.birthday).toISOString().split("T")[0] || "",
    gender: profile.gender || "",
    tags: profile.tags || [],
  });
  const [openEditAvatar, setOpenEditAvatar] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newTag, setNewTag] = useState("");

  const [error, setError] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  if (error[name]) {
    setError((prev) => {
      const newError = { ...prev };
      delete newError[name];
      return newError;
    });
  }

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
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tagToRemove),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.name || formData.name.trim() === "") {
      newErrors.name = "Name cannot be empty.";
    }
    if (!formData.birthday) {
      newErrors.birthday = "Birthday must be filled";
    } else {
      // check birthday is not in the future
      const birthday = new Date(formData.birthday);
      const today = new Date();
      if (birthday > today) {
        newErrors.birthday = "Birthday must be in the past";
      }
    }
    if (Object.keys(newErrors).length > 0) {
      setError(newErrors);
      return;
    }

    setError({});

    if (!formData.avatar) {
      formData.avatar = profile.avatar;
    }
    try {
      setIsSubmitting(true);
      const res = await fetch(`${baseUrl}/users/profile`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",
      });
      if (!res.ok) throw new Error("Error updating profile");
      const updatedProfile = await res.json();
      setUser((prev) => ({ ...prev, profile: updatedProfile }));
      toast.success("Profile updated successfully");
      setIsSubmitting(false);
      setIsOpen(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Error updating profile");
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      />
      <div className="w-full relative max-w-lg rounded-xl bg-base-100 p-6 shadow-xl ">
        <div className="flex items-start justify-between">
          <h2 className="text-2xl font-bold ">Edit Profile</h2>
          <button
            className="btn btn-sm btn-ghost rounded-full"
            type="button"
            onClick={() => setIsOpen(false)}
          >
            <span className="material-symbols-outlined text-primary/80 dark:text-primary/70">
              close
            </span>
          </button>
        </div>
        <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
          <div className="flex gap-4 items-center ">
            <div className="relative avatar">
              <div className="w-24 rounded-xl">
                {formData.avatar ? (
                  <img src={formData.avatar} alt="User Avatar" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <span className="material-symbols-outlined text-5xl text-base-content/30">
                      person
                    </span>
                  </div>
                )}
              </div>
              <button
                type="button"
                onClick={() => setOpenEditAvatar(!openEditAvatar)}
                className="absolute bottom-0 right-0 btn bg-primary btn-sm rounded-2xl"
              >
                <span className="material-symbols-outlined text-sm">edit</span>
              </button>
            </div>

            {openEditAvatar && (
              <div className="w-full flex flex-col gap-2 justify-center">
                <div className="flex-1 flex-col ">
                  <input
                    className="input input-primary w-full"
                    type="text"
                    name="avatar"
                    value={formData.avatar}
                    onChange={handleChange}
                  />
                </div>
                <label className="btn btn-outline btn-neutral btn-sm rounded-2xl w-16">
                  . . .
                  <input type="file" className="hidden" name="avatar" />
                </label>
              </div>
            )}
          </div>
          <div>
            <label className="block font-medium text-neutral-content">
              Name
              <input
                className=" w-full rounded-lg input input-lg input-primary text-base-content"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
              />
            </label>
            {error.name && (
              <p className="text-error text-sm mt-1">{error.name}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-content">
              Birthday
              <input
                className=" w-full rounded-lg input input-lg input-primary text-base-content"
                name="birthday"
                type="date"
                value={formData.birthday}
                onChange={handleChange}
              />
            </label>
            {error.birthday && (
              <p className="text-error text-sm mt-1">{error.birthday}</p>
            )}
          </div>
          {/* Gender Selection */}
          <div>
            <label className="block text-sm font-medium text-neutral-content">
              Gender
            </label>
            <div className="mt-2 flex items-center gap-x-6 text-base-content">
              <div className="flex gap-2 items-center">
                <input
                  className="radio radio-xs radio-primary"
                  type="radio"
                  name="gender"
                  value="male"
                  onChange={handleChange}
                  defaultChecked={formData.gender === "male"}
                />
                <span className=" material-symbols-outlined ">Male</span>
              </div>
              <div className="flex gap-2 items-center">
                <input
                  className="radio radio-xs radio-primary"
                  type="radio"
                  name="gender"
                  value="female"
                  onChange={handleChange}
                  defaultChecked={formData.gender === "female"}
                />
                <span className="material-symbols-outlined ">Female</span>
              </div>
              <div className="flex gap-2 items-center">
                <input
                  className="radio radio-xs radio-primary"
                  type="radio"
                  name="gender"
                  value="other"
                  onChange={handleChange}
                  defaultChecked={formData.gender === "other"}
                />
                <span className="">Other</span>
              </div>
            </div>
          </div>
          <div>
            <label className=" text-sm font-medium text-neutral-content flex flex-col gap-2">
              Tags
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag) => {
                  return (
                    <span className="flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm text-primary dark:bg-primary/20">
                      {tag}
                      <button
                        type="button"
                        className="ml-2 text-primary/50 hover:text-primary"
                        onClick={() => handleRemoveTag(tag)}
                      >
                        ×
                      </button>
                    </span>
                  );
                })}
              </div>
              <input
                className=" w-full rounded-lg input input-lg input-primary text-base-content "
                name="tags"
                placeholder="Add a tag..."
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </label>
          </div>
          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              className="btn btn-outline  hover:bg-primary/10 rounded-xl "
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </button>
            <button
              className="btn btn-primary rounded-xl"
              disabled={isSubmitting}
              type="submit"
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
