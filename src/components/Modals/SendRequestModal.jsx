import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";

const SendRequestModal = ({ isOpen, setIsOpen }) => {
  // const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [requests, setRequests] = useState([]);
  const [foundUser, setFoundUser] = useState(null);
  const [searchError, setSearchError] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const { sendContactRequest, baseUrl } = useAuth();

  const handleSearch = async (query) => {
    const emailToSearch = query || inputValue.trim();
    if (!emailToSearch) return null;

    setIsSearching(true);
    setSearchError("");
    setFoundUser(null);

    try {
      const res = await fetch(`${baseUrl}/users/search?q=${emailToSearch}`, {
        method: "GET",
        credentials: "include",
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Search failed. Please try again.");
      }
      const data = await res.json();

      if (!data) {
        setSearchError(`No users found with email ${emailToSearch}.`);
        return null;
      } else {
        setFoundUser(data);
        return data;
      }
    } catch (err) {
      setSearchError(err.message || "Error fetching user. Please try again.");
      return null;
    } finally {
      setIsSearching(false);
    }
  };

  // ================ add request  ==================
  const addRequest = (value) => {
    if (!value.trim()) return;
    if (requests.includes(value)) return;

    setRequests([...requests, value]);
    setInputValue("");
    setFoundUser(null);
  };

  // ================ remove request  ==================
  const removeRequest = (value) => {
    setRequests(requests.filter((r) => r !== value));
  };

  // ================ handle keydown  ==================
  const handleKeydown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  // ================ submit requests ==================
  const handleSubmit = async (e) => {
    e.preventDefault();

    let updateRequests = [...requests];
    if (inputValue.trim() && !removeRequest(inputValue.trim())) {
      const foundUser = await handleSearch(inputValue.trim());
      if (foundUser) {
        updateRequests.push(foundUser.email);
      } else {
        updateRequests.push(inputValue.trim());
      }
    }

    if (requests.length === 0) {
      setSearchError("Please add at least one email.");
      return;
    }

    setIsLoading(true);
    try {
      const uniqueRequests = [...new Set(updateRequests)];
      for (const req of uniqueRequests) {
        await sendContactRequest({ email: req });
      }
      setRequests([]);
      setInputValue("");
      setFoundUser(null);
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
          className="relative w-full max-w-md rounded-2xl bg-base-100 p-6 shadow-xl dark:bg-background-dark text-[#332E2B]
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
          <h3 className="text-lg font-semibold ">Send Friend Requests</h3>
          <p className="text-sm text-gray-500 mt-2">
            Invite your friends! Type their emails and press Enter then add them
            to the list.
          </p>
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <div className=" flex flex-col gap-2">
              <div className="flex flex-wrap gap-2">
                {requests.map((email) => (
                  <div
                    key={email}
                    className="badge badge-primary gap-2 py-3 px-4 text-sm"
                  >
                    <span>{email}</span>
                    <button
                      type="button"
                      onClick={() => removeRequest(email)}
                      className="ml-1 text-white/80 hover:text-red-300"
                      // disabled={!requests}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="email"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeydown}
                  className="input input-bordered input-primary w-full mt-2"
                  placeholder="Enter email and press Enter"
                />
              </div>

              {searchError && (
                <p className="text-red-500 text-sm mt-1">{searchError}</p>
              )}
              {isSearching && (
                <p className="text-sm text-primary mt-1">Searching...</p>
              )}

              {foundUser && (
                <div className="menu bg-base-200 w-full rounded-box mt-2">
                  <div
                    onClick={() => addRequest(foundUser.email)}
                    className="flex items-center justify-between p-2"
                  >
                    <div className="flex items-center gap-2">
                      <img
                        alt={foundUser.profile?.name}
                        className="w-8 h-8 rounded-full"
                        src={foundUser.profile?.avatar}
                      />
                      <div>
                        <p className="text-sm font-medium">
                          {foundUser.profile?.name}
                        </p>
                        <p className="text-xs text-base-content/60">
                          {foundUser.email}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="flex justify-end gap-4 pt-4">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="btn btn-outline min-w-28 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading || (!inputValue && requests.length === 0)}
                className="btn btn-primary rounded-xl min-w-28"
              >
                {isLoading
                  ? "Sending..."
                  : requests.length > 0
                  ? `Send ${requests.length + (inputValue ? 1 : 0)} Request${
                      requests.length + (inputValue ? 1 : 0) > 1 ? "s" : ""
                    }`
                  : "Send Request"}
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SendRequestModal;
