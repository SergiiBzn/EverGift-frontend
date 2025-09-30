/** @format */

import { useEffect, useState } from "react";

import { toast } from "react-toastify";
import useAuth from "./useAuth";
const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const useContacts = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setUser, baseUrl } = useAuth();
  const [allContacts, setAllContacts] = useState([]);

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

      if (!response.ok) {
        const { error } = await response.json();
        await improveErrorMessage(error);
        return;
      }

      const newContact = await response.json();

      // console.log("newContact", newContact);

      // Update the local contacts state
      setAllContacts((prev) => [...prev, newContact.contact]);

      // Also update the user object in the AuthContext
      setUser((prevUser) => {
        // Guard against null/undefined user state
        if (!prevUser) {
          return prevUser; // Return the existing state (null or undefined)
        }
        // If user exists, update their contacts list
        const updatedContact = {
          _id: newContact._id,
          name: newContact.profile.name,
          avatar: newContact.profile.avatar,
          slug: newContact.slug,
        };
        return {
          ...prevUser,
          contacts: [...(prevUser.contacts || []), updatedContact],
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

  return { createContact, isLoading, allContacts };
};

export const useContact = (contactSlug) => {
  const [contact, setContact] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      if (!contactSlug) {
        return <div>Contact not found</div>;
      }
      setIsLoading(true);

      try {
        const response = await fetch(`${baseUrl}/contacts/${contactSlug}`, {
          method: "GET",
          credentials: "include", // Include cookies for authentication
          // NO 'Content-Type' header here!
        });

        if (!response.ok) {
          const { error } = await response.json();
          console.log("error", error);
          return;
        }

        const data = await response.json();
        setContact(data);
      } catch (error) {
        toast.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [contactSlug]);

  const deleteContact = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${baseUrl}/contacts/${contactSlug}`, {
        method: "DELETE",
        credentials: "include", // Include cookies for authentication
        // NO 'Content-Type' header here!
      });

      if (!response.ok) {
        const { error } = await response.json();
        console.log("error", error);
        return;
      }
      setContact(null);
      toast.success(
        <div className="text-center">
          Contact {contact.profile.name} deleted successfully.
        </div>
      );
    } catch (error) {
      toast.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  return { contact, isLoading, setContact, deleteContact };
};
