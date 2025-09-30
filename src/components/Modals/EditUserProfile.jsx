import ProfileModal from "./ProfilModal.jsx";
import ProfileForm from "./ProfileForm";
import { buildProfileFormData } from "../../utils/buildProfileFormData.js";
import useAuth from "../../hooks/useAuth";

const EditUserProfile = ({ isOpen, setIsOpen }) => {
  const defaultAvatar =
    "https://www.pngplay.com/wp-content/uploads/12/User-Avatar-Profile-PNG-Pic-Clip-Art-Background.png";

  const { baseUrl, setUser, user } = useAuth();

  user.profile = {
    ...user.profile,
    birthday: new Date(user.profile.birthday).toISOString().split("T")[0] || "",
  };

  const handleSubmit = async (formData, imageFile, setError) => {
    const fd = buildProfileFormData("user", formData, imageFile, defaultAvatar);

    try {
      const res = await fetch(`${baseUrl}/users/profile`, {
        method: "PUT",
        body: fd,
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to update user profile");

      const updatedUser = await res.json();

      setUser({ ...user, profile: updatedUser });

      setIsOpen(false);
    } catch (err) {
      console.error("Error updating user profile:", err);
      setError({ general: "Update failed, please try again." });
    }
  };

  return (
    <ProfileModal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      title="Edit User Profile"
    >
      <ProfileForm
        initialData={user.profile}
        defaultAvatar={defaultAvatar}
        isSubmitting={false}
        onSubmit={handleSubmit}
        onCancel={() => setIsOpen(false)}
      />
    </ProfileModal>
  );
};

export default EditUserProfile;
