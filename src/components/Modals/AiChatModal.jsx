import React from "react";
import useAuth from "../../hooks/useAuth";
import chatbotAvatar from "../../assets/images/avatar.png";
import { useState } from "react";

import { useEffect } from "react";
import { improveErrorMessage } from "../../utils/improveErrorMessage";
import { toast } from "react-toastify";

const AiChatModal = ({ contact }) => {
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
          contactName: user.profile.name,
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
    const submittedMessage = `Suggest Me Some gifts for ${user.profile.name}`;
    setMessage(submittedMessage);
  };

  return (
    <dialog
      id="aiChatModal"
      className="modal modal-bottom fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary text-black  "
    >
      <div
        className="modal-box bg-white rounded-2xl shadow-xl overflow-y-auto w-full sm:w-2/3 h-full   min-w-[600px] "
        style={{ maxWidth: "none", maxHeight: "none" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-2 mb-3">
          <h3 className="font-bold text-lg text-primary">AI Gift Assistant</h3>
          <form method="dialog">
            <button className="btn btn-sm btn-outline">Close</button>
          </form>
        </div>

        {/* Chat area */}
        <div
          id="chatMessages"
          className="  overflow-y-auto space-y-3 p-2 border rounded-xl bg-gray-50 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200"
        >
          {/* Initial AI greeting */}
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

          {/* messages  */}
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`chat ${
                msg.sender === "user" ? "chat-end" : "chat-start"
              }`}
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
                className={`chat-bubble ${
                  msg.sender === "user"
                    ? "bg-amber-600 text-white"
                    : "bg-gray-200 text-black"
                }`}
              >
                <p className="whitespace-pre-wrap">{msg.text}</p>
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
                <span className="loading loading-dots loading-sm"></span>
                Thinking...
              </div>
            </div>
          )}
        </div>

        {/* Quick suggestion button */}
        <button
          onClick={handleSuggestion}
          className="btn btn-outline btn-primary mt-4 rounded-lg max-w-sm p-2 text-center text-sm w-full"
        >
          Suggest Me Some gifts for{" "}
          <span className="font-bold">{contact.profile.name}</span>
        </button>

        {/* Input area */}
        <form
          className="mt-4 flex items-center gap-2 w-full"
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
    </dialog>
  );
};

export default AiChatModal;
