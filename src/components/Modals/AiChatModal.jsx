import React from "react";
import useAuth from "../../hooks/useAuth";
import chatbotAvatar from "../../assets/images/avatar.png";
import { useState } from "react";

import { useEffect } from "react";
import { improveErrorMessage } from "../../utils/improveErrorMessage";
import { toast } from "react-toastify";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

const AiChatModal = ({ contact, isOpen, onClose }) => {
  const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

  const { user } = useAuth();

  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  console.log("user chat modal", user);

  //********** handle message submittion **********
  const handleMessageSubmit = async (e) => {
    e.preventDefault();

    console.log("message", message);
    console.log("contact id", contact.id);

    setIsLoading(true);
    try {
      // Send message to the backend

      const response = await fetch(`${baseUrl}/ai/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: message,
          contactId: contact.id,
          contactName: contact.profile.name,
          wishList: contact.wishList,
        }),
        credentials: "include",
      });

      console.log("response", response);
      if (!response.ok) {
        const { error } = await response.json();
        await improveErrorMessage(error);
        return;
      }

      const data = await response.json();

      // add new user message without overriding
      setMessages((prev) => [
        ...prev,
        { sender: "user", text: message },
        { sender: "bot", text: data.reply },
      ]);

      setMessage("");
    } catch (error) {
      toast.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSuggestion = () => {
    const submittedMessage = `Suggest Me Some gifts for ${contact.profile.name}`;
    setMessage(submittedMessage);
  };

  /*  const handleClose = () => {
    // document.getElementById("aiChatModal").close();

  }; */

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        id="aiChatModal"
        className="relative bg-white w-full max-w-3xl rounded-3xl shadow-xl flex flex-col"
        style={{ maxHeight: "90vh" }} // limits modal height
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b p-3">
          <h3 className="font-bold text-lg text-primary">AI Gift Assistant</h3>
          <button onClick={onClose} className="btn btn-sm btn-outline">
            X
          </button>
        </div>

        {/* Chat Area */}
        <div
          id="chatMessages"
          className="flex-1 overflow-y-auto space-y-3 p-4 border-t border-b bg-gray-50
                 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200"
        >
          {/* Initial greeting */}
          <div className="chat chat-start">
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img alt="ai avatar" src={chatbotAvatar} />
              </div>
            </div>
            <div className="chat-bubble bg-gray-200 text-black">
              Hello <span className="font-bold">{user.profile.name}</span>! How
              can I help you today?
            </div>
          </div>

          {/* Messages */}
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`chat ${msg.sender === "user" ? "chat-end" : "chat-start"}`}
            >
              <div className="chat-image avatar">
                <div className="w-8 rounded-full">
                  <img
                    src={
                      msg.sender === "user"
                        ? user.profile.avatar
                        : chatbotAvatar
                    }
                    alt={msg.sender}
                  />
                </div>
              </div>
              <div
                className={`chat-bubble prose prose-md white-space-pre-wrap leading-9 text-md   break-words  ${
                  msg.sender === "user"
                    ? "bg-amber-600 text-white"
                    : "bg-gray-200 text-black"
                }`}
              >
                {/*  <Markdown>
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                </Markdown> */}

                <Markdown>{msg.text.replace(/\n{3,}/g, "\n\n")}</Markdown>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="chat chat-start">
              <div className="chat-image avatar">
                <div className="w-8 rounded-full">
                  <img alt="ai avatar" src={chatbotAvatar} />
                </div>
              </div>
              <div className="chat-bubble bg-gray-200 text-black">
                <span className="loading loading-dots loading-sm"></span>{" "}
                Thinking...
              </div>
            </div>
          )}
        </div>

        {/* Footer section (input + buttons) */}
        <div className="p-3 flex flex-col gap-3">
          <button
            onClick={handleSuggestion}
            className="btn btn-outline btn-primary rounded-lg text-sm  w-2/3 sm:w-1/2"
          >
            Suggest Me Some gifts for{" "}
            <span className="font-bold">{contact.profile.name}</span>
          </button>

          <form
            className="flex items-center gap-2 w-full"
            onSubmit={handleMessageSubmit}
          >
            <input
              type="text"
              name="message"
              value={message}
              onChange={handleChange}
              placeholder="Type your message..."
              className="flex-1 input input-bordered input-lg rounded-lg w-full"
            />
            <button className="btn btn-primary rounded-xl">Send</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AiChatModal;
