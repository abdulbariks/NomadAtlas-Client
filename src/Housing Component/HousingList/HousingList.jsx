import React, { useEffect, useState } from 'react';



import { fetchHousings, createBooking } from '../api';
import BookingModal from '../BookingModel/BookingModel';
import PropertyCard from '../PropertyCard/PropertyCard';
import FilterBar from '../FilterBar/FilterBar';

// mock sample data (used when no backend)
const MOCK = [
  {
    _id: '1',
    title: 'Cozy 1BD Apartment in Canggu',
    type: 'Apartment',
    city: 'Canggu',
    pricePerMonth: 450,
    priceRange: 'Low',
    images: ['https://i.ibb.co.com/PvT3QWw9/495151043.jpg'],
    amenities: { wifi: true, kitchen: true, ac: true, workspace: true },
    description: 'Small, cozy apartment near cafes and coworking spaces.',
    bookingLink: ''
  },
  {
    _id: '2',
    title: 'Affordable Hostel - Lisbon Downtown',
    type: 'Hostel',
    city: 'Lisbon',
    pricePerMonth: 600,
    priceRange: 'Medium',
    images: ['https://i.ibb.co.com/PvT3QWw9/495151043.jpg'],
    amenities: { wifi: true, kitchen: true, ac: false, workspace: false },
    description: 'Social hostel great for meeting other nomads.',
    bookingLink: ''
  },
  {
    _id: '3',
    title: 'Bright Coworking Space - Chiang Mai',
    type: 'Co-working',
    city: 'Chiang Mai',
    pricePerMonth: 120,
    priceRange: 'Low',
    images: ['https://i.ibb.co.com/PvT3QWw9/495151043.jpg'],
    amenities: { wifi: true, kitchen: false, ac: true, workspace: true },
    description: '24/7 coworking with fast internet and meeting rooms.',
    bookingLink: 'https://example.com/book/cowork-chiangmai'
  }
];

export default function HousingList() {
  const [filters, setFilters] = useState({});
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(null);
  const [message, setMessage] = useState('');
  const useMock = true; // <-- set to false to use real API

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoading(true);
      try {
        if (useMock) {
          // simple local filtering to mimic backend query
          let items = MOCK.slice();
          if (filters.q) items = items.filter(i => (i.title + ' ' + i.city).toLowerCase().includes(filters.q.toLowerCase()));
          if (filters.type) items = items.filter(i => i.type === filters.type);
          if (filters.priceRange) items = items.filter(i => i.priceRange === filters.priceRange);
          if (filters.maxPrice) items = items.filter(i => i.pricePerMonth <= Number(filters.maxPrice));
          if (mounted) setList(items);
        } else {
          const data = await fetchHousings(filters);
          if (mounted) setList(data);
        }
      } catch (err) {
        console.error(err);
        if (mounted) setMessage('Failed to load housings');
      } finally {
        if (mounted) setLoading(false);
      }
    };

    load();
    return () => mounted = false;
  }, [filters]);

  const openBooking = item => setSelected(item);
  const closeBooking = () => setSelected(null);

  const handleBook = async (form) => {
    if (!selected) return;
    setMessage('Sending booking request...');
    try {
      if (useMock) {
        // simulate API create booking
        console.log('Booking (mock):', selected._id, form);
        setMessage('Booking request sent (mock).');
      } else {
        const res = await createBooking(selected._id, form);
        setMessage(res.message || 'Booking created');
      }
      setTimeout(() => setMessage(''), 2000);
      closeBooking();
    } catch (err) {
      console.error(err);
      setMessage(err.message || 'Booking failed');
    }
  };

  return (
    <div className='mx-5 md:mx-10 lg:mx-20 my-10 bg-blue-50 border px-3 py-6 rounded-md'>
      <FilterBar filters={filters} setFilters={setFilters} />

      {message && <div className="mb-4 alert alert-info">{message}</div>}

      {loading ? (
        <div className="text-center py-20">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.map(item => (
            <PropertyCard key={item._id} item={item} onOpenBooking={openBooking} />
          ))}
        </div>
      )}

      {selected && (
        <BookingModal housing={selected} onClose={closeBooking} onBook={handleBook} />
      )}
    </div>
  );
}
