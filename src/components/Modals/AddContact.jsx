/** @format */
import { useContacts } from "../../hooks/useContacts.jsx";
import ProfileModal from "./ProfileModal.jsx";
import ProfileForm from "./ProfileForm";
import { buildProfileFormData } from "../../utils/buildProfileFormData.js";

const AddContact = ({ isOpen, setIsOpen }) => {
  const { createContact, isLoading } = useContacts();

  const defaultAvatar =
    "https://www.pngplay.com/wp-content/uploads/12/User-Avatar-Profile-PNG-Pic-Clip-Art-Background.png";

  //********** add contact *************
  const handleSubmit = async (formData, imageFile, setError) => {
    const fd = buildProfileFormData(
      "contact",
      formData,
      imageFile,
      defaultAvatar
    );

    // fd.entries().forEach(([key, value]) => {
    //   console.log(key, value);
    // });
    try {
      await createContact(fd);
      setIsOpen(false);
    } catch (err) {
      console.error("Failed to create contact:", err);
      setError({ general: "Create failed, please try again." });
    }
  };

  return (
    <ProfileModal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      title="Add New Contact"
      size="md"
    >
      <ProfileForm
        initialData={{
          name: "",
          avatar: "",
          birthday: "",
          gender: "other",
          tags: [],
        }}
        defaultAvatar={defaultAvatar}
        isSubmitting={isLoading}
        onSubmit={handleSubmit}
        onCancel={() => setIsOpen(false)}
      />
    </ProfileModal>
  );
};

export default AddContact;
