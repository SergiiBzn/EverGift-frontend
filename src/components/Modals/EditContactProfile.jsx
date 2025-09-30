import ProfileModal from "./ProfilModal.jsx";
import ProfileForm from "./ProfileForm";
import { buildProfileFormData } from "../../utils/buildProfileFormData.js";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router";

const EditContactProfile = ({ contact, setContact, isOpen, setIsOpen }) => {
  const defaultAvatar =
    "https://www.pngplay.com/wp-content/uploads/12/User-Avatar-Profile-PNG-Pic-Clip-Art-Background.png";

  const { baseUrl } = useAuth();
  const navigate = useNavigate();

  contact.profile = {
    ...contact.profile,
    birthday:
      new Date(contact.profile.birthday).toISOString().split("T")[0] || "",
  };

  const handleSubmit = async (formData, imageFile, setError) => {
    const fd = buildProfileFormData(
      "contact",
      formData,
      imageFile,
      defaultAvatar,
      contact.slug
    );

    try {
      const res = await fetch(`${baseUrl}/contacts/${contact.slug}/profile`, {
        method: "PUT",
        body: fd,
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to update contact profile");

      const updatedContact = await res.json();

      console.log(updatedContact);
      if (updatedContact.slug !== contact.slug) {
        navigate(`/contact/${updatedContact.slug}`);
      }
      setContact({ ...contact, profile: updatedContact.profile });

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
      title="Edit Contact Profile"
    >
      <ProfileForm
        initialData={contact.profile}
        defaultAvatar={defaultAvatar}
        isSubmitting={false}
        onSubmit={handleSubmit}
        onCancel={() => setIsOpen(false)}
      />
    </ProfileModal>
  );
};

export default EditContactProfile;
