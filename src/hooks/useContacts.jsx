/** @format */

import { useState } from "react";

import { toast } from "react-toastify";
import useAuth from "./useAuth";

const useContacts = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useAuth();
  const [allContacts, setAllContacts] = useState([]);

  const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactData),
        credentials: "include", // Include cookies for authentication
      });

      if (!response.ok) {
        const { error } = await response.json();
        await improveErrorMessage(error);
        console.log(error);

        return;
      }
      const data = await response.json();

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
      toast.success("Contact added successfully!");
    } catch (error) {
      toast.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { createContact, isLoading };
};

export default useContacts;
