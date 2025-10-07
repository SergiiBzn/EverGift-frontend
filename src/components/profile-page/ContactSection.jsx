/** @format */
import { useState, useRef } from "react";
import useAuth from "../../hooks/useAuth.jsx";

import { AddContact, SendRequestModal } from "../Modals/index.js";
import { Link } from "react-router";
const ContactSection = () => {
  const [searchContact, setSearchContact] = useState("");
  const [isOpenAddContact, setIsOpenAddContact] = useState(false);
  const [isOpenSendRequest, setIsOpenSendRequest] = useState(false);

  const { user } = useAuth();
  const handleClose = () => {
    document.activeElement.blur();
  };

  const scrollContainer = useRef(null);
  const scroll = (scrollOffset) => {
    if (scrollContainer.current) {
      scrollContainer.current.scrollBy({
        left: scrollOffset,
        behavior: "smooth",
      });
    }
  };

  const handleSearchContact = (e) => {
    setSearchContact(e.target.value);
  };

  //********** filter contacts **********
  const filteredContacts =
    user.contacts?.filter((contact) =>
      contact.name.toLowerCase().includes(searchContact.toLowerCase())
    ) || [];

  return (
    <section className="flex flex-col gap-6  ">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold">Contacts</h2>
        <div className="w-full sm:w-auto flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="w-full sm:w-64">
            <label className="relative block" htmlFor="search-contact">
              <svg
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </g>
              </svg>

              {/* SEARCH CONTACT */}
              <input
                id="search-contact"
                placeholder="Search contacts"
                type="text"
                value={searchContact}
                onChange={handleSearchContact}
                className="w-full rounded-2xl input input-md input-primary bg-white/95 text-base-content pl-10"
              />
            </label>
          </div>

          {/* dropdown menu to add contact or send contact request */}
          <div className="dropdown dropdown-end dropdown-center ">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-primary rounded-lg shadow-md"
            >
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
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M5 12h14"></path>
                <path d="M12 5v14"></path>
              </svg>
              <span>Add Contact</span>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
            >
              <li>
                <button
                  className="text-primary font-bold"
                  onClick={() => {
                    setIsOpenAddContact(true);
                    handleClose();
                  }}
                >
                  Add Custom Contact
                </button>
              </li>
              <li>
                <button
                  className="text-primary font-bold"
                  onClick={() => {
                    setIsOpenSendRequest(true);
                    handleClose();
                  }}
                >
                  Send Contact Request
                </button>
              </li>
            </ul>
          </div>

          {isOpenAddContact && (
            <AddContact
              isOpen={isOpenAddContact}
              setIsOpen={setIsOpenAddContact}
            />
          )}
          {isOpenSendRequest && (
            <SendRequestModal
              isOpen={isOpenSendRequest}
              setIsOpen={setIsOpenSendRequest}
            />
          )}
        </div>
      </div>

      <div className="relative">
        <div
          ref={scrollContainer}
          className="flex items-center gap-4 overflow-x-auto  p-6 rounded-lg  dark:bg-gray-800 scrollbar-custom "
        >
          {filteredContacts.length > 0 ? (
            filteredContacts.map((contact) => (
              <Link
                to={`/contact/${contact.slug}`}
                key={contact._id}
                className="flex flex-col items-center justify-center gap-2 flex-shrink-0"
              >
                <div className="h-40 w-35  bg-white space-x-4 py-2 rounded-lg">
                  <img
                    className="h-24 w-24 rounded-full bg-cover bg-center border border-primary mx-auto object-cover block "
                    src={`
                          ${contact.avatar}`}
                    alt={contact._id}
                  />
                  <p className="text-sm font-medium text-center p-2 word-break">
                    {contact.name}
                  </p>
                </div>
              </Link>
            ))
          ) : (
            <p>No contacts yet.</p>
          )}

          <div className="absolute inset-y-0 left-0 flex items-center">
            <button
              className="p-2 rounded-full bg-background-light/80 dark:bg-background-dark/80 shadow-md ring-1 ring-black/5 dark:ring-white/10 hover:bg-background-light dark:hover:bg-background-dark btn btn-circle"
              aria-label="Previous Contacts"
              onClick={() => scroll(-300)}
            >
              <span className="material-symbols-outlined text-primary">
                chevron_left
              </span>
            </button>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center">
            <button
              className="p-2 rounded-full bg-background-light/80 dark:bg-background-dark/80 shadow-md ring-1 ring-black/5 dark:ring-white/10 hover:bg-background-light dark:hover:bg-background-dark btn btn-circle  "
              aria-label="Next Contacts"
              onClick={() => scroll(300)}
            >
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
