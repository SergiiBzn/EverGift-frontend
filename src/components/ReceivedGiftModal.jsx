/** @format */

import React, { useEffect, useState, useRef, useCallback } from 'react';

// Modal for creating / editing a received gift.
// Props:
// - isOpen: boolean controlling visibility
// - onClose: () => void
// - onSave: ({ from, name, date, description }) => void
// - fromOptions: string[] list of known senders / contacts
// - onAddSender: (newName: string) => void (passed up so parent can persist new sender in state)
// - initialData: object for editing existing gift { from|fromName[], gift|{name, description, date}, ... }
export default function ReceivedGiftModal({
  isOpen = false,
  onClose = () => {},
  onSave = () => {},
  fromOptions = [],
  onAddSender,
  initialData = null,
}) {
  const [from, setFrom] = useState('');
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  // Autocomplete + custom sender modal state
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1); // keyboard navigation
  const [showAddSenderModal, setShowAddSenderModal] = useState(false);
  const [newSenderName, setNewSenderName] = useState('');
  const suggestionsRef = useRef(null);
  const inputRef = useRef(null);

  // Reset fields when opening or populate with initialData for edit
  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setFrom(initialData.from || initialData.fromName?.[0] || '');
        setName(initialData.name || initialData.gift?.name || '');
        // normalize date to yyyy-MM-dd for input[type=date]
        const d = initialData.date || initialData.gift?.date;
        if (d) {
          const dt = new Date(d);
          const y = dt.getFullYear();
          const m = String(dt.getMonth() + 1).padStart(2, '0');
          const day = String(dt.getDate()).padStart(2, '0');
          setDate(`${y}-${m}-${day}`);
        } else {
          setDate('');
        }
        setDescription(
          initialData.description || initialData.gift?.description || ''
        );
      } else {
        setFrom('');
        setName('');
        setDate('');
        setDescription('');
      }
    }
  }, [isOpen, initialData]);

  // Close on ESC
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  // Close suggestions when clicking outside
  useEffect(() => {
    if (!showSuggestions) return;
    const handler = (e) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(e.target) &&
        inputRef.current &&
        !inputRef.current.contains(e.target)
      ) {
        setShowSuggestions(false);
        setActiveIndex(-1);
      }
    };
    window.addEventListener('mousedown', handler);
    return () => window.removeEventListener('mousedown', handler);
  }, [showSuggestions]);

  const filteredOptions = fromOptions
    .filter((opt) =>
      from ? opt.toLowerCase().includes(from.toLowerCase()) : true
    )
    .slice(0, 15);

  const selectSuggestion = useCallback((val) => {
    setFrom(val);
    setShowSuggestions(false);
    setActiveIndex(-1);
  }, []);

  const openAddSenderModal = useCallback(() => {
    setNewSenderName(from.trim() ? from.trim() : '');
    setShowAddSenderModal(true);
    setShowSuggestions(false);
  }, [from]);

  const handleAddSenderConfirm = useCallback(() => {
    const trimmed = newSenderName.trim();
    if (!trimmed) return;
    if (onAddSender) onAddSender(trimmed);
    setFrom(trimmed);
    setShowAddSenderModal(false);
  }, [newSenderName, onAddSender]);

  const handleSenderKeyDown = (e) => {
    if (!showSuggestions && ['ArrowDown', 'ArrowUp'].includes(e.key)) {
      setShowSuggestions(true);
      return;
    }
    if (!showSuggestions) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prev) => {
        const next = prev + 1;
        return next >= filteredOptions.length ? 0 : next;
      });
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) => {
        const next = prev - 1;
        return next < 0 ? filteredOptions.length - 1 : next;
      });
    } else if (e.key === 'Enter') {
      if (activeIndex >= 0 && activeIndex < filteredOptions.length) {
        e.preventDefault();
        selectSuggestion(filteredOptions[activeIndex]);
      } else if (filteredOptions.length === 0) {
        e.preventDefault();
        openAddSenderModal();
      }
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
      setActiveIndex(-1);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    onSave({ from, name, date, description });
  };

  if (!isOpen) return null;

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center p-4'
      aria-modal='true'
      role='dialog'
    >
      {/* Backdrop */}
      <div
        className='absolute inset-0 bg-black/60 backdrop-blur-sm'
        onClick={onClose}
      />

      {/* Modal card */}
      <form
        onSubmit={handleSave}
        className='relative z-10 w-full max-w-lg rounded-3xl bg-amber-700 text-white shadow-xl'
      >
        <div className='px-6 py-5 sm:px-8 sm:py-7'>
          <h2 className='mb-6 text-center text-3xl font-semibold'>
            Received Gift
          </h2>

          <div className='space-y-4'>
            {/* From (autocomplete input) */}
            <div className='grid grid-cols-12 items-start gap-3'>
              <label
                className='col-span-4 text-right text-lg pt-2'
                htmlFor='fromInput'
              >
                From:
              </label>
              <div className='col-span-8 relative'>
                <div className='flex gap-2'>
                  <input
                    id='fromInput'
                    ref={inputRef}
                    type='text'
                    className='w-full rounded-xl bg-white/95 p-3 text-gray-900 outline-none focus:ring-2 focus:ring-orange-400'
                    value={from}
                    placeholder='Start typing a name'
                    onChange={(e) => {
                      setFrom(e.target.value);
                      setShowSuggestions(true);
                      setActiveIndex(-1);
                    }}
                    onFocus={() => setShowSuggestions(true)}
                    onKeyDown={handleSenderKeyDown}
                    autoComplete='off'
                    required
                  />
                  <button
                    type='button'
                    onClick={openAddSenderModal}
                    title='Add a new (unregistered) sender'
                    className='inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-amber-700 text-2xl font-bold transition hover:bg-white'
                  >
                    +
                  </button>
                </div>
                {showSuggestions && (
                  <div
                    ref={suggestionsRef}
                    className='absolute z-20 mt-1 w-full overflow-hidden rounded-xl border border-orange-300/60 bg-white text-gray-800 shadow-lg'
                    role='listbox'
                  >
                    {filteredOptions.length > 0 ? (
                      <ul className='max-h-60 overflow-y-auto'>
                        {filteredOptions.map((opt, idx) => (
                          <li
                            key={opt}
                            role='option'
                            aria-selected={idx === activeIndex}
                            className={`cursor-pointer px-3 py-2 hover:bg-amber-100 ${
                              idx === activeIndex ? 'bg-amber-100' : ''
                            }`}
                            onMouseDown={(e) => {
                              e.preventDefault();
                              selectSuggestion(opt);
                            }}
                            onMouseEnter={() => setActiveIndex(idx)}
                          >
                            {opt}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className='px-3 py-2 text-sm text-gray-600'>
                        Contact not found.
                        <button
                          type='button'
                          onMouseDown={(e) => {
                            e.preventDefault();
                            openAddSenderModal();
                          }}
                          className='ml-2 rounded bg-amber-600 px-2 py-1 text-xs font-semibold text-white hover:bg-amber-700'
                        >
                          Add
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Gift name */}
            <div className='grid grid-cols-12 items-center gap-3'>
              <label
                className='col-span-4 text-right text-lg'
                htmlFor='giftName'
              >
                Gift name:
              </label>
              <div className='col-span-8'>
                <input
                  id='giftName'
                  type='text'
                  className='w-full rounded-xl bg-white/95 p-3 text-gray-900 outline-none focus:ring-2 focus:ring-orange-400'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Date */}
            <div className='grid grid-cols-12 items-center gap-3'>
              <label className='col-span-4 text-right text-lg' htmlFor='date'>
                Date:
              </label>
              <div className='col-span-8'>
                <input
                  id='date'
                  type='date'
                  className='w-full rounded-xl bg-white/95 p-3 text-gray-900 outline-none focus:ring-2 focus:ring-orange-400'
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Description */}
            <div className='grid grid-cols-12 items-center gap-3'>
              <label
                className='col-span-4 text-right text-lg'
                htmlFor='description'
              >
                Description:
              </label>
              <div className='col-span-8'>
                <input
                  id='description'
                  type='text'
                  className='w-full rounded-xl bg-white/95 p-3 text-gray-900 outline-none focus:ring-2 focus:ring-orange-400'
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className='mt-8 flex items-center justify-between'>
            <button
              type='submit'
              className='min-w-28 rounded-2xl bg-orange-500 px-6 py-3 font-semibold text-white shadow hover:bg-orange-600 active:bg-orange-700'
            >
              save
            </button>
            <button
              type='button'
              onClick={onClose}
              className='min-w-28 rounded-2xl bg-orange-500/90 px-6 py-3 font-semibold text-white shadow hover:bg-orange-600 active:bg-orange-700'
            >
              cancel
            </button>
          </div>
        </div>
      </form>

      {/* Mini modal for creating a new (unregistered) sender */}
      {showAddSenderModal && (
        <div className='absolute inset-0 z-50 flex items-center justify-center'>
          <div
            className='absolute inset-0 bg-black/40'
            onClick={() => setShowAddSenderModal(false)}
          />
          <div className='relative w-full max-w-sm rounded-2xl bg-white p-6 shadow-lg'>
            <h3 className='mb-4 text-lg font-semibold text-gray-800'>
              New Sender
            </h3>
            <input
              autoFocus
              type='text'
              className='mb-4 w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-300'
              placeholder='Sender name'
              value={newSenderName}
              onChange={(e) => setNewSenderName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && newSenderName.trim()) {
                  e.preventDefault();
                  handleAddSenderConfirm();
                }
              }}
            />
            <div className='flex justify-end gap-3'>
              <button
                type='button'
                onClick={() => setShowAddSenderModal(false)}
                className='rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100'
              >
                Cancel
              </button>
              <button
                type='button'
                onClick={handleAddSenderConfirm}
                disabled={!newSenderName.trim()}
                className='rounded-lg bg-amber-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50 hover:bg-amber-700'
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
