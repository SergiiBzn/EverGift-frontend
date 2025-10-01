/** @format */

import { useState } from "react";
import { AddContact } from "../index.js";
import useAuth from "../../hooks/useAuth.jsx";
import { Link } from "react-router-dom";

const ContactsComponent = () => {
  const [isOpenAddContact, setIsOpenAddContact] = useState(false);
  const [searchContact, setSearchContact] = useState("");

  const { user } = useAuth();

  //********** filter contacts **********
  const filteredContacts =
    user?.contacts?.filter((contact) =>
      contact?.name?.toLowerCase()?.includes(searchContact?.toLowerCase())
    ) || [];
  return (
    <div className=" p-4 rounded-xl flex flex-col bg-base-200 shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold">Contacts</h3>
        <button
          onClick={() => setIsOpenAddContact(true)}
          className="btn btn-primary rounded-2xl shadow-md">
          Add new Contact
        </button>
        {isOpenAddContact && (
          <AddContact
            isOpen={isOpenAddContact}
            setIsOpen={setIsOpenAddContact}
          />
        )}
      </div>
      <div className="relative mb-4">
        <input
          className="w-full pl-10 pr-4 py-2 rounded-lg bg-zinc-100 border border-subtle-light dark:border-subtle-dark focus:outline-none focus:border-0 focus:ring-2 focus:ring-primary/50 transition-colors"
          placeholder="Search contacts..."
          value={searchContact}
          onChange={(e) => setSearchContact(e.target.value)}
          type="text"
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
          <svg
            className="w-5 h-5 text-muted-dark"
            fill="currentColor"
            viewBox="0 0 256 256"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
          </svg>
        </div>
      </div>
      <div className="space-y-4 flex-1 overflow-y-auto">
        {filteredContacts?.map((contact) => {
          return (
            <Link
              key={contact.slug}
              to={`/contact/${contact.slug}`}
              className="flex items-center gap-4 p-4 rounded-lg bg-white shadow-sm">
              <div
                className="w-12 h-12 bg-center bg-no-repeat bg-cover rounded-full "
                style={{
                  backgroundImage: `url(${contact.avatar})`,
                }}></div>
              <div className="flex-1">
                <p className="font-bold">{contact.name}</p>
              </div>
            </Link>
          );
        })}

        {/* <div className="flex items-center gap-4 p-4 rounded-lg bg-background-light dark:bg-background-dark shadow-sm">
          <div className="w-12 h-12 bg-center bg-no-repeat bg-cover rounded-full bg-[url('https://lh3.googleusercontent.com/aida-public/AB6AXuCvPSQKPGXCnWbLY35gfN4kooPIpbnyxt-oaqWBmhjmLdxdvXhGqJbKlB8PxPcnbcNWEUdFBf8y8n5u2kWlMRgO56AOe95_eJ2AFig4rG2TmLZDdZtEJzL8Py9h1fu9HA0SP7SJLL7gX5v-7rsyCqzyE6ocNnQBFNXrqcR0TDTnZoKeFi9wXy7N27TJ29XpdTjB6YFnulgCba2kXXU2CejP7fD-5o_7p8exurdt8obuep_pKXhoDca0Etzb52CaMlFoqCqO4pmTTYPh')]"></div>
          <div className="flex-1">
            <p className="font-bold">Linda Rodriguez</p>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default ContactsComponent;
