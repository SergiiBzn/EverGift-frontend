/** @format */
import React, { useEffect } from 'react';

// Generic confirmation modal
// Props:
// - isOpen
// - title
// - message (string or React node)
// - confirmLabel (default: 'delete')
// - cancelLabel (default: 'cancel')
// - onConfirm
// - onCancel
// - confirming (disable buttons while true)
// - tone: 'danger' | 'default'
export default function ConfirmModal({
  isOpen = false,
  title = 'Confirm',
  message = 'Are you sure?',
  confirmLabel = 'delete',
  cancelLabel = 'cancel',
  onConfirm = () => {},
  onCancel = () => {},
  confirming = false,
  tone = 'danger',
}) {
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === 'Escape') onCancel();
      if (e.key === 'Enter') onConfirm();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onCancel, onConfirm]);

  if (!isOpen) return null;

  const dangerClasses =
    'bg-red-600 hover:bg-red-700 focus:ring-red-500 disabled:bg-red-400';
  const primaryClasses =
    'bg-amber-600 hover:bg-amber-700 focus:ring-amber-500 disabled:bg-amber-400';

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center p-4'
      role='dialog'
      aria-modal='true'
    >
      <div
        className='absolute inset-0 bg-black/60 backdrop-blur-sm'
        onClick={onCancel}
      />
      <div className='relative z-10 w-full max-w-md rounded-3xl bg-white shadow-xl ring-1 ring-black/5 dark:bg-zinc-900'>
        <div className='px-6 py-6 sm:px-8 sm:py-8'>
          <h2 className='mb-4 text-center text-2xl font-semibold text-zinc-900 dark:text-white'>
            {title}
          </h2>
          <div className='mb-8 text-center text-sm text-zinc-600 dark:text-zinc-300'>
            {message}
          </div>
          <div className='flex items-center justify-between gap-4'>
            <button
              type='button'
              className='btn btn-outline min-w-28 rounded-2xl'
              onClick={onCancel}
              disabled={confirming}
            >
              {cancelLabel}
            </button>
            <button
              type='button'
              onClick={onConfirm}
              disabled={confirming}
              className={`btn min-w-28 rounded-2xl text-white ${
                tone === 'danger' ? dangerClasses : primaryClasses
              }`}
            >
              {confirmLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
