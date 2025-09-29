/** @format */
import { useState, useEffect, useRef } from "react";
import useAuth from "../../hooks/useAuth.jsx";

import AddContact from "../Modals/AddContact.jsx";
const ContactSection = () => {
  const [isOpenAddContact, setIsOpenAddContact] = useState(false);

  const { user, allUsers } = useAuth();

  console.log(" User contacts", user.contacts);
  const scrollContainer = useRef(null);
  const scroll = (scrollOffset) => {
    if (scrollContainer.current) {
      scrollContainer.current.scrollBy({
        left: scrollOffset,
        behavior: "smooth",
      });
    }
  };
  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold">Contacts</h2>
        <div className="w-full sm:w-auto flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="relative w-full sm:w-64">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg
                className="h-5 w-5 text-primary/70"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  clipRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  fillRule="evenodd"
                />
              </svg>
            </span>
            <input
              className="w-full rounded-lg border-primary/20 bg-background-light py-2 pl-10 pr-4 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-primary/30 dark:bg-background-dark dark:focus:border-primary"
              id="search-contact"
              placeholder="Search contacts"
              type="text"
            />
          </div>
          <button
            onClick={() => setIsOpenAddContact(true)}
            className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white">
            <svg
              className="lucide lucide-plus"
              fill="none"
              height="20"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="20"
              xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12h14"></path>
              <path d="M12 5v14"></path>
            </svg>
            <span>Add Contact</span>
          </button>
        </div>
      </div>

      <div className="relative">
        <div
          ref={scrollContainer}
          className="flex items-center gap-4 overflow-x-auto  py-[2rem] px-[4rem]">
          {user.contacts && user.contacts.length > 0 ? (
            user.contacts.map((contact) => (
              <div
                key={contact._id}
                className="flex flex-col items-center justify-center gap-2 flex-shrink-0">
                {/* <div
           className="h-24 w-24 rounded-full bg-cover bg-center border border-primary"
           style={{
             backgroundImage: `url(${
               contact.contactType === "user"
                 ? contact.linkedUserId?.profil?.avatar
                 : contact.customProfil?.avatar||defaultAvatar
             })`,
           }}></div> */}
                <div>
                  <img
                    className="h-24 w-24 rounded-full bg-cover bg-center border border-primary"
                    src={`
                          ${contact.avatar}`}
                    alt={contact._id}
                  />
                  <p className="text-sm font-medium text-center">
                    {contact.name}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p>No contacts yet.</p>
          )}

          <AddContact
            isOpen={isOpenAddContact}
            setIsOpen={setIsOpenAddContact}
          />
          <div className="absolute inset-y-0 left-0 flex items-center">
            <button
              className="p-2 rounded-full bg-background-light/80 dark:bg-background-dark/80 shadow-md ring-1 ring-black/5 dark:ring-white/10 hover:bg-background-light dark:hover:bg-background-dark btn btn-circle"
              aria-label="Previous Contacts"
              onClick={() => scroll(-300)}>
              <span className="material-symbols-outlined text-primary">
                chevron_left
              </span>
            </button>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center">
            <button
              className="p-2 rounded-full bg-background-light/80 dark:bg-background-dark/80 shadow-md ring-1 ring-black/5 dark:ring-white/10 hover:bg-background-light dark:hover:bg-background-dark btn btn-circle  "
              aria-label="Next Contacts"
              onClick={() => scroll(300)}>
              <span className="material-symbols-outlined text-primary  ">
                chevron_right
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
