import { ContactData, ContactEvent, ContactRest } from "../components/index.js";
const ContactDetails = () => {
  // const { contactId } = useParams();
  return (
    <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <ContactData />
        <ContactEvent />
        <ContactRest />
      </div>
    </main>
  );
};
export default ContactDetails;
