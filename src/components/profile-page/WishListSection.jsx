/** @format */
import { useState, useEffect } from "react";
import WishlistModal from "../WishListModal.jsx";
import { ConfirmModal } from "../Modals";
import BodyScrollLock from "../BodyScrollLock.jsx";

const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

export default function WishListSection({ initialWishList = [] }) {
  const [isWishModalOpen, setIsWishModalOpen] = useState(false);
  const [wishList, setWishList] = useState(initialWishList);
  const [savingWish, setSavingWish] = useState(false);
  const [editingWishIndex, setEditingWishIndex] = useState(null);
  const [confirmState, setConfirmState] = useState({
    open: false,
    index: null,
  });

  useEffect(() => {
    setWishList(initialWishList || []);
  }, [initialWishList]);

  const persistWishList = async (newList, { closeModal = true } = {}) => {
    const prev = wishList;
    setWishList(newList); // optimistic
    try {
      setSavingWish(true);
      const res = await fetch(`${baseUrl}/users/wishList`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(newList),
      });
      if (!res.ok) throw new Error("Failed to update wishlist");
      const updatedUser = await res.json();
      setWishList(updatedUser.wishList || newList);
      if (closeModal) {
        setIsWishModalOpen(false);
        setEditingWishIndex(null);
      }
    } catch (e) {
      console.error(e);
      setWishList(prev); // rollback
    } finally {
      setSavingWish(false);
    }
  };

  const addWishItem = async ({ name, description }) => {
    const newList = [...wishList, { item: name, description }];
    await persistWishList(newList);
  };

  const updateWishItem = async ({ name, description }) => {
    if (editingWishIndex === null) return;
    const newList = wishList.map((w, i) =>
      i === editingWishIndex ? { item: name, description } : w
    );
    await persistWishList(newList);
  };

  const deleteWishItem = async (idx) => {
    const newList = wishList.filter((_, i) => i !== idx);
    await persistWishList(newList, { closeModal: false });
  };

  const requestDeleteWish = (index) => setConfirmState({ open: true, index });
  const handleConfirmDelete = async () => {
    if (confirmState.index !== null) await deleteWishItem(confirmState.index);
    setConfirmState({ open: false, index: null });
  };
  const handleCancelDelete = () =>
    setConfirmState({ open: false, index: null });

  return (
    <section className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Wishlist</h2>
        <button
          className="btn btn-primary rounded-lg shadow-md "
          aria-label="Add Item to Wishlist"
          onClick={() => {
            setEditingWishIndex(null);
            setIsWishModalOpen(true);
          }}
        >
          <svg
            className="lucide lucide-plus"
            fill="none"
            height="20"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M5 12h14"></path>
            <path d="M12 5v14"></path>
          </svg>
          <span>Add Item</span>
        </button>
      </div>

      <div className="rounded-lg bg-background-light shadow-sm ring-1 ring-primary/20 dark:bg-background-dark dark:ring-primary/30">
        <ul className="divide-y divide-primary/20 dark:divide-primary/30">
          {wishList && wishList.length > 0 ? (
            wishList.map((item, idx) => (
              <li key={idx} className="p-4 flex justify-between items-center">
                <div>
                  <p className="font-semibold">{item.item}</p>
                  {item.description && (
                    <p className="text-sm text-primary/80 dark:text-primary/70">
                      {item.description}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    className="p-2 rounded-full hover:bg-primary/10"
                    aria-label={`Edit ${item.item}`}
                    onClick={() => {
                      setEditingWishIndex(idx);
                      setIsWishModalOpen(true);
                    }}
                  >
                    <span className="material-symbols-outlined text-primary/80 dark:text-primary/70">
                      edit
                    </span>
                  </button>
                  <button
                    className="p-2 rounded-full hover:bg-red-500/10"
                    aria-label={`Delete ${item.item}`}
                    onClick={() => requestDeleteWish(idx)}
                  >
                    <span className="material-symbols-outlined text-red-500">
                      delete
                    </span>
                  </button>
                </div>
              </li>
            ))
          ) : (
            <li className="p-4 text-sm text-primary/70">No wishes yet.</li>
          )}
        </ul>
      </div>

      <WishlistModal
        isOpen={isWishModalOpen}
        onClose={() => {
          setIsWishModalOpen(false);
          setEditingWishIndex(null);
        }}
        onSave={(data) => {
          if (editingWishIndex !== null) {
            updateWishItem(data);
          } else {
            addWishItem(data);
          }
        }}
        loading={savingWish}
        initialData={
          editingWishIndex !== null ? wishList[editingWishIndex] : null
        }
      />

      <BodyScrollLock active={confirmState.open} />

      <ConfirmModal
        isOpen={confirmState.open}
        title="Delete Wish Item"
        message="Delete this wish from your list?"
        confirmLabel="delete"
        cancelLabel="cancel"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        tone="danger"
      />
    </section>
  );
}
