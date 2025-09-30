import ProfileForm from "./ProfileForm";
import { buildProfileFormData } from "../../utils/buildProfileFormData.js";

const EditUserProfile = ({ user, baseUrl, isOpen, setIsOpen, setUser }) => {
  // if (!isOpen) return null;
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
    <div className="modal">
      <ProfileForm
        initialData={user.profile}
        defaultAvatar={defaultAvatar}
        isSubmitting={false}
        onSubmit={handleSubmit}
        onCancel={() => setIsOpen(false)}
      />
    </div>
  );
};

export default EditUserProfile;
