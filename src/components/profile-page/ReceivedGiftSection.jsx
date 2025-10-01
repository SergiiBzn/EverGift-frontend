import { useState, useEffect, useMemo } from 'react';

import ReceivedGiftModal from '../ReceivedGiftModal.jsx';
import useAuth from '../../hooks/useAuth.jsx';
import { ConfirmModal } from '../Modals';

const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export default function ReceivedGiftSection() {
  const [open, setOpen] = useState(false);
  const [receivedGifts, setReceivedGifts] = useState([]);
  const [editingGift, setEditingGift] = useState(null);
  const [filterYear, setFilterYear] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [extraSenders, setExtraSenders] = useState([]);
  // const [contacts, setContacts] = useState([]);
  const [confirmState, setConfirmState] = useState({ open: false, id: null });

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
      const { fromName, name, date, description } = payload;
      const body = {
        // send sender as array to match backend `fromName: string[]`
        // ...(from ? { fromName: [from] } : {}),
        fromName,
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
      const { fromName, name, date, description } = payload;
      const body = {
        // ...(from ? { fromName: [from] } : {}),
        fromName,
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

  const requestDelete = (id) => setConfirmState({ open: true, id });
  const handleConfirmDelete = async () => {
    if (confirmState.id) await deleteReceivedGift(confirmState.id);
    setConfirmState({ open: false, id: null });
  };
  const handleCancelDelete = () => setConfirmState({ open: false, id: null });

  // const fetchContacts = async () => {
  //   try {
  //     const res = await fetch(`${baseUrl}/contacts`, {
  //       credentials: 'include',
  //     });
  //     if (!res.ok) throw new Error('Failed to load contacts');
  //     const data = await res.json();
  //     setContacts(data);
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };

  useEffect(() => {
    fetchReceivedGifts();
    // fetchContacts();
  }, []);

  const contactDisplayName = (c) => {
    if (!c) return '';
    return c.name || '';
  };

  const { user } = useAuth();
  const { contacts } = user;

  const contactNames = useMemo(
    () => contacts.map(contactDisplayName).filter(Boolean),
    [contacts]
  );

  const existingGiftSenders = useMemo(() => {
    const s = new Set();
    receivedGifts.forEach((r) => {
      if (Array.isArray(r.fromName) && r.fromName.length > 0) {
        r.fromName.forEach((name) => s.add(name));
      } else if (r.from) {
        // Fallback for older data structure
        s.add(r.from);
      }
    });
    return Array.from(s);
  }, [receivedGifts]);

  const fromOptions = useMemo(() => {
    const set = new Set([
      ...contactNames,
      ...existingGiftSenders,
      ...extraSenders,
    ]);
    return Array.from(set)
      .filter(Boolean)
      .sort((a, b) => a.localeCompare(b, 'en'));
  }, [contactNames, existingGiftSenders, extraSenders]);

  const handleAddSender = (newName) => {
    if (!newName) return;
    setExtraSenders((prev) =>
      prev.includes(newName) ? prev : [...prev, newName]
    );
  };

  const years = useMemo(() => {
    const set = new Set();
    receivedGifts.forEach((r) => {
      const gift = r.gift || r;
      if (gift?.date) {
        const d = new Date(gift.date);
        if (!isNaN(d)) set.add(d.getFullYear());
      }
    });
    return ['All', ...Array.from(set).sort((a, b) => b - a)];
  }, [receivedGifts]);

  const filteredGifts = useMemo(() => {
    return receivedGifts.filter((r) => {
      const gift = r.gift || r;
      const gifter =
        Array.isArray(r.fromName) && r.fromName.length > 0
          ? r.fromName.join(', ')
          : r.from || r.fromName || '';

      let passYear = true;
      if (filterYear !== 'All') {
        const y =
          gift?.date && !isNaN(new Date(gift.date))
            ? new Date(gift.date).getFullYear().toString()
            : '';
        passYear = y === filterYear;
      }

      let passSearch = true;
      if (searchTerm.trim()) {
        passSearch = gifter
          .toLowerCase()
          .includes(searchTerm.trim().toLowerCase());
      }
      return passYear && passSearch;
    });
  }, [receivedGifts, filterYear, searchTerm]);

  return (
    <section className='flex flex-col gap-6'>
      <div className='flex items-center justify-between'>
        <h2 className='text-2xl font-bold'>Received Gift History</h2>
        <button
          className='flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white'
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
            id='filter-year'
            className='w-full rounded border-primary/20 bg-background-light px-3 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-primary/30 dark:bg-background-dark dark:focus:border-primary'
            value={filterYear}
            onChange={(e) => setFilterYear(e.target.value)}
          >
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
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
              id='search-contact-history'
              className='w-full rounded border-primary/20 bg-background-light py-2 pl-10 pr-4 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-primary/30 dark:bg-background-dark dark:focus:border-primary'
              placeholder='Search by gifter'
              type='text'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
            {filteredGifts.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className='px-6 py-4 text-center text-sm text-primary/80'
                >
                  {receivedGifts.length === 0
                    ? 'No received gifts yet.'
                    : 'No gifts match current filters.'}
                </td>
              </tr>
            ) : (
              filteredGifts.map((r) => {
                const gift = r.gift || r;
                const gifter =
                  r.fromName && r.fromName.length
                    ? r.fromName.join(', ')
                    : r.from || r.fromName || '—';
                const date = gift?.date
                  ? new Date(gift.date).toLocaleDateString()
                  : '';
                return (
                  <tr key={r._id || r.id}>
                    <td className='whitespace-nowrap px-6 py-4'>{gifter}</td>
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
                          onClick={() => requestDelete(r._id)}
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
        fromOptions={fromOptions}
        onAddSender={handleAddSender}
        initialData={editingGift}
      />

      <ConfirmModal
        isOpen={confirmState.open}
        title='Delete Received Gift'
        message='Are you sure you want to delete this received gift? This action cannot be undone.'
        confirmLabel='delete'
        cancelLabel='cancel'
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        tone='danger'
      />
    </section>
  );
}
