import { useState, useEffect, useCallback } from "react";
import { GivenGiftModal, ConfirmModal } from "../Modals";
import WishlistModal from "../WishListModal.jsx";

const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

const ContactRest = ({ contact }) => {
  const [openAddGivenGift, setOpenAddGivenGift] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [givenGifts, setGivenGifts] = useState([]);
  const [editingGift, setEditingGift] = useState(null); // stores full givenGift object
  // Wishlist state
  const [wishList, setWishList] = useState(() => contact?.wishList || []);
  const [wlModalOpen, setWlModalOpen] = useState(false);
  const [editingWishIndex, setEditingWishIndex] = useState(null); // index in wishList
  const [wlSubmitting, setWlSubmitting] = useState(false);
  const [confirmState, setConfirmState] = useState({
    open: false,
    type: null,
    id: null,
    index: null,
  });

  console.log("contact from rest", contact);

  // Fetch existing given gifts for this contact
  const fetchGivenGifts = useCallback(async () => {
    if (!contact?.id) return;
    setLoading(true);
    setErrorMsg("");
    try {
      const res = await fetch(`${baseUrl}/contacts/${contact.id}/givenGifts`, {
        credentials: "include",
      });
      if (!res.ok)
        throw new Error(`Failed to load given gifts (${res.status})`);
      const data = await res.json();
      setGivenGifts(data);
    } catch (e) {
      console.error(e);
      setErrorMsg(e.message || "Error loading given gifts");
    } finally {
      setLoading(false);
    }
  }, [contact?.id]);

  useEffect(() => {
    fetchGivenGifts();
  }, [fetchGivenGifts]);

  const addGivenGift = async ({ name, description, date }) => {
    if (!contact?.id) return;
    setSubmitting(true);
    setErrorMsg("");
    try {
      const payload = {
        gift: { name, description, date },
      };
      const res = await fetch(`${baseUrl}/contacts/${contact.id}/givenGifts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || `Failed to create gift (${res.status})`);
      }
      const created = await res.json();
      setGivenGifts((prev) => [...prev, created]);
      setOpenAddGivenGift(false);
    } catch (e) {
      console.error(e);
      setErrorMsg(e.message || "Error creating gift");
    } finally {
      setSubmitting(false);
    }
  };

  const updateGivenGift = async ({ name, description, date }) => {
    if (!contact?.id || !editingGift?._id) return;
    setSubmitting(true);
    setErrorMsg("");
    try {
      const payload = { gift: { name, description, date } };
      const res = await fetch(
        `${baseUrl}/contacts/${contact.id}/givenGifts/${editingGift._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(payload),
        }
      );
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || `Failed to update gift (${res.status})`);
      }
      const updated = await res.json();
      setGivenGifts((prev) =>
        prev.map((g) => (g._id === updated._id ? updated : g))
      );
      setOpenAddGivenGift(false);
      setEditingGift(null);
    } catch (e) {
      console.error(e);
      setErrorMsg(e.message || "Error updating gift");
    } finally {
      setSubmitting(false);
    }
  };

  const deleteGivenGift = async (id) => {
    if (!contact?.id || !id) return;
    setErrorMsg("");
    try {
      const res = await fetch(
        `${baseUrl}/contacts/${contact.id}/givenGifts/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      if (res.status !== 204 && !res.ok) {
        const txt = await res.text();
        throw new Error(txt || `Failed to delete gift (${res.status})`);
      }
      setGivenGifts((prev) => prev.filter((g) => g._id !== id));
      if (editingGift?._id === id) setEditingGift(null);
    } catch (e) {
      console.error(e);
      setErrorMsg(e.message || "Error deleting gift");
    }
  };

  const formatDate = (iso) => {
    if (!iso) return "";
    const d = new Date(iso);
    if (isNaN(d)) return "";
    return d.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // ===== Wishlist CRUD (PUT replaces entire array) =====
  const saveWishlist = async (nextList) => {
    if (!contact?.slug) {
      setErrorMsg("Missing contact slug for wishlist update");
      return;
    }
    setWlSubmitting(true);
    setErrorMsg("");
    try {
      const res = await fetch(`${baseUrl}/contacts/${contact.slug}/wishlist`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(
          nextList.map(({ item, description }) => ({ item, description }))
        ),
      });
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || `Failed to update wishlist (${res.status})`);
      }
      const updatedContact = await res.json();
      setWishList(updatedContact.wishList || []);
      setWlModalOpen(false);
      setEditingWishIndex(null);
    } catch (e) {
      console.error(e);
      setErrorMsg(e.message || "Error updating wishlist");
    } finally {
      setWlSubmitting(false);
    }
  };

  const addWishlistItem = async ({ item, description }) => {
    const next = [...wishList, { item, description }];
    await saveWishlist(next);
  };

  const updateWishlistItem = async (idx, { item, description }) => {
    const next = wishList.map((w, i) =>
      i === idx ? { item, description } : w
    );
    await saveWishlist(next);
  };

  const deleteWishlistItem = async (idx) => {
    const next = wishList.filter((_, i) => i !== idx);
    await saveWishlist(next);
  };

  const requestDeleteGivenGift = (id) => {
    setConfirmState({ open: true, type: "given", id, index: null });
  };
  const requestDeleteWishlistItem = (index) => {
    setConfirmState({ open: true, type: "wish", id: null, index });
  };
  const handleConfirm = async () => {
    const { type, id, index } = confirmState;
    if (type === "given" && id) await deleteGivenGift(id);
    if (type === "wish" && index !== null) await deleteWishlistItem(index);
    setConfirmState({ open: false, type: null, id: null, index: null });
  };
  const handleCancelConfirm = () =>
    setConfirmState({ open: false, type: null, id: null, index: null });

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <div className="rounded-xl bg-white  shadow-sm p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-zinc-900 ">
            Given Gift History
          </h3>
          <button
            onClick={() => setOpenAddGivenGift(true)}
            className="btn btn-primary btn-outline rounded-2xl disabled:opacity-50"
            disabled={submitting}
          >
            <span className="material-symbols-outlined"> add </span>
            <span>Add</span>
          </button>
          <GivenGiftModal
            isOpen={openAddGivenGift}
            onClose={() => {
              if (submitting) return;
              setOpenAddGivenGift(false);
              setEditingGift(null);
            }}
            onSave={(data) =>
              editingGift ? updateGivenGift(data) : addGivenGift(data)
            }
            initialData={editingGift}
            submitting={submitting}
          />
        </div>
        {errorMsg && (
          <div className="mt-3 rounded-lg bg-red-50 px-4 py-2 text-sm text-red-600">
            {errorMsg}
          </div>
        )}
        <div className="mt-4 flow-root">
          <div className="-mx-6 -my-2 overflow-x-auto">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6">
              <table className="min-w-full divide-y divide-zinc-800">
                <thead>
                  <tr>
                    <th
                      className="py-3.5 pl-6 pr-3 text-left text-sm font-semibold text-zinc-900 "
                      scope="col"
                    >
                      Gift
                    </th>
                    <th
                      className="px-3 py-3.5 text-left text-sm font-semibold text-zinc-900"
                      scope="col"
                    >
                      Date
                    </th>
                    <th
                      className="px-3 py-3.5 text-left text-sm font-semibold text-zinc-900 "
                      scope="col"
                    >
                      Reason for a gift
                    </th>
                    <th className="relative py-3.5 pl-3 pr-6" scope="col">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800">
                  {loading ? (
                    <tr>
                      <td
                        colSpan={4}
                        className="px-6 py-6 text-center text-sm text-zinc-500"
                      >
                        Loading...
                      </td>
                    </tr>
                  ) : givenGifts.length === 0 ? (
                    <tr>
                      <td
                        colSpan={4}
                        className="px-6 py-6 text-center text-sm text-zinc-500"
                      >
                        No given gifts yet.
                      </td>
                    </tr>
                  ) : (
                    givenGifts.map((g) => {
                      const giftObj = g.gift || {};
                      return (
                        <tr key={g._id}>
                          <td className="whitespace-nowrap py-4 pl-6 pr-3 text-sm font-medium text-zinc-900 ">
                            {giftObj.name}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-zinc-500 dark:text-zinc-400">
                            {formatDate(giftObj.date)}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-zinc-500 dark:text-zinc-400">
                            {giftObj.description || "—"}
                          </td>
                          <td className="relative whitespace-nowrap py-4 pl-3 pr-6 text-right text-sm font-medium">
                            <div className="flex items-center justify-end gap-x-4">
                              <button
                                type="button"
                                className="text-primary hover:text-primary/80"
                                onClick={() => {
                                  setEditingGift(g);
                                  setOpenAddGivenGift(true);
                                }}
                              >
                                <span className="material-symbols-outlined">
                                  edit
                                </span>
                              </button>
                              <button
                                type="button"
                                className="text-red-500 hover:text-red-400"
                                onClick={() => requestDeleteGivenGift(g._id)}
                              >
                                <span className="material-symbols-outlined">
                                  delete
                                </span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="rounded-xl bg-white shadow-sm p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-zinc-900 ">Wishlist</h3>
          {/* chekc if the user if a linkedUser */}
          {contact.contactType !== "user" && (
            <button
              className="btn btn-primary btn-outline rounded-2xl disabled:opacity-50"
              onClick={() => {
                setEditingWishIndex(null);
                setWlModalOpen(true);
              }}
              disabled={wlSubmitting}
            >
              <span className="material-symbols-outlined"> add </span>
              <span>Add</span>
            </button>
          )}
        </div>
        <div className="mt-4 flow-root">
          <div className="-mx-6 -my-2 overflow-x-auto">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6">
              <table className="min-w-full divide-y divide-zinc-800">
                <thead>
                  <tr>
                    <th
                      className="py-3.5 pl-6 pr-3 text-left text-sm font-semibold text-zinc-900"
                      scope="col"
                    >
                      Item
                    </th>
                    <th
                      className="px-3 py-3.5 text-left text-sm font-semibold text-zinc-900"
                      scope="col"
                    >
                      Description
                    </th>
                    <th className="relative py-3.5 pl-3 pr-6" scope="col">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800">
                  {wishList.length === 0 ? (
                    <tr>
                      <td
                        colSpan={3}
                        className="px-6 py-6 text-center text-sm text-zinc-500"
                      >
                        No wishlist items.
                      </td>
                    </tr>
                  ) : (
                    wishList.map((w, idx) => (
                      <tr key={idx}>
                        <td className="whitespace-nowrap py-4 pl-6 pr-3 text-sm font-medium text-zinc-900">
                          {w.item}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-zinc-500 dark:text-zinc-400 max-w-sm truncate">
                          {w.description || "—"}
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-6 text-right text-sm font-medium">
                          <div className="flex items-center justify-end gap-x-4">
                            {contact.contactType !== "user" && (
                              <>
                                <button
                                  type="button"
                                  className="text-primary hover:text-primary/80"
                                  onClick={() => {
                                    setEditingWishIndex(idx);
                                    setWlModalOpen(true);
                                  }}
                                >
                                  <span className="material-symbols-outlined">
                                    edit
                                  </span>
                                </button>
                                <button
                                  type="button"
                                  className="text-red-500 hover:text-red-400"
                                  onClick={() => requestDeleteWishlistItem(idx)}
                                  disabled={wlSubmitting}
                                >
                                  <span className="material-symbols-outlined">
                                    delete
                                  </span>
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <WishlistModal
          isOpen={wlModalOpen}
          onClose={() => {
            if (wlSubmitting) return;
            setWlModalOpen(false);
          }}
          initialData={
            editingWishIndex !== null
              ? {
                  item: wishList[editingWishIndex].item,
                  description: wishList[editingWishIndex].description,
                }
              : null
          }
          loading={wlSubmitting}
          onSave={({ name, description }) => {
            // Map modal output { name, description } to wishlist item shape { item, description }
            if (editingWishIndex !== null) {
              updateWishlistItem(editingWishIndex, { item: name, description });
            } else {
              addWishlistItem({ item: name, description });
            }
          }}
        />
      </div>
      <ConfirmModal
        isOpen={confirmState.open}
        title={
          confirmState.type === "given"
            ? "Delete Given Gift"
            : "Delete Wish Item"
        }
        message={
          confirmState.type === "given"
            ? "Are you sure you want to delete this given gift? This action cannot be undone."
            : "Are you sure you want to delete this wish item?"
        }
        confirmLabel="delete"
        cancelLabel="cancel"
        onConfirm={handleConfirm}
        onCancel={handleCancelConfirm}
        tone="danger"
      />
    </div>
  );
};

export default ContactRest;
