/** @format */
import { useState } from "react";
import { useContacts } from "../../hooks/useContacts.jsx";

const AddContact = ({ isOpen, setIsOpen }) => {
  const defaultAvatar =
    "https://www.pngplay.com/wp-content/uploads/12/User-Avatar-Profile-PNG-Pic-Clip-Art-Background.png";
  const [formData, setFormData] = useState({
    name: "",
    //dispplay default avatar if no avatar is set
    avatar: "",
    birthday: "",
    gender: "",
    tags: [],
  });

  const [imageFile, setImageFile] = useState(null);

  const [preview, setPreview] = useState(null);
  const [newTag, setNewTag] = useState("");
  const [openEditAvatar, setOpenEditAvatar] = useState(false);
  const { createContact, isLoading } = useContacts();

  const [error, setError] = useState({});

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (error[name]) {
      setError((prev) => {
        const newError = { ...prev };
        delete newError[name];
        return newError;
      });
    }
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "avatar") {
      setPreview(value);
      if (imageFile) {
        setImageFile(null);
      }
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

  //********** add contact *************
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.name || formData.name.trim() === "") {
      newErrors.name = "Name cannot be empty.";
    }

    if (!formData.birthday || formData.birthday.trim() === "") {
      newErrors.birthday = "Birthday must be filled";
    }

    if (Object.keys(newErrors).length > 0) {
      setError(newErrors);
      return;
    }
    setError({});

    const contactFormData = new FormData();
    // Append the image file if it exists
    if (imageFile) {
      contactFormData.append("avatar", imageFile);
    } else if (formData.avatar) {
      // If the user provided a URL instead of a file
      contactFormData.append("avatar", formData.avatar);
    } else {
      // Set default avatar if no URL is provided
      contactFormData.append("avatar", defaultAvatar);
    }

    // Append all other form fields
    contactFormData.append("name", formData.name);
    contactFormData.append("birthday", formData.birthday);
    contactFormData.append("gender", formData.gender);
    // Stringify the tags array to send it
    contactFormData.append("tags", JSON.stringify(formData.tags));

    contactFormData.append("contactType", "custom");

    // Debug: Log FormData entries
    for (const [key, value] of contactFormData.entries()) {
      console.log(`FormData Key: ${key}, Value: ${value}`);
    }

    try {
      await createContact(contactFormData);
      setIsOpen(false); // Close modal on save

      // Reset form data to initial state
      setFormData({
        name: "",
        avatar: "",
        birthday: "",
        gender: "",
        tags: [],
      });
      setNewTag("");
      setImageFile(null);
      setPreview(null);
    } catch (error) {
      console.error("Failed to create contact:", error);
      // Here you could add a state to show an error message to the user
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
      <div className="w-full relative max-w-lg rounded-xl bg-base-100 p-6 shadow-xl dark:bg-background-dark dark:ring-1 dark:ring-primary/30">
        <div className="flex items-start justify-between">
          <h2 className="text-2xl font-bold text-center w-full ">
            Add Contact
          </h2>
          <button
            className="btn btn-sm btn-ghost rounded-full"
            onClick={() => setIsOpen(false)}
          >
            <span className="material-symbols-outlined text-primary/80 dark:text-primary/70">
              close
            </span>
          </button>
        </div>
        <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
          {/* ****** Avatar section ***** */}

          <div className="flex gap-4 items-center ">
            <div className="relative avatar">
              <div className="w-24 rounded-xl">
                {preview ? (
                  <img src={preview} alt="preview" />
                ) : (
                  <img
                    src="https://www.pngplay.com/wp-content/uploads/12/User-Avatar-Profile-PNG-Pic-Clip-Art-Background.png"
                    alt="User default Avatar"
                  />
                )}
              </div>

              {/* ****** Add Avatar btn ***** */}
              <button
                type="button"
                onClick={() => setOpenEditAvatar(!openEditAvatar)}
                className="absolute bottom-0 right-0 btn bg-primary btn-sm rounded-2xl"
              >
                <span className="material-symbols-outlined text-sm">edit</span>
              </button>
            </div>

            {/* display avatar edit form and btn to upload one */}
            {openEditAvatar && (
              <div className="w-full flex flex-col gap-2 justify-center">
                <div className="flex-1 flex-col ">
                  <label
                    htmlFor="avatar"
                    className="label block text-sm font-medium"
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
                    className="block font-medium text-neutral-content "
                    htmlFor="avatarFile"
                  >
                    Pick a file
                  </label>
                  <input
                    type="file"
                    name="imageFile"
                    onChange={handleFileChange}
                    className="mt-1 w-full file-input file-input-primary file-input-lg rounded-lg "
                  />
                </div>
              </div>
            )}
          </div>
          {/* name section */}
          <div>
            <label className="block font-medium text-neutral-content htmlFor='name'">
              Name
              <input
                className="mt-1 w-full rounded-lg input input-lg input-primary"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                id="name"
              />
            </label>
            {error.name && (
              <p className="text-error text-sm mt-1">{error.name}</p>
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
            <label className="block font-medium text-neutral-content ">
              Birthday
              <input
                className="mt-1 w-full rounded-lg  input input-primary"
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
          <div>
            <label className="block font-medium text-neutral-content ">
              Tags
              <div className="mt-1 flex flex-wrap gap-2">
                {formData.tags.map((tag) => {
                  return (
                    <span
                      key={tag}
                      className="flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm text-primary dark:bg-primary/20"
                    >
                      {tag}
                      <button
                        className="ml-2 text-primary/50 hover:text-primary"
                        onClick={() => handleRemoveTag(tag)}
                      >
                        ×
                      </button>
                    </span>
                  );
                })}
              </div>
            </label>
            <input
              className="mt-1 w-full rounded-lg  input input-primary"
              name="newTag"
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
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </button>
            <button
              className={`btn btn-primary rounded-xl ${
                isLoading ? "cursor-not-allowed" : ""
              }`}
              type="submit"
              disabled={isLoading}
            >
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
