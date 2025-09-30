import EditContactProfile from "./EditContactProfile.jsx";
import { useState } from "react";
import { useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth.jsx";
const ContactData = ({ contact, setContact }) => {
  const [isOpenEditProfile, setIsOpenEditProfile] = useState(false);
  const [isOpenDeleteConfirm, setIsOpenDeleteConfirm] = useState(false);
  const navigate = useNavigate();
  const { baseUrl } = useAuth();
  if (!contact) {
    return <div>Contact not found</div>;
  }

  const { profile, contactType } = contact;

  const handleDelete = async () => {
    try {
      const res = await fetch(`${baseUrl}/contacts/${contact.slug}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) {
        throw new Error("Failed to delete contact");
      }
      setContact(null);
      navigate("/");
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <div className="rounded-xl bg-white shadow-sm p-6">
      <div className="flex flex-c items-start gap-6 md:flex-row">
        <div
          className={"h-32 w-32 flex-shrink-0 rounded-full bg-cover bg-center"}
          style={{
            backgroundImage: `url(${profile.avatar})`,
          }}
        ></div>
        <div className="flex-1">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-col">
              <div className="flex items-center gap-6">
                <h2 className="text-3xl font-bold text-zinc-900">
                  {profile.name}
                </h2>
                {profile.gender == "male" && (
                  <span className="material-symbols-outlined text-cyan-600 ">
                    Male
                  </span>
                )}
                {profile.gender == "female" && (
                  <span className="material-symbols-outlined text-pink-500">
                    Female
                  </span>
                )}

                {contactType == "custom" && (
                  <button
                    onClick={() => setIsOpenEditProfile(true)}
                    className="btn btn-sm btn-primary btn-outline"
                  >
                    Edit
                  </button>
                )}
                <button
                  onClick={() => setIsOpenDeleteConfirm(true)}
                  className="btn btn-sm btn-danger btn-outline"
                >
                  Delete
                </button>
              </div>
              <p className="text-zinc-500 dark:text-zinc-400">
                Age: {profile.age >= 0 ? profile.age : "N/A"}
              </p>
            </div>
            {isOpenEditProfile && (
              <EditContactProfile
                contact={contact}
                setContact={setContact}
                isOpen={isOpenEditProfile}
                setIsOpen={setIsOpenEditProfile}
              />
            )}
            <button className="btn btn-primary shadow-md">
              <span className="material-symbols-outlined">auto_awesome</span>
              <span>AI Gift Suggestions</span>
            </button>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <div className="mt-4 flex flex-wrap justify-center gap-2 md:justify-start">
              {profile?.tags?.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary dark:bg-primary/20"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6">
        <label className="block text-sm font-medium text-neutral">
          Notes
          <textarea
            className=" mt-1 block w-full rounded-lg border-zinc-300 dark:border-zinc-700 text-base-content bg-base-200 dark:bg-background-dark p-3 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            name="notes"
            placeholder="Add your notes here..."
            rows="4"
          ></textarea>
        </label>
      </div>
      {isOpenDeleteConfirm && (
        <dialog className="modal modal-open sm:modal-middle">
          <div className="modal-box alert alert-warning">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="stroke-info h-6 w-6 shrink-0"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <p className="py-4">
              Are you sure you want to delete this contact? This action cannot
              be undone.
            </p>
            <div className="modal-action">
              <button
                onClick={() => setIsOpenDeleteConfirm(false)}
                className="btn btn-sm"
              >
                Cancel
              </button>
              <button onClick={handleDelete} className="btn btn-sm btn-primary">
                Delete
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default ContactData;
