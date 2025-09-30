const ProfileModal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
    >
      {/* overlay */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* modal body */}
      <div className="relative w-full max-w-lg rounded-xl bg-base-100 p-6 shadow-xl dark:bg-background-dark dark:ring-1 dark:ring-primary/30">
        <div className="flex items-start justify-between mb-4">
          <h2 className="text-2xl font-bold">{title}</h2>
          <button
            className="btn btn-sm btn-ghost rounded-full"
            type="button"
            onClick={onClose}
          >
            <span className="material-symbols-outlined text-primary/80 dark:text-primary/70">
              close
            </span>
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default ProfileModal;
