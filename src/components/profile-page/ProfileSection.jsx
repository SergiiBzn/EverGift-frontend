import { useState } from "react";
import EditProfile from "../Modals/EditProfile";

const ProfileSection = ({ profile }) => {
  const [isOpenEditProfile, setIsOpenEditProfile] = useState(false);
  return (
    <section>
      <h1 className="text-3xl font-bold mb-4">Profile</h1>
      <div className="rounded-xl bg-background-light p-6 shadow-sm ring-1 ring-primary/20 dark:bg-background-dark dark:ring-primary/30 container">
        <div className="flex flex-col items-center gap-6 md:flex-row">
          <div className="relative">
            <div
              className="h-32 w-32 rounded-full bg-cover bg-center"
              style={{
                backgroundImage: `url(${profile.avatar})`,
              }}
            ></div>
          </div>
          <div className="flex-1 text-center md:text-left">
            <div className="flex items-center gap-6">
              <h2 className="text-3xl font-bold">{profile.name}</h2>{" "}
              {profile.gender == "male" && (
                <span className="material-symbols-outlined text-shadow-cyan-600 dark:text-primary/70">
                  Male
                </span>
              )}
              {profile.gender == "female" && (
                <span className="material-symbols-outlined text-pink-500">
                  Female
                </span>
              )}
            </div>{" "}
            <p className="text-neutral ">
              Age: {profile.age >= 0 ? profile.age : "N/A"}
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-2 md:justify-start">
              {profile?.tags?.map((tag) => (
                <span className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary dark:bg-primary/20">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <button
            onClick={() => setIsOpenEditProfile(true)}
            className="btn btn-sm btn-primary"
          >
            Edit Profile
          </button>
          {isOpenEditProfile && (
            <EditProfile
              isOpen={isOpenEditProfile}
              setIsOpen={setIsOpenEditProfile}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default ProfileSection;
