import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";

// ---------- Carousel Component ----------
function Carousel({ images = [] }) {
  const [i, setI] = useState(0);
  if (!images.length)
    return (
      <img
        src="https://via.placeholder.com/600x400?text=No+Image"
        alt="no"
        className="w-full h-28 object-cover"
      />
    );

  const prev = () => setI((p) => (p - 1 + images.length) % images.length);
  const next = () => setI((p) => (p + 1) % images.length);

  return (
    <div className="relative h-28">
      <img
        src={images[i]}
        alt={`img-${i}`}
        className="w-full h-full object-cover rounded-t-md"
      />
      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 btn btn-sm bg-white/80 hover:bg-white"
          >
            ‹
          </button>
          <button
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 btn btn-sm bg-white/80 hover:bg-white"
          >
            ›
          </button>
        </>
      )}
    </div>
  );
}

// ---------- Booking Modal Component ----------
function BookingModal({ item, onClose }) {
  if (!item) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Booking request sent for ${item.title}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-black"
        >
          ✕
        </button>
        <h3 className="text-xl font-semibold mb-3">Book {item.title}</h3>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="text-sm font-medium">Your Name</label>
            <input
              type="text"
              required
              className="input input-bordered w-full mt-1"
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              required
              className="input input-bordered w-full mt-1"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Message</label>
            <textarea
              className="textarea textarea-bordered w-full mt-1"
              rows="3"
              placeholder="Any special requests?"
            ></textarea>
          </div>
          <button
            type="submit"
            className="btn bg-blue-500 hover:bg-blue-600 text-white w-full"
          >
            Confirm Booking
          </button>
        </form>
      </div>
    </div>
  );
}

// ---------- Property Card Component ----------
export default function PropertyCard({ item }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="card bg-white shadow-sm rounded-md overflow-hidden"
      >
        <Carousel images={item.images || []} />

        <div className="p-4">
          <div className="flex justify-between">
            <div>
              <h4 className="font-semibold">{item.title}</h4>
              <p className="text-xs text-gray-500">
                {item.city} • {item.type}
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm">Per month</div>
              <div className="font-bold">${item.pricePerMonth ?? "—"}</div>
              <div className="text-xs text-gray-500">
                {item.priceRange || ""}
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="flex gap-2">
              <button
                onClick={() => setShowModal(true)}
                className="bg-yellow-400 hover:bg-yellow-500 font-semibold px-3 py-1 rounded-md"
              >
                Book
              </button>

              <Link to={`/destinations/${item.id}`}>
                <button className="bg-blue-400 hover:bg-blue-500 text-black font-semibold px-3 py-1 rounded-md">
                  Details
                </button>
              </Link>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Booking Modal */}
      {showModal && (
        <BookingModal item={item} onClose={() => setShowModal(false)} />
      )}
    </>
  );
}
