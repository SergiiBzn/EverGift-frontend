/** @format */

import React, { useEffect, useState } from 'react';

// TailwindCSS-based modal for adding a given gift
// Props:
// - isOpen: boolean to control visibility
// - onClose: function to close the modal
// - onSave: function({ name, description, date })
export default function GivenGiftModal({
  isOpen = false,
  onClose = () => {},
  onSave = () => {},
  initialData = null, // { gift: { name, description, date }, ... }
  submitting = false,
}) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');

  // Populate or reset when opening
  useEffect(() => {
    if (!isOpen) return;
    if (initialData) {
      const giftObj = initialData.gift || initialData; // fallback
      setName(giftObj.name || '');
      setDescription(giftObj.description || '');
      // ensure date in yyyy-MM-dd
      if (giftObj.date) {
        const d = new Date(giftObj.date);
        if (!isNaN(d)) {
          const yyyy = d.getFullYear();
          const mm = String(d.getMonth() + 1).padStart(2, '0');
          const dd = String(d.getDate()).padStart(2, '0');
          setDate(`${yyyy}-${mm}-${dd}`);
        } else {
          setDate('');
        }
      } else {
        setDate('');
      }
    } else {
      setName('');
      setDescription('');
      setDate('');
    }
  }, [isOpen, initialData]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  const handleSave = (e) => {
    e?.preventDefault?.();
    if (submitting) return;
    onSave({ name, description, date });
  };

  if (!isOpen) return null;

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center p-4'
      role='dialog'
      aria-modal='true'
    >
      <div
        className='absolute inset-0 bg-black/60 backdrop-blur-sm'
        onClick={onClose}
      />

      <form
        onSubmit={handleSave}
        className='relative z-10 w-full max-w-lg rounded-3xl bg-amber-700 text-white shadow-xl'
      >
        <div className='px-6 py-5 sm:px-8 sm:py-7'>
          <h2 className='mb-6 text-center text-3xl font-semibold'>
            Given Gift
          </h2>

          <div className='space-y-4'>
            {/* Gift name */}
            <div className='grid grid-cols-12 items-center gap-3'>
              <label
                htmlFor='giftName'
                className='col-span-4 text-right text-lg'
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
                  disabled={submitting}
                />
              </div>
            </div>

            {/* Description */}
            <div className='grid grid-cols-12 items-center gap-3'>
              <label
                htmlFor='description'
                className='col-span-4 text-right text-lg'
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
                  disabled={submitting}
                />
              </div>
            </div>

            {/* Date */}
            <div className='grid grid-cols-12 items-center gap-3'>
              <label htmlFor='date' className='col-span-4 text-right text-lg'>
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
                  disabled={submitting}
                />
              </div>
            </div>
          </div>

          <div className='mt-8 flex items-center justify-between'>
            <button
              type='submit'
              disabled={submitting}
              className='min-w-28 rounded-2xl bg-orange-500 px-6 py-3 font-semibold text-white shadow hover:bg-orange-600 disabled:opacity-60 active:bg-orange-700'
            >
              {submitting ? 'saving...' : initialData ? 'update' : 'save'}
            </button>
            <button
              type='button'
              disabled={submitting}
              onClick={onClose}
              className='min-w-28 rounded-2xl bg-orange-500/90 px-6 py-3 font-semibold text-white shadow hover:bg-orange-600 disabled:opacity-60 active:bg-orange-700'
            >
              cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
