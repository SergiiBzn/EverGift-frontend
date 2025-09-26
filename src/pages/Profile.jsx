/** @format */

import { useState, useEffect } from 'react';
import ReceivedGiftModal from '../components/ReceivedGiftModal.jsx';
import useAuth from '../hooks/useAuth.jsx';
import EditProfile from '../components/Modals/EditProfile.jsx';
import AddContact from '../components/Modals/AddContact.jsx';
import WishListModal from '../components/WishListModal.jsx';

const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export default function Profile() {
  const [open, setOpen] = useState(false);
  const [receivedGifts, setReceivedGifts] = useState([]);
  const [editingGift, setEditingGift] = useState(null);

  const [isOpenAddContact, setIsOpenAddContact] = useState(false);

  const [isOpenEditProfile, setIsOpenEditProfile] = useState(false);
  const { user } = useAuth();
  const { profile } = user;

  const [isWishModalOpen, setIsWishModalOpen] = useState(false);
  const [wishList, setWishList] = useState(user?.wishList || []);
  const [savingWish, setSavingWish] = useState(false);

  // Fetch received gifts from the backend
  const fetchReceivedGifts = async () => {
    try {
      const response = await fetch(`${baseUrl}/users/receivedGifts`, {
        credentials: 'include', // Include cookies for authentication
      });
      if (!response.ok) throw new Error('Failed to fetch received gifts');
      const data = await response.json();
      setReceivedGifts(data);
    } catch (error) {
      console.error(error);
    }
  };

  // Add a new received gift
  const addReceivedGift = async (payload) => {
    try {
      // payload expected from modal: { from, name, date, description }
      const { from, name, date, description } = payload;
      const body = {
        // send sender as array to match backend `fromName: string[]`
        ...(from ? { fromName: [from] } : {}),
        // wrap gift fields inside `gift` as required by schema
        gift: {
          name,
          description,
          date,
        },
      };

      const response = await fetch(`${baseUrl}/users/receivedGifts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(body),
      });
      if (!response.ok) throw new Error('Failed to add received gift');
      const newGift = await response.json();
      setReceivedGifts((prev) => [...prev, newGift]);
      setOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  // Edit a received gift
  const editReceivedGift = async (id, payload) => {
    try {
      // payload expected: { from, name, date, description }
      const { from, name, date, description } = payload;
      const body = {
        ...(from ? { fromName: [from] } : {}),
        gift: {
          name,
          description,
          date,
        },
      };

      const response = await fetch(`${baseUrl}/users/receivedGifts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(body),
      });
      if (!response.ok) throw new Error('Failed to edit received gift');
      const updated = await response.json();
      setReceivedGifts((prev) =>
        prev.map((g) => (g._id === updated._id ? updated : g))
      );
      setEditingGift(null);
      setOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  // Delete a received gift
  const deleteReceivedGift = async (id) => {
    try {
      const response = await fetch(`${baseUrl}/users/receivedGifts/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (!response.ok) throw new Error('Failed to delete received gift');
      setReceivedGifts((prev) => prev.filter((gift) => gift._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const addWishItem = async ({ name, description }) => {
    try {
      setSavingWish(true);
      const newList = [...wishList, { item: name, description }];
      setWishList(newList); // optimistic
      const res = await fetch(`${baseUrl}/users/wishList`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(newList),
      });
      if (!res.ok) throw new Error('Failed to update wishlist');
      const updatedUser = await res.json();
      setWishList(updatedUser.wishList || newList);
      setIsWishModalOpen(false);
    } catch (e) {
      console.error(e);
    } finally {
      setSavingWish(false);
    }
  };

  useEffect(() => {
    fetchReceivedGifts();
  }, []);

  return (
    <div className='mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8'>
      <div className='flex flex-col gap-12'>
        {/* profile */}
        <section>
          <h1 className='text-3xl font-bold mb-4'>Profile</h1>
          <div className='rounded-xl bg-background-light p-6 shadow-sm ring-1 ring-primary/20 dark:bg-background-dark dark:ring-primary/30 container'>
            <div className='flex flex-col items-center gap-6 md:flex-row'>
              <div className='relative'>
                <div
                  className='h-32 w-32 rounded-full bg-cover bg-center'
                  style={{
                    backgroundImage: `url(${profile.avatar})`,
                  }}
                ></div>
              </div>
              <div className='flex-1 text-center md:text-left'>
                <div className='flex items-center gap-6'>
                  <h2 className='text-3xl font-bold'>{profile.name}</h2>{' '}
                  {profile.gender == 'male' && (
                    <span className='material-symbols-outlined text-shadow-cyan-600 dark:text-primary/70'>
                      Male
                    </span>
                  )}
                  {profile.gender == 'female' && (
                    <span className='material-symbols-outlined text-pink-500'>
                      Female
                    </span>
                  )}
                </div>{' '}
                <p className='text-neutral '>
                  Age: {profile.age >= 0 ? profile.age : 'N/A'}
                </p>
                <div className='mt-4 flex flex-wrap justify-center gap-2 md:justify-start'>
                  {profile?.tags?.map((tag) => (
                    <span className='rounded-full bg-primary/10 px-3 py-1 text-sm text-primary dark:bg-primary/20'>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setIsOpenEditProfile(true)}
                className='btn btn-sm btn-primary'
              >
                Edit Profile
              </button>
              {isOpenEditProfile && (
                <EditProfile
                  isOpen={isOpenEditProfile}
                  setIsOpen={setIsOpenEditProfile}
                />
              )}
            </div>
          </div>
        </section>

        {/* contacts */}

        <section className='flex flex-col gap-6'>
          <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4'>
            <h2 className='text-2xl font-bold'>Contacts</h2>
            <div className='w-full sm:w-auto flex flex-col sm:flex-row items-start sm:items-center gap-4'>
              <div className='relative w-full sm:w-64'>
                <span className='absolute inset-y-0 left-0 flex items-center pl-3'>
                  <svg
                    className='h-5 w-5 text-primary/70'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      clipRule='evenodd'
                      d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
                      fillRule='evenodd'
                    />
                  </svg>
                </span>
                <input
                  className='w-full rounded-lg border-primary/20 bg-background-light py-2 pl-10 pr-4 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-primary/30 dark:bg-background-dark dark:focus:border-primary'
                  id='search-contact'
                  placeholder='Search contacts'
                  type='text'
                />
              </div>
              <button
                onClick={() => setIsOpenAddContact(true)}
                className='flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white'
              >
                <svg
                  className='lucide lucide-plus'
                  fill='none'
                  height='20'
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  viewBox='0 0 24 24'
                  width='20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path d='M5 12h14'></path>
                  <path d='M12 5v14'></path>
                </svg>
                <span>Add Contact</span>
              </button>
            </div>
          </div>

          <div className='relative'>
            <div className='flex items-center gap-4 overflow-x-auto  py-[2rem] px-[4rem]'>
              {user.contacts && user.contacts.length > 0 ? (
                user.contacts.map((contact) => (
                  <div
                    key={contact._id}
                    className='flex flex-col items-center justify-center gap-2 flex-shrink-0'
                  >
                    {/* <div
                      className="h-24 w-24 rounded-full bg-cover bg-center border border-primary"
                      style={{
                        backgroundImage: `url(${
                          contact.contactType === "user"
                            ? contact.linkedUserId?.profil?.avatar
                            : contact.customProfil?.avatar||defaultAvatar
                        })`,
                      }}></div> */}
                    <div>
                      <img
                        className='h-24 w-24 rounded-full bg-cover bg-center border border-primary'
                        src={`${
                          contact.contactType === 'user'
                            ? contact.linkedUserId?.profil?.avatar
                            : contact.profil?.avatar
                        }`}
                        alt={contact._id}
                      />
                      <p className='text-sm font-medium text-center'>
                        {contact.contactType === 'user'
                          ? contact.linkedUserId?.profil?.name
                          : contact.profil?.name}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p>No contacts yet.</p>
              )}

              <AddContact
                isOpen={isOpenAddContact}
                setIsOpen={setIsOpenAddContact}
              />
              <div className='absolute inset-y-0 left-0 flex items-center'>
                <button
                  className='p-2 rounded-full bg-background-light/80 dark:bg-background-dark/80 shadow-md ring-1 ring-black/5 dark:ring-white/10 hover:bg-background-light dark:hover:bg-background-dark btn btn-circle'
                  aria-label='Previous Contacts'
                >
                  <span className='material-symbols-outlined text-primary'>
                    chevron_left
                  </span>
                </button>
              </div>
              <div className='absolute inset-y-0 right-0 flex items-center'>
                <button
                  className='p-2 rounded-full bg-background-light/80 dark:bg-background-dark/80 shadow-md ring-1 ring-black/5 dark:ring-white/10 hover:bg-background-light dark:hover:bg-background-dark btn btn-circle  '
                  aria-label='Next Contacts'
                >
                  <span className='material-symbols-outlined text-primary  '>
                    chevron_right
                  </span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* whishlist */}

        <section className='flex flex-col gap-6'>
          <div className='flex items-center justify-between'>
            <h2 className='text-2xl font-bold'>Wishlist</h2>
            <button
              className='flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white'
              aria-label='Add Item to Wishlist'
              onClick={() => setIsWishModalOpen(true)}
            >
              <svg
                className='lucide lucide-plus'
                fill='none'
                height='20'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                viewBox='0 0 24 24'
                width='20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path d='M5 12h14'></path>
                <path d='M12 5v14'></path>
              </svg>
              <span>Add Item</span>
            </button>
          </div>

          <div className='rounded-lg bg-background-light shadow-sm ring-1 ring-primary/20 dark:bg-background-dark dark:ring-primary/30'>
            <ul className='divide-y divide-primary/20 dark:divide-primary/30'>
              {wishList && wishList.length > 0 ? (
                wishList.map((item, idx) => (
                  <li
                    key={idx}
                    className='p-4 flex justify-between items-center'
                  >
                    <div>
                      <p className='font-semibold'>{item.item}</p>
                      {item.description && (
                        <p className='text-sm text-primary/80 dark:text-primary/70'>
                          {item.description}
                        </p>
                      )}
                    </div>
                    <div className='flex items-center gap-2'>
                      <button
                        className='p-2 rounded-full hover:bg-primary/10'
                        aria-label={`Edit ${item.item}`}
                        disabled
                      >
                        <span className='material-symbols-outlined text-primary/80 dark:text-primary/70'>
                          edit
                        </span>
                      </button>
                      <button
                        className='p-2 rounded-full hover:bg-red-500/10'
                        aria-label={`Delete ${item.item}`}
                        disabled
                      >
                        <span className='material-symbols-outlined text-red-500'>
                          delete
                        </span>
                      </button>
                    </div>
                  </li>
                ))
              ) : (
                <li className='p-4 text-sm text-primary/70'>No wishes yet.</li>
              )}
            </ul>
          </div>
        </section>

        {/* Received gift history */}
        <section className='flex flex-col gap-6'>
          <div className='flex items-center justify-between'>
            <h2 className='text-2xl font-bold'>Received Gift History</h2>
            <button
              className='flex items-center gap-2 rounded-lg btn btn-primary px-4 py-2 text-sm font-bold text-white'
              aria-label='Add Gift'
              onClick={() => setOpen(true)}
            >
              <svg
                className='lucide lucide-plus'
                fill='none'
                height='20'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                viewBox='0 0 24 24'
                width='20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path d='M5 12h14'></path>
                <path d='M12 5v14'></path>
              </svg>
              <span>Add Item</span>
            </button>
          </div>

          <div className='flex flex-col gap-4 sm:flex-row'>
            <div className='flex-1'>
              <label
                className='mb-1 block text-sm font-medium'
                htmlFor='filter-year'
              >
                Filter by Year
              </label>
              <select
                className='w-full rounded border-primary/20 bg-background-light px-3 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-primary/30 dark:bg-background-dark dark:focus:border-primary'
                id='filter-year'
              >
                {['2023', '2022', '2021'].map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
            <div className='flex-1'>
              <label
                className='mb-1 block text-sm font-medium'
                htmlFor='search-contact-history'
              >
                Search by Gifter
              </label>
              <div className='relative'>
                <span className='absolute inset-y-0 left-0 flex items-center pl-3'>
                  <svg
                    className='text-primary/70'
                    fill='currentColor'
                    height='20'
                    viewBox='0 0 20 20'
                    width='20'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      clipRule='evenodd'
                      d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
                      fillRule='evenodd'
                    />
                  </svg>
                </span>
                <input
                  className='w-full rounded border-primary/20 bg-background-light py-2 pl-10 pr-4 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-primary/30 dark:bg-background-dark dark:focus:border-primary'
                  id='search-contact-history'
                  placeholder='Search by gifter'
                  type='text'
                />
              </div>
            </div>
          </div>

          <div className='overflow-x-auto rounded-lg shadow-sm ring-1 ring-primary/20 dark:ring-primary/30'>
            <table className='min-w-full divide-y divide-primary/20 dark:divide-primary/30'>
              <thead className='bg-primary/5 dark:bg-primary/10'>
                <tr>
                  <th
                    className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'
                    scope='col'
                  >
                    Gifter
                  </th>
                  <th
                    className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'
                    scope='col'
                  >
                    Gift
                  </th>
                  <th
                    className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'
                    scope='col'
                  >
                    Description
                  </th>
                  <th
                    className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'
                    scope='col'
                  >
                    Date
                  </th>
                  <th
                    className='px-6 py-3 text-right text-xs font-medium uppercase tracking-wider'
                    scope='col'
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className='divide-y divide-primary/20 bg-background-light dark:divide-primary/30 dark:bg-background-dark'>
                {receivedGifts.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className='px-6 py-4 text-center text-sm text-primary/80'
                    >
                      No received gifts yet.
                    </td>
                  </tr>
                ) : (
                  receivedGifts.map((r) => {
                    const gift = r.gift || r;
                    const gifter =
                      r.fromName && r.fromName.length
                        ? r.fromName[0]
                        : r.from || r.fromName || '—';
                    const date = gift?.date
                      ? new Date(gift.date).toLocaleDateString()
                      : '';
                    return (
                      <tr key={r._id || r.id}>
                        <td className='whitespace-nowrap px-6 py-4'>
                          {gifter}
                        </td>
                        <td className='whitespace-nowrap px-6 py-4 text-primary/80 dark:text-primary/70'>
                          {gift?.name}
                        </td>
                        <td className='whitespace-nowrap px-6 py-4 text-primary/80 dark:text-primary/70'>
                          {gift?.description}
                        </td>
                        <td className='whitespace-nowrap px-6 py-4 text-primary/80 dark:text-primary/70'>
                          {date}
                        </td>
                        <td className='whitespace-nowrap px-6 py-4 text-right'>
                          <div className='flex items-center justify-end gap-2'>
                            <button
                              className='p-2 rounded-full hover:bg-primary/10'
                              aria-label={`Edit gift from ${gifter}`}
                              onClick={() => {
                                setEditingGift(r);
                                setOpen(true);
                              }}
                            >
                              <span className='material-symbols-outlined text-primary/80 dark:text-primary/70'>
                                edit
                              </span>
                            </button>
                            <button
                              className='p-2 rounded-full hover:bg-red-500/10'
                              aria-label={`Delete gift from ${gifter}`}
                              onClick={() => deleteReceivedGift(r._id)}
                            >
                              <span className='material-symbols-outlined text-red-500'>
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
        </section>

        {/* add received gift */}
        <ReceivedGiftModal
          isOpen={open}
          onClose={() => {
            setOpen(false);
            setEditingGift(null);
          }}
          onSave={(data) => {
            if (editingGift) {
              editReceivedGift(editingGift._id, data);
            } else {
              addReceivedGift(data);
            }
          }}
          fromOptions={['Alice', 'Bob', 'Charlie']}
          initialData={editingGift}
        />
        {/* wishlist modal */}
        <WishListModal
          isOpen={isWishModalOpen}
          onClose={() => setIsWishModalOpen(false)}
          onSave={addWishItem}
          loading={savingWish}
        />
      </div>
    </div>
  );
}
