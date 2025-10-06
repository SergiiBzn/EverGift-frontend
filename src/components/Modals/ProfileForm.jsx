// components/ProfileForm.jsx
import { useState } from "react";

const ProfileForm = ({
  initialData,
  defaultAvatar,
  isSubmitting,
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] = useState(initialData);
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(initialData.avatar || "");
  const [newTag, setNewTag] = useState("");
  const [openEditAvatar, setOpenEditAvatar] = useState(false);
  const [error, setError] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "birthday") {
      const today = new Date().toISOString().split("T")[0];
      if (value && value > today) {
        setError((prev) => ({
          ...prev,
          birthday: "Birthday cannot be in the future.",
        }));
      } else if (error.birthday) {
        // Clear the error if the date is now valid
        setError((prev) => {
          const { birthday, ...rest } = prev;
          return rest;
        });
      }
    }

    if (name === "avatar") {
      setPreview(value);
      if (imageFile) setImageFile(null);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
      setFormData((prev) => ({ ...prev, avatar: "" }));
    }
  };

  const addTag = () => {
    const newTagTrimmed = newTag.trim();
    if (newTagTrimmed !== "" && !formData.tags.includes(newTagTrimmed)) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        tags: [...prevFormData.tags, newTagTrimmed],
      }));
    }
    setNewTag("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tagToRemove),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const today = new Date().toISOString().split("T")[0];
    if (formData.birthday && formData.birthday > today) {
      setError((prev) => ({
        ...prev,
        birthday: "Birthday cannot be in the future.",
      }));
      return; // Stop submission
    }
    onSubmit(formData, imageFile, setError);
  };

  return (
    <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
      {/* Avatar */}
      <div className="flex gap-4 items-center">
        <div className="relative avatar">
          <div className="w-24 rounded-xl">
            {preview ? (
              <img src={preview} alt="avatar preview" />
            ) : (
              <img src={defaultAvatar} alt="default avatar" />
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
            <div>
              <label
                className="label block text-sm font-medium"
                htmlFor="avatar"
              >
                Paste Avatar Url
              </label>
              <input
                className="input input-primary w-full"
                type="text"
                name="avatar"
                value={formData.avatar}
                onChange={handleChange}
                placeholder="Enter avatar url"
                id="avatar"
              />
            </div>
            <div className="divider divider-primary">OR</div>
            <div>
              <label
                className="block font-medium text-neutral-content"
                htmlFor="avatarFile"
              >
                Pick a file
              </label>
              <input
                type="file"
                onChange={handleFileChange}
                className="mt-1 w-full file-input file-input-primary file-input-lg rounded-lg"
              />
            </div>
          </div>
        )}
      </div>

      {/* Name */}
      <div>
        <label className="block font-medium text-neutral-content">
          Name
          <input
            className="w-full rounded-lg input input-lg input-primary text-base-content"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
          />
        </label>
        {error.name && <p className="text-error text-sm mt-1">{error.name}</p>}
      </div>

      {/* Birthday */}
      <div>
        <label className="block text-sm font-medium text-neutral-content">
          Birthday
          <input
            className="w-full rounded-lg input input-lg input-primary text-base-content"
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

      {/* Gender */}
      <div>
        <label className="block text-sm font-medium text-neutral-content">
          Gender
        </label>
        <div className="mt-2 flex items-center gap-x-6 text-base-content">
          {["male", "female", "other"].map((g) => (
            <label key={g} className="flex gap-2 items-center">
              <input
                className="radio radio-xs radio-primary"
                type="radio"
                name="gender"
                value={g}
                onChange={handleChange}
                checked={formData.gender === g}
              />
              <span className={g == "other" ? "" : "material-symbols-outlined"}>
                {g}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Tags */}
      <div className="text-sm font-medium text-neutral-content flex flex-col gap-2">
        Tags
        <div className="flex flex-wrap gap-2">
          {formData.tags.map((tag) => (
            <span
              key={tag}
              className="flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm text-primary dark:bg-primary/20"
            >
              {tag}
              <button
                type="button"
                className="ml-2 text-primary/50 hover:text-primary"
                onClick={() => handleRemoveTag(tag)}
              >
                ×
              </button>
            </span>
          ))}
        </div>
        <input
          className="w-full rounded-lg input input-lg input-primary text-base-content"
          name="tags"
          placeholder="Enter a tag and press Enter"
          type="text"
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-4 pt-4">
        <button
          type="button"
          className="btn btn-outline hover:bg-primary/10 rounded-xl"
          onClick={onCancel}
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
  );
};

export default ProfileForm;
