import ProfileForm from "./ProfileForm";
import { buildProfileFormData } from "../../utils/buildProfileFormData.js";

const EditUserProfile = ({ user, baseUrl, isOpen, setIsOpen, setUser }) => {
  if (!isOpen) return null;
  console.log(isOpen);

  const defaultAvatar =
    "https://www.pngplay.com/wp-content/uploads/12/User-Avatar-Profile-PNG-Pic-Clip-Art-Background.png";

  const handleSubmit = async (formData, imageFile, setError) => {
    const fd = buildProfileFormData("user", formData, imageFile, defaultAvatar);
    try {
      const res = await fetch(`${baseUrl}/users/profile`, {
        method: "PUT",
        body: fd,
        credentials: "include",
      });
      if (!res.ok) throw new Error("Error updating user profile");
      const updatedProfile = await res.json();
      setUser((prev) => ({ ...prev, profile: updatedProfile }));
      setIsOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
    >
      {/* overlay */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      />

      {/* modal */}
      <div className="relative w-full max-w-lg rounded-xl bg-base-100 p-6 shadow-xl dark:bg-background-dark dark:ring-1 dark:ring-primary/30">
        <h2 className="text-2xl font-bold text-center mb-4">
          Edit User Profile
        </h2>

        <ProfileForm
          initialData={user.profile}
          defaultAvatar={defaultAvatar}
          isSubmitting={false}
          onSubmit={handleSubmit}
          onCancel={() => setIsOpen(false)}
        />
      </div>
    </div>
  );
};

export default EditUserProfile;
