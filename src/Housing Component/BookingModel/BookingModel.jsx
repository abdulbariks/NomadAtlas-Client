import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function BookingModal({ housing, onClose, onBook }) {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', startDate: '', endDate: '', message: ''
  });
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onBook(form);
    } catch (err) {
      console.error(err);
      alert(err.message || 'Booking error');
    } finally {
      setLoading(false);
    }
  };

  if (!housing) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white rounded-lg w-full max-w-2xl p-6"
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Request Booking — {housing.title}</h3>
          <button onClick={onClose} className="btn btn-ghost btn-sm">Close</button>
        </div>

        <form onSubmit={submit} className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input required value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))} placeholder="Your name" className="input input-bordered w-full" />
            <input required value={form.email} onChange={e => setForm(f => ({...f, email: e.target.value}))} placeholder="Email" className="input input-bordered w-full" />
            <input value={form.phone} onChange={e => setForm(f => ({...f, phone: e.target.value}))} placeholder="Phone" className="input input-bordered w-full" />
            <input type="date" value={form.startDate} onChange={e => setForm(f => ({...f, startDate: e.target.value}))} className="input input-bordered w-full" />
            <input type="date" value={form.endDate} onChange={e => setForm(f => ({...f, endDate: e.target.value}))} className="input input-bordered w-full" />
          </div>

          <textarea value={form.message} onChange={e => setForm(f => ({...f, message: e.target.value}))} className="textarea textarea-bordered w-full" placeholder="Message (optional)"></textarea>

          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="btn btn-ghost">Cancel</button>
            <button type="submit" className={`btn btn-primary ${loading ? 'loading' : ''}`}>Send Request</button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
