/** @format */

import React, { useEffect, useState } from 'react';

// TailwindCSS-based modal for adding a received gift
// Props:
// - isOpen: boolean to control visibility
// - onClose: function to close the modal
// - onSave: function({ from, name, date, description })
// - fromOptions: array of strings (senders) for the selector
// - onAddSender: optional click handler for the small plus button
export default function ReceivedGiftModal({
  isOpen = false,
  onClose = () => {},
  onSave = () => {},
  fromOptions = [],
  onAddSender,
}) {
  const [from, setFrom] = useState('');
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');

  // Reset fields when opening
  useEffect(() => {
    if (isOpen) {
      setFrom('');
      setName('');
      setDate('');
      setDescription('');
    }
  }, [isOpen]);

  // Close on ESC
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  const handleSave = (e) => {
    e?.preventDefault?.();
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
            {/* From */}
            <div className='grid grid-cols-12 items-center gap-3'>
              <label className='col-span-4 text-right text-lg' htmlFor='from'>
                From:
              </label>
              <div className='col-span-8 flex items-center gap-2'>
                <select
                  id='from'
                  className='w-full rounded-xl bg-white/95 p-3 text-gray-900 outline-none ring-0 focus:ring-2 focus:ring-orange-400'
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  required
                >
                  <option value='' disabled>
                    Select sender
                  </option>
                  {fromOptions.map((opt) => (
                    <option
                      key={typeof opt === 'string' ? opt : opt.value}
                      value={typeof opt === 'string' ? opt : opt.value}
                    >
                      {typeof opt === 'string' ? opt : opt.label}
                    </option>
                  ))}
                </select>
                <button
                  type='button'
                  onClick={onAddSender}
                  title='Add sender'
                  className='inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-amber-700 transition hover:bg-white'
                >
                  +
                </button>
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
    </div>
  );
}
