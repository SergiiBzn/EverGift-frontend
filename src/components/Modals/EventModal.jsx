/** @format */

import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth.jsx';

import { improveErrorMessage } from '../../utils/improveErrorMessage.js';
import { toast } from 'react-toastify';

const EventModal = () => {
  const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  const [formData, setFormData] = useState({
    contact: '',
    title: '',
    gift: '',
    date: '',
    isRepeat: 'none',
  });

  const [contactId, setContactId] = useState('');

  const { user, setUser } = useAuth();

  const [isSubmitting, setIsSubmitting] = useState(false);

  /*  const handleSave = (e) => {
    e.preventDefault();

    document.getElementById("my_modal_5").close();
  }; */

  const handleContactClick = (contactId, contactName) => {
    console.log('contactId', contactId);
    setFormData({ ...formData, contact: contactName });
    setContactId(contactId);
  };

  const handleClose = (e) => {
    e.preventDefault();
    document.getElementById('my_modal_5').close();
  };
  const handleSave = async (e) => {
    e.preventDefault();

    try {
      const giftObject = {
        gift: {
          name: formData.gift || 'default',

          date: formData.date || '',
        },
        title: formData.title || '',
        date: formData.date,
        isRepeat: formData.isRepeat,
      };
      const response = await fetch(`${baseUrl}/contacts/${contactId}/events`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(giftObject),
        credentials: 'include',
      });

      if (!response.ok) {
        const { error } = await response.json();
        await improveErrorMessage(error, 5000);
        return;
      }

      const event = await response.json();
      console.log('event', event);

      setUser({ ...user, events: [...(user.events || []), event] });
      document.getElementById('my_modal_5').close();
      setFormData({
        ...formData,
        contact: '',
        title: '',
        gift: '',
        date: '',
        isRepeat: 'none',
      });
      toast.success('Event created successfully');
    } catch (error) {
      console.error('Error creating event:', error);
      toast.error(error);
    }
  };

  //********** filter contacts **********
  const filteredContacts =
    user?.contacts?.filter((contact) =>
      contact?.name?.toLowerCase()?.includes(formData.contact?.toLowerCase())
    ) || [];
  return (
    <dialog
      id='my_modal_5'
      className='modal  modal-bottom sm:modal-middle fixed inset-0 z-50 flex items-center justify-center p-4 rounded-3xl bg-amber-700 text-white '
    >
      <div className='modal-box max-h-none h-auto bg-amber-700 text-white '>
        <h3 className='font-bold text-lg text-center'>Add Event</h3>

        <div className='not-prose overflow-auto rounded-lg bg-gray-800 outline outline-white/5 '>
          <div className='mx-auto max-w-md min-w-0 bg-white shadow-xl '>
            <div className='flex flex-nowrap overflow-x-auto bg-gray-800 space-x-4 p-4'>
              {filteredContacts.length > 0 ? (
                filteredContacts.map((contact) => (
                  <div
                    // key={contact._id}
                    key={contact.name}
                    onClick={() =>
                      handleContactClick(contact._id, contact.name)
                    }
                    className='shrink-0'
                  >
                    <div className='flex flex-col items-center justify-center gap-3'>
                      <img
                        className='h-18 w-18 rounded-full'
                        src={contact.avatar}
                        alt={contact.name}
                      />
                      <strong className='text-xs font-medium text-gray-900 dark:text-gray-200'>
                        {contact.name}
                      </strong>
                    </div>
                  </div>
                ))
              ) : (
                <option value=''>No contacts found</option>
              )}
            </div>
          </div>
        </div>

        <div className=' modal-action'>
          <form
            onSubmit={handleSave}
            className='relative z-10 w-full max-w-lg  bg-amber-700 text-white  '
          >
            {/* if there is a button in form, it will close the modal */}
            <div className='px-6 py-5 sm:px-8 sm:py-7'>
              <div className='space-y-4'>
                {/* Event contact */}
                <div className='grid grid-cols-12 items-center gap-3'>
                  <label
                    htmlFor='contact'
                    className='col-span-4 text-right text-lg'
                  >
                    Contact:
                  </label>
                  <div className='col-span-8'>
                    <input
                      id='contact'
                      type='text'
                      className='w-full rounded-xl bg-white/95 p-3 text-gray-900 outline-none focus:ring-2 focus:ring-orange-400'
                      value={formData.contact}
                      onChange={(e) =>
                        setFormData({ ...formData, contact: e.target.value })
                      }
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                </div>
                {/* title */}
                <div className='grid grid-cols-12 items-center gap-3'>
                  <label
                    htmlFor='title'
                    className='col-span-4 text-right text-lg'
                  >
                    Title:
                  </label>
                  <div className='col-span-8'>
                    <input
                      id='title'
                      type='text'
                      className='w-full rounded-xl bg-white/95 p-3 text-gray-900 outline-none focus:ring-2 focus:ring-orange-400'
                      value={formData.title || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          title: e.target.value,
                        })
                      }
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                </div>
                {/* Gift */}
                <div className='grid grid-cols-12 items-center gap-3'>
                  <label
                    htmlFor='gift'
                    className='col-span-4 text-right text-lg'
                  >
                    Gift:
                  </label>
                  <div className='col-span-8'>
                    <input
                      id='gift'
                      type='text'
                      className='w-full rounded-xl bg-white/95 p-3 text-gray-900 outline-none focus:ring-2 focus:ring-orange-400'
                      value={formData.gift}
                      onChange={(e) =>
                        setFormData({ ...formData, gift: e.target.value })
                      }
                      // required
                      disabled={isSubmitting}
                    />
                  </div>
                </div>
                {/* Date */}
                <div className='grid grid-cols-12 items-center gap-3'>
                  <label
                    htmlFor='date'
                    className='col-span-4 text-right text-lg'
                  >
                    Event Date:
                  </label>
                  <div className='col-span-8'>
                    <input
                      id='date'
                      type='date'
                      className='w-full rounded-xl bg-white/95 p-3 text-gray-900 outline-none focus:ring-2 focus:ring-orange-400'
                      value={formData.date}
                      onChange={(e) =>
                        setFormData({ ...formData, date: e.target.value })
                      }
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                {/* repeat select yearly or none */}
                <div className='grid grid-cols-12 items-center gap-3'>
                  <label
                    htmlFor='repeat'
                    className='col-span-4 text-right text-lg'
                  >
                    Repeat:
                  </label>
                  <div className='col-span-8'>
                    <select
                      id='repeat'
                      className='w-full rounded-xl bg-white/95 p-3 text-gray-900 outline-none focus:ring-2 focus:ring-orange-400'
                      value={formData.isRepeat}
                      onChange={(e) =>
                        setFormData({ ...formData, isRepeat: e.target.value })
                      }
                      required
                      disabled={isSubmitting}
                    >
                      <option value='none'>None</option>
                      <option value='yearly'>Yearly</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className='mt-8 flex items-center justify-between'>
                <button
                  className='btn  btn-outline hover:bg-primary/10 rounded-xl'
                  onClick={handleClose}
                >
                  Close
                </button>
                <button
                  type='submit'
                  disabled={isSubmitting}
                  className='btn btn-primary rounded-xl'
                >
                  {isSubmitting ? 'saving...' : 'save'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default EventModal;
