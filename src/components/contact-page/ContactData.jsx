import { EditProfile } from "../index";
import { useState } from "react";

const ContactData = ({ contact }) => {
  const [isOpenEditProfile, setIsOpenEditProfile] = useState(false);

  if (!contact) {
    return <div>Contact not found</div>;
  }

  const { profile, contactType } = contact;

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
                    className="btn btn-sm btn-primary"
                  >
                    Edit Profile
                  </button>
                )}
              </div>
              <p className="text-zinc-500 dark:text-zinc-400">
                Age: {profile.age >= 0 ? profile.age : "N/A"}
              </p>
            </div>
            {isOpenEditProfile && (
              <EditProfile
                contact={contact}
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
    </div>
  );
};

export default ContactData;
