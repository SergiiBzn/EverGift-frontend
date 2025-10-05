import { useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";

import AuthContext from "../../contexts/AuthContext";
import { toast } from "react-toastify";

const SendRequestModal = ({ isOpen, setIsOpen }) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { sendContactRequest } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      await sendContactRequest({ email });
      setEmail("");
      setIsLoading(false);
      setIsOpen(false);
    } catch (err) {
      toast.error("Failed to send contact request:", err);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) {
    return null;
  }
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8  overflow-y-auto "
        role="dialog"
        aria-modal="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* overlay */}
        <motion.div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm "
          onClick={() => setIsOpen(false)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
        {/* modal body */}
        <motion.div
          className="relative w-full max-w-md rounded-2xl bg-base-100 p-6 shadow-xl dark:bg-background-dark
              max-h-[90vh] mx-auto"
        >
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            aria-label="Close modal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <h3 className="text-lg font-semibold text-primary">
            Send Friend Request
          </h3>
          <p className="mt-1 text-sm text-gray-600">
            Enter the email address of the user you want to connect with.
          </p>
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block font-medium text-gray-700"
              >
                Contact's Email:
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input input-bordered input-primary w-full mt-2"
                placeholder="name@example.com"
                required
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="btn btn-outline btn-primary"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="btn btn-primary"
              >
                {isLoading ? "Sending..." : "Send Request"}
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SendRequestModal;
