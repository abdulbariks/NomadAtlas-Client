const API_BASE = import.meta.env.VITE_API || 'http://localhost:5000/api';

export async function fetchHousings(params = {}) {
  const qs = new URLSearchParams(params).toString();
  const res = await fetch(`${API_BASE}/housings?${qs}`);
  if (!res.ok) throw new Error('Failed to fetch housings');
  return res.json();
}

export async function createBooking(housingId, data) {
  const res = await fetch(`${API_BASE}/housings/${housingId}/book`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || 'Booking failed');
  }
  return res.json();
}
