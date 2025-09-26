/** @format */

import { useState } from "react";

import { toast } from "react-toastify";
import useAuth from "./useAuth";

const useContacts = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useAuth();
  const [allContacts, setAllContacts] = useState([]);

  const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

  /*  const improveErrorMessage = async (error) => {
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
  }; */

  const createContact = async (contactData) => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:3000/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactData),
        credentials: "include", // Include cookies for authentication
      });

      const data = await response.json();

      console.log("data from create use contact", data);

      if (!response.ok) {
        const error = data.error || "An error occurred.";
        // await improveErrorMessage(error);
        console.log(error);
        toast.error(error);
      } else {
        console.log("newContact", data);
        setUser((prevUser) => ({
          ...prevUser,
          contacts: [...prevUser.contacts, data], // Replace the old list with the new one
        }));

        setAllContacts(data);
        toast.success("Contact added successfully!");
      }
    } catch (error) {
      toast.error(error.message || "Failed to add contact.");
    } finally {
      setIsLoading(false);
    }
  };

  return { createContact, isLoading };
};

export default useContacts;
