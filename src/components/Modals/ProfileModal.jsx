import { motion, AnimatePresence } from "framer-motion";
const ProfileModal = ({
  isOpen,
  onClose,
  title,
  children,
  type = "default",
  size = "md",
}) => {
  const typeStyle = {
    default: "bg-base-100 ring-2 ring-primary/40",
    user: "bg-base-200 ring-4 ring-primary",
    contact: "bg-base-100 ring-1 ring-primary/20",
  };

  const sizeMap = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
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
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* modal body */}
          <motion.div
            className={`relative w-full ${sizeMap[size]} ${typeStyle[type]} rounded-2xl bg-base-100 p-6 shadow-xl dark:bg-background-dark
              max-h-[90vh] overflow-y-auto mx-auto`}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2
                className={`text-2xl  font-bold ${
                  type === "user" ? "text-primary" : ""
                }`}
              >
                {title}
              </h2>
              <button
                className="btn btn-sm btn-ghost rounded-full"
                type="button"
                onClick={onClose}
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProfileModal;
