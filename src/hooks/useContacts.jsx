/** @format */

import { useState } from "react";

import { toast } from "react-toastify";
import useAuth from "./useAuth";

const useContacts = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useAuth();
  const [allContacts, setAllContacts] = useState([]);

  const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";
  /*  const baseUrl = "http://localhost:3000"; */

  const improveErrorMessage = async (error) => {
    const errorArray = error
      .split("✖")
      .map((error) => "✖" + error)
      .filter((error) => error !== "✖");
    console.log("error", errorArray);
    toast.error(
      <div>
        {errorArray.map((error) => (
          <p>{error}</p>
        ))}
      </div>,
      { autoClose: 8000 }
    );
  };

  const createContact = async (contactData) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${baseUrl}/contacts`, {
        method: "POST",

        body: contactData, // Pass FormData directly
        credentials: "include", // Include cookies for authentication
        // NO 'Content-Type' header here!
      });

      console.log("response from create contact", response);
      if (!response.ok) {
        const { error } = await response.json();
        await improveErrorMessage(error);
        console.log(response);

        return;
      }
      /*   const data = await response.json();

      console.log("data from create use contact", data);

      console.log("newContact", data);
      const updatedContact = {
        _id: data.id,
        name: data.profile.name,
        avatar: data.profile.avatar,
      };
      setUser((prevUser) => {
        const updatedContacts = [...prevUser.contacts, updatedContact];
        return { ...prevUser, contacts: updatedContacts };
      });

      setAllContacts(data);
      toast.success(
        <div className="text-center">
          Contact {updatedContact.name} created successfully.
        </div>
      ); */

      const newContact = await response.json();

      console.log("newContact", newContact);

      // Update the local contacts state
      setAllContacts((prev) => [...prev, newContact.contact]);

      // Also update the user object in the AuthContext
      setUser((prevUser) => {
        // Guard against null/undefined user state
        if (!prevUser) {
          return prevUser; // Return the existing state (null or undefined)
        }
        // If user exists, update their contacts list
        return {
          ...prevUser,
          contacts: [...(prevUser.contacts || []), newContact.contact],
        };
      });

      toast.success(
        <div className="text-center">
          Contact {newContact.profile.name} created successfully.
        </div>
      );
    } catch (error) {
      toast.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  /*    const updateContactInState = (updatedContact) => {
    // To update a contact, you should map over the existing contacts
    const updatedContacts = allContacts.map((contact) =>
      contact.id === updatedContact.id ? updatedContact : contact
    );
    setAllContacts(updatedContacts);

    // And similarly update the user's contacts array
    setUser((prevUser) => ({
      ...prevUser,
      contacts: prevUser.contacts.map((contact) =>
        contact.id === updatedContact.id ? updatedContact : contact
      ),
    }));
  }; */

  return { createContact, isLoading };
};

export default useContacts;
