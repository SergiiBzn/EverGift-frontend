/** @format */

import { useState, useEffect } from 'react';

export default function WishlistModal({
  isOpen = false,
  onClose = () => {},
  onSave = () => {},
  initialData = null,
  loading = false,
}) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  // Populate (edit) or reset (create)
  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setName(
          initialData.item || initialData.title || initialData.name || ''
        );
        setDescription(initialData.description || '');
      } else {
        setName('');
        setDescription('');
      }
    }
  }, [isOpen, initialData]);

  // Close on ESC like ReceivedGiftModal
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  const handleSave = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSave({ name: name.trim(), description: description.trim() });
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      aria-modal="true"
      role="dialog"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal card */}
      <form
        onSubmit={handleSave}
        className="relative z-10 w-full max-w-lg rounded-3xl bg-base-100 text-[#332E2B] shadow-xl"
      >
        <div className="px-6 py-5 sm:px-8 sm:py-7">
          <h2 className="mb-6 text-center text-3xl font-semibold">Wish Item</h2>

          <div className="space-y-4">
            {/* Wish name */}
            <div className="grid grid-cols-12 items-center gap-3">
              <label
                className="col-span-4 text-right text-lg"
                htmlFor="wishName"
              >
                Wish name:
              </label>
              <div className="col-span-8">
                <input
                  id="wishName"
                  type="text"
                  className="w-full rounded-2xl input input-md input-primary bg-white/95 text-base-content"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="e.g. Noise Cancelling Headphones"
                  autoFocus
                />
              </div>
            </div>

            {/* Description */}
            <div className="grid grid-cols-12 items-start gap-3">
              <label
                className="col-span-4 text-right text-lg"
                htmlFor="wishDescription"
              >
                Description:
              </label>
              <div className="col-span-8">
                <textarea
                  id="wishDescription"
                  rows={3}
                  className="w-full rounded-2xl input input-md input-primary bg-white/95 text-base-content"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Short description (optional)"
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-outline min-w-28 rounded-xl"
              disabled={loading}
            >
              cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary min-w-28 rounded-xl"
            >
              save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
