import { ContactData, ContactEvent, ContactRest } from "../components/index.js";
import { useContact } from "../hooks/useContacts.jsx";
import { useParams } from "react-router";
const ContactDetails = () => {
  const { contactSlug } = useParams();

  const { contact, isLoading, setContact, deleteContact } =
    useContact(contactSlug);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }
  if (!contact) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Contact not found.</p>
      </div>
    );
  }

  return (
    <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <ContactData
          contact={contact}
          setContact={setContact}
          deleteContact={deleteContact}
        />
        <ContactEvent contact={contact} setContact={setContact} />
        <ContactRest contact={contact} />
      </div>
    </main>
  );
};
export default ContactDetails;
